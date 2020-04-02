<template>
  <div class="container-fluid">
    <h2 class="mt-5">{{ this.ucapan }} {{ Myname }}</h2>
    <div class="row" id="batas1">
      <div class="col-md-12">
        <AddTodo />
      </div>
    </div>
    <div class="row mt-5">
      <div
        class="col-md-4"
        v-for="data in DataTodo.slice().reverse()"
        :key="data.id"
      >
        <div class="card mt-3">
          <div class="card-header">
            <p>{{ data.title }}</p>
          </div>
          <div class="card-body">
            <p>{{ data.body }}</p>
          </div>
          <div class="card-footer">
            <button class="btn btn-danger" @click="DeleteData(data.id)">
              Delete
            </button>
            <button class="btn btn-primary ml-3" @click="showEditModal(data)">
              Edit
            </button>
          </div>
        </div>
        <div
          class="modal fade"
          id="Modaledit"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="EditData(selectData.id)">
                  <label for="name">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="titleTodo"
                    placeholder="Title "
                    v-model="titleEdit"
                  />
                  <label for="name" class="mt-3">Body</label>
                  <input
                    type="text"
                    class="form-control"
                    id="bodyTodo"
                    placeholder="Desc "
                    v-model="bodyEdit"
                  />
                  <small :class="{ 'text-danger': bodyEdit.length > max }"
                    >{{ bodyEdit.length }}/{{ max }} karakter</small
                  >
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :color="'#F98100'"
    ></loading>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import AddTodo from "./AddTodolist";
import axios from "../services/api";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      Myname: localStorage.getItem("name", name),
      DataTodo: {},
      selectData: {
        titleEdit: "",
        bodyEdit: ""
      },
      showModal: false,
      titleEdit: "",
      bodyEdit: "",
      max: 300,
      isLoading: false,
      min: 3,

      ucapan:""
    };
  },
  components: {
    AddTodo,
    Loading
  },
  created() {
    this.Getdata();
  },
  methods: {
    async EditData(id) {
      if (this.bodyEdit.length < this.min) {
        this.bodyEdit = this.bodyEdit.substring(0, this.min);
        Swal.fire({
          title: "Error!",
          text: "The minimum character is 2",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      }
      if (this.bodyEdit.length > this.max) {
        this.bodyEdit = this.bodyEdit.substring(0, this.max);
        Swal.fire({
          title: "Error!",
          text: "The maximum character is 300",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      }
      try {
        this.isLoading = false;
        await axios({
          method: "put",
          url: "/posts/" + id,
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          data: {
            title: this.titleEdit,
            body: this.bodyEdit,
            userId: 1
          }
        });
        this.DataTodo = this.DataTodo.filter(todo => todo.id !== id);
        this.isLoading = true;
        this.$router.go(0);
      } catch (eror) {
        console.log("whoops", eror);
      }
    },
    async Getdata() {
      try {
        const response = await axios({
          method: "get",
          url: "/posts"
        });
        this.DataTodo = response.data;
      } catch (eror) {
        console.log("whoops", eror);
      }
    },

    DeleteData(id) {
      axios({
        method: "DELETE",
        url: "/posts/" + id
      });
      this.DataTodo = this.DataTodo.filter(todo => todo.id !== id);
    },
    showEditModal(data) {
      const $ = window.$;
      $("#Modaledit").modal("show");
      this.selectData = data;
    }
  },
  mounted(){

let myDate = new Date()
let jam = myDate.getHours()


if (jam < 12)
  this.ucapan = 'Good Morning';
else if (jam >= 12 && jam <= 17)
  this.ucapan = 'Good Afternoon';
else if (jam >= 17 && jam <= 24)
  this.ucapan = 'Good Evening';
  }
};
</script>

<style>
#batas1 {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#batas2 {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.card {
  border-radius: 20px;
}
body {
  background: rgb(241, 249, 249);
  background: linear-gradient(
    270deg,
    rgba(241, 249, 249, 1) 0%,
    rgba(255, 234, 234, 0.9671218829328606) 100%
  );
}
</style>
