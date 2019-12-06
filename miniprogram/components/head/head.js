// components/head/head.js
Component({
  /**
   * 生命周期
   */
  lifetimes: {
    attached() {
      const _this = this
      //查看是否有相应缓存数据
      let temp = wx.getStorageSync('userInfo')
      if (temp) {
        this.setData({
          userInfo: temp
        })
      } else {
        //判断用户授权,获取用户信息
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo'
              })
            }
            wx.getUserInfo({
              lang: 'zh_CN',
              success(res) {
                _this.setData({
                  userInfo: res.userInfo
                })
              }
            })
          }
        })
      }
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    extInfo: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: null,
    iconColor: 'black',
    showName: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIcon() {
      if (this.data.iconColor === 'black') {
        this.setData({
          iconColor: 'rgba(0,0,0,0.5)'
        })
      } else {
        this.setData({
          iconColor: 'black'
        })
      }
    },
    showWeather() {
      this.setData({
        showName: false
      })
      this.animate('.extInfo', [{
        rotateX: 270,
        opacity: 0
      }, {
        rotateX: 360,
        opacity: 1
      }], 1000)
    },
  }
})