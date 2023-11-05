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
  leftButtonTapped: function () {
    wx.switchTab({
      url: '/pages/home/index',
    })
  },
onReady(){
  let that=this;
  wx.request({
    url: 'https://api.xbzx.online:9011/api_askphone',
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