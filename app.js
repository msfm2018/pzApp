import {
  promisifyAll
} from 'miniprogram-api-promise'

const wxp = wx.p = {}
promisifyAll(wx, wxp)


App({
  onLaunch() {
    let that = this;
    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.netStatus = false;
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        } else {
          that.globalData.netStatus = true;
        }
      }
    });

    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        that.globalData.netStatus = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000
        })
      } else {
        that.globalData.netStatus = true
        wx.hideToast()
        wx.showToast({
          title: '网络已连接',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },
  changeGlobalData(data) {
    this.globalData = Object.assign({}, this.globalData, data);
    listeners.forEach((listener) => {
      listener(this.globalData);
    });
  },
  watchGlobalDataChanged(listener) {
    if (listeners.indexOf(listener) < 0) {
      listeners.push(listener);
    }
  },
  unWatchGlobalDataChanged(listener) {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  },
  onThemeChange(resp) {
    this.changeGlobalData({
      theme: resp.theme,
    });
  },
  globalData: {
    token: '',
    nickName: '',
    avatarUrl: '',
    netStatus: true,
    theme: 'light', // dark
    mode: '', // 模式(care：关怀模式)
  }
})