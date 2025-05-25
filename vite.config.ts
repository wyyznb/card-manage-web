import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import {
	createStyleImportPlugin,
	ElementPlusResolve
} from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { loadEnv } from 'vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//import Unocss from './config/unocss'

const pathSrc = path.resolve(__dirname, 'src')
const timeStamp = new Date().getTime() //随机时间戳

// https://vitejs.dev/config/
export default ({ mode }: any) => {
	return  defineConfig({
	base: loadEnv(mode, process.cwd()).VITE_APP_BASE_PATH,
	resolve: {
		//设置别名
		alias: {
			'@': pathSrc
		}
	},
	plugins: [
		vue(),
		//Unocss(),
		createStyleImportPlugin({
			resolves: [ElementPlusResolve()],
			libs: [
				// 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
				{
					libraryName: 'element-plus',
					esModule: true,
					resolveStyle: (name) => {
						return `element-plus/lib/theme-chalk/${name}.css`
					},
					ensureStyleFile: true // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
				}
			]
		}),
		AutoImport({
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
				/\.md$/ // .md
			],
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: [
				'vue',
				'vue-router',
				{
					'@vueuse/core': [
						// named imports
						'useMouse', // import { useMouse } from '@vueuse/core',
						// alias
						['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
					],

					axios: [['default', 'axios']],
					'await-to-js': ['to']
				}
			],
			eslintrc: {
				enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
				filepath: './.eslintrc-auto-import.json' // 指定自动导入函数 eslint 规则的文件
			},
			// resolvers: [ElementPlusResolver()], // 自动导入elementPlus相关方法 ELMessage ...
			dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts') // 指定自动导入函数TS类型声明文件路径
		}),
		Components({
			// resolvers: [ElementPlusResolver()], // 自动导入elementPlus相关组件，css样式、element组件，存在问题，会覆盖iset的样式。
			dts: path.resolve(pathSrc, 'types', 'components.d.ts') // 指定自动导入组件TS类型声明文件路径
		})
	],
	server: {
		port: 8080, //启动端口
		hmr: {
			host: '127.0.0.1',
			port: 443
		},
		// 设置 https 代理
		proxy: {
			'/api': {
				target: 'https://tsyhtest.spic-iset.com/permission',//测试环境
				// target: 'https://tsyh.spic.com.cn',//生产环境
				// target: 'http://10.205.54.52:9090/',
				// target: 'http://10.205.54.222:9090', //马世超
				// target: 'http://10.205.51.205:9090', //赵双平
				changeOrigin: true,
				rewrite: (path: string) => path.replace(new RegExp(`^/api`), '') 
			}
		}
	},
	build: {
		sourcemap: false, // 输出.map文件,默认是false
		rollupOptions: {
			output: {
				chunkFileNames: `static/js/[name].[hash]${timeStamp}.js`,
				entryFileNames: `static/js/[name].[hash]${timeStamp}.js`,
				assetFileNames: `static/[ext]/[name].[hash]${timeStamp}.[ext]`
			}
		}
	}
	})
}
