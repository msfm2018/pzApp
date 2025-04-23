const app = getApp();
Page({
  data: {
    phone: ''
  },

  rightButtonTapped: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  // 下单页面
  leftButtonTapped: function () {
    wx.switchTab({
      url: '/pages/home/index',
    })
  },
onReady(){
  let that=this;
  wx.request({
    url: 'http://127.0.0.1:9091/api_askphone',
    method: 'GET',
    success: (res) => {
      that.setData({
        phone: res.data.data[0].phone,
      })  
      app.globalData.callphone = res.data.data[0].phone;
 
    }
  })
},
})