//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getAllContact(contact_id) {
    let contacts = wx.getStorageSync('contacts')

    var arr = [];
    for(var item in contacts){
        arr.push(contacts[item]);
    }
    return arr
  },
  getContact(contact_id) {
    let contacts = wx.getStorageSync('contacts')
    return contacts[contact_id]
  },
  saveContact(contact) {
    let key = contact.contact_id = contact.contact_id ? contact.contact_id : Math.random().toString(36).substr(2, 10)
    let contacts = wx.getStorageSync('contacts')
    contacts = contacts ? contacts : {}
    contacts[key] = contact
    wx.setStorageSync('contacts', contacts)
  },
  deleteContact(contact_id) {
    let contacts = wx.getStorageSync('contacts')
    delete contacts[contact_id]
    wx.setStorageSync('contacts', contacts)
  },
  globalData: {
    userInfo: null
  }
})