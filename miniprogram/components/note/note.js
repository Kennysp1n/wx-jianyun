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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showAddForm: false,
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
    showDetailPage(e) {
      const _this = this
      wx.navigateTo({
        url: `../../pages/noteDetail/noteDetail?index=${e.currentTarget.dataset.index}`,
        success(res) {
          res.eventChannel.emit('recevie_db_note_data', _this.data.db_note_data)
        }
      })
    }
  }
})