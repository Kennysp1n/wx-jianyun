// components/card/card.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    touch_x1: null,
    touch_y1: null,
    touch_x2: null,
    touch_y2: null,
    d_value: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchstart(e) {
      this.data.touch_x1 = e.touches[0].clientX
      this.data.touch_y1 = e.touches[0].clientX
    },

    touchmove(e) {
      this.data.touch_x2 = e.touches[0].clientX
      this.data.touch_y2 = e.touches[0].clientY
      this.data.d_value = this.data.touch_x2 - this.data.touch_x1
      this.animate('.card', [{
        translateX: this.data.d_value
      }], 500)
    },

    touchend() {
      console.log(this.data.index)
      if (this.data.d_value > 100) {
        console.log('向右划，换左卡')
      } else if (this.data.d_value < -100) {
        console.log('向左划，换右卡')
      }
      this.clearAnimation('.card')
    }
  }
})