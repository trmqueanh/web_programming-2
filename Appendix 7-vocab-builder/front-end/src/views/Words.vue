<template>
  <div>
    <h1>Words</h1>

    <div class="ui action input" style="margin-bottom: 1em;">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by English, German or Vietnamese..."
      />
      <button class="ui icon button" @click.prevent>
        <i class="search icon"></i>
      </button>
    </div>
    <table id="words" class="ui celled compact table">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
          <th>Vietnamese</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(word, i) in filteredWords" :key="i">
          <td>{{ word.english }}</td>
          <td>{{ word.german }}</td>
          <td>{{ word.vietnamese }}</td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: word._id } }">Show</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
          </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
            <a :href="`/words/${word._id}`">Destroy</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'words',
  data() {
    return {
      words: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredWords() {
      const q = this.searchQuery.trim().toLowerCase();
      if (!q) return this.words;

      const pattern = q
        .split('')
        .map(ch => ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('.*');

      const regex = new RegExp(pattern, 'i'); 
      return this.words.filter(word =>
        regex.test(word.english || '') ||
        regex.test(word.german || '') ||
        regex.test(word.vietnamese || '')
      );
    }
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deleteWord(id);
      this.flash('Word deleted successfully!', 'success');
      this.words = this.words.filter(word => word._id !== id);
    }
  },
  async mounted() {
  const words = await api.getWords();

 
  this.words = words.sort((a, b) => {
    const textA = (a.english || '').toLowerCase();
    const textB = (b.english || '').toLowerCase();
    return textA.localeCompare(textB);
  });

  console.log("✅ Loaded and sorted words:", this.words);
}
};
</script>

<style scoped>

</style>
