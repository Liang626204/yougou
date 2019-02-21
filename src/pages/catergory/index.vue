<template>
  <div class="cate">
    <search/>
    <div class="cate_mian">
    <view class="cate_left">
      <view class="left_list" v-for="(item, index) in lists" :key="index">{{item}}</view>
    </view>
    <view class="cate_right"></view>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import search from '@/components/search'

export default {
  components: {
    search
  },

  data () {
    return {
      lists:[1,2,3,4,5,6,7,1,1,1,1,1,1,1,1,1,1,1,1,]
    }
  },

  created () {
    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
    } else {
      logs = mpvue.getStorageSync('logs') || []
    }
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>

<style lang="scss" scoped>
  .cate_mian{
    display: flex;
    position: fixed;
    left: 0;
    top: 100rpx;
    right: 0;
    bottom: 0;
    background-color: #0094ff;
    .cate_left{
      width: 200rpx;
      height: 100%;
      background-color: #f4f4f4;
      overflow: scroll;
      .left_list{
        border-bottom: 1px solid #ccc;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
      }
    }
    .cate_right{
      flex: 1;
      background-color: red;
      height: 100%;
    }
  }
</style>
