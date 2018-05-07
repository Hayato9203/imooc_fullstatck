<template>
    <div>
      <nav-header />
      <nav-bread>
        <span slot="bread">Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)"
                  :class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All
                </a></dd>
                <dd v-for="(price,index) in priceFilter" :key="price.id">
                  <a href="javascript:void(0)" :class="{'cur':priceChecked==index}" @click="priceChecked=index">
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
      priceChecked: 'all'
    }
  },
  components: {
    NavHeader, NavFooter, NavBread
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      this.goods = (await GoodsService.index()).data
    }
  }
}
</script>
