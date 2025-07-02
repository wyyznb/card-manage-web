import axios from 'axios'
import { showMessage } from './msgStatus'
import { myMessage } from './resetMessage'
import router from '@/router'

// 开发环境使用了proxy，如果前面添加import.meta.env.VITE_APP_HOSTURL会导致cookie路径有问题，无法携带cookie。
const baseUrl = import.meta.env.VITE_APP_BASE_API
const request = axios.create({
	baseURL: baseUrl,
	timeout: 60000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
})

request.interceptors.request.use(
	(config: any) => {
		const token = localStorage.getItem('token')
		config.headers['api-token'] = token || ''
		return config
	},
	(error: any) => {
		Promise.reject(error)
	}
)

request.interceptors.response.use(
	async (response: any) => {
		if (response.data.code == 401) {
			//myMessage({message:response.data.msg || '登录过期', type:'error'})
			localStorage.removeItem('token')
			router.push({
				path: '/login'
			})
			return
		}
		if (response.data.code == 1) {
			myMessage({message:response.data.msg, type:'error'})
		}
		//下载文件流时
		if(response.config.responseType&&response.config.responseType=='blob'){
			return response
		}
		return response.data
	},
	(error: any) => {
		// return Promise.reject(error)
		const { response } = error
		if (response) {
			// 请求已发出，但是不在2xx的范围
			const msg = showMessage(response.request.status) // 传入响应码，匹配响应码对应信息
			myMessage({message:response.data.message || msg, type:'warning'})
			return Promise.reject(response.data)
		} else {
			// ElMessage.warning('网络连接异常,请稍后再试!');
			myMessage({message:'网络连接异常,请稍后再试!',type:'warning'})
		}
	}
)
export default request
