import axios from 'axios'
import { showMessage } from './msgStatus';
import { myMessage } from './resetMessage'

   
// 开发环境使用了proxy，如果前面添加import.meta.env.VITE_APP_HOSTURL会导致cookie路径有问题，无法携带cookie。
// 如果发到测试环境，自动获取域名那么会导致我们配置的测试环境地址错误（https://tsyhdev.spic-iset.com）其实测试环境用的开发环境的地址。
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
		return config
	},
	(error: any) => {
		Promise.reject(error)
	}
)

request.interceptors.response.use(
	async (response: any) => {
		if (response.data.code == 500) {
			myMessage({message:response.data.message,type:'error'})
		}
		//下载文件流时
		if(response.config.responseType&&response.config.responseType=='blob'){
			return response;
		}
		return response.data;
	},
	(error: any) => {
		// return Promise.reject(error)
		const { response } = error;
		if (response) {
			// 请求已发出，但是不在2xx的范围
			const msg = showMessage(response.request.status); // 传入响应码，匹配响应码对应信息
			myMessage({message:response.data.message||msg,type:'warning'})
			return Promise.reject(response.data);
		} else {
			// ElMessage.warning('网络连接异常,请稍后再试!');
			myMessage({message:'网络连接异常,请稍后再试!',type:'warning'})
		}
	}
)
export default request
