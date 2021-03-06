# echarts å¾è¡¨ <span style="font-size:16px;">ððððð <span style="background:#ff9d00;padding:2px 4px;color:#fff;font-size:10px;border-radius: 3px;">å¨ç«¯</span></span>
> ä¸ä¸ªåºäº JavaScript çå¼æºå¯è§åå¾è¡¨åº   [æ¥çæ´å¤ ç«ç¹1](https://limeui.qcoon.cn/#/echart) |  [æ¥çæ´å¤ ç«ç¹2](http://liangei.gitee.io/limeui/#/echart)  <br>
> åºäº echarts åäºå¼å®¹å¤çï¼æ´å¤ç¤ºä¾è¯·è®¿é®  [uniç¤ºä¾ ç«ç¹1](https://limeui.qcoon.cn/#/echart-example) | [uniç¤ºä¾ ç«ç¹2](http://liangei.gitee.io/limeui/#/echart-example) | [å®æ¹ç¤ºä¾](https://echarts.apache.org/examples/zh/index.html)     <br>
> Qç¾¤ï¼1046793420 <br>
> echarts v5.1.1

## å¹³å°å¼å®¹

| H5  | å¾®ä¿¡å°ç¨åº | æ¯ä»å®å°ç¨åº | ç¾åº¦å°ç¨åº | å¤´æ¡å°ç¨åº | QQ å°ç¨åº | App  |
| --- | ---------- | ------------ | ---------- | ---------- | --------- | ---- |
| â   | â          | â         | â      | â       | â      | â |


* â¨ **æ³¨æ**
* ð æä»¶ç¨å°äº css é¢ç¼è¯å¨ [stylus](https://ext.dcloud.net.cn/plugin?name=compile-stylus) è¯·å®è£
* ð¦ æ¬æä»¶æ²¡æå¯¹ echarts åé¨çæ¹æ³åæ ·å¼åè¿æ¹å¨ï¼åªæ¯ä½¿å¶å¼å®¹uniappã
* ð è¥ echarts æ æ³æ»¡è¶³äºä½ ææéè¦ç¹æ®è½åçè¯·ç´æ¥å» echarts æå»ºè®®
* ð è¥ echarts æå¼å®¹é®é¢å¯åæåé¦ã
* ð æ¬æä»¶ä½¿ç¨äº `webview` æ¯æ `nvue`ã

## å®è£
å¨uniapp æä»¶å¸åº æ¾å° [ç¾åº¦å¾è¡¨](https://ext.dcloud.net.cn/plugin?id=4899) å¯¼å¥å³å¯

## ä½¿ç¨æ¹å¼
1ãéè¿`ref`è·åèç¹ç»ä»¶åé¨ **init** æ¹æ³çæå¾è¡¨
```html
<l-echart ref="chart"></l-echart>
```
```js
this.$refs.chart.init(config => {...code})
```

2ãéè¿`ref`è·åèç¹ç»ä»¶åé¨ **setChart** æ¹æ³å¹¶ è®¾ç½® `is-enable`(å¯ç¨åå§å) çæå¾è¡¨
```html
<l-echart ref="chart" is-enable></l-echart>
```
```js
this.$refs.chart.setChart(chart => {...code})
```

3ãéè¿props ç **onInit**
```html
<l-echart :onInit="onInit"></l-echart>
```
```js
data() {
	return {
		onInit: config => {
			...code
		}
	}
}
```
4ãéè¿ props ç **ec**
```html
<l-echart :ec="ec"></l-echart>
```
```js
data() {
	return {
		ec: {
			option: {
				...code
			}
		}
	}
}
```


## ä»£ç æ¼ç¤º
### åºç¡ç¨æ³
```html
<view style="width: 100%; height:500rpx"><l-echart ref="chart"></l-echart></view>
```

```js
import * as echarts from '@/uni_modules/lime-echart/components/l-echart/echarts';
export default {
	data() {
		return {
			option: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							// åæ è½´æç¤ºå¨ï¼åæ è½´è§¦åææ
							type: 'shadow' // é»è®¤ä¸ºç´çº¿ï¼å¯éä¸ºï¼'line' | 'shadow'
						},
						confine: true
					},
					legend: {
						data: ['ç­åº¦', 'æ­£é¢', 'è´é¢']
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					xAxis: [
						{
							type: 'value',
							axisLine: {
								lineStyle: {
									color: '#999999'
								}
							},
							axisLabel: {
								color: '#666666'
							}
						}
					],
					yAxis: [
						{
							type: 'category',
							axisTick: { show: false },
							data: ['æ±½è½¦ä¹å®¶', 'ä»æ¥å¤´æ¡', 'ç¾åº¦è´´å§', 'ä¸ç¹èµè®¯', 'å¾®ä¿¡', 'å¾®å', 'ç¥ä¹'],
							axisLine: {
								lineStyle: {
									color: '#999999'
								}
							},
							axisLabel: {
								color: '#666666'
							}
						}
					],
					series: [
						{
							name: 'ç­åº¦',
							type: 'bar',
							label: {
								normal: {
									show: true,
									position: 'inside'
								}
							},
							data: [300, 270, 340, 344, 300, 320, 310],
							itemStyle: {
								// emphasis: {
								//   color: '#37a2da'
								// }
							}
						},
						{
							name: 'æ­£é¢',
							type: 'bar',
							stack: 'æ»é',
							label: {
								normal: {
									show: true
								}
							},
							data: [120, 102, 141, 174, 190, 250, 220],
							itemStyle: {
								// emphasis: {
								//   color: '#32c5e9'
								// }
							}
						},
						{
							name: 'è´é¢',
							type: 'bar',
							stack: 'æ»é',
							label: {
								normal: {
									show: true,
									position: 'left'
								}
							},
							data: [-20, -32, -21, -34, -90, -130, -110],
							itemStyle: {
								// emphasis: {
								//   color: '#67e0e3'
								// }
							}
						}
					]
				},
		};
	},
	mounted() {
		this.$refs.chart.init(config => {
			const { canvas } = config;
			const chart = echarts.init(canvas, null, config);
			canvas.setChart(chart);
			chart.setOption(this.option);
			// éè¦æ chart è¿å
			return chart;
		});
	}
}
```

### Nvue
æ¬æä»¶éè¿ `webview` ç»ä»¶ä½¿å¾ `echarts` è½å¨ `nvue` éä½¿ç¨ã

* â¨ **æ¸©é¦¨æç¤º**
* ð Nvue æ¯æ app nvueï¼éä½¿ç¨nvueæåå°å°ç¨åº h5ç­å¹³å°ã
* ð webviewä½¿ç¨äºç½ç»è·¯å¾ï¼å¯èªè¡ä¸è½½æ¾ç½®æ ¹ç®å½ä¸ç`hybrid`æä»¶å¤¹éåä¿®æ¹è·¯å¾å³å¯ã
* ð¡  **ä¸éè¦å¼ç¨echarts JSæä»¶**ï¼ä½è¿éæ±å¼å¥æä»¶ã
* âï¸ å¨å½æ°å¤é¢çæ°æ®éè¦éè¿ props `params` æ ref `init` | `setChart` æ¹æ³çç¬¬äºä¸ªåæ°ä¼ éæ°æ®

```html
<view style="height: 750rpx">
	<l-echart ref="chart" isEnable></l-echart>
</view>
```
```js
export default {
	data() {
		return {
			option: {
				// backgroundColor: '#000000',
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// åæ è½´æç¤ºå¨ï¼åæ è½´è§¦åææ
						type: 'shadow' // é»è®¤ä¸ºç´çº¿ï¼å¯éä¸ºï¼'line' | 'shadow'
					},
					confine: true
				},
				legend: {
					data: ['ç­åº¦', 'æ­£é¢', 'è´é¢']
				},
				grid: {
					left: 20,
					right: 20,
					bottom: 15,
					top: 40,
					containLabel: true
				},
				xAxis: [
					{
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						}
					}
				],
				yAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: ['æ±½è½¦ä¹å®¶', 'ä»æ¥å¤´æ¡', 'ç¾åº¦è´´å§', 'ä¸ç¹èµè®¯', 'å¾®ä¿¡', 'å¾®å', 'ç¥ä¹'],
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						}
					}
				],
				series: [
					{
						name: 'ç­åº¦',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
						data: [300, 270, 340, 344, 300, 320, 310],
						itemStyle: {
							// emphasis: {
							//   color: '#37a2da'
							// }
						}
					},
					{
						name: 'æ­£é¢',
						type: 'bar',
						stack: 'æ»é',
						label: {
							normal: {
								show: true
							}
						},
						data: [120, 102, 141, 174, 190, 250, 220],
						itemStyle: {
							// emphasis: {
							//   color: '#32c5e9'
							// }
						}
					},
					{
						name: 'è´é¢',
						type: 'bar',
						stack: 'æ»é',
						label: {
							normal: {
								show: true,
								position: 'left'
							}
						},
						data: [-20, -32, -21, -34, -90, -130, -110],
						itemStyle: {
							// emphasis: {
							//   color: '#67e0e3'
							// }
						}
					}
				]
			}
		};
	},
	methods: {
		init() {
			this.$refs.chart.setChart(chart => {
				chart.setOption(option)
			}, {option: this.option});
		}
	},
	onReady() {
		this.init();
	}
};
```
## Nvue ä½¿ç¨æ³¨æäºé¡¹
- ç±äº nvue ä½¿ç¨çæ¯å­ç¬¦ä¸²æ¨¡æ¿ä¼ è¾ï¼æåçæ¶åä¼è¢«æ··æ·åç¼©
- æå¨è¦ä¿æ **å³é®è¯** ä¸è¢« **æ··æ·åç¼©**

#### 1ãechartsãecStat ä¸éè¦è¢«å¼å¥

ð éè¯¯ï¼åªä¼æ æçå¢å æåä½ç§¯

```js
import * as echarts from '@/uni_modules/lime-echart/components/l-echart/echarts';
import ecStat from 'echarts-stat';
export default {
	...code
}
```

ð æ­£ç¡®

```js
export default {
	...code
}
```

#### 2ãå¼ç¨å½æ°å¤é¢æ°æ®ç**å³é®è¯**ä¸éè¦å£°æ

ð éè¯¯

```js
const {option} = this
this.$refs.chart.init(config => {
	chart.setOption(option);
})

```

ð æ­£ç¡®

```js
// ææç¨å½æ°å¤éçæ°æ®ï¼åªè¦ä¿æè· this éçä¸è´
this.$refs.chart.init(config => {
	chart.setOption(option);
})

- or -

this.$refs.chart.init(config => {
	chart.setOption(this.option);
})
```

#### 3ãå¼ç¨å½æ°å¤é¢çæ°æ®éè¦éè¿**params**æå½æ°çç¬¬äºä¸ªåæ°ä¼ é 

ð éè¯¯

```html
<l-echart />

- or -

this.$refs.chart.init(config => {...code})
```

ð æ­£ç¡®

```html
<l-echart :params="{option}"/>

- or -

this.$refs.chart.init(config => {...code}, {option: this.option})
```



## æ°æ®æ´æ°
- 1ãå¦ææ¯ä½¿ç¨ec.optionçæ¹å¼ï¼å¹¶è®¾ç½®`is-auto-play`ä¼èªå¨æ´æ°å¾è¡¨
- 2ãå¦ææ¯ä½¿ç¨ `ref` ç `init` åå»ºæ¹å¼ï¼å¯è·å`setOption`è®¾ç½®æ´æ°

```js
this.$refs.chart.setOption(data)
```


## å¸¸è§é®é¢
- å¾®ä¿¡å°ç¨åº `2d` ä¸æ¯æ çæºè°è¯
- å¤´æ¡ç³»å°ç¨åº `2d` ä¸æ¯æ å¼åå·¥å·é¢è§ï¼ä¹å­å¨åå¨å¾è¡¨é¡µé¢æ æ³æ»å¨çé®é¢ã
- éè¿ecçæ¹å¼æ¯ä¸æ¯æä¼ éå½æ°
- `toolbox` ä¸æ¯æ
- `echarts-gl` ä¸æ¯æ

## Props

| åæ°             | è¯´æ                                                            | ç±»å             | é»è®¤å¼        | çæ¬ 	|
| ---------------  | --------                                                        | -------         | ------------ | ----- 	|
| custom-style     | èªå®ä¹æ ·å¼                                                      |   `string`       | -            | -     	|
| type             | æå® canvas ç±», ä»æ¯æå¾®ä¿¡åå¤´æ¡                                 |    `string`      | `2d`         |   	    |
| ec.option        | [å¾è¡¨éç½®é¡¹](https://echarts.apache.org/zh/option.html#title)   |    `object`      | -            |   	    |
| ec.clear         | æ¯å¦å¼å¯æ´æ°æ¶åå é¤å¾è¡¨æ ·å¼                                      |    `boolean`      | `false`            |   	    |
| ec.lazyLoad      | æ¯å¦å¼å¯å»¶æ¶å è½½                                                 |    `boolean`      | `false`            |   	    |
| params           | ä»éå¯¹nvueçæ°æ®ä¼ é,åinitå½æ°çç¬¬äºä¸ªåæ°ï¼ä¸¤éä¸               |    `object`    | -            | -     	|
| webviewStyles    | ä»éå¯¹nvueçwebviewè®¾ç½®æ ·å¼                                      |    `object`    | -            | -     	|
| onInit           | åå§åå½æ°                                                      |    `function`    | -            |   	    |
| is-auto-play     | æ¯å¦èªå¨æ´æ°ï¼`ec.option` æ°æ® åçæ¹å¨å°±æ´æ°å¾è¡¨                 |    `boolean`     | `false`     |   	    |
| is-enable        | æ¯å¦å¯ç¨åå§åï¼å¯ç¨åæ é¡»ä½¿ç¨`init`                              |    `boolean`     | `false`     |   	    |
| is-clickable     | æ¯å¦æ´¾åç¹å»äºä»¶                                                 |    `boolean`     | `true`     |   	    |
| is-disable-scroll | è§¦æ¸å¾è¡¨æ¶æ¯å¦ç¦æ­¢é¡µé¢æ»å¨                                       |    `boolean`     | `false`     |   	    |
| is-clickable     | æ¯å¦æ´¾åç¹å»äºä»¶                                                 |    `boolean`     | `true`     |   	    |

## äºä»¶

| åæ°                    | è¯´æ                                                                                                             |
| ---------------        | ---------------                                                                                                  |
| init(callback)         | åå§åè°ç¨å½æ°ï¼**callback**: åè°å½æ°                                           |  
| setChart(chart)        | å·²ç»åå§ååï¼è¯·ä½¿ç¨è¿ä¸ªå½æ°ï¼**chart**ï¼åè°å½æ°åæ°æ¯å¾è¡¨å®ä¾                    |  
| setOption(data)        | [å¾è¡¨éç½®é¡¹](https://echarts.apache.org/zh/option.html#title)ï¼ç¨äºæ´æ° ï¼ä¼ éæ¯æ°æ® `option`  |  
| clear()                | æ¸ç©ºå½åå®ä¾ï¼ä¼ç§»é¤å®ä¾ä¸­ææçç»ä»¶åå¾è¡¨ã  |  
| dispose()              | éæ¯å®ä¾  |  
| showLoading()          | æ¾ç¤ºå è½½  |  
| hideLoading()          | éèå è½½  |  
| canvasToTempFilePath(opt)  | ç¨äºçæå¾ç  |  


## æèµ
å¦æä½ è§å¾æ¬æä»¶ï¼è§£å³äºä½ çé®é¢ï¼èµ äººç«ç°ï¼æçä½é¦ã  

![è¾å¥å¾çè¯´æ](https://cdn.jsdelivr.net/gh/liangei/image@latest/222521_bb543f96_518581.jpeg "å¾®ä¿¡å¾çç¼è¾_20201122220352.jpg")