<template>
    <!--底部-->
  <div class="docker">
    <!-- BEM命名规则，block__element--Modifier块__元素--状态 下面是判断，只有第一个才有蓝色 -->
    <div
     v-for="(item,index) in dockerList"
     :class="{' docker__item':true,' docker__item--active': index === currentIndex}"
     :key="item.icon"
     >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{item.text}}</div>
      </router-link>
      
    </div>
  </div>
</template>
<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe6b8;', text: '首页', to: {name: 'Home'} },
      { icon: '&#xe607;', text: '购物车', to: {name: 'CartList'} },
      { icon: '&#xe713;', text: '订单', to: {name:'OrderList'} },
      { icon: '&#xe78b;', text: '我的', to: {name:'Home'} }
    ]
    return { dockerList }
  }
}
</script>
// scoped是指css仅在当前组件作用域内生效
<style lang="scss" scoped>
@import '../style/viriables.scss';
.wrapper{
  background-color: red;
}
.docker{
  display: flex;
  position: absolute;
  left: 0px;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: .01rem solid $content-bgColor;
  &__item{// &表示docker
    flex: 1;
    text-align: center;
    a{
      color: $content-fontcolor;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active{//此处&表示 .docker__item
      a{
        color: #1fa4fc;
      }
    }
  }
  &__title{// &表示docker
    font-size: .2rem;
    transform: scale(0.5, 0.5); // 浏览器最小为12px，横向缩小50% 纵向缩小50%就可以
    transform-origin: center top; // 缩放中心点
  }
}
</style>
