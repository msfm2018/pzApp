import {
  checkModbile
} from '../../../../utils/util'
const app = getApp();

Page({
  data: {
    date: '',//2024-04-25
    time: '',//12:01
    value3: 0,

    depart: '', //科室
    textAreaValue: '', // 用于存储多行文本输入的文本
    nickName: '', //就诊人
    phone: '', //手机号
    departList:["内科","外科","牙科"],
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
    selectedHospital: "",
    serviceid:"",

  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value,
    });
  },
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value,
    });
  },
  onSetNickName: function (e) {
    // 就诊人
    this.setData({
      nickName: e.detail.value,
    });
  },
  onSetPhone: function (e) {
    this.setData({
      phone: e.detail.value,
    });
  },
  onTextAreaInput: function (e) {
    this.setData({
      textAreaValue: e.detail.value,
    });
  }, 
  departChange:function(e){
    const index = e.detail.value;
    const v = this.data.departList[index];
    this.setData({
      depart: v
    });
  },
  hospitalChange: function (e) {
    const index = e.detail.value;
    const v = this.data.hospitalList[index];
    this.setData({
      selectedHospital: v
    });
  },
  get_Date(){
    const yy = new Date().getFullYear();
    const MM = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
    const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
    return yy+'-'+MM+'-'+dd;
  },
  get_Time(){
    const HH = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
      const mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      return HH+':'+mm; 
  },
  generateOrderNumber() {
     const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始，所以要加1
    const day = currentDate.getDate();
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    // 组合订单号
    const orderNumber = `${year}${month}${day}${randomNum}` + app.globalData.userid;
    return orderNumber;
  },

  buttonClick: async function (e) {
    if (this.data.nickName && this.data.selectedHospital && this.data.depart) {
      if (checkModbile(this.data.phone)) {
        const {
          data: rdata
        } = await wx.p.request({
          url: 'https://api.xbzx.online:9011/api_service_order',
          method: "post",
          data: {
            phone: this.data.phone,
            name: this.data.nickName,
            hospital: this.data.selectedHospital, //医院
            department: this.data.depart, //科室
            gender: '未定义', //性别
            orderdate: this.data.date+' '+ this.data.time,
            other: this.data.textAreaValue,
            userid: app.globalData.userid,
            orderid: this.generateOrderNumber(),
            serviceid:this.data.serviceid
          }
        });
        // console.log('返回数据：' + rdata.code);
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
    console.log(id+'--价格--'+price+'  '+this.get_Date()+' '+this.get_Time());
    this.setData({
      serviceid:id,
      date: this.get_Date(),
      time:  this.get_Time()
    })
  },



})