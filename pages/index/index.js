//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    focus: false,
    inputValue: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    channel:
      [
        {
          name:"二手手机",
          imgurl:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/shouji.png"
        },
        {
          name:"二手日用品",
          imgurl:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/riyongpin.png"
        },
        {
          name:"二手图书",
          imgurl:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/tushu.png"
        },
        {
          name:"化妆品",
          imgurl:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/kouhong.png"
        },
        {
          name:"全部分类",
          imgurl:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/sort.png"
        }
      ],
    background:[
      "cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/al.png",
      "cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/close.png",
    ],
    user_rec:[
      {
        img:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/Snipaste_2023-06-05_20-21-58.jpg",
        title:"自用Ipone11 promax"
      },
      {
        img:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/Snipaste_2023-06-05_20-51-59.jpg",
        title:"YSL口红未拆封低价卖"
      },
      {
        img:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/1.jpg",
        title:"2021考研政治全套便宜出"
      },
      {
        img:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/2.jpg",
        title:"绿色格子JK裙"
      },
      {
        img:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/3.jpg",
        title:"大容量化妆品收纳盒"
      },
      {
        img:"cloud://lina-cloud-yizhuan-9dedo6172a41b.6c69-lina-cloud-yizhuan-9dedo6172a41b-1318461895/4.jpg",
        title:"可拆卸锂电池柔光台灯"
      }
    ]

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goDetails:function(e){
    wx.navigateTo({
      url: '../details/index',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
})
