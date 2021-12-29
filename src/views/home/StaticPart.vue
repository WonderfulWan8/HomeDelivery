<template>
    <div class="position">
        <span class="iconfont position__icon">&#xe60e;</span>
        北京理工大学国防科技园2号楼10层
        <span class="iconfont position__notice">&#xe71f;</span>
        </div>
        <div class="search">
        <span class="iconfont position__search">&#xe6e1;</span>
        <span class="search__text">山姆会员商店优惠商品</span>
        </div>
        <div class="banner">
        <img
            class="banner__img"
            src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        alt="">
        </div>
        <div class="icons">
          <div
            class="icons__item"
            v-for="item in iconsList"
            :key="item.id"
          >
              <img class="icons__item__img"
              :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
              alt="">
              <p class="icons__item__desc">{{item.desc}}</p>
          </div>
        </div>
    <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '红包', desc: '红包套餐' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '签到', desc: '签到' },
      { imgName: '蛋糕', desc: '烘焙蛋糕' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '鲜花', desc: '鲜花' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '菜市场', desc: '菜市场' }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss">
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
    .position{
    position: relative;
    padding: .16rem .24rem .16rem 0;
    line-height: .22rem;
    font-size: .16rem;
    //多于内容省略号
    @include ellipsis;
    //编译时相当于.position .position__icon 优先级更高
    .position__icon{
        position: relative;
        top: .02rem;
        font-size: .2rem;
    }
    .position__notice{
        position: absolute;
        right: 0;
        top: .17rem;
        font-size: .2rem;
    }
    color: $content-fontcolor;
    }
    .search{
    margin-bottom: .12rem;
    line-height: .32rem;
    background-color: $search-bgColor;
    color: $search-fontColor;
    border-radius: .16rem;
    .iconfont{
        position: relative;
        top: .03rem;
        padding: 0 0rem 0 0.1rem;
        font-size: .2rem;
    }
    &__text{
        display: inline-block;
        font-size: .14rem ;
    }
    }
    .banner{
        // 防止网速慢加载抖动，距离下边一个图片的宽高比
        height: 0;
        overflow: hidden;
        padding-bottom: 25.4%;//图片的宽高比
        &__img{
            width: 100%;
        }
    }
    .icons{
    display: flex;
    flex-wrap: wrap;
    margin-top: .16rem;
    &__item{
        width: 20%;
        &__img{
        display: block;
        width: .4rem;
        height: .4rem;
        margin: 0 auto;
        }
        &__desc{
        margin:.06rem 0 .16rem 0;
        text-align: center;
        color: $content-fontcolor;
        }
    }
    }
    .gap{
    margin: 0 -.18rem;//消去左右留白
    height: .1rem;
    background-color: $content-bgColor;
    }
</style>
