import {ADD_COUNTER, ADD_TO_CART} from "./mutations-types";
export default {
    addCart(context, payload) {
        // 1.payload新添加的商品
        //  let oldProduct = null
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //       oldProduct = payload
        //     }
        // }
        return new Promise((resolve) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) { // 数量加一
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前的商品数量+1')
            }else {  // 添加新的商品
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })
    }
}