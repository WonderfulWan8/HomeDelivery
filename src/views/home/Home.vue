<template>
  <div class="wrapper">
    <!-- 静态展示组件 -->
    <StaticPart />
    <!-- <StaticPartcopy /> -->
    <!-- 附近店铺组件 -->
    <Nearby />
  </div>
  <!-- 底部导航栏组件 -->
  <Docker />
</template>

<script>
// import StaticPartcopy from './StaticPartcopy'
import StaticPart from './StaticPart'
import Nearby from './Nearby'
import Docker from './Docker'
export default {
  name: 'Home',
  components: { Nearby, Docker, StaticPart }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper{
  overflow-y: auto;//纵向隐藏
  position: absolute;
  left: 0;
  top:0;
  bottom: .5rem;
  right: 0;
  // background-color: blue;
  padding: 0 .18rem .1rem .18rem;
}

</style>
