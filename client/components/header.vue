<template>
    <div class="h_title">
      <p @click="$router.back(-1)"><i class="el-icon-arrow-left"></i></p>
    </div>
</template>
<script>
   export default {
     data(){
       return{

       }
     }
   }
</script>

<style scoped>
  .h_title{
    height: 50px;
    font-size: 50px;
    line-height: 50px;
    text-align: left;
    padding-left: 20px;
    background: -webkit-linear-gradient(left, #0095ff, #fdf6ec);
    color: #fff;
  }
  .h_title p{
    cursor:pointer;
  }
</style>
