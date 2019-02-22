<template>
  <view>
    <div class="search">
      <div class="search_input" space="ensp" @tap="toGoods_list">
        <icon type="search" size="32rpx"></icon>{{search_data.keys}}
      </div>
    </div>
    <view class="totle">
      <div class="totle_title">
        <div>综合</div>
        <div>销量</div>
        <div>价格</div>
      </div>
      <view class="totle_list">
        <div class="list" v-for="(item , index) in totel_list" :key="index">
          <div class="list_left">
            <img :src="item.goods_small_logo" alt>
          </div>
          <div class="list_right">
            <p>
              {{item.goods_name}}
            </p>
            <em>￥{{item.goods_price}}</em>
          </div>
        </div>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from "@/utils/index";
export default {

  data() {
    return {
      
      search_data:{
        query: '小米',
        pagenum: 1,
        pagesize:20
      },
      totel_list:[]
    };
  },
  onLoad(query) {
    console.log("小程序生命周期函数onLoad", query);
    console.log(this.key);
    this.getdata()
  },
  methods: {
    getdata(){
      request("https://www.zhengzhicheng.cn/api/public/v1/goods/search", 'GET', this.search_data)
      .then(res=>{
        console.log(res)
        this.totel_list = res.data.message.goods
      })
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.search {
  background-color: #ccc;
  padding: 20rpx 16rpx;
}
.search_input {
  box-sizing: content-box;
  height: 60rpx;
  background-color: #fff;
  color: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx;
}
.totle {
  .totle_title {
    display: flex;
    justify-content: space-around;
    div {
      flex: 1;
      text-align: center;
      padding: 20rpx;
      &:active {
        color: red;
      }
    }
  }
  .list {
    padding-bottom: 20rpx;
    display: flex;
    border-bottom: 1px solid #ccc;
    .list_left {
      flex: 1;
      img {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .list_right {
      height: 200rpx;
      flex: 3;
      padding: 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
      }
      em {
        margin-bottom: 20rpx;
        color: red;
      }
    }
  }
}
</style>
