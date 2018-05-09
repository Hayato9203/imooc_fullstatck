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
      goods: null,
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
      sortFlag: true
    }
  },
  components: {
    NavHeader, NavFooter, NavBread
  },
  mounted () {
    // 页面加载时即刻访问后台取得数据
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      this.goods = (await GoodsService.index()).data
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
    sortPrice () {
      this.sortFlag = !this.sortFlag
      if (this.sortFlag) {
        this.goods.sort(function (a, b) {
          if (parseFloat(a.productPrice) < parseFloat(b.productPrice)) return -1
          if (parseFloat(a.productPrice) > parseFloat(b.productPrice)) return 1
          return 0
        })
      } else {
        this.goods.sort(function (a, b) {
          if (parseFloat(a.productPrice) < parseFloat(b.productPrice)) return 1
          if (parseFloat(a.productPrice) > parseFloat(b.productPrice)) return -1
          return 1
        })
      }
    }
  },
  computed: { }
}
</script>
