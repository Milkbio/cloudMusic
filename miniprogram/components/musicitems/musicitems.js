const app = getApp()
Component({
  properties: {
    musicList: {
      type: Array
    }
  },
  pageLifetimes: {
    show() {
      this.setData({
        playingId: app.getPlayMusicId()
      })
      // console.log('this.data.playingId', typeof this.data.playingId)
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    playingId: -1
  },
  methods: {
    onSelect(e) {
      const {musicid, index} = e.currentTarget.dataset
      // console.log('musicId', typeof musicid)
      this.setData({
        playingId: musicid
      })
      wx.navigateTo({
        url: `/pages/player/player?musicId=${musicid}&index=${index}`
      })
    }
  }
})