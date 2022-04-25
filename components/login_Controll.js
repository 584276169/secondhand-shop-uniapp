import Vuex from 'vuex'
export default function initModal(v) {
  // 挂在store到全局Vue原型上
  v.prototype.$modalStore = new Vuex.Store({
    state: {
		show_updateValue:false,
		show_agreement:false,
		show:false,
		title:"标题",
		content:'内容',
		showCancel:true,
		cancelText:"取消",
		confirmText:"确定",
		success:null,
    },
    mutations: {
		hideModal(state) {
			state.show = false
		},
		showModal(state,data) {
			state = Object.assign(state,data)
			state.show = true
		},
		success(state,res) {
			let cb = state.success
			let resObj={
				cancel:false,
				confirm:false
			}
			res=="confirm"?resObj.confirm=true:resObj.cancel=true
			cb && cb(resObj)
		},
		showAgreement(state){
			state.show_agreement= true
		},
		hideAgreement(state){
			state.show_agreement= false
		},
		show_show_updateValue(state,data){
			state = Object.assign(state,data)
			state.show_updateValue=true
		},
		hide_show_updateValue(state){
			state.show_updateValue=false
		},
		success_updateValue(state,data){
			let cb = state.success
			let resObj={
				cancel:false,
				confirm:false,
				value:'',
			}
			data.res=="confirm"?resObj.confirm=true:resObj.cancel=true
			resObj.value=data.updateValue
			cb && cb(resObj)
		}
		
    }
  })
  v.prototype.$showModal = function (option) { 
	if (typeof option === 'object') {
		
		v.prototype.$modalStore.commit('showModal', option)
	}else{
		throw "配置项必须为对象传入的值为："+typeof option;
	}
  },
  v.prototype.$showAgreement = function (option) {
  	v.prototype.$modalStore.commit('showAgreement')
  },
  v.prototype.$showUpdate = function (option) {
  	if (typeof option === 'object') {
  		
  		v.prototype.$modalStore.commit('show_show_updateValue', option)
  	}else{
  		throw "配置项必须为对象传入的值为："+typeof option;
  	}
  }
}