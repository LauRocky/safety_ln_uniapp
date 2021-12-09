import { request } from "./request.js"

// 封装查字典方法
export function getDictList(dictType) {
  return new Promise(resolve => {
    request('/dict/list','GET',{type: dictType}).then(({
      data
    }) => {
      resolve(data.dict)
    }) 
  }) 

}