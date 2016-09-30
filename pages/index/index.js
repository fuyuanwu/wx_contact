//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    contacts: []
  },
  //事件处理函数
  goEdit(e) {
    wx.navigateTo({
      url: '../edit/edit'
    })
  },
  onInput(e) {
    const value = e.detail.value
    const contacts = this.data.contacts

    let searchResult = []
    for (let index in contacts) {
      const item = contacts[index]
      const {
        firstName = '', lastName = '', pinyin = '', leaderPinyin = ''
      } = item

      const key = `${firstName}${lastName}${pinyin}${leaderPinyin}`

      if (key.indexOf(value.toUpperCase()) > -1) {
        item.hide = false
      } else {
        item.hide = true
      }
    }

    this.setData({
      contacts
    })
  },
  onTap(e) {
    const {
      contact_id,
      active,
      index
    } = e.currentTarget.dataset

    if (active.toLowerCase() === 'true') {
      this.setData({
        [`contacts[${index}].active`]: false
      })
    } else {
      wx.navigateTo({
        url: '../detail/detail?contact_id=' + contact_id
      })
    }
  },
  doDeleteContact(e) {
    const {
      contact_id,
      index
    } = e.currentTarget.dataset
    app.deleteContact(contact_id)

    let contacts = this.data.contacts
    let splice = contacts.splice(index, 1)
    this.setData({
      contacts
    })
  },
  onShow() {
    let contacts = app.getAllContact()
    this.setData({
      contacts
    })
  },
  onScrolltoupper(e) {
    //console.log('Scrolltoupper', e)
  },
  onScrolltolower(e) {
    //console.log('Scrolltolower', e)
  },
  onScroll(e) {
    //console.log('Scroll', e)
  },
  onTouchmove(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
        [`contacts[${index}].active`]: true
      })
      //console.log('move', e)
  },
  onTouchstart(e) {
    console.log('start', e)
  },
  onTouchend(e) {
    //console.log('end', e)
  },
  onTouchcancel(e) {
    //console.log('cancel', e)
  },
  onLoad(options) {}
})