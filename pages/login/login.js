// pages/login/login.js
const app=getApp();
import {
  checkModbile
} from '../../utils/util'
Page({
  data: {
    disabled: false,
    btnstate: 'default',
    phone: '',
    pwd: '',
    loginType: 'companion', // 设置默认登录类型为陪诊员
    inputVisibility: "visible"
  },
  login: function name(params) {
    let that=this;
    if (checkModbile(this.data.phone.trim()) && (this.data.pwd.trim().length > 0)) {

      wx.p.request({
        url: 'https://api.xbzx.online:9011/api_companions_login',
        method: "post",
        data: {
          phone: this.data.phone,
          pwd: this.data.pwd,
        }
      }).then(res => {
        console.log(res.data.data[0]);
        if (res.data.code == -1) {
          wx.showToast({
            title: '密码错误！！！',
            icon: 'warn',
            duration: 2000
          })
        } else {
          if (res.data.data[0].availability == 0) {
            wx.showToast({
              title: '请耐心等待平台审核',
              icon: 'info',
              duration: 2000
            })
          } else if (res.data.data[0].availability == 1) {
            wx.navigateTo({
              url: '/pages/companions/index?phone='+that.data.phone,
            })
          } else if (res.data.data[0].availability == -1) {
            wx.showToast({
              title: '平台审核未通过',
              icon: 'info',
              duration: 2000
            })
          }
        }

      })
    } else {
      wx.showToast({
        title: '请检查手机号',
        icon: 'info',
        duration: 2000
      })
    }
  },
  accountInput: function (event) {
    var content = event.detail.value.trim();
    if (content !== '') {
      this.setData({
        disabled: false,
        btnstate: 'primary',
        phone: content
      });
    } else {
      this.setData({
        disabled: true,
        btnstate: 'default'
      });
    }
  },

  pwdBlur: function (e) {
    var password = e.detail.value;
    if (password != '') {
      this.setData({
        pwd: password
      });
    }
  },
})