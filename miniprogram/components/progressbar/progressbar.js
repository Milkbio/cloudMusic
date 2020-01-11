let movableAreaWidth = 0, movableViewWidth = 0

const backgroundAudioManager = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '00:00'
    },
    offsetX: 0,
    percent: 0
  },
  lifetimes: {
    ready: function() {
      this.getMovableAreaWidth()
      this.bindBGMEvent()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取可移动区域的宽度
    getMovableAreaWidth() {
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec(res => {
        movableAreaWidth = res[0].width
        movableViewWidth = res[1].width
      })
    },
    // 绑定事件
    bindBGMEvent() {
      backgroundAudioManager.onCanplay(() => {
        if (typeof(backgroundAudioManager.duration) !== 'undefined') {
          this.setTotalTime()
        } else {
          setTimeout(() => {
            this.setTotalTime()
          }, 1000)
        }
      })
      backgroundAudioManager.onEnded(() => {

      })
      backgroundAudioManager.onError(() => {

      })
      backgroundAudioManager.onNext(() => {

      })
      backgroundAudioManager.onPause(() => {

      })
      backgroundAudioManager.onPlay(() => {

      })
      backgroundAudioManager.onPrev(() => {

      })
      backgroundAudioManager.onStop(() => {

      })
      backgroundAudioManager.onTimeUpdate(() => {
        // console.log(backgroundAudioManager.currentTime)
        const currentTime = backgroundAudioManager.currentTime
        const totalTime = backgroundAudioManager.duration
        // 获取播放时间格式化后秒数
        const second = Math.floor(currentTime % 60)
        // 获取showTime.currentTime中的秒数，如果与上面的second相等，代表在同一秒，就不需要setData，
        // 以防过多的setData影响性能
        const time = Number(this.data.showTime.currentTime.substring(3))
        if (time !== second) {
          this.setData({
            ['showTime.currentTime']: this.formatTime(currentTime),
            offsetX: (movableAreaWidth - movableViewWidth) * currentTime / totalTime,
            percent: currentTime / totalTime * 100
          })
        }
      })
    },
    // 进度条change事件
    onChange(e) {
      if (e.detail.source === 'touch') {
        this.data.offsetX = e.detail.x
        this.data.percent = e.detail.x / (movableAreaWidth - movableViewWidth) * 100
      }
    },
    onTouchEnd() {
      this.setData({
        offsetX: this.data.offsetX,
        percent: this.data.percent,
        ['showTime.currentTime']: this.formatTime(backgroundAudioManager.currentTime)
      })
      backgroundAudioManager.seek(this.data.percent * backgroundAudioManager.duration / 100)
    },
    // 进度条停止触屏事件
    // 设置总时间
    setTotalTime() {
      // console.log(backgroundAudioManager.duration)
      this.setData({
        ['showTime.totalTime']: this.formatTime(backgroundAudioManager.duration)
      })
    },
    // 格式化秒时间为00:00
    formatTime(time) {
      const minute = this.to2(Math.floor(time / 60))
      const second = this.to2(Math.floor(time % 60))
      return `${minute}:${second}`
    },
    to2(val) {
      return val < 10 ? `0${val}` : val
    }
  }
})
