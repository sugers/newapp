
<template>
  <div class="idList">
    <Header></Header>
    <ul>
      <li v-for="(item,index) in imgList" :key="index">
        <img v-lazy="item.url" style=""/>
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
        routerid:''
      }
    },
    components :{
        Header
    },
    created() {
      this.$nextTick(function() {
          this.getParams();
          this.getidList();
        })
    },
     methods: {
          getParams() {
            // 取到路由带过来的参数
            this.routerid = this.$route.query.cid;
          },
          getidList() {
             this.$http.get('http://localhost:3030/api/idimg').then(function(res){
              var datas=res.data.data.data;
              var _that=this
              $.each(datas, function(i, val) {
                if(i==Number(_that.routerid)){
                  _that.imgList=val;
                }
              });
             }.bind(this))
          }
        }
  }
</script>

<style scoped>
  .idList ul li{
    float:left;
    width:33.33%;
    padding:12px 10px;
  }
  .idList ul li img:hover{
     box-shadow: 2px 3px 8px #0095ff;
  }

</style>
