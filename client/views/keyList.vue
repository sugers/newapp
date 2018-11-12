<template>
  <div>
    <ul>
      <li v-for="(item,index) in keyList" :key="index">
        <img v-lazy="item.url" style="" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        keyList:[]
      }
    },
    created() {
      //  this.$nextTick(function() {
      //     this.getKey();
      //   })
    },
    methods(){
      // getKey(){
      //    this.axios.get('http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=0&count=99&kw=摄&start=0&count=99').then(function(res){
      //      console.log(res)
      //         // var datas=res.data.data.data;
      //         // var _that=this
      //         // $.each(datas, function(i, val) {
      //         //   if(i==Number(_that.routerid)){
      //         //     _that.imgList=val;
      //         //   }
      //         // });
      //     }.bind(this))
      // }
    }
  }
</script>
