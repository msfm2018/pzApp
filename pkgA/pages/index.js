Component({

  data: {
    dataList: []
  },

  methods: {
    tapBanner: function (e) {
      const v = e.currentTarget.dataset.item
      wx.navigateTo({
        url: '/pkgA/pages/doc/desc?id=' + v.id + '&title=' + v.title + '&content=' + v.content + '&url=' + v.url + '&price=' + v.price
      });
    },

    onLoad(options) {
      this.setData({
        dataList: JSON.parse(options.itemList)
      })
    },
  }
})