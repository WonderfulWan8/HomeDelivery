<template>
    <div class="products">
        <div class="products__title">
            {{shopName}}
        </div> 
        <div class="products__wrapper">
            <div class="products__list">
                <template
                    v-for="item in productList"
                    :key="item._id"
                >
                    <div class="products__item" v-if="item.count > 0">
                        <img :src="item.imgUrl" class="products__item__img" alt="">
                        <div class="products__item__detail">
                            <h4 class="products__item__title">{{item.name}}</h4>
                            <p class="products__item__price">
                                <span class="products__item__single">
                                    <span class="products__item__yen">&yen;</span> 
                                    {{item.price}} × {{item.count}}
                                </span>
                                <span class="products__item__total">
                                    <span class="products__item__yen">&yen;</span> 
                                    {{(item.price * item.count).toFixed(2)}}
                                </span>
                            </p>
                        </div>
                    </div>
                </template>
            </div>
        </div>  
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useCommomCartEffect } from '../../effects/cartEffects';
export default{
    name: "ProductList",
    setup(){
        const route = useRoute();
        const shopId = route.params.id;
        const { productList, shopName } = useCommomCartEffect(shopId);
        return { productList, shopName }
    }
}
</script>

<style lang="scss" scoped>

@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
    .products{
        margin:.16rem .18rem .1rem .18rem;//.55rem给底部实付金额留出位置
        background-color: $bgColor;
        &__title{
           padding: .16rem;
           font-size: .16rem;
           color: $content-fontcolor;
           line-height: 22px;
           font-weight: bold;
        }
        &__list{
            background-color: white;
            // padding-bottom: 0.16rem;
        }
        &__wrapper{
            overflow-y: scroll;
            margin: 0 .18rem;
            position: absolute;
            left: 0;
            right: 0;
            top: 2.6rem;
            bottom: .6rem;
        }
        &__item{
            flex: 1;
            position: relative;
            display: flex;
            padding: 0 .16rem .16rem .16rem;
            &__detail{
                overflow:hidden;
            }
            &__img{
                width: 0.46rem;
                height: 0.46rem;
                margin-right: .16rem;
            }
            &__title{
                line-height: .2rem;
                font-size: .14rem;
                color: $content-fontcolor;
                margin: 0;
                margin-bottom: 6px;
                @include ellipsis
                
            }
            &__price{
                display: flex;
                margin: 0;//重置p标签的margin
                line-height: .2rem;
                font-size: .14rem;
                color: $highlight-fontColor;
                
            }
            &__single{
                width: 155px;
            }
            &__total{
                color: $dark-fontColor;
                font-weight: bold;
            }
            &__yen{
                font-size: .12rem;
            }
        }
    }

</style>