import { computed } from 'vue';
import { useStore } from 'vuex'
// 购物车相关逻辑
export const useCommomCartEffect = (shopId) =>{
    const store = useStore();
    const cartList = store.state.cartList;
    const changeCartItemInfo = (shopId, productId, productInfo, num) => {
        store.commit('changeCartItemInfo',{
            shopId, productId, productInfo, num
        })
    };
    const productList = computed(()=>{
        const productList = cartList[shopId]?.productList || {}
        const notEmptyProductList = {}
        for( let i in productList ){
            const product = productList[i];
            if(product.count > 0){
                notEmptyProductList[i] = product;
            }
        }
        return notEmptyProductList
    });
    const shopName = computed( ()=>{
        // 如果此处仅做取值而不使用计算属性，会导致如果shopId变化时，获取不到shopName
        const shopName = cartList[shopId]?.shopName || ''
        return shopName
    });

    // 计算总价格
    const caculations = computed (() => {
        const productList = cartList[shopId]?.productList//读取当前商铺下的商品列表（vuex）
        const result = { total: 0, price: 0, allChecked: true}// 计算购物车内商品总数, 总价, 是否全选
        if(productList){
            for(let i in productList){//读取每个商品的count
                const product = productList[i]
                result.total += product.count
                if(product.check){  // 勾选上的才计算价钱
                    result.price += ( product.count * product.price )
                }
                if(product.count > 0 && !product.check){
                    result.allChecked = false;
                }
            }
        }
        result.price = result.price.toFixed(2);
        return result 
    })
    return { cartList, productList, shopName, changeCartItemInfo, caculations }
}