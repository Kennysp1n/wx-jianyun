// components/card/card.js
Component({
  lifetimes: {
    attached() {

    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    cardName: {
      type: String
    },
    cardInfo: {
      type: Object
    },
    weatherInfo: {
      type: Object
    },
    db_note_data: {
      type: Object
    },
    cardIndex: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {

  }
})