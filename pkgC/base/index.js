// register.js
const app=getApp();
import {checkModbile} from "../../utils/util"
Page({
  data: {
    isAgreed: false,
    name: '',
    phone: '',
    age: '18',
    address: '',
    cardId: '',
    gender: '0',
    items: [{
        name: 'USA',
        value: '男'
      },
      {
        name: 'CHN',
        value: '女',
        checked: 'true'
      },

    ],
    qualification: '',
    experienceYears: '',
    specialties: '',
    availability: false,
    profileText: '',
    profileImageURL: '',
    pwd: ''
  },

  agreeChanged: function () {
    this.setData({
      isAgreed: !this.data.isAgreed, // 更新变量以存储用户的选择状态
    });
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value,
    });
  },

  inputEmail: function (e) {
    this.setData({
      email: e.detail.value,
    });
  },



  inputAddress: function (e) {
    this.setData({
      address: e.detail.value,
    });
  },

  inputCardId: function (e) {
    this.setData({
      cardId: e.detail.value,
    });
  },
  inputage: function (e) {
    this.setData({
      age: e.detail.value,
    });
  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value,
    });
  },
  radioChange: function (e) {
    var str = null;
    for (var value of this.data.items) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    if (str == '女') {
      this.setData({
        gender: 0
      })
    } else {
      this.setData({
        gender: 1
      })
    }

  },

  isCardId(sId) {
    if (sId.length !== 18) {
      return false;
    }
    // 检查前17位是否都是数字  
    for (let i = 0; i < 17; i++) {
      if (sId[i] < '0' || sId[i] > '9') {
        return false;
      }
    }

    // 检查最后一位是否是数字或者X  
    if (sId[17] < '0' || sId[17] > '9' && sId[17] !== 'X' && sId[17] !== 'x') {
      return false;
    }
    //身份证城市
    var aCity = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    if (!aCity[parseInt(sId.substr(0, 2))]) {
      console.log('你的身份证地区非法')
      return false
    }

    // 出生日期验证
    var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2)))
      .replace(/-/g, "/"),
      d = new Date(sBirthday)
    if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
      console.log('身份证上的出生日期非法')
      return false
    }

    // 身份证号码校验
    var sum = 0,
      weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      codes = "10X98765432"
    for (var i = 0; i < sId.length - 1; i++) {
      sum += sId[i] * weights[i];
    }
    var last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (sId[sId.length - 1] != last) {
      // console.log('你输入的身份证号非法')
      return false
    }
    return true;
  },

  inputQualification: function (e) {
    this.setData({
      qualification: e.detail.value,
    });
  },

  inputExperienceYears: function (e) {
    this.setData({
      experienceYears: e.detail.value,
    });
  },

  inputSpecialties: function (e) {
    this.setData({
      specialties: e.detail.value,
    });
  },

  toggleAvailability: function (e) {
    this.setData({
      availability: e.detail.value,
    });
  },

  inputProfileText: function (e) {
    this.setData({
      profileText: e.detail.value,
    });
  },
  inputPwd: function (e) {
    this.setData({
      pwd: e.detail.value,
    });
  },
  inputProfileImageURL: function (e) {
    this.setData({
      profileImageURL: e.detail.value,
    });
  },
  onLoad(options) {
    // this.setData({
    //   pwd: options.pwd,
    //   phone: options.phone,
    // })
  },
  register: function () {
    let that = this;
    if (!that.data.isAgreed) {
      wx.showModal({
        title: '提示', // 对话框的标题
        content: '使用前，请您仔细阅读 《用户服务协议》及《隐私协议》', // 对话框的内容
        showCancel: true, // 是否显示取消按钮
        cancelText: '取消', // 取消按钮的文字，默认为"取消"
        cancelColor: '#000000', // 取消按钮的文字颜色
        confirmText: '确定', // 确定按钮的文字，默认为"确定"
        confirmColor: '#3CC51F', // 确定按钮的文字颜色
        success(res) {
          if (res.confirm) {
            that.setData({
              isAgreed: true, // 更新变量以存储用户的选择状态
            });
          } else if (res.cancel) {
            that.setData({
              isAgreed: false, // 更新变量以存储用户的选择状态
            });
          }
        }
      })
    } else {
      if ((this.isCardId(this.data.cardId)) &&(checkModbile(this.data.phone)))
      {
        wx.p.request({
          url: 'https://api.xbzx.online:9011/api_companions',
          method: "post",
          data: {
            name: this.data.name,
            pwd: this.data.pwd,
            phone: this.data.phone,
            address: this.data.address,
            age:this.data.age,
            cardId: this.data.cardId,
            gender: this.data.gender,
            qualification: this.data.qualification, //资格证书
            experienceYears: this.data.experienceYears, //陪诊员的工作经验年限。
            specialties: this.data.specialties, //陪诊员的专长领域
            profileText: this.data.profileText, //个人简介
          }
        }).then(e => {
          if (e.data.code == 0) {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
        });
      } else {
        wx.showToast({
          title: '检查身份证号码或者手机号',
        })
      }
    }
  }
});