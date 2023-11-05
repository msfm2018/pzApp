
Page({

  /**
   * 页面的初始数据
   */
  data: {
     id: 0,
    title: '',
    content: '',
    url: '',
    price: ''
  },

  onClick(e) {
    wx.navigateTo({
      url: '/pkgA/pages/doc/start/page1?id=' + this.data.id + '&price=' + this.data.price
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      title: options.title,
      content: options.content,
      url: options.url,
      id: options.id,
      price: options.price,
    })
    console.log(this.data.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})