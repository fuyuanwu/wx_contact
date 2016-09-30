var app = getApp()

Page({
  onShow(options) {
    let contact = app.getContact(this.data.contact_id)
    this.setData({
      contact
    })
  },
  goEdit(e) {
    var dataset = e.target.dataset
    wx.navigateTo({
      url: '../edit/edit?contact_id=' + dataset.contact_id
    })
  },
  onLoad(options) {
    this.setData({
      contact_id: options.contact_id
    })
  }
})