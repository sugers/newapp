<template>
  <div id="top_bg">
    <el-form ref="form">
      <el-input v-model="searchVal"></el-input>
      <el-button icon="el-icon-search" circle @click="getKeyList" ></el-button>
    </el-form>
    <wc-swiper v-if="imgList.length" class="s_height">
      <wc-slide v-for="(slide, key) in imgList" :key="key">
        <img :src="slide" />
      </wc-slide>
    </wc-swiper>

    <div style="padding-top:20px;">
      <p style="text-align:left;font-size:25px;">
        <span>标签 &nbsp;|</span>
      </p>
    </div>
    <div class="label">
      <ul>
        <li v-for="(item,index) in listData" :key="index" @click="getdom">
          <a>
            <span :id="item.id">{{item.name}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mark: 0,
        imgList: [
          '/static/img/3.jpg',
          '/static/img/1.jpg',
          '/static/img/2.jpg'
        ],
        listData: [],
        id: '',
        searchVal:''
      }
    },
    created() {
      this.$nextTick(function() {
        this.getList()
      })
    },
    methods: {
      getList() {
        this.$http.get('http://localhost:3030/api/getlist').then(function(res) {
          var datas = res.data.data.data;
          this.listData = datas;
        }.bind(this))
      },
      getdom(event) {
        this.id = Number(event.target.id)
        this.$router.push({
          path: '/idlist',
          name: 'idList',
          query: {
            c: "WallPaperAndroid",
            a: "getAppsByCategory",
            cid: this.id,
            start: 0
          }
        })

      },
      getKeyList(event) {
          this.$router.push({
             path: '/search',
             name: 'search',
            query: {
               c: "WallPaperAndroid",
               a: "search",
               start:0,
               count:99,
               kw: this.searchVal,
            }
          })
          // this.$http.post('http://localhost:3030/api/keyList').then(function(res){

          // }.bind(this))
        // })我的生涯一片无悔，想起那天夕阳下的奔跑，那是我逝去的青春
         //d1b7a3f87c816cd385e85e384273bca2c3e41921
      }
    }
  }
</script>

<style scoped>
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%
  }

  #top_bg {
    width: 100%;
    height: 125px;
  }

  #top_bg img {
    max-width: 100%;
  }

  .el-input {
    width: 75%;
    padding: 10px 0px;
  }

  .label ul li {
    float: left;
  }

  .label ul li {
    padding: 10px;
    cursor: pointer;
  }

  .label ul li a {
    font-size: 25px;
  }

  .label ul li a:active {
    color: #0095ff;
  }
</style>
