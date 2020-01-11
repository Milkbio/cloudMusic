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
      this.setData({
        playingId: e.currentTarget.dataset.musicid
      })
    }
  }
})