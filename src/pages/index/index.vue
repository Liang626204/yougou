<template>
  <div class="index">
    <search/>
    <!-- 轮播 -->
    <swiper
      indicator-dots
      autoplay
    >
      <block v-for="(item, index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item.image_src" class="slide-image" width="355rpx" height="150rpx">
          </image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 分类 -->
    <div class="catitems">
      <div class="fenlei" v-for="(item, index) in catitems " :key="index">
        <img :src="item.image_src" alt="" class="tu">
      </div>
    </div>
    <!-- 商品分类 -->
    <div class="floordata">
      <div class="floordatalist" v-for="(item, index) in floors " :key="index">
        <img :src="item.floor_title.image_src" alt="" class="floordatalisttitle">
        <div class="floordatainfo">
          <div class="infoleft">
            <img :src="item.product_list[0].image_src" alt="" class="floordatalisttitle">
          </div>
          <div class="inforight">
            <div class="inforightlist">
              <img :src="item.product_list[1].image_src" alt="" class="floordatalisttitle">
            </div>
            <div class="inforightlist">
              <img :src="item.product_list[2].image_src" alt="" class="floordatalisttitle">
            </div>
            <div class="inforightlist">
              <img :src="item.product_list[3].image_src" alt="" class="floordatalisttitle">
            </div>
            <div class="inforightlist">
              <img :src="item.product_list[4].image_src" alt="" class="floordatalisttitle">
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/search";

export default {
  data() {
    return {
      imgUrls:[],
      catitems:[],
      floors:[]
    };
  },

  components: {
    search
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    }
  },

  created() {

  },
  mounted () {
    let that = this;
    wx.request({
      url:'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
      success(res){
        console.log(res)
        that.imgUrls = res.data.message

      }
    })
    wx.request({
      url:'https://www.zhengzhicheng.cn/api/public/v1/home/catitems',
      success:(res)=>{
        console.log(res)
        this.catitems = res.data.message
      }
    })
    wx.request({
      url:'https://www.zhengzhicheng.cn/api/public/v1/home/floordata',
      success:(res)=>{
        console.log('------')
        console.log(res)
        console.log('------')
        this.floors = res.data.message
      }
    })
  }

};
</script>

<style lang="scss" scoped>

.slide-image{
  width: 100%;
}
.catitems{
  display: flex;
  justify-content: space-around;
}
.fenlei{
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 24rpx 0 29rpx 0;
  
}
.tu{
  width: 128rpx;
  height: 128rpx;
  
}
.floordatalisttitle{
  width: 100%;
  height: 100rpx;
}
.floordatainfo{
  display: flex;
}
.infoleft{
  img{
    width: 230rpx;
    height: 360rpx;
  }
  flex: 2
}
.inforight{
  flex: 4;
  display: flex;
  flex-wrap: wrap;
  .inforightlist{
    width: 50%;
    height: 50%;
    img{
      width: 96%;
      height: 96%;
      border-radius: 20rpx;
    }
  }
}
</style>

