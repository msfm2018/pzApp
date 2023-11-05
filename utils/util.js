import Base64 from './base64'
let base64 = new Base64()
const app = getApp();
export function getToken() {
  if (app.globalData.netStatus) {
    if (!app.globalData.token) {
      wx.login({
        success: res => {
          wx.p.request({
            url: 'https://api.xbzx.online:9011/api_wxlogin',
            method: "post",
            data: {
              code: res.code,
            }
          }).then(e => {
            let json = JSON.parse(base64.decode(e.data));
            if (json.code == 2) {
              //已经有账号存在
              wx.setStorageSync("token", json.data[0].openId);
              app.globalData.token = json.data[0].openId;

              app.globalData.userid = json.data[0].userid;
            } else {
              let jsonData = JSON.parse(json.data.data);

              //返回数据格式 {session_key: "Ve/KrjP5EUNReZZ69vVPmw==", openid: "olrr74qOhuSv1AeAtSqNvu3xZhO0"}
              wx.setStorageSync("token", jsonData.openid);
              app.globalData.token = jsonData.openid;
              app.globalData.userid = json.data.maxid;

              wx.p.request({
                url: 'https://api.xbzx.online:9011/api_save_user',
                method: "post",
                data: {
                  openid: jsonData.openid,
                  name: '',
                  avatarurl: '',
                  userid: json.data.maxid
                }
              });

            }
          });
        }
      })
    } else {
      if (!app.globalData.userid) {
        wx.p.request({
          url: 'https://api.xbzx.online:9011/api_user_info',
          method: "post",
          data: {
            openid: app.globalData.token,
          }
        }).then(res => {
          app.globalData.userid = res.data.data[0].userid;
          app.globalData.nickName = res.data.data[0].nickName;
          app.globalData.avatarUrl = res.data.data[0].avatarUrl;
          app.globalData.phone = res.data.data[0].phone;
          app.globalData.detail = res.data.data[0].detail;

        });
      }
    }
  }
};

//JS使用正则表达式校验电话号码
export function checkModbile(mobile) {
  var re = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
  var result = re.test(mobile);
  if (!result) {
    return false; //若手机号码格式不正确则返回false
  }
  return true;
};