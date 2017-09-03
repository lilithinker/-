<template>
 <div class="slide-show"  @mouseover="clearInv()" @mouseout="runInv()">
   <div class="slide-img">
     <a :href="slides[nowIndex].href">
        <transition name="slide-trans-new" >
          <img v-bind:src="slides[nowIndex].src" v-if="isShow">
       </transition>
        <transition name="slide-trans-old">
            <img v-bind:src="slides[nowIndex].src" v-if="!isShow">
       </transition>

     </a>
   </div>
   <h2>{{slides[nowIndex].title}}</h2>
   <ul class="slide-pages">
     <li @click="goto(indexPrevious)">&lt;</li>
     <li v-for="(item,index) in slides" @click="goto(index)">
       <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
     </li>
     <li @click="goto(indexNext)">&gt;</li>
   </ul>
 </div>
</template>

<script>
export default {
  props:{
     slides:{
        type:Array,
        default:[]
      },
      inv:{
        type:Number,
        default:1000
      }
  },
  //******************props-over
  data () {
    return {
      isShow:true,
      nowIndex: 0
    }
  },
  //****************data-over
  methods:{
    goto(index){
      this.isShow=false
      setTimeout(()=>{
        this.isShow=true
        this.nowIndex=index
        // this.$emit('onchange')
      },10)
    },
  //幻灯片自动播放
    runInv(){
      this.invId=setInterval(()=>{
        this.goto(this.indexNext)
      },this.inv)
    },
    clearInv(){
      clearInterval(this.invId)
    }
  },
    mounted(){
      this.runInv()
    },
  //******************methods-over
  computed:{
    indexPrevious(){
      if(this.nowIndex===0){
        return this.slides.length-1
      }else{
        return this.nowIndex-1
      }
    },
    indexNext(){
      if(this.nowIndex===this.slides.length-1){
          return 0
      }else{
        return this.nowIndex+1
      }
    }
  }
//last line
}

 
</script>

<style scoped>
.slide-trans-new-enter-active {
  transition: all .5s;
}
.slide-trans-new-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
}
.slide-trans-old-leave-to{
    transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>
