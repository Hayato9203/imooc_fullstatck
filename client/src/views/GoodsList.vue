<template>
    <div>
      <nav-header />
      <nav-bread>
        <span slot="bread">Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <!-- 商品排序 -->
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <!-- 价格排序 -->
            <a href="javascript:void(0)" class="price" @click="sortPrice">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <!-- 小屏幕被折叠起来的话,使用类似toggle功能的样式 -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <!-- 默认选中all显示样式 -->
                <dd><a href="javascript:void(0)"
                  :class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All
                </a></dd>
                <!-- 选中价格样式 -->
                <dd v-for="(price,index) in priceFilter" :key="price.id">
                  <a href="javascript:void(0)" :class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">
                    {{price.startPrice}} - {{price.endPrice}}
                  </a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="good in goods" :key="good.id">
                    <div class="pic">
                      <a href="#"><img :src="'/static/'+good.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{good.productName}}</div>
                      <div class="price">{{good.productPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" class="load-more">
                  加载中...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
import '@/assets/css/base.css'
import '@/assets/css/login.css'
import '@/assets/css/product.css'
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'
import NavBread from '@/components/Bread'
import GoodsService from '@/services/GoodsService'

export default{
  data () {
    return {
      goods: [],
      priceFilter: [
        { startPrice: 0.00, endPrice: 500.00 },
        { startPrice: 500.00, endPrice: 1000.00 },
        { startPrice: 1000.00, endPrice: 2000.00 }
      ],
      // 控制价格选中样式
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false,
      // 商品排序
      sortFlag: true,
      // 控制滚动加载状态,true为禁止滚动
      busy: true,
      // 默认页码和页面数目
      page: 1,
      pageSize: 8
    }
  },
  components: {
    NavHeader, NavFooter, NavBread
  },
  mounted () {
    // 页面首次加载时即刻访问后台取得数据
    this.getGoodsList()
  },
  methods: {
    // p: 接收页码, scroll: 数据滚动加载状态
    async getGoodsList (scroll) {
      // 先取得要请求的页码的数据,这样做有bug,就算页码p没数据还是会发送请求
      let requestObj = (await GoodsService.index(this.page, this.pageSize)).data
      // 判段数据是否在滚动加载状态,是的话就添加到现有数据
      if (scroll) {
        if (requestObj.length !== 0) {
          // 拼接商品对象数组
          this.goods = [...this.goods, ...requestObj]
          // 否则,启用滚动加载状态,监听下次加载数据
          this.busy = false
        } else {
          // 如果页码p处后没有数据了,把滚动加载状态关闭,不再监听滚动
          this.busy = true
        }
      } else {
        // 不在滚动加载状态的话,直接返回数据
        this.goods = requestObj
        this.busy = false
      }
      // console.log(`Goods Length: ${this.goods.length}`)
    },
    // 小屏幕显示被折叠的价格
    showFilterPop () {
      this.filterBy = true
      this.overLayFlag = true
    },
    // 小屏幕时将价格隐藏
    closePop () {
      this.filterBy = false
      this.overLayFlag = false
    },
    // 修改选中价格的样式,并折叠侧边的价格
    setPriceFilter (index) {
      this.priceChecked = index
      this.closePop()
    },
    // 商品排序,对象数组排序
    sortPrice () {
      this.sortFlag = !this.sortFlag
      if (this.sortFlag) {
        this.goods.sort(function (a, b) {
          // 降序
          if (parseFloat(a.productPrice) < parseFloat(b.productPrice)) return -1
          if (parseFloat(a.productPrice) > parseFloat(b.productPrice)) return 1
          return 0
        })
      } else {
        this.goods.sort(function (a, b) {
          // 升序
          if (parseFloat(a.productPrice) < parseFloat(b.productPrice)) return 1
          if (parseFloat(a.productPrice) > parseFloat(b.productPrice)) return -1
          return 1
        })
      }
    },
    // 滚动加载函数
    loadMore () {
      // 每次scoll发送请求前禁止滚动
      this.busy = true
      // 请求的商品列表可能非常大,会对服务器造成压力,所以使用setTimeout控制请求,防止无止境加载
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      }, 1000)
    }
  }
}
</script>

<style scoped>
.load-more {
  height: 100;
  width: 100;
  text-align: center;
}
</style>
