<template>
    <div class="search">
      <div class="search_input" space="ensp" @tap = 'toGoods_list'>
        <icon type="search" size="32rpx"/> 搜索
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    toGoods_list(){
      console.log(123)
      wx.navigateTo({
      url: '/pages/goods_list/main'
      })
    }
  }
}
</script>

<style>
.search {
  background-color: #eb4450;
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
</style>
