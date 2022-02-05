<template>
    <div class="order">
        <div class="order__price">实付金额 <b>¥{{caculations.price}}</b></div>
        <div class="order__btn">提交订单</div>
    </div>
    <div class="mask">
        <div class="mask__content">
            <h3 class="mask__content__title">确认要离开收银台？</h3>
            <div class="mask__content__desc">请尽快完成支付，否则将被取消</div>
            <div class="mask__content__btns">
                <div
                class="mask__content__btn mask__content__btn--first"
                @click="() => handleConfirmOrder(true)">取消订单</div>
                <div
                class="mask__content__btn mask__content__btn--last"
                @click="() => handleConfirmOrder(false)">确认支付</div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useCommomCartEffect } from '../../effects/cartEffects';
import { post } from '../../utils/request';
export default {
    name:'Order',

    setup(){
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const shopId = parseInt(route.params.id, 10);
        const { caculations, shopName, productList } = useCommomCartEffect(shopId);

        const handleConfirmOrder = async (isCanceled) => {
            // alert("confirm");
            let products = [];
            for(let i in productList.value){
                let product = productList.value[i]
                products.push({
                    id: product._id,
                    num: product.count
                });
            }   
            console.log(products);
            try{
                const result = await post('/api/order',{
                    addressId : 1,
                    shopId,
                    shopName: shopName.value,
                    isCanceled,
                    products,
                });
                if( result?.errno === 0 ){
                    store.commit('clearCarData', shopId );
                    router.push( { name: 'Home' } );
                }
                // console.log(result);
            }catch(e){
                // 提示下单失败
            }
        }
        return { caculations, handleConfirmOrder }

    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.order{
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    height: .49rem;
    line-height: .49rem;
    background-color: $bgColor;
    &__price{
        flex: 1;
        color: $content-fontcolor;
        font-size: .14rem;
        margin-left: 24px;
    }
    &__btn{
        color: white;
        background-color: #4FB0F9;
        width: .98rem;
        font-size: .14rem;
        text-align: center;
    }
}
.mask{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1;
    &__content{
        // display: flex;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 3.01rem;
        height: 1.57rem;
        background-color: #fff;
        text-align: center;
        border-radius: 4px;
        &__title{
            margin-top: .24rem;
            line-height: .26rem;
            font-size: .18rem;
            color:#333;
        }
        &__desc{
            color: #666;
            font-size: .14rem;
            margin-top: .08rem;
        }
        &__btns{
            display: flex;
            margin: .24rem .58rem 0 .59rem;
        }
        &__btn{
            flex: 1;
            line-height: .32rem;
            border: .01rem solid #4FB0F9;
            width: .8rem;
            line-height: .32rem;//用行高代替设置高度
            border-radius: .16rem;
            color: #0091FF;
            &--first{
                margin-right: .12rem;
            }
            &--last{
                margin-left: .12rem;
                color: white;
                background-color:#0091FF;
            }
        }
    }
}
</style>