// miniprogram/pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    weatherInfo: null
  },

  /**
   * 不需要页面实时渲染的数据
   */
  _data: {

  },

  weeklyWeatherBtn() {
    wx.request({
      url: 'https://www.tianqiapi.com/api',
      data: {
        version: 'v1',
        city: this.data.userInfo.city,
        appid: '72545297',
        appsecret: 'aV9KC2lG'
      },
      success(res) {
        console.log(res.data)
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  currentWatherBtn(){
    wx.request({
      url: 'https://www.tianqiapi.com/api',
      data: {
        version: 'v6',
        city: this.data.userInfo.city,
        appid: '72545297',
        appsecret: 'aV9KC2lG'
      },
      success(res) {
        console.log(res.data)
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  cardListTouchEnd(e) {
    console.log(e.target.id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this
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
            app.globalData.userInfo = res.userInfo
            _this.setData({
              userInfo: res.userInfo
            })
            //设置缓存
            wx.setStorage({
              key: 'userInfo',
              data: res.userInfo,
              success() {
                console.log('userInfo缓存更新成功')
              }
            })
            //请求天气
            wx.request({
              url: 'https://www.tianqiapi.com/api',
              data: {
                version: 'v6',
                city: res.userInfo.city,
                appid: '72545297',
                appsecret: 'aV9KC2lG'
              },
              success(res) {
                console.log(res.data)
                _this.setData({
                  weatherInfo: res.data
                })
              },
              fail(res) {
                console.log(res)
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})