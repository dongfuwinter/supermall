import {request, request2} from './request'


export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return request2({
        url: 'api/m5/home/data',
        params: {
            type,
            page,
        }
    })
}

// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈
// function test() {
//     const names = {'why', 'aaa'}
// }
// test()
// test()
//
// let totalNums = []
// const num1 = [20, 11, 12]
// const num2 = [223, 1121, 122]
// for (let i of num1) {
//     totalNums.push(i)
// }
// totalNums.push()