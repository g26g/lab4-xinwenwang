// pages/my/my.js
var common = require('../../utils/common.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    getMyInfo: function()
    {
              var that = this;
              wx.getUserProfile({
                desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                  console.log("获取用户信息成功", res);
                  that.setData({
                    isLogin:true,
                    src: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName
                  }) 
        //获取新闻列表
                  this.getMyFavorites()
                 },
                fail: res => {
                  console.log("获取用户信息失败", res)
                }
              })
    },
    getMyFavorites:function(){
        let info = wx.getStorageInfoSync();
        let keys = info.keys;
        let num = keys.length;
        let myList = [];
        for(var i=0;i<num;i++)
        {
            let obj = wx.getStorageSync(keys[i]);
            myList.push(obj);
        }
        this.setData({
            newsList:myList,
            num:num-1
        });
    },
    goToDetail:function(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url:'../detail/detail?id='+id
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if(this.data.isLogin){
            this.getMyFavorites()
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})