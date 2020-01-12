let lyricHeight = 0
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
      if (lrc = '暂无歌词') {
        this.setData({
          lyricList: [
            {time: 0, lrc}
          ],
          highlightIndex: -1
        })
      } else {
        this.parseLyric(lrc)
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    lyricList: [],
    highlightIndex: -1, // 当前选中的歌词索引
    scrollTop: 0
  },
  lifetimes: {
    ready() {
      wx.getSystemInfo({
        success(res) {
           // 求出1rpx的大小，再乘以64（指的是css里lyric的line-height）得出一行歌词的高度
          lyricHeight = res.screenWidth / 750 * 64
        }
      })
    }
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
        // console.log(lyricList)
      }
    },
    // 与player中timeUpdate事件呼应
    update(currentTime) {
      const {lyricList} = this.data
      if (lyricList.length > 0) {
        // console.log(currentTime)
        let len = lyricList.length
        // 解决如果当前播放时间大于歌曲的最后一句歌词的时间不滚动的问题
        if (currentTime > lyricList[len - 1].time) {
          if (this.data.highlightIndex != -1) {
            this.setData({
              highlightIndex: -1,
              scrollTop: len * lyricHeight
            })
          }
        }
        for (let i = 0; i < len; i++) {
          if (currentTime <= lyricList[i].time) {
            console.log('%c歌词中的时间', 'background: green;', lyricList[i].time, i)
            this.setData({
              highlightIndex: i - 1,
              scrollTop: (i - 1) * lyricHeight
            })
            break;
          }
        }
      }
    }
  }
})
