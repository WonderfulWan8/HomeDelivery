<template>
    <div class="wrapper">
        <div class="top"> 
            <div class="top__header">
                <div class="iconfont top__header__back">&#xe679;</div>
                确认订单
            </div>
            <div class="top__receiver">
                <div class="top__receiver__title">收货地址</div>
                <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
                <div class="top__receiver__info">
                    <span class="top__receiver__info__name">瑶妹（先生）</span>
                    <span class="top__receiver__info__phoneNum">18911024266</span>
                </div>
                <div class="iconfont top__receiver__icon">&#xe679;</div>
            </div>
        </div>
        <div class="products">
            
            <div class="products__title">
                <div class="products__list">
                    
                    <div
                    class="products__item"
                    v-for="item in productList"
                    :key="item._id"
                    >
                    
                        <img :src="item.imgUrl" class="product__item__img" alt="">
                        <div class="product__item__detail">
                            <h4 class="product__item__title">{{item.name}}</h4>
                            <p class="product__item__price">
                                <span class="product__item__yen">&yen;{{item.price}} * {{item.count}}</span>
                                <span class="product__item__yen">&yen;{{item.price * item.count}}</span>
                            </p>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>    
</template>

<script>
import { useRoute } from 'vue-router';
import { useCommomCartEffect } from '../../effects/cartEffects';
export default{
    name: "OrderConfirmation",
    setup(){
        console.log(123);
        const route = useRoute();
        const shopId = route.params.id;
        const { productList } = useCommomCartEffect(shopId);
        return { productList, }
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';   
    .wrapper{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #eee;
    }
    .top{
        position: relative;
        height: 1.96rem;
        background-size:100% 1.59rem;//宽度100% 高度159px
        background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
        background-repeat: no-repeat;
        position: relative;
        &__header{
            padding-top:.26rem;
            line-height: .22rem;
            font-size: .16rem;
            color: white;
            text-align: center;
            &__back{
                position: absolute;
                left: .18rem;
                font-size: .22rem;
            }
        }
        &__receiver{
            position: absolute;
            left: .18rem;
            right: .18rem;
            bottom: 0;//有距离底部的距离，所以不用设置header和receiver之间的距离
            height: 1.11rem;
            background-color: white;    
            color: #333;
            border-radius: .04rem;
            padding-left: .16rem;
            &__title{
                padding-top: .16rem;
                font-size: .16rem;   
                line-height: .22rem;
            }
            &__address{
                padding-top: .14rem;
                font-size: .14rem;
                line-height: .20rem;
            }
            &__info{
                padding-top: .06rem;
                color: #666;
                font-size: .12rem;
                line-height: .18rem;
                &__name{
                    margin-right: .06rem;
                }
            }
            &__icon{
                transform: rotate(180deg);
                position: absolute;
                top:.48rem;
                right: .16rem;   
                font-size: .2rem;
            }
        }
    }
    .products{
        margin:.16rem .18rem .55rem .18rem;//.55rem给底部实付金额留出位置
        background-color: #fff;
        &__title{
           
        }
        &__list{
               
        }
        &__item{
            overflow-y: scroll;//y轴滚动
            flex: 1;
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
                &__price{
                    margin: 0;
                    line-height: .2rem;
                    font-size: .14rem;
                    color: $highlight-fontColor;
                }
                &__yen{
                    font-size: .12rem;
                }
            }
        }
        &product{
             
        }
    }
    .product{
   
    }
</style>
