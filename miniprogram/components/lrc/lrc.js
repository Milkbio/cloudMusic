Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowLrc: {
      type: Boolean,
      value: false
    },
    lyric: String
  },
  observers: {
    lyric(lrc) {
      this.parseLyric(lrc)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    lyricList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    parseLyric(slrc) {
      if (slrc) {
        const lines = slrc.split('\n')
        const lyricList = []
        lines.forEach(l => {
          // 此时匹配到的time是格式为['[00:00.000]']这样的字符串数组还有null
          let time = l.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
          if (time) {
            // 此时得到的lrc是['', '我是一个粉刷匠']这样的数组的第二项
            let lrc = l.split(time)[1]
            // 此时得到的timeArr类似["02:14.798", "02", "14", "798", index: 1, input: "[02:14.798]", groups: undefined]
            let timeArr = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
            // 然后去转换成秒
            let time2Seconds = parseInt(timeArr[1]) * 60 + parseInt(timeArr[2]) + parseInt(timeArr[3]) / 1000

            lyricList.push({
              time: time2Seconds.toFixed(3),
              lrc
            })
          }
        })
        this.setData({
          lyricList
        })
      }
    }
  }
})
