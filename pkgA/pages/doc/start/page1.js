const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
//获取年
for (let i = date.getFullYear(); i <= date.getFullYear() + 1; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
import {
  checkModbile
} from '../../../../utils/util'
const app = getApp();

Page({
  data: {
    inputValue: '', // 医院名称
    inputValue2: '', //科室
    textAreaValue: '', // 用于存储多行文本输入的文本
    inputValue3: '', //就诊人
    phone: '', //手机号
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
    gender: '女',
    hospitalList: [
      "北京协和医院",
      "中国医学科学院阜外心血管病医院",
      "北京大学人民医院",
      "中国医学科学院肿瘤医院",
      "北京天坛医院",
      "北京中日友好医院",
      "北京儿童医院",
      "北京积水潭医院",
      "北京电力医院",
      "中国医学科学院北京协和医院",
      "北京航空航天大学医学院附属医院",
      "北京军区总医院",
      "首都医科大学附属北京友谊医院",
      "首都医科大学附属北京同仁医院",
      "中国人民解放军总医院",
      "中国人民解放军第309医院",
      "中国人民解放军第301医院",
      "其它医院"
    ],
    selectedHospital: "请选择就诊医院",
    isOtherHospital: false,
    // otherHospitalName: "",
    serviceid:"",
    // 预计到店
    time: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 9, 16, 10, 17],
    choose_year: '',
  },
  onTextInput: function (e) {
    // 手写医院
    this.setData({
      inputValue: e.detail.value,
    });
  },

  onTextInput2: function (e) {
    // 科室
    this.setData({
      inputValue2: e.detail.value,
    });
  },

  onTextInput3: function (e) {
    // 就诊人
    this.setData({
      inputValue3: e.detail.value,
    });
  },
  onTextInput4: function (e) {
    this.setData({
      phone: e.detail.value,
    });
  },
  onTextAreaInput: function (e) {
    this.setData({
      textAreaValue: e.detail.value,
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
    this.setData({
      gender: str
    });
  },
  hospitalChange: function (e) {
    const index = e.detail.value;
    const selectedHospital = this.data.hospitalList[index];
    this.setData({
      selectedHospital: selectedHospital,
      isOtherHospital: selectedHospital === "其它医院"
    });
    console.log(this.data.selectedHospital);
  },
  generateOrderNumber() {
     const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始，所以要加1
    const day = currentDate.getDate();

    // 生成一个随机数（假设范围是1000到9999）
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    // 组合订单号
    const orderNumber = `${year}${month}${day}${randomNum}` + app.globalData.userid;
    return orderNumber;
  },

  buttonClick: async function (e) {
    if (!this.data.isOtherHospital)
      this.data.inputValue = this.data.selectedHospital;

    if (this.data.inputValue3 && this.data.inputValue && this.data.inputValue2) {
      if (checkModbile(this.data.phone)) {
        const {
          data: rdata
        } = await wx.p.request({
          url: 'https://api.xbzx.online:9011/api_service_order',
          method: "post",
          data: {
            phone: this.data.phone,
            name: this.data.inputValue3,
            hospital: this.data.inputValue, //医院
            department: this.data.inputValue2, //科室
            gender: this.data.gender, //性别
            orderdate: this.data.time,
            other: this.data.textAreaValue,
            userid: app.globalData.userid,
            orderid: this.generateOrderNumber(),
            serviceid:this.data.serviceid
          }
        });
        console.log('返回数据：' + rdata.code);
        if (rdata.code == 0) {
          wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 2000 // 提示框持续显示的时间，单位为毫秒
          });
          console.log('准备跳转到 订单列表');
          // wx.navigateTo({
            wx.switchTab({
            url: '/pages/order/index'
          })
        }
      } else {
        wx.showToast({
          title: '手机号码不正确',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '数据需要补充完整',
        duration: 2000
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   let {id,price}=options;
 
    //设置默认的年份
    this.setData({
      serviceid:id,
      choose_year: this.data.multiArray[0][0]
    })
  },
  //获取时间日期
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    this.setData({
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    })
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
    console.log(data);
  },

})