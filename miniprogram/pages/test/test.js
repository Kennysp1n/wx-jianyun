// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // const ctx = wx.createCanvasContext('test-canvas')
    // ctx.setStrokeStyle("#00ff00")
    // ctx.setLineWidth(5)
    // ctx.rect(0, 0, 200, 200)
    // ctx.stroke()
    // ctx.setStrokeStyle("#ff0000")
    // ctx.setLineWidth(2)
    // ctx.moveTo(160, 100)
    // ctx.arc(100, 100, 60, 0, 2 * Math.PI, true)
    // ctx.moveTo(140, 100)
    // ctx.arc(100, 100, 40, 0, Math.PI, false)
    // ctx.moveTo(85, 80)
    // ctx.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // ctx.moveTo(125, 80)
    // ctx.arc(120, 80, 5, 0, 2 * Math.PI, true)
    // ctx.stroke()
    // ctx.draw()

    wx.canvasGetImageData({
      canvasId: 'test-canvas',
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      success(res){
        // wx.canvasPutImageData({
        //   canvasId: 'test-canvas',
        //   data: res.data,
        //   x: 200,
        //   y: 200,
        //   width: 200,
        //   height: 200,
        // })
        console.log(res)
      }
    })
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