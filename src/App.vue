<template>
  <div
    id="app"
    class="flex items-center justify-center w-full min-h-screen antialiased font-mono"
  >
    <div class="w-full">
      <h1 class="text-center text-4xl">Add to Things</h1>
      <form class="mt-4 max-w-lg mx-auto w-full" @submit.prevent="submitForm">
        <label class="block mb-4">
          <span class="text-gray-700">Title</span>
          <input
            v-modal="title"
            type="text"
            class="form-input mt-1 block w-full"
            required
          />
        </label>
        <label class="block mb-4">
          <span class="text-gray-700">Content</span>
          <textarea
            v-modal="content"
            class="form-textarea mt-1 block w-full"
            rows="3"
          ></textarea>
        </label>
        <div class="text-center">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Things
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data: () => ({
    title: null,
    content: null,
    success: false,
    error: false
  }),
  methods: {
    submitForm() {
      axios
        .post("/.netlify/functions/send-to-things", {
          title: this.title,
          content: this.content
        })
        .then(() => {
          this.success = true;

          setTimeout(() => {
            this.success = false;
          }, 3000);
        })
        .catch(() => {
          this.error = true;

          setTimeout(() => {
            this.error = false;
          }, 3000);
        });
    }
  }
};
</script>

<style scoped lang="less">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
