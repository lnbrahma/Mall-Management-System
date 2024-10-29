// pages/submitadd/submitadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    sortarr:["日用品","化妆品","电子产品"],
    index:0,
    slider:50,
    imagearr: null
  },
  //当获取焦点的时候，默认内容将被删除
  delValue: function (e) {
    console.log(111);
  },
  // 更改商品类别
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 显示商品新旧程度的数值
  changeSlider:function(e){
    this.setData({
      slider:e.detail.value
    })
  },
  // 上传图片
  choseImage: function(e) {
    wx.chooseMedia({
      count: 1, // 可选择的图片数量
      mediaType: ['image'],
      sizeType: ['original'], // 压缩图片
      sourceType: ['album', 'camera'], // 来源：相册或相机
      success:  (res)=> {
        // 将选择的图片上传到服务器
        console.log(res,"//////")
        this.setData({
          imagearr: res.tempFiles[0]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})