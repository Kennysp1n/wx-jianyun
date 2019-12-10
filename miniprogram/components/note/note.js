// components/note/note.js
const db_note = wx.cloud.database().collection('note')
const date = require('../../utils/time.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    db_note_data: {
      type: Object
    },
    showCardList: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showAddForm: false,
    showDelBtn: false,
    showDetailPage: true,
    allowLongPress: true,
    deleteNoteList: []
  },
  /**
   * 组件的方法列表
   */
  methods: {
    submit(res) {
      const _this = this
      let temp = res.detail.value
      if (temp.title === '' || temp.content === '') {
        wx.showToast({
          title: '请输入有效内容',
          icon: 'none'
        })
      } else {
        db_note.add({
          data: {
            title: temp.title,
            content: temp.content,
            date: date.getDate()
          },
          success(res) {
            wx.showToast({
              title: '添加成功',
              icon: 'none'
            })

            db_note.get().then((res) => {
              _this.setData({
                db_note_data: res.data
              })
            })

            _this.setData({
              showAddForm: false
            })
          }
        })
      }
    },
    toggleShowAddForm() {
      this.setData({
        showAddForm: !this.data.showAddForm
      })
    },
    handleTap(e) {
      let index = e.currentTarget.dataset.index
      if (this.data.showDetailPage) {
        this.showDetailPage(index)
      } else {
        if (this.data.deleteNoteList.indexOf(index) !== -1) {
          this.data.deleteNoteList.splice(this.data.deleteNoteList.indexOf(index), 1)
          this.animate('#' + e.currentTarget.id + '-circle', [{
            rotate: 0,
            backgroundColor: 'white'
          }, {
            rotate: 90,
            backgroundColor: 'white'
          }], 300)
        } else {
          this.data.deleteNoteList.push(index)
          this.animate('#' + e.currentTarget.id + '-circle', [{
            rotate: 0,
            backgroundColor: 'red'
          }, {
            rotate: 90,
            backgroundColor: 'red'
          }], 300)
        }
      }
    },
    showDetailPage(index) {
      const _this = this
      if (this.data.showDetailPage && !this.data.showCardList) {
        wx.navigateTo({
          url: `../../pages/noteDetail/noteDetail?index=${index}`,
          success(res) {
            res.eventChannel.emit('recevie_db_note_data', _this.data.db_note_data)
          }
        })
      }
    },
    handleLongPress(e) {
      if (!this.data.showCardList && this.data.allowLongPress) {
        this.animate('#' + e.currentTarget.id, [{
            scale: [0.8, 0.8]
          },
          {
            scale: [1, 1]
          },
        ], 300)
        this.animate('#' + e.currentTarget.id + '-circle', [{
          backgroundColor: 'red'
        }], 300)
        this.setData({
          showDelBtn: true,
          showDetailPage: false,
          allowLongPress: false
        })
        this.data.deleteNoteList.push(e.currentTarget.dataset.index)
      }
    },
    cancelDelete() {
      this.setData({
        showDelBtn: false,
        showDetailPage: true,
        allowLongPress: true,
        deleteNoteList: []
      })
    },
    confirmDelete() {
      let counter = 0
      this.data.deleteNoteList.forEach((item) => {
        let id = this.data.db_note_data[item]._id
        const _this = this
        db_note.doc(id).remove({
          success() {
            counter++
            if (counter === _this.data.deleteNoteList.length) {
              db_note.get().then((res) => {
                _this.setData({
                  db_note_data: res.data
                })
                _this.cancelDelete()
              })
            }
          }
        })
        
      })
    }
  }
})