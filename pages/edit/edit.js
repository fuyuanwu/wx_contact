var app = getApp()
var Pinyin = require('../../utils/pinyin.js')

Page({
	doSubmit(e) {
		const contact = this.data.contact
		const { firstName = '', lastName = '' } = contact
		const fullName = `${firstName}${lastName}`

		contact.pinyin = Pinyin.getFullChars(fullName).toUpperCase()
		contact.leaderPinyin = Pinyin.getCamelChars(fullName).toUpperCase()

		app.saveContact(contact)
		wx.navigateBack()
	},
	doAddPhone() {
		let phones = this.data.contact.phones
		phones = phones ? phones : []
		phones.push({
			name: '手机'
		})

		this.setData({
			'contact.phones': phones
		})
	},
	doDeletePhone(e) {
		let index = e.target.dataset.index
		this.data.contact.phones.splice(index, 1)

		this.setData({
			'contact.phones': this.data.contact.phones
		})
	},
	doAddMail() {
		let mails = this.data.contact.mails
		mails = mails ? mails : []
		mails.push({
			name: '公司'
		})

		this.setData({
			'contact.mails': mails
		})
	},
	doDeleteMail(e) {
		let index = e.target.dataset.index
		this.data.contact.mails.splice(index, 1)
		
		this.setData({
			'contact.mails': this.data.contact.mails
		})
	},
	onInput(e) {
		const name = e.target.dataset.name
		const value = e.detail.value

		this.setData({
			[name]: value
		})
	},
	onLoad(options) {
		let contact = app.getContact(options.contact_id)
		this.setData({
			contact: contact ? contact : {}
		})
	}
})