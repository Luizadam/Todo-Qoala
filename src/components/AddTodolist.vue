<template>
  <div class="card">
    <div class="card-body">
      <p>Make your TodoList</p>
      <form @submit.prevent="Postdata">
        <div class="form-group">
          <label for="name">Title</label>
          <input
            type="text"
            class="form-control"
            id="titleTodo"
            placeholder="Title "
            v-model="title"
          />
          <small :class="{'text-danger': title.length > max} ">{{ title.length }}/{{ max }} karakter</small>
        </div>
        <label for="name" class="mt-3">Body</label>
        <input type="text" class="form-control" id="bodyTodo" placeholder="Desc " v-model="body" />
        <small :class="{'text-danger': body.length > max}">{{ body.length }}/{{ max }} karakter</small>
        <button class="btn btn-dark mt-3" type="submit" style="float:right">Save</button>
      </form>
    </div>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" :color="'#F98100'"></loading>
  </div>
</template>
<script>
import axios from "../services/api";
import Swal from "sweetalert2";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      title: "",
      body: "",
      max: 300,
      maxTitle: 30,
      min: 3,
      minTitle: 3,
      isLoading: false
    };
  },
  components: {
    Loading
  },
  methods: {
    async Postdata() {
      if (this.body.length < this.min || this.title.length < this.minTitle) {
        this.title = this.title.substring(0, this.minTitle);
        this.body = this.body.substring(0, this.min);
        Swal.fire({
          title: "Error!",
          text: "The minimum character is 3",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      }
      if (this.title.length > this.maxTitle) {
        this.title = this.title.substring(0, this.maxTitle);
        Swal.fire({
          title: "Error!",
          text: "The maximum character is 30",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      }
      if (this.body.length > this.max || this.title.length > this.maxTitle) {
        this.body = this.body.substring(0, this.max);
        this.title = this.title.substring(0, this.maxTitle);
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
          method: "post",
          url: "/posts",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          data: {
            title: this.title,
            body: this.body,
            userId: 1
          }
        });
        this.isLoading = true;
        this.$router.go(0);
      } catch (eror) {
        Swal.fire({
          title: "Error!",
          text: "Oooppsss Something Wrong with json.server",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    }
  }
};
</script>