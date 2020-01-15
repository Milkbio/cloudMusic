Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowModal: Boolean
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
    // 获取微信授权时会有弹窗，无论拒绝还是同意都会触发此事件，通过e.detail.userInfo判断同意还是拒绝
    getUserInfo(e) {
      const  {userInfo} = e.detail
      if (userInfo) {
        // 同意
        this.setData({
          isShowModal: false
        })
        this.triggerEvent('authSuccess', userInfo)
      } else {
        // 拒绝
        this.triggerEvent('authFail', userInfo)
      }
    }
  }
})
