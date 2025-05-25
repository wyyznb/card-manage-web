import request from '@/utils/request'

// 查询短剧列表
export const dramaApi = ()=> {
  return request({
    url: '/json/online-drama-list.json',
    method: 'get',
});
}