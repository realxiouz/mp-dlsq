<template>
  <div class="flex column" style="height:100vh;">
    <div style="background:#BCD0EB;position:sticky;top:0;height:211rpx;z-index:-1;"></div>
    <div class="c">
      <div class="l1">
        <div>{{list[curInx].t}}</div>
      </div>
      <div class="l2">{{list[curInx].c}}</div>
    </div>
    <div class="left"></div>
    <scroll-view style="height:222rpx;white-space: nowrap;" :scroll-x="true">
      <img @click="toggle(inx)" v-for="i, inx in list" :key="inx" :src="i.img" style="width:222rpx;height:222rpx;margin:0 24rpx;" alt="">
    </scroll-view>
    <div class="left"></div>
  </div>
</template>

<script>
export default {
  onLoad(opt) {
    this.curInx = opt.inx || 0
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


      list: [
        {
          t: '稀有的高贵品质',
          c: '不是每一款水，都有这么美好的标签。穿越千万载时空，自然的珍藏方得在大理矿泉身上呈现。大理矿泉的天然PH值为8.0，属于弱碱性，最接近人体体液的PH值范围。溶解性总固体＜96.53口感清冽顺润，优于国家标准钙镁含量为26.65mg/L,属于极软水，对母婴群体无负担，口感好。偏硅酸含量为36.24m“人体软黄金”偏硅酸，具有软化心血管和强健骨骼的作用。',
          img: 'https://yunnanxinzijia.com/uploads/20210114/803df5dccfa32e3bfc825a412eecaef8.png'
        },
        {
          t: '珍贵的唯一水源地',
          c: '每一滴大理矿泉水，都是大理冰川历经时空穿越而来。每一滴大理矿泉， 都要经过 日照月华的洗礼，大理石岩层的磨炼， 历经16.5年 方得此稀世珍水大理矿泉。大理，有最纯的山风；最纯的野花；最纯的雪；最纯的月光；最纯的人；当然也有最纯净的水 。时还拥有苍山世界地质公园内唯一合法的饮用天然矿泉水采矿权。',
          img: 'https://yunnanxinzijia.com/uploads/20210114/e9c5292e8f5bf9598f6134ffdffeb2cd.png'
        },
        {
          t: '先进的饮水方式',
          c: '饮水，让生活充满仪式感，带给你我品质与品位。大理矿泉革命性的饮水方式--袋装水，让好水以更好的方式进入人体。配套的袋装水饮水机，也与国际饮水方式同步。同时此套饮水设备也引进了诸如 ：一键3秒制开水，无需预热，杜绝水垢，无需反复加热，省电、低碳环保等先进功能。',
          img: 'https://yunnanxinzijia.com/uploads/20210114/4c5a89f0200d235db295928016524652.png'
        },
      ],
      curInx: 0,
    }
  },
  methods: {
    onShowAd(i) {
      this.selImg = i
      this.showImg = true
    },
    toggle(inx) {
      if(this.curInx != inx) {
        this.curInx = inx
      }
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

.c{
  width: 650rpx;
  margin: -151rpx auto;
  background: #fff;
  // height: 720rpx;
  min-height: 650rpx;
  border-radius: 36rpx;
  z-index: 2;
  padding: 80rpx;
  font-size: 12px;
  color: #323232;
  .l1{
    text-align: center;
    margin-bottom: 48rpx;
    font-size: 16px;
  }
  .l2{
    line-height: 1.8;
  }
}
</style>