// components/tool/tool.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clearStorage() {
      wx.clearStorage({
        success() {
          wx.showToast({
            title: '缓存清理成功',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
})
