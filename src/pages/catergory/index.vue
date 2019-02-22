<template>
  <div class="cate">
    <search/>
    <div class="cate_mian">
      <scroll-view scroll-y class="cate_left">
        <view
          class="left_list"
          v-for="(item, index) in lists"
          :key="index"
          :class="{active: index === tabIndex}"
          @tap="chooselist(index)"
        >{{item.cat_name}}</view>
      </scroll-view>
      <scroll-view class="cate_right" scroll-y>
        <view class="right_list">
          <div class="totle_list" v-for="(list, index) in list_info" :key="index">
            <view class="list_title">{{list.cat_name}}</view>
            <view class="info">
              <div class="list_info" 
              v-for="(list_item, indexs) in list.children" 
              :key="indexs"
              @tap="search_list(list_item.cat_name)"
              >
                <img
                  :src="list_item.cat_icon"
                  alt
                >
                <p>{{list_item.cat_name}}</p>
              </div>
            </view>
          </div>
        </view>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";
import search from "@/components/search";

export default {
  components: {
    search
  },

  data() {
    return {
      lists: [],
      list_info: {},
      totle_data:[],
      tabIndex:0
    };
  },

  created() {
    let logs;
    if (mpvuePlatform === "my") {
      logs = mpvue.getStorageSync({ keys: "logs" }).data || [];
    } else {
      logs = mpvue.getStorageSync("logs") || [];
    }
    this.logs = logs.map(log => formatTime(new Date(log)));
  },
  methods: {
    chooselist(index) {
      console.log(index);
      console.log('---------------');
      this.tabIndex = index;
      console.log(this.tabIndex)
      /* 处理点击时候从头开始 */
      this.list_info = [];
      setTimeout(() => {
        this.list_info = this.totle_data[index].children;
      }, 0);
      
    },
    search_list(keys){
      console.log(keys); 
       wx.navigateTo({
      url: '/pages/goods_list/main'+'?keys='+keys
      }) 
    }
  },
  mounted() {
    wx.request({
      url: "https://www.zhengzhicheng.cn/api/public/v1/categories",
      success: res => {
        console.log(res.data.message);
        this.lists = res.data.message;
        this.totle_data = res.data.message
        this.list_info = res.data.message[0].children;
        console.log(this.list_info);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.cate_mian {
  display: flex;
  position: fixed;
  left: 0;
  top: 100rpx;
  right: 0;
  bottom: 0;
  .cate_left {
    width: 200rpx;
    height: 100%;
    background-color: #f4f4f4;
    .left_list {
      border-bottom: 1px solid #ccc;
      height: 100rpx;
      text-align: center;
      line-height: 100rpx;
      &.active {
        color: red;
        background-color: #fff;
        &::before {
          float: left;
          content: "";
          display: block;
          width: 20rpx;
          height: 100rpx;
          background-color: red;
        }
      }
    }
  }
  .cate_right {
    flex: 1;
    height: 100%;
    .right_list {
      text-align: center;

      .list_title {
        text-align: center;
        padding: 40rpx;
        &::before {
          content: "/";
          color: #ccc;
        }
        &::after {
          content: "/";
          color: #ccc;
        }
      }
      .info {
        display: flex;
        flex-wrap: wrap;

        .list_info {
          width: 33.3%;
          padding-bottom: 20rpx;
          img {
            width: 90%;
            height: 120rpx;
          }
        }
      }
    }
  }
}
</style>
