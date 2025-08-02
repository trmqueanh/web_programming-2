<template>
  <div>
    <h1>Quiz Test</h1>

    <div v-if="words.length < 5">
      <p>You need to enter at least five words to begin the test</p>
    </div>

    <div v-else>
      <div class="ui form" v-if="!startTest">
        <div class="field">
          <label>Select the language you want to be tested on:</label>
          <select v-model="testLang" class="ui dropdown">
            <option disabled value="">Please select</option>
            <option value="english">English</option>
            <option value="german">German</option>
          </select>
        </div>
        <button class="ui primary button" :disabled="!testLang" @click="startTest = true">
          Start Test
        </button>
      </div>

      <vocab-test
        v-if="startTest"
        :words="words"
        :lang="testLang"
        :baseLang="'vietnamese'"
      />
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';
import VocabTest from '../components/VocabTest.vue';

export default {
  name: 'test',
  components: {
    'vocab-test': VocabTest
  },
  data() {
    return {
      words: [],
      testLang: '',    
      startTest: false 
    };
  },
  async mounted() {
    this.words = await api.getWords();
  }
};
</script>
