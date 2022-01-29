// import { is } from 'core-js/fn/object'
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/Login'

const routes = [{
    path: '/',
    name: 'Home',
    // 动态路由，只有访问时才会加载
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  }, {
    path: '/cart',
    name: 'Cart',
    // 动态路由，只有访问时才会加载
    component: () => import(/* webpackChunkName: "cart" */ '../views/shop/Cart')
  },{
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    // 动态路由，只有访问时才会加载
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  },{
    path: '/cartList',//实际加载的路径
    name: 'CartList',//访问的路由节点
    // 动态路由，只有访问时才会加载
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
  }, {
    path: '/shop/:id',
    name: 'Shop',
    // 动态路由，只有访问时才会加载
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  }, {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home'}):  next();
    }
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home'}):  next();
    }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 路由做什么切换时都会执行，路由守卫，用户没登录前自动跳转到登录界面
router.beforeEach((to, from ,next) => {
  const { isLogin } = localStorage;
  const { name } = to;
  // 注册页面未登录的情况下不会跳转到登录页面
  const isLoginOrRegister = (name === "Login" || name === "Register");
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login'});
})
export default router