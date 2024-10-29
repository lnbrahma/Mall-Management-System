var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    productId: 0, //商品编号
    productClassObj: "", //商品类别
    productName: "", //商品名称
    priceRegionObj: "", //价格区域
    price: "", //商品价格
    newOldLevelObj: "", //成色
    areaObj: "", //区域
    productPhotoUrl: "", //商品图片
    connectPerson: "", //联系人
    connectPhone: "", //联系电话
    productDes: "", //商品描述
    userObj: "", //发布人
    addTime: "", //发布时间
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var productId = params.productId
    var url = config.basePath + "api/productInfo/get/" + productId
    utils.sendRequest(url, {}, function (productInfoRes) {
      wx.stopPullDownRefresh()
      self.setData({
        productId: productInfoRes.data.productId,
        productClassObj: productInfoRes.data.productClassObj.productClassName,
        productName: productInfoRes.data.productName,
        priceRegionObj: productInfoRes.data.priceRegionObj.regionName,
        price: productInfoRes.data.price,
        newOldLevelObj: productInfoRes.data.newOldLevelObj.levelName,
        areaObj: productInfoRes.data.areaObj.areaName,
        productPhoto: productInfoRes.data.productPhoto,
        productPhotoUrl: productInfoRes.data.productPhotoUrl,
        connectPerson: productInfoRes.data.connectPerson,
        connectPhone: productInfoRes.data.connectPhone,
        productDes: productInfoRes.data.productDes,
        userObj: productInfoRes.data.userObj.realname,
        addTime: productInfoRes.data.addTime,
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  }

})

