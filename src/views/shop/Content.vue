<template>
    <div class="content">
        <div class="category">
            <div 
            :class="{ 'category__item':true, 'category__item--active': currentTab === item.tab}"
            v-for="item in categories"    
            :key="item.name"
            @click=" () => handleTabClick(item.tab)"
            >{{item.name}}</div>
        </div>
        <div class="product">
            <div
            class="product__item"
             v-for="(item) in list"
             :key="item._id"
             >
                <img :src="item.imgUrl" class="product__item__img" alt="">
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{ item.name }}</h4>
                    <p class="product__item__sales">月售 {{ item.sales }} 件</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{ item.price }}
                        <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span
                        class="product__number__minus"
                        @click=" () => { changeCartItem(shopId, item._id, item, -1, shopName) }"
                    >-</span>
                        {{ getProductCartCount(shopId, item._id) }}
                    <span 
                        class="product__number__plus"
                        @click=" () => { changeCartItem(shopId, item._id, item, 1, shopName) }"
                    >+</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useCommomCartEffect } from '../../effects/cartEffects'

const categories = [
    { name: '全部商品',tab: 'all'}, 
    { name: '秒杀', tab: 'seckill' }, 
    { name: '新鲜水果', tab: 'fruit' },
]

// tab切换相关的逻辑
const useTabEffect = () => {
    const currentTab = ref(categories[0].tab);
    const handleTabClick = (tab) => {
        currentTab.value = tab
    }
    return { currentTab, handleTabClick }
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
    const content = reactive({ list: [] })
    const getContentData = async ( tab ) => {
        const result = await get(`/api/shop/${shopId}/products`,{ 
            tab: currentTab.value
        })
        if(result?.errno === 0 && result?.data?.length){
            content.list = result.data;
        }
    }
    watchEffect( () => { getContentData() })
    const { list } = toRefs(content)
    return { list }
}

// 购物车相关逻辑
const useCartEffect = ()=>{
    const store = useStore()
    const { cartList, changeCartItemInfo } = useCommomCartEffect();
    const changeShopName = (shopId, shopName)=>{
        store.commit('changeShopName',{ shopId, shopName })
    }
    const changeCartItem = (shopId, productId, item, num, shopName ) => {
        changeCartItemInfo(shopId, productId, item, num)
        changeShopName(shopId, shopName)
    }
    const getProductCartCount = (shopId, productId) => {
        return  cartList?.[shopId]?.productList?.[productId]?.count || 0 
    }
    return { cartList, changeCartItem, getProductCartCount }
}

export default {
    name:'Content', 
    props: ['shopName'],
    setup(){
        const route = useRoute()
        
        const shopId = route.params.id
        const { currentTab, handleTabClick } = useTabEffect();
        const { list } = useCurrentListEffect(currentTab, shopId)
        const { cartList, changeCartItem, getProductCartCount } = useCartEffect()
        return { 
            categories,
            currentTab,
            list,
            handleTabClick,
            shopId,
            // changeCartItemInfo,
            cartList,
            changeCartItem,
            getProductCartCount,
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.content{
    display: flex;
    position: absolute;
    top: 1.5rem;
    left: 0;
    right: 0;
    bottom: .5rem;
}
.category{
    overflow-y: scroll;//沿y轴滚动
    height: 100%;
    width: .76rem;
    background-color: $search-bgColor ;
    &__item{
        height: .4rem;
        text-align: center;
        line-height: .4rem;
        font-size: .14rem;
        color: $content-fontcolor;     
        &--active{
            background-color: $bgColor;
        }
    }
}
.product{
    overflow-y: scroll;//y轴滚动
    flex: 1;
    // background-color: orange;
    &__item{
        position: relative;
        display: flex;
        padding: .12rem 0;//下面有边框，用padding会有问题
        margin: 0 .16rem;
        border-bottom: .01rem solid $content-bgColor;
        &__detail{
            overflow:hidden;
        }
        &__img{
            width: 0.68rem;
            height: 0.68rem;
            margin-right: .16rem;
        }
        &__title{
            line-height: .2rem;
            font-size: .14rem;
            color: $content-fontcolor;
            margin: 0;
            @include ellipsis
        }
        &__sales{
            margin: .06rem 0;
            // line-height: .16rem;
            font-size: .12rem;
            color: $content-fontcolor;
        }
        &__price{
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $highlight-fontColor;
        }
        &__yen{
            font-size: .12rem;
        }
        &__origin{
            margin-left: .16rem;
            font-size: .12rem;
            color: $light-fontColor;
            text-decoration: line-through;
        }
        .product__number{
            position: absolute;
            right: .0rem;
            bottom: .12rem;
            &__minus,&__plus{
                
                display: inline-block;
                width: .2rem;
                height: .2rem;
                line-height: .16rem;
                border-radius: 50%;
                font-size: .2rem;
                text-align: center;
            }
            &__minus{
                border: .01rem solid $medium-fontColor;
                color: $medium-fontColor;
                margin-right: .1rem;
            }
            &__plus{
                color: $bgColor;
                background-color: $btn-bgColor ;
                margin-left: .1rem;
            }
        }
    }
}
</style>