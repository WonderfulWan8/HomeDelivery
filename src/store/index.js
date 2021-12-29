import { createStore } from 'vuex'

//防止刷新后购物车里面没有了
const setLocalCartList = ( state ) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList);//往localstorage里面存数据必须是JSON数据
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  // { shopId: { shopName:'', productList:{ productId:{}}}}
  return JSON.parse(localStorage.cartList) || {}
}

export default createStore({
  state: {
    cartList: getLocalCartList()
  },
  mutations: {
    changeCartItemInfo(state, payload,){
      const { shopId, productId, productInfo } = payload;
      let shopInfo = state.cartList[shopId] || {
        shopName: '',productList:{}
      };
      let product = shopInfo.productList[productId];
      if(!product) { 
        productInfo.count = 0
        product = productInfo
      }
      product.count = product.count + payload.num;
      if( payload.num > 0 ){ product.check = true } //只要往购物车加商品，选中就为true
      if( product.count < 0 ) { product.count = 0 }
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;
      // console.log(state.cartList);
      setLocalCartList(state)
    },
    changeShopName(state, payload){
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId ]|| {
        shopName: '',productList:{}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked(state, payload){
      const { shopId, productId } = payload;
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload){
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    // 点击全选，所有商品被选中
    setCartItemsChecked(state, payload){
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if(products){
        for(let key in products){
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    }
  },
  actions: {
  },  
  modules: {
  }
})
