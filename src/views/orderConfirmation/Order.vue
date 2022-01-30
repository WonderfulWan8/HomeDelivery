<template>
    <div class="order">
        <div class="order__price">实付金额 <b>¥{{caculations.price}}</b></div>
        <div class="order__btn">提交订单</div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useCommomCartEffect } from '../../effects/cartEffects';
export default {
    name:'Order',

    setup(){
        const route = useRoute();
        const shopId = route.params.id;
        const { caculations } = useCommomCartEffect(shopId);
        return { caculations }

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
</style>