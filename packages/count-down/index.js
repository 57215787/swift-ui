// swift-ui/src/components/count-down.js
import {
  raf,
  parseTimeData,
  parseFormat,
  isSameSecond
} from "./utils.js";


Component({
  // 在组件定义时的选项中启用多slot支持
  options: {
    multipleSlots: true,
    styleIsolation: 'isolated',
  },
  observers: {
    remain() {
      this.setFormattedTime()
    },
  },
  properties: {
    // 是否开启毫秒级渲染
    millisecond: {
      type: Boolean,
      value: false,
    },
    // 倒计时时长，单位毫秒
    time: {
      type: Number,
      value: 0,
      observer() {
        this.reset()
      }
    },
    // 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
    format: {
      type: String,
      value: 'HH:mm:ss'
    },
    // 是否自动开始倒计时
    autoStart: {
      type: Boolean,
      value: true,
    },

  },
  data: {
    prefixCls: `s-countdown`,
    remain: 0,
    counting: false,
    timeoutID: null,
    formattedTime: ``,
    timeData: null,
  },
  lifetimes: {
    attached() {
      this.reset();
    },
    detached() {

    },
  },
  pageLifetimes: {
    show() {

    },
    hide() {

    },
  },
  ready() {
  },
  methods: {
    setFormattedTime() {
      const timeData = parseTimeData(this.data.remain);
      const formattedTime = parseFormat(this.data.format, timeData);
      this.setData({
        timeData,
        formattedTime
      });
    },
    start() {
      if (this.data.counting) {
        return;
      }
      this.setData({
        counting: true,
        endTime: Date.now() + this.data.remain
      })
      this.tick();
    },

    pause() {
      this.setData({
        counting: false
      })
      clearTimeout(this.data.timeoutID);
    },

    reset() {
      this.pause();
      this.setData({
        remain: this.data.time
      })
      if (this.data.autoStart) {
        this.start();
      }
    },

    tick() {
      if (this.data.millisecond) {
        this.microTick();
      } else {
        this.macroTick();
      }
    },

    microTick() {
      this.setData({
        timeoutID: raf(() => {
          this.setRemain(this.getRemain());

          if (this.remain !== 0) {
            this.microTick();
          }
        })
      })

    },

    macroTick() {
      this.setData({
        timeoutID: raf(() => {
          const remain = this.getRemain();

          if (!isSameSecond(remain, this.data.remain) || remain === 0) {
            this.setRemain(remain);
          }

          if (this.data.remain !== 0) {
            this.macroTick();
          }
        })
      })

    },

    getRemain() {
      return Math.max(this.data.endTime - Date.now(), 0);
    },

    setRemain(remain) {
      this.setData({
        remain
      })
      if (remain === 0) {
        this.pause();
        // 倒计时结束时触发
        this.triggerEvent('finish');
      }
    }
  }
})