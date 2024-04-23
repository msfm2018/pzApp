Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      "pagePath": "/pages/home/index",
      "text": "首页",
      "iconPath": "/images/tabs/home.png",
      "selectedIconPath": "/images/tabs/home_active.png"
    },{
      "pagePath": "/pages/order/index",
      "text": "订单",
      "iconPath": "/images/tabs/order.png",
      "selectedIconPath": "/images/tabs/order_active.png"
    }, {
      "pagePath": "/pages/about/index",
      "text": "我的",
      "iconPath": "/images/tabs/user.png",
      "selectedIconPath": "/images/tabs/user_active.png"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})