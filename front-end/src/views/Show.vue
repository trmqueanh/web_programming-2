<template>
    <div>
      <h1>Show Word</h1>
  
          <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" readonly :value="word.english" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" readonly :value="word.german" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="vietnam flag"></i> Vietnamese
      </div>
      <input type="text" readonly :value="word.vietnamese" />
    </div>
    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: $route.params.id }}">
        Edit word
      </router-link>
    </div>

    </div>
  </template>
  
  <script lang="ts">
  import { api } from '../helpers/helpers';

  export default {
    name: 'show',
    data() {
  return {
    word: {
      english: '',
      german: '',
      vietnamese:''
    }
  };
},

    async mounted (){
        this.word = await api.getWord(this.$route.params.id);
    }
  };
  
  </script>
  
  <style scoped>
  .actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
  }

  .ui.label {
  min-width: 140px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
  </style>