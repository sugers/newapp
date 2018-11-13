
<template>
  <div class="idList">
    <Header></Header>
    <ul>
      <li v-for="(item,index) in imgList" :key="index">
        <img v-lazy="item.url" style="" />
      </li>
    </ul>
  </div>
</template>

<script>
  import Header from '@/components/header'
  export default {
    data() {
      return {
        imgList: [],
        search: {}
      }
    },
    components: {
      Header
    },
    created() {
      this.$nextTick(function() {
        this.postSearch();
      })
    },
    methods: {
      postSearch() {
        this.$http.post('http://localhost:3030/api/keyList', this.$route.query).then(function(res) {
          console.log(res)
          this.getSearch();
        })

      },
      getSearch() {
        this.$http.get('http://localhost:3030/api/keyList').then(function(res) {
          var datas=res.data.data.data;
              this.imgList=datas
              // $.each(datas, function(i, val) {
              //   if(i==Number(_that.routerid)){
              //     _that.imgList=val;
              //   }
              // });
        })
      }
    }
  }
</script>

<style scoped>
  .idList ul li {
    float: left;
    width: 33.33%;
    padding: 12px 10px;
  }

  .idList ul li img:hover {
    box-shadow: 2px 3px 8px #0095ff;
  }
</style>
