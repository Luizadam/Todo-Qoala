<template>
  <div class="container-fluid ">
      
    <div class="row " id="batas" >
      <div class="animasi ">
        <span >{{MyText}}</span>  
      </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
     <div class="form-group">
       <form @submit.prevent="saveName">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Name " v-model="DataName">
 <button class="btn btn-dark text-center" type="submit" style="float:right" >Lanjutkan</button>
    </form>
  </div>
     
        </div>
      </div>
    </div>
    </div>
    
    <div class="footer text-center">
      <hr/>
  <span style="color:black"><a href="https://www.instagram.com/luizadaaam/" ><p>© 2020 - By Luiz Adam Rifaldi</p></a></span>
</div>
  </div>
  
</template>
<script>
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      DataName:"",
      MyText:"WELCOME TO MY TODOS"
    };
  },
  methods:{
    saveName(){
      if(this.DataName == ""){
        Swal.fire({
  title: 'Error!',
  text: 'data cannot be empty',
  icon: 'error',
  confirmButtonText: 'OK'
})
return
      }
      localStorage.setItem("name",this.DataName)
      this.$router.push("/todo")
    }
  },
};
</script>

<style >
#batas{
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 20%;
}
.card{
  border-radius: 20px;
}
body{
background: rgb(241,249,249);
background: linear-gradient(270deg, rgba(241,249,249,1) 0%, rgba(255,234,234,0.9671218829328606) 100%);
}
@media only screen and (max-width: 600px) {
  #batas {
    margin:8%
  }
}
.animasi {
  color: black;
  font-family:sans-serif;
  font-weight:lighter;
  font-size: 2em;
  white-space: nowrap;
  overflow: hidden;
  position: center;
  width: 30em;
  animation: keyframes 9s steps(500) infinite;
}
@keyframes keyframes{
 
  from{ width: 0px;}
 
}
</style>