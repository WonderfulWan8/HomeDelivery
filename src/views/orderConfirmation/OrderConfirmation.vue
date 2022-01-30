<template>
    <div class="wrapper">
        <Toparea/>
        <ProductList/>
        <Order/>
    </div>    
</template>

<script>
import Toparea  from './TopArea'
import ProductList from './ProductList'
import Order from './Order'
export default{
    name: "OrderConfirmation",
    components:{ Toparea, ProductList, Order },
}
</script>
<style lang="scss" scoped>
.wrapper{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #eee;
    overflow-y: scroll;
}
</style>
