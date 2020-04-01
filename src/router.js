import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
    linkExactActiveClass: "active",
    mode: "history",
    routes: [
    
        {
            path: "/",
            name: "landing",
            
            component: () =>
              import(/* webpackChunkName: "demo" */ "./components/landing.vue")
          },
          {
            path: "/todo",
            name: "Todo",
            
            component: () =>
              import(/* webpackChunkName: "demo" */ "./components/TodoList.vue")
          },
    ]
})
export default router;