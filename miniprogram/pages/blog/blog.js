const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 发布事件
  publish() {
    // 发布时需要判断是否授权获取用户信息
    wx.getSetting({
      success: res => {
        let setting = res.authSetting
        // 如果授权过
        if (setting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.authSuccess({
                detail: res.userInfo
              })
            }
          })
        } else {
          this.setData({
            isShowModal: true
          })
        }
      }
    })
  },
  authSuccess(e) {
    app.globalData.userInfo  = e.detail
    wx.navigateTo({
      url: 'pages/publish/publish'
    })
  },
  authFail() {
    wx.showModal({
      title: '发布需要获取用户信息',
      showCancel: false
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})