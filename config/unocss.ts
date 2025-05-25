import { presetUno, presetAttributify, presetIcons } from 'unocss'
import Unocss from 'unocss/vite'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default () =>
	Unocss({
		presets: [presetUno(), presetAttributify(), presetIcons()],
		transformers: [transformerAttributifyJsx()],
		rules: [
			[
				'w-f',
				{
					width: '100%'
				}
			],
			[
				'h-f',
				{
					height: '100%'
				}
			],
			[
				'wh-100',
				{
					width: '100%',
					height: '100%'
				}
			],
			[
				'absolute-center',
				{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%)`
				}
			],
			[
				'x-center',
				{
					position: 'absolute',
					left: '50%',
					transform: `translateX(-50%)`
				}
			],
			[
				'y-center',
				{
					position: 'absolute',
					top: '50%',
					transform: `translateY(-50%)`
				}
			],
			[
				'flex-center',
				{
					display: 'flex',
					'justify-content': 'center',
					'align-items': 'center'
				}
			],
			[
				'text-primary',
				{
					color: '#29CCA0'
				}
			],
			[
				'family',
				{
					'font-family': 'PingFangSC-Regular, PingFang SC, sans-serif'
				}
			],
			[
				'family-medium',
				{
					'font-family': 'PingFangSC-Medium, PingFang SC, sans-serif'
				}
			],
			[
				'ellipsis',
				{
					overflow: 'hidden',
					'text-overflow': 'ellipsis',
					'white-space': 'nowrap'
				}
			],
			[
				'circle',
				{
					'border-radius': '50%'
				}
			],
			[
				'border-shadow',
				{
					padding: '24px',
					'border-radius': '8px',
					background: '#FFF',
					'box-shadow': '0px 0px 16px 0px rgba(21, 102, 80, 0.10)'
				}
			]
		]
	})
