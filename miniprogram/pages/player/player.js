let musicList = []
let nowPlayingIndex = -1 // 正在播放歌曲的index值
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying: false,
    isShowLrc: false, // 当前歌词是否显示
    lyric: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    nowPlayingIndex = options.index
    musicList = wx.getStorageSync('musicList')
    this.loadMusicDetail(options.musicId)
  },

  loadMusicDetail(musicId) {
    backgroundAudioManager.stop()
    let music = musicList[nowPlayingIndex]
    wx.showLoading({
      title: 'loading...'
    })
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl: music.al.picUrl,
      isPlaying: false
    })

    // 查询当前musicId的音乐url
    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicUrl'
      }
    }).then(res => {
      let {url} = JSON.parse(res.result).data[0]
      backgroundAudioManager.src = url
      backgroundAudioManager.title = music.name
      backgroundAudioManager.coverImgUrl = music.al.picUrl
      backgroundAudioManager.singer = music.al.name

      this.setData({
        isPlaying: true
      })
      wx.hideLoading()

      // 查询当前musicId的歌词
      wx.cloud.callFunction({
        name: 'music',
        data: {
          musicId,
          $url: 'lyric'
        }
      }).then(res => {
        let lyric = '暂无歌词'
        const {lrc} = JSON.parse(res.result)
        if (lrc) {
          lyric = lrc.lyric
          this.setData({
            lyric
          })
        }
      })
    })
  },
  togglePlaying() {
    this.setData({
      isPlaying: backgroundAudioManager.paused
    })
    backgroundAudioManager.paused ? backgroundAudioManager.play() : backgroundAudioManager.pause()
  },
  prev() {
    nowPlayingIndex--
    if (nowPlayingIndex < 0) {
      nowPlayingIndex = musicList.length - 1
    }
    this.loadMusicDetail(musicList[nowPlayingIndex].id)
  },
  next() {
    nowPlayingIndex++
    if (nowPlayingIndex > musicList.length - 1) {
      nowPlayingIndex = 0
    }
    this.loadMusicDetail(musicList[nowPlayingIndex].id)
  },
  handleShowLrc() {
    this.setData({
      isShowLrc: !this.data.isShowLrc
    })
  },
  // progressbar中timeUpdate触发事件
  timeUpdate(e) {
    this.selectComponent('.lyric').update(e.detail.currentTime)
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