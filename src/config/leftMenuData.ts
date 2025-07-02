import { MessageBox, ElementPlus, List, Operation, DocumentCopy, Box } from '@element-plus/icons-vue'
const leftMenuData: any = [
  {
    id: '1',
    label: '系统首页',
    path: '/home',
    icon: MessageBox,
  },
  {
    id: '2',
    label: '商品管理',
    icon: ElementPlus,
    children: [
      {
        id: '3',
        label: '商品列表',
        path: '/productList',
        icon: List,
      },
      {
        id: '4',
        label: '所属平台',
        path: '/belongPlat',
        icon: Operation,
      }
    ]
  },
  {
    id: '5',
    label: '订单列表页',
    path: '/orderList',
    icon: DocumentCopy,
  },
  {
    id: '6',
    label: '号易商品',
    path: '/numberProduct',
    icon: Box,
  },
]

export default leftMenuData
