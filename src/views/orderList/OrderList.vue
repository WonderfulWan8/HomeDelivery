<template>
    <div class="wrapper">
        <div class="title">
            我的订单
        </div>
        <div class="orders">
            <div class="order">
                <div class="order__title">
                    沃尔玛
                    <span class="order__status">已取消</span>
                </div>
                <div class="order__content">
                    <div class="order__content__imgs">
                        <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png">
                        <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png">
                        <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png">
                        <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png">
                    </div>
                    <div class="order__content__info">
                        <div class="order__content__price">￥36.88</div>
                        <div class="order__content__count">共2件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 底部导航栏组件 -->
    <Docker :currentIndex="2"/>
</template>

<script>
import Docker from '../../components/Docker'
export default{
    name: 'OrderList',
    components:{ Docker }
}

</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
    overflow-y:auto ;
    position: absolute;
    left: 0;
    top: 0;
    bottom: .5rem;
    right: 0;
    /* padding: 0 .18rem .1rem .18rem; */
    background-color: #eee;
}
.title{
    line-height: .44rem;
    font-size: .16rem;
    color: #333;
    background: rgb(248, 248, 248);
    text-align: center;
}
.orders{

}
.order{
    padding: .16rem;
    margin: .16rem .18rem;
    background-color: #fff;
    &__title{
        margin-bottom: .16rem;
        font-size: .16rem;
        color:#333;
        line-height: .22rem;
    }
    &__status{
        float: right;
        color: #999;
        font-size: .14rem;
    }
    &__content{
        display: flex;
        &__imgs{
            flex: 1;
        }
        &__img{
            width: .4rem;
            height: .4rem;
            margin-right: .12rem;
        }
        &__info{
            width: .7rem;
        }
        &__price{
            margin-bottom: .04rem;
            line-height: .2rem;
            font-size: .14rem;
            color: #E93B3B;
            text-align: right;
        }
        &__count{
            line-height: .14rem;
            text-align: right;
            color: #333;
        }
    }
}
</style>