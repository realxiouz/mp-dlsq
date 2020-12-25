<template>
  <div style="height:100vh;" class="pos-r">
    <div style="background:#5077a9;height:500rpx" class="pos-r">
      <div :style="{height: `${navBarHeight}px`}"></div>
      <div class="flex column align-center" >
        <div style="width:180rpx;height:180rpx;background:rgba(255,255,255,.4);border-radius:50%;" class="pos-r">
          <img
            class="pos-a"
            style="width:132rpx;height:132rpx;border-radius:50%;top:50%;left:50%;margin-left:-66rpx;margin-top:-66rpx;"
            :src="info.id?info.avatar:'/static/img/default.png'"
          />
        </div>
        <div style="margin-top:16rpx">
          <button v-if="!info.id" class="reset font14" style="color:#fff;" open-type="getUserInfo" @getuserinfo="onUserInfo">点击登录</button>
          <div v-else class="font14" style="color:#fff;">{{info.nickname}}</div>
        </div>
      </div>

      <div class="water">
				<div class="water-c">
					<div class="water-1"> </div>
					<div class="water-2"> </div>
				</div>
			</div>

      <img @click="onLogout" class="pos-a" style="width:60rpx;height:60rpx;right:40rpx;top:200rpx;" src="/static/img/setting.png" alt="">
    </div>
    
    <div class="bg-white flex" style="margin-top:60rpx;border-radius:16rpx;box-shadow: 0px 11px 44px 0px rgba(0, 0, 0, 0.09);">
      <div v-for="(i, inx) in navs" :key="inx" class="left flex align-center justify-around" style="height:144rpx;" @click="onNav(i)">
        <div class="color-primary font10 flex align-center column">
          <img style="width:48rpx;height:48rpx;margin-bottom:6rpx;" :src="i.img" alt="">
          <div>{{i.name}}</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { mapState } from 'vuex'
const NAVS = [
  {
    img: '/static/img/me0.png',
    name: '存水管理',
    path: '/pages/ship/index'
  },
  {
    img: '/static/img/me1.png',
    name: '地址管理',
    path: '/pages/address/list'
  },
  {
    img: '/static/img/me2.png',
    name: '购水记录',
    path: '/pages/history/order'
  },
  {
    img: '/static/img/me3.png',
    name: '配送记录',
    path: '/pages/history/ship'
  },
]

export default {
  onLoad(opt) {
    if (!this.info.id) {
      wx.login({
        success: ({code}) => {
          this.$post('user/getWxMiniProgramSessionKey', { code })
            .then(r => {
              let { session_key } = r.data
              this.session_key = session_key
            })
        }
      })
    }
  },
  data() {
    return {
      navs: NAVS
    }
  },
  computed: {
    ...mapState('device', ['navBarHeight']),
    ...mapState('user', ['info']),
  },
  methods: {
    onUserInfo(e) {
      let {encryptedData,signature,iv} = e.detail
      this.$post('user/wxMiniProgramLogin', {
        encryptedData,
        signature,
        iv,
        session_key: this.session_key
      }).then(r => {
        let { token } = r.data
        this.$setStorage('token', token)
        this.$store.commit('user/setToken', token)
        return this.$store.dispatch('user/updateInfo')
      }).then(r => {
        this.$toast('登录成功~~~')
      })
    },
    onNav(i) {
      if (this.info.id) {
        this.$go(i.path)
      } else {
        this.$toast('还未登录呢~~~')
      }
    }
  }
}
</script>

<style>
	.water {
		position: absolute;
		left: 0;
		bottom: -10upx;
		height: 30upx;
		width: 100%;
		z-index: 1;
	}

	.water-c {
		position: relative;
	}

	.water-1 {
		background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwMHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjQgKDE1NTc1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53YXRlci0xPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Ii0iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjEuMDAwMDAwLCAtMTMzLjAwMDAwMCkiIGZpbGwtb3BhY2l0eT0iMC4zIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9IndhdGVyLTEiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMS4wMDAwMDAsIDEzMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDcuNjk4NTczOTUgTDQuNjcwNzE5NjJlLTE1LDYwIEw2MDAsNjAgTDYwMCw3LjM1MjMwNDYxIEM2MDAsNy4zNTIzMDQ2MSA0MzIuNzIxMDUyLDI0LjEwNjUxMzggMjkwLjQ4NDA0LDcuMzU2NzQxODcgQzE0OC4yNDcwMjcsLTkuMzkzMDMwMDggMCw3LjY5ODU3Mzk1IDAsNy42OTg1NzM5NSBaIiBpZD0iUGF0aC0xIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==") repeat-x;
		background-size: 600upx;
		animation: wave-animation-1 4.5s infinite linear;
	}

	.water-2 {
		top: 5upx;
		background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwMHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjQgKDE1NTc1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53YXRlci0yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Ii0iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjEuMDAwMDAwLCAtMjQ2LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0id2F0ZXItMiIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIxLjAwMDAwMCwgMjQ2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsNy42OTg1NzM5NSBMNC42NzA3MTk2MmUtMTUsNjAgTDYwMCw2MCBMNjAwLDcuMzUyMzA0NjEgQzYwMCw3LjM1MjMwNDYxIDQzMi43MjEwNTIsMjQuMTA2NTEzOCAyOTAuNDg0MDQsNy4zNTY3NDE4NyBDMTQ4LjI0NzAyNywtOS4zOTMwMzAwOCAwLDcuNjk4NTczOTUgMCw3LjY5ODU3Mzk1IFoiIGlkPSJQYXRoLTIiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwMC4wMDAwMDAsIDMwLjAwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMzAwLjAwMDAwMCwgLTMwLjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==") repeat-x;
		background-size: 600upx;
		animation: wave-animation-2 8s infinite linear;
	}

	.water-1,
	.water-2 {
		position: absolute;
		width: 100%;
		height: 60upx;
	}

	@keyframes wave-animation-1 {
		0% {
			background-position: 0 top;
		}

		100% {
			background-position: 600upx top;
		}
	}

	@keyframes wave-animation-2 {
		0% {
			background-position: 0 top;
		}

		100% {
			background-position: 600px top;
		}
	}
</style>