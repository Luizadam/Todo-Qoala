<template>
    
  <div class="container">
      <div class="row " id="loading">
      <div class="col-md-12 mt-5">
    <div>{{ percent }}%</div>
    <div class="loading-bar" >
      <div class="percentage text-center"  :style="{'width' : percentage + '%'} " keyon="router"></div>
    </div>
      </div>
      </div>
  </div>
  
  <!-- Youtube Link -->

</template>
<script>
export default {
//   name:'#app',
  data: () => {
    return {
      percentage: 0
    }
  },
  
  computed: {
    percent() {
        if(this.percentage == 100){
            this.$router.push('/landing')
        } 
      return this.percentage.toFixed();
      
    }
  },
  created() {
    var intval = setInterval(() => {
      if(this.percentage < 100)
        this.percentage += .1;
      else
        clearInterval(intval);
    }, 10);
    if(this.percentage == 100){
            this.$router.push('/landing')
        } 
  }
}
</script>
<style lang="scss" scoped>

#loading{
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 25px;
}

.container {
  text-align: right;
  font-size: 8rem;
  color: #555;
}

.loading-bar {
  position: relative;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba($color: #000, $alpha: .4), 
    0 -1px 1px #fff, 0 1px 0 #fff;

  .percentage {
    // position: absolute;
    top: 1px; left: 1px; right: 1px;
    display: block;
    height: 100%;
    border-radius: 15px;
    background-color: #a5df41;
    background-size: 30px 30px;
    background-image: linear-gradient(135deg, rgba($color: #fff, $alpha: .15) 25%, transparent 25%,
      transparent 50%, rgba($color: #fff, $alpha: .15) 50%,
      rgba($color: #fff, $alpha: .15) 75%, transparent 75%,
      transparent); 
    animation: animate-stripes 3s linear infinite;
  } 
}

@keyframes animate-stripes {
  0% { background-position: 0 0; }
  100% { background-position: 60px 0; }
}

/* Youtube Link */
#yt_link
{
  position: absolute;
  right: 0;
  left: 0;
  bottom: -200px;
  display: block;
  width: 160px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  text-decoration: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 10px;
  margin: 0 auto;
  background-color: red;
  border-radius: 2px;
  animation: showYtLink 1.5s ease 3s forwards;
}

@keyframes showYtLink
{
  0%{ bottom: -200px; }
  100%{ bottom: 20px; }
}
</style>