const app = getApp();

Page({
  data: {
    token: "",
    isLogged: false,
    userid: "",
    nick:""
  },
// exit(){
// this.loginOut();

// wx.redirectTo({
//   url: '/pages/main',
// })
// },
  // loginOut() {
  //   wx.setStorageSync('token', '');
  //   app.globalData.userid = "";
  //   this.setData({
  //     isLogged: false,
  //     userid: ""
  //   })
  // },

  onShow() {
    const tabBar = this.getTabBar();
    if (tabBar) {
      tabBar.setData({
        selected: 2
      });
    }
    
    if (app.globalData.token) {
      this.setData({
    
        userid: app.globalData.userid,
        nick:app.globalData.nickName ,       
        isLogged: true
      })
    } else {
      this.setData({
   
        userid: "",
        nick:"",
        isLogged: false
      })
    }
  

  },
  // 指定客服
  customerService() {
    wx.openCustomerServiceChat({
      extInfo: {
        url: wx.getStorageSync('customerServiceChatUrl')
      },
      corpId: wx.getStorageSync('customerServiceChatCorpId'),
      success: res => {},
      fail: err => {
        console.error(err)
      }
    })
  },
  toCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: app.globalData.phone,
      success: function () {
        console.log('成功拨打电话')
      }
    })
  },



})