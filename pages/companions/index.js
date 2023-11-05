const app = getApp();
Page({
  data: {
    phone: "",
    currentTab: 1,
    disabledBtns: {}, // 用来追踪已被点击的按钮的状态
    dataList: [],
    agentDataList: [],
    finishDataList: [],
  },

  switchToTab1() {
    this.setData({
      currentTab: 1
    });

    this.applyForOrder();
  },
  switchToTab2() {
    this.setData({
      currentTab: 2
    });
    this.setData({
      agentDataList: []
    })
    //申请派单
    wx.p.request({
      url: 'https://api.xbzx.online:9011/api_service_order_application_table_agent',
      method: "post",
      data: {
        phone: this.data.phone
      }
    }).then(res => {
      console.log(res.data.data);

      this.setData({
        agentDataList: res.data.data
      })
    })

  },
  switchToTab3() {
    this.setData({
      currentTab: 3
    });

    //申请派单
    wx.p.request({
      url: 'https://api.xbzx.online:9011/api_service_order_application_table_myfinish',
      method: "post",
      data: {
        phone: this.data.phone
      }
    }).then(res => {
      console.log(res.data.data);

      this.setData({
        finishDataList: res.data.data
      })
    })

  },
  onLoad: async function (options) {
    this.setData({
      phone: options.phone
    })
  },
  finishForOrder: function (e) {
    const orderid = e.currentTarget.dataset.orderid;
    // const phone = e.currentTarget.dataset.phone;
    console.log(this.data.phone);
    //修改订单状态
    wx.p.request({
      url: 'https://api.xbzx.online:9011/api_service_order_application_table_myfinish',
      method: "post",
      data: {
        orderid: orderid,
        phone: this.data.phone
      }
    }).then(res => {
      console.log(res.data.data);
      wx.showToast({
        title: '设置成功',
        icon: "info",
        duration: 2000
      })
      this.switchToTab2();
    })
  },
  applyForOrder: function (e) {
    let that = this;
    const index = e.currentTarget.dataset.index;
    const orderid = e.currentTarget.dataset.orderid;
    const btnKey = `${orderid}-${index}`;

    // 更新 disabledBtns
    this.setData({
      [`disabledBtns.${btnKey}`]: true
    });


    //查询派单
    wx.p.request({
      url: 'https://api.xbzx.online:9011/api_service_order_application_table',
      method: "post",
      data: {
        phone: that.data.phone,
        orderid: orderid,
      }
    }).then(res => {
      console.log(res.data.data);
      wx.showToast({
        title: '申请成功',
        icon: "info",
        duration: 2000
      })
      // this.setData({
      //   dataList: res.data.data
      // })
    })

    // 在这里处理订单申请逻辑，可以弹出申请对话框等
    console.log('申请订单：', selectedOrder.orderNumber);
  },


  onGetData() {

    wx.p.request({
      url: 'https://api.xbzx.online:9011/api_service_order_all',
      method: "post",
      data: {
        userid: 'tmp',
      }
    }).then(res => {
      console.log(res.data.data);
      this.setData({
        dataList: res.data.data
      })
    })
  },
  onShow() {
    this.onGetData();
  },

  onRefresh: function () {
    const that = this;
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: 'Loading...',
    })
    setTimeout(function () {
      that.onGetData();
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onRefresh();
  },




})