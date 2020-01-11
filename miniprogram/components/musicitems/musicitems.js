Component({
  properties: {
    musicList: {
      type: Array
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
      this.setData({
        playingId: musicid
      })
      wx.navigateTo({
        url: `/pages/player/player?musicId=${musicid}&index=${index}`
      })
    }
  }
})