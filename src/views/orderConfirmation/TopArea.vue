<template>
    <div class="top"> 
        <div class="top__header">
            <div 
            class="iconfont top__header__back"
            @click="handleBackClick()">&#xe679;</div>
            确认订单
        </div>
        <div class="top__receiver">
            <div class="top__receiver__title">收货地址</div>
            <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
            <div class="top__receiver__info">
                <span class="top__receiver__info__name">瑶妹（先生）</span>
                <span class="top__receiver__info__phoneNum">18911024266</span>
            </div>
            <div
            class="iconfont top__receiver__icon"
            
            >
            &#xe679;
            </div>
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
    name:'TopArea',
    setup(){
        const router = useRouter();
        const handleBackClick = () => { router.back(); };
        return { handleBackClick }
    }
}
</script>
<style lang="scss" scoped>

@import '../../style/viriables.scss';
@import '../../style/mixins.scss'; 
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
        color: $content-fontcolor;
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
            color: $medium-fontColor;
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
</style>