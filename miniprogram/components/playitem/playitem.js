Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playItem: {
      type: Object
    }
  },
  observers: {
    ['playItem.playCount'](val) {
      this.setData({
        count: this.formatCount(val)
      })
      this.formatCount(val)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoMusicList() {
      const {id} = this.properties.playItem
      wx.navigateTo({
        url: `/pages/musiclist/musiclist?playlistId=${id}`
      })
    },
    formatCount(count) {
      const unitArr = ['', '万', '亿']
      let index = 0
      let floatCount = parseFloat(count)
      index = Math.floor(Math.log(floatCount) / Math.log(10000))

      let result = floatCount / Math.pow(10000, index)
      result = result.toFixed(2)
      return result + unitArr[index]
    }
  }
})
