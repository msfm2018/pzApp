// pages/home/home.js
import {
  getToken
} from '../../utils/util'
Page({
  data: {
    swiperList: [],
    gridList: [],
    imageUrl: 'https://xbzx.online/swiper/local.png'
  },

  swiperClick() {
    wx.navigateTo({
      url: `/pkgA/pages/index?itemList=${JSON.stringify(this.data.gridList)}`
    })
  },
  getSwiperList() {
    wx.request({
      url: 'https://api.xbzx.online:9011/api_swiper',
      method: 'GET',
      success: (res) => {
        this.setData({
          swiperList: res.data.data
        })
      }
    })
  },

  //功能点击
  categoryClick(e) {
    let v = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pkgA/pages/doc/desc?id=' + v.id + '&title=' + v.title + '&content=' + v.content + '&url=' + v.url + '&price=' + v.price
    });
  },

  getGridList() {
    wx.request({
      url: 'https://api.xbzx.online:9011/api_server_info_get',
      method: 'GET',
      success: (res) => {
        this.setData({
          gridList: res.data.data
        })

      }
    })
  },

  onLoad(options) {
    this.getSwiperList();
    this.getGridList();
  },
  onShow() {
    const tabBar = this.getTabBar();
    if (tabBar) {
      tabBar.setData({
        selected: 0
      });
    }

    getToken();

  },
})