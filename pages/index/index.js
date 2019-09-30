//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    autoStart: false,
    timeData: null
  },
  start() {
    this.selectComponent('#s-count-down').start();
  },
  allStart() {
    this.selectAllComponents('#s-count-down').forEach((item) => {
      item.start();
    })
  },
  pause() {
    this.selectComponent('#s-count-down').pause();
  },
  reset() {
    this.selectComponent('#s-count-down').reset();
  },
  finish() {
    console.log('finish')
  },
  onTimeDataChange(event) {
    console.log(event)
  }
})
