//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'zhbwx-xtxjt',
        traceUser: true,
      })
    }

    this.globalData = {
      openid: null,
      userInfo: null
    }

    const _this = this

    //调用云函数login,获取openid
    wx.cloud.callFunction({
      name: 'login',
      success(res) {
        _this.globalData.openid = res.result.openid
      }
    })

    //查看是否有相应缓存数据
    let temp = wx.getStorageSync('userInfo')
    console.log(temp)
    if (temp) {
      this.globalData.userInfo = temp
    }
  }
})