<template>
    <div class="wrapper">
        <div class="search">
            <div @click="handleBackClick" class="search__back iconfont">&#xe679;</div>
            <div class="search__content">
                <span class="search__content__icon iconfont">&#xe6e1;</span>
                <input 
                    class="search__content__input" 
                    placeholder="请输入商品名称"
                />
            </div>
        </div>
        <ShopInfo 
        :item="item"
        :hideBorder="true"
        v-show="item.imgUrl"
        />
        <Content :shopName="item.name"/>
        <Cart />
    </div>
    
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

//获取当前商铺信息
const useShopInfoEffect = () => {
    const data = reactive({ item:{} });
    const route = useRoute();//获取当前路由的信息
    const getItemData = async () => {
        const result = await get(`/api/shop/${route.params.id}`)
        if(result?.errno === 0 && result?.data){
            data.item = result.data
        }
    }
    const { item } = toRefs(data)
    return { item, getItemData }
}

//点击回退逻辑
const useBackRouterEffect = () =>{
    const router = useRouter();//整个大的路由的信息
    const handleBackClick = ()=>{
        router.back()
    }
    return handleBackClick
}

export default {
    name:'Shop',
    components:{ ShopInfo, Content, Cart },
    setup() {
        const { item, getItemData } = useShopInfoEffect()
        const handleBackClick = useBackRouterEffect()
        getItemData()
        return { item, handleBackClick }
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
    .wrapper{
        padding: 0 .18rem;
    }
    .search{
        height: .32rem;
        display: flex;
        margin: .14rem 0 .04rem 0;
        line-height: .32rem;
        border-radius: 0.16rem;
        &__back{
            width: .32rem;
            font-size: .2rem;
            color: #B6B6B6;
        }
        &__content{
            display: flex;
            flex: 1;
            line-height: .32rem;
            background-color: $search-bgColor;
            border-radius: .16rem;
            &__icon{
                width: .44rem;
                text-align: center;
                font-size: .22rem;
                color: $search-fontColor;
            }
            &__input{
                display: block;
                width: 100%;
                padding-right: .2rem;
                border:none;
                outline: none;
                height: .32rem;
                font-size: .14rem;
                // background:none;
                border-radius: 0.16rem;
                 background-color: $search-bgColor;
                color:$content-fontcolor;
                &::placeholder{
                    color: $content-fontcolor;
                }
            }
        }
    }
</style>