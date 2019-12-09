// miniprogram/pages/index/index.js
const db_note = wx.cloud.database().collection('note')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    weatherInfo: null,
    openid: null,
    db_note_data: null,
    headIconColor: 'black',
    currentCardIndex: 0,
    preCardIndex: -1,
    nxtCardIndex: 1,
    showCardList: false,
    cardInfo: [{
      name: '便签卡片',
      hasDetail: true,
      type: 'note'
    }, {
      name: '天气卡片',
      hasDetail: true,
      type: 'tem'

    }, {
      name: '工具卡片',
      hasDetail: true,
      type: 'tool'
    }, ]
  },

  /**
   * 不需要页面实时渲染的数据
   */
  _data: {
    touch_x1: null,
    touch_y1: null,
    touch_x2: null,
    touch_y2: null,
    d_value_x: null,
    d_value_y: null
  },

  touchstart(e) {
    this._data.touch_x1 = e.touches[0].clientX
    this._data.touch_x2 = e.touches[0].clientX
    this._data.touch_y1 = e.touches[0].clientY
  },

  touchmove(e) {
    this._data.touch_x2 = e.touches[0].clientX
    this._data.touch_y2 = e.touches[0].clientY
    this._data.d_value_x = this._data.touch_x2 - this._data.touch_x1
    this.animate('.card-list', [{
      translateX: this._data.d_value_x
    }], 500)

  },

  touchend() {
    let temp = this.data.currentCardIndex
    if (this._data.d_value_x > 100) {
      if (temp === 0) {
        this.setData({
          currentCardIndex: -1,
          nxtCardIndex: 0,
          preCardIndex: 1
        })
      } else if (temp === 1) {
        this.setData({
          currentCardIndex: 0,
          nxtCardIndex: 1,
          preCardIndex: -1
        })
      } else {
        this.setData({
          currentCardIndex: 1,
          nxtCardIndex: -1,
          preCardIndex: 0
        })
      }
    } else if (this._data.d_value_x < -100) {
      if (temp === 0) {
        this.setData({
          currentCardIndex: 1,
          nxtCardIndex: -1,
          preCardIndex: 0
        })
      } else if (temp === 1) {
        this.setData({
          currentCardIndex: -1,
          nxtCardIndex: 0,
          preCardIndex: 1
        })
      } else {
        this.setData({
          currentCardIndex: 0,
          nxtCardIndex: 1,
          preCardIndex: -1
        })
      }
    }
    this.clearAnimation('.card-list')
    this.setData({
      showCardList: false,
      headIconColor: 'black'
    })
    this._data.d_value_x = null
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

  currentWatherBtn() {
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

  menu() {
    if (this.data.headIconColor === 'black') {
      this.setData({
        headIconColor: 'rgba(0,0,0,0.5)'
      })
    } else {
      this.setData({
        headIconColor: 'black'
      })
    }
    this.setData({
      showCardList: !this.data.showCardList
    })
  },

  goTo() {
    const _this = this
    let index = this.data.currentCardIndex
    wx.navigateTo({
      url: `../test/test?card=${index}`
    })
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

    //调用云函数login,获取openid
    wx.cloud.callFunction({
      name: 'login',
      success(res) {
        _this.data.openid = res.result.openid
      }
    })

    db_note.get().then((res) => {
      _this.setData({
        db_note_data: res.data
      })
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
        _this.setData({
          weatherInfo: res.data
        })
        console.log(_this.data.weatherInfo)
      },
      fail(res) {
        console.log(res)
      }
    })
    console.log('下拉刷新成功')
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