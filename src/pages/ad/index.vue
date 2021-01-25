<template>
  <div>
    <swiper class="ad-wrap" previous-margin="60rpx" next-margin="60rpx" :current="inx">
      <swiper-item class="ad-item">
        <div class="ad-c">
          <img src="https://xzj.csywlkj.com/uploads/20201230/c045a3913b12a7aa796f48abeb6ddee4.png" style="width:100%" mode="widthFix" alt="">
          <div class="text-center" style="font-size:14px;color:#060606;line-height:130rpx;">稀有的高贵品质</div>
          <div class="" style="font-size:12px;width:400rpx;line-height:36rpx;">
            不是每一款水，都有这么美好的标签。穿越千万载时空，自然的珍藏方得在大理矿泉身上呈现。
            大理矿泉的天然PH值为8.0，属于弱碱性，最接近人体体液的PH值范围。溶解性总固体＜96.53口感清冽顺润，优于国家标准钙镁含量为26.65mg/L,属于极软水，
            对母婴群体无负担，口感好。偏硅酸含量为36.24m“人体软黄金”偏硅酸，具有软化心血管和强健骨骼的作用。
          </div>
          <div style="flex:1;height:0"></div>
          <div class="btns">
            <img src="https://xzj.csywlkj.com/uploads/20201230/8b94f9a51f9fc4a57603054b839a845b.png" style="width:86rpx" mode="widthFix">
            <img v-for="(i, inx) in arr[0]" :key="inx" :src="i" style="width:86rpx" mode="widthFix" @click="onShowAd(i)">
          </div>
        </div>
      </swiper-item>
      <swiper-item class="ad-item">
        <div class="ad-c">
          <img src="https://xzj.csywlkj.com/uploads/20201230/9b98b2a1cac5819a52541eef5c4a27a7.png" style="width:100%" mode="widthFix"/>
          <div class="text-center" style="font-size:14px;color:#060606;line-height:130rpx;">珍贵的唯一水源地</div>
          <div class="" style="font-size:12px;width:400rpx;line-height:36rpx;">
            每一滴大理矿泉水，都是大理冰川历经时空穿越而来。
            每一滴大理矿泉， 都要经过 日照月华的洗礼，大理石岩层的磨炼， 历经16.5年 
            方得此稀世珍水大理矿泉。
            大理，有最纯的山风；最纯的野花；最纯的雪；最纯的月光；最纯的人；当然也有最纯净的水 。
            同时还拥有苍山世界地质公园内唯一合法的饮用天然矿泉水采矿权。
          </div>
          <div style="flex:1;height:0"></div>
          <div class="btns">
            <img src="https://xzj.csywlkj.com/uploads/20201230/8b94f9a51f9fc4a57603054b839a845b.png" style="width:86rpx" mode="widthFix">
            <img v-for="(i, inx) in arr[1]" :key="inx" :src="i" style="width:86rpx" mode="widthFix" @click="onShowAd(i)">
          </div>
        </div>
      </swiper-item>
      <swiper-item class="ad-item">
        <div class="ad-c">
          <img src="https://xzj.csywlkj.com/uploads/20201230/a58cef9e7e7148c3cc1bc37e1cb9886f.png" style="width:100%" mode="widthFix">
          <div class="text-center" style="font-size:14px;color:#060606;line-height:130rpx;">先进的饮水方式</div>
          <div class="" style="font-size:12px;width:400rpx;line-height:36rpx;">
            饮水，让生活充满仪式感，带给你我品质与品位。大理矿泉革命性的饮
            水方式--袋装水，让好水以更好的方式进入人体。配套的袋装水饮水机，
            也与国际饮水方式同步。同时此套饮水设备也引进了诸如 ：一键3秒制
            开水，无需预热，杜绝水垢，无需反复加热，省电、低碳环保等先进功
            能。
          </div>
          <div style="flex:1;height:0"></div>
          <div class="btns">
            <img src="https://xzj.csywlkj.com/uploads/20201230/8b94f9a51f9fc4a57603054b839a845b.png" style="width:86rpx" mode="widthFix">
            <img v-for="(i, inx) in arr[2]" :key="inx" :src="i" style="width:86rpx" mode="widthFix" @click="onShowAd(i)">
          </div>
        </div>
      </swiper-item>
    </swiper>

    <modal :show.sync="showImg" :is-bottom="false">
      <img style="width:710rpx" :src="selImg" mode="widthFix" alt="">
    </modal>
  </div>
</template>

<script>
export default {
  onLoad(opt) {
    this.inx = opt.inx
  },
  data() {
    return {
      showImg: false,
      inx: 0,

      arr: [
        [
          'https://yunnanxinzijia.com/uploads/20210114/803df5dccfa32e3bfc825a412eecaef8.png',
          'https://yunnanxinzijia.com/uploads/20210114/638ee5e8752eb5710af33f47252fa90b.png',
          'https://yunnanxinzijia.com/uploads/20210114/75517134a477b77ad0f53c90398d3626.png',
          'https://yunnanxinzijia.com/uploads/20210114/d29b6e3e01d9ecc03607c1284c3fee77.png'
        ],
        [
          'https://yunnanxinzijia.com/uploads/20210114/e9c5292e8f5bf9598f6134ffdffeb2cd.png'
        ],
        [
          'https://yunnanxinzijia.com/uploads/20210114/4c5a89f0200d235db295928016524652.png',
          'https://yunnanxinzijia.com/uploads/20210114/3323eb2db39c587c74c69dcefb80ec79.png'
        ]
      ],
      selImg: '',
    }
  },
  methods: {
    onShowAd(i) {
      this.selImg = i
      this.showImg = true
    }
  }
}
</script>

<style lang="less">
.ad-wrap{
  width: 100vw;
  height: 100vh;
  padding: 40rpx 0;
  .ad-item{
    padding: 0 15rpx;
    box-sizing: border-box;
    .ad-c{
      background:#fff;
      height: 100%;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .btns{
        margin-bottom: 35rpx;
        display: flex;
        padding-left: 50rpx;
        width: 100%;
        >img{
          margin-right: 18rpx;
        }
      }
    }
  }
}
</style>