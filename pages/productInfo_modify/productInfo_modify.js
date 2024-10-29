var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    productId: 0, //商品编号
    productClassObj_Index: "0", //商品类别
    productClasss: [],
    productName: "", //商品名称
    priceRegionObj_Index: "0", //价格区域
    priceRegions: [],
    price: "", //商品价格
    newOldLevelObj_Index: "0", //成色
    newOldLevels: [],
    areaObj_Index: "0", //区域
    areaInfos: [],
    productPhoto: "upload/NoImage.jpg", //商品图片
    productPhotoUrl: "",
    productPhotoList: [],
    connectPerson: "", //联系人
    connectPhone: "", //联系电话
    productDes: "", //商品描述
    userObj_Index: "0", //发布人
    userInfos: [],
    addTime: "", //发布时间
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //选择发布时间事件
  bind_addTime_change: function (e) {
    this.setData({
      addTime: e.detail.value
    })
  },
  //清空发布时间事件
  clear_addTime: function (e) {
    this.setData({
      addTime: "",
    });
  },

  //选择商品图片上传
  select_productPhoto: function (e) {
    var self = this
    wx.chooseImage({
      count: 1,   //可以上传一张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        self.setData({
          productPhotoList: tempFilePaths,
          loadingHide: false, 
        });

        utils.sendUploadImage(config.basePath + "upload/image", tempFilePaths[0], function (res) {
          wx.stopPullDownRefresh()
          setTimeout(function () {
            self.setData({
              productPhoto: res.data,
              loadingHide: true
            })
          }, 200)
        })
      }
    })
  },

  //区域修改事件
  bind_areaObj_change: function (e) {
    this.setData({
      areaObj_Index: e.detail.value
    })
  },

  //成色修改事件
  bind_newOldLevelObj_change: function (e) {
    this.setData({
      newOldLevelObj_Index: e.detail.value
    })
  },

  //价格区域修改事件
  bind_priceRegionObj_change: function (e) {
    this.setData({
      priceRegionObj_Index: e.detail.value
    })
  },

  //商品类别修改事件
  bind_productClassObj_change: function (e) {
    this.setData({
      productClassObj_Index: e.detail.value
    })
  },

  //发布人修改事件
  bind_userObj_change: function (e) {
    this.setData({
      userObj_Index: e.detail.value
    })
  },

  //提交服务器修改商品信息信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/productInfo/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var productInfolist_page = pages[pages.length - 2];
      var productInfos = productInfolist_page.data.productInfos
      for(var i=0;i<productInfos.length;i++) {
        if(productInfos[i].productId == res.data.productId) {
          productInfos[i] = res.data
          break
        }
      }
      productInfolist_page.setData({productInfos:productInfos})
      setTimeout(function () {
        wx.navigateBack({})
      }, 500) 
    })
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
        productClassObj_Index: 1,
        productName: productInfoRes.data.productName,
        priceRegionObj_Index: 1,
        price: productInfoRes.data.price,
        newOldLevelObj_Index: 1,
        areaObj_Index: 1,
        productPhoto: productInfoRes.data.productPhoto,
        productPhotoUrl: productInfoRes.data.productPhotoUrl,
        connectPerson: productInfoRes.data.connectPerson,
        connectPhone: productInfoRes.data.connectPhone,
        productDes: productInfoRes.data.productDes,
        userObj_Index: 1,
        addTime: productInfoRes.data.addTime,
      })

      var areaInfoUrl = config.basePath + "api/areaInfo/listAll" 
      utils.sendRequest(areaInfoUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          areaInfos: res.data,
        })
        for (var i = 0; i < self.data.areaInfos.length; i++) {
          if (productInfoRes.data.areaObj.areaId == self.data.areaInfos[i].areaId) {
            self.setData({
              areaObj_Index: i,
            });
            break;
          }
        }
      })
      var newOldLevelUrl = config.basePath + "api/newOldLevel/listAll" 
      utils.sendRequest(newOldLevelUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          newOldLevels: res.data,
        })
        for (var i = 0; i < self.data.newOldLevels.length; i++) {
          if (productInfoRes.data.newOldLevelObj.levelId == self.data.newOldLevels[i].levelId) {
            self.setData({
              newOldLevelObj_Index: i,
            });
            break;
          }
        }
      })
      var priceRegionUrl = config.basePath + "api/priceRegion/listAll" 
      utils.sendRequest(priceRegionUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          priceRegions: res.data,
        })
        for (var i = 0; i < self.data.priceRegions.length; i++) {
          if (productInfoRes.data.priceRegionObj.regionId == self.data.priceRegions[i].regionId) {
            self.setData({
              priceRegionObj_Index: i,
            });
            break;
          }
        }
      })
      var productClassUrl = config.basePath + "api/productClass/listAll" 
      utils.sendRequest(productClassUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          productClasss: res.data,
        })
        for (var i = 0; i < self.data.productClasss.length; i++) {
          if (productInfoRes.data.productClassObj.productClassId == self.data.productClasss[i].productClassId) {
            self.setData({
              productClassObj_Index: i,
            });
            break;
          }
        }
      })
      var userInfoUrl = config.basePath + "api/userInfo/listAll" 
      utils.sendRequest(userInfoUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          userInfos: res.data,
        })
        for (var i = 0; i < self.data.userInfos.length; i++) {
          if (productInfoRes.data.userObj.user_name == self.data.userInfos[i].user_name) {
            self.setData({
              userObj_Index: i,
            });
            break;
          }
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

})

