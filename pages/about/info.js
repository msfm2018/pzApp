// page/component/new-pages/user/address/address.js
import {
  checkModbile
} from '../../utils/util'
const app = getApp();
Page({
  data: {
    nick: '',
    phone: '',
    detail: ''
  },

  onShow() {
    this.setData({
      nick: app.globalData.nickName,
      phone: app.globalData.phone,
      detail: app.globalData.detail,
    })
  },

  formSubmit(e) {
    const value = e.detail.value;
    if (value.nick && value.phone && value.detail) {
      if (checkModbile(value.phone)) {
        wx.p.request({
          url: 'https://api.xbzx.online:9011/api_user_info_update',
          method: "post",
          data: {
            userid: app.globalData.userid,
            nick: value.nick,
            phone: value.phone,
            detail: value.detail,
          }
        }).then(e => {
          console.log('更新成功');
          console.log(e);
          wx.showToast({
            title: '更新成功',
          })
          app.globalData.nickName = value.nick;
          app.globalData.phone = value.phone;
          app.globalData.detail = value.detail;
          wx.navigateBack();
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '检查手机号',
          showCancel: false
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  }
})