const app = getApp();
Page({
  data: {
    dataList: [],
  },

  showDeleteConfirmation(e) {
    const that = this;
    wx.showModal({
      title: '确认删除',
      content: '您确定要删除吗？', // 提示信息
      showCancel: true, // 是否显示取消按钮
      cancelText: '取消', // 取消按钮的文本
      confirmText: '确认', // 确认按钮的文本
      success: function (res) {
        if (res.confirm) {
          // 用户点击了确认按钮
          // 执行删除操作
          const index = e.currentTarget.dataset.index;
          const orderid = e.currentTarget.dataset.orderid;
          const itemList = that.data.dataList;
          itemList.splice(index, 1);

          that.setData({
            dataList: itemList
          });

          wx.p.request({
            url: 'http://127.0.0.1:9091/api_service_order_del',
            method: "post",
            data: {
              orderid: orderid,
            }
          }).then(res => {
            console.log(res.data);

          })
        } else if (res.cancel) {
          // 用户点击了取消按钮
          // 不执行删除操作
        }
      }
    });

  },
  onTextAreaInput: function (e) {
    this.setData({
      textAreaValue: e.detail.value,
    });
  },
  onGetData() {

    wx.p.request({
      url: 'http://127.0.0.1:9091/api_service_order_get',
      method: "post",
      data: {
        userid: app.globalData.userid,
      }
    }).then(res => {
      console.log(" api_service_order_get返回数据 " + res.data.data);
      this.setData({
        dataList: res.data.data
      })
      console.log(this.data.dataList);
      console.log('---------------->');
    })
  },
  onShow() {
    const tabBar = this.getTabBar();
    if (tabBar) {
      tabBar.setData({
        selected: 1
      });
    }
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
});