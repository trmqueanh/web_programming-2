<template>
  <div>
    <h2>Score: {{ score }} / {{ total }}</h2>

    <div v-if="!testOver && currWord && choices.length === 4">
      <div class="ui labeled input fluid" style="margin-bottom: 1em;">
        <div class="ui label">
          <i class="vietnam flag"></i> Vietnamese
        </div>
        <input type="text" readonly :value="currWord[baseLang]" />
      </div>

      <form @submit.prevent="onSubmit">
        <div class="ui grid">
          <div
            class="eight wide column"
            v-for="(choice, index) in choices"
            :key="index"
          >
          <button
          class="ui button fluid"
          :class="{ positive: selected === choice }"
          type="button"
          @click="selected = choice"
          :disabled="showFeedback" 
        >
          {{ choice }}
        </button> <!--..-->

          </div>
        </div>

        <button class="positive ui button" :disabled="!selected || showFeedback">Submit</button>
      </form> <!--..-->
    
      <p v-if="showFeedback" class="ui red message" v-html="feedback"></p> <!--..-->

      <button v-if="showFeedback" class="ui button" @click="nextQuestion">Next Question</button> <!--..-->
    </div>

    <div v-if="testOver">
      <p :class="['results', resultClass]">
        <span v-html="result"></span>
      </p>
      <button class="ui button" @click="restartTest">🔁 Restart Test</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: Array,
    lang: String,
    baseLang: String
  },
  data() {
    const shuffled = [...this.words.sort(() => 0.5 - Math.random())].slice(0, 10);
    return {
      randWords: shuffled,
      incorrectGuesses: [],
      selected: '',
      score: 0,
      result: '',
      resultClass: '',
      testOver: false,
      feedback: '',          
      showFeedback: false   
    };
  },
  computed: {
    currWord() {
      return this.randWords.length ? this.randWords[0] : null;
    },
    total() {
      return 10;
    },
    choices() {
      if (!this.currWord || !this.currWord[this.lang]) return [];

      const correct = this.currWord[this.lang];
      const others = this.words
        .filter(w => w._id !== this.currWord._id && w[this.lang])
        .map(w => w[this.lang]);

      while (others.length < 3) {
        others.push('???');
      }

      const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);
      return [...shuffled, correct].sort(() => 0.5 - Math.random());
    }
  },
  methods: {
    onSubmit() {
      const current = this.currWord;
      const correctAnswer = current[this.lang];

      if (!correctAnswer || this.choices.length < 4) {
        return;
      }

      if (this.selected === correctAnswer) {
        this.flash('✅ Correct!', 'success', { timeout: 1000 });
        this.score += 1;
        this.nextQuestion();  
      } else {
        this.flash('❌ Wrong!', 'error', { timeout: 1000 });
        this.incorrectGuesses.push(`${current[this.baseLang]} → ${correctAnswer}`);
        this.feedback = `Answer: <strong>${correctAnswer}</strong>`;//
        this.showFeedback = true; //
      }
    },

    nextQuestion() {
      this.randWords.shift();
      this.selected = '';
      this.feedback = '';
      this.showFeedback = false;//

      if (this.incorrectGuesses.length > 3 || this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },

    displayResults() {
      if (this.incorrectGuesses.length === 0) {
        this.result = '🎉 Perfect! You got everything correct!';
        this.resultClass = 'success';
      } else if (this.incorrectGuesses.length > 3) {
        const wrong = this.incorrectGuesses.join('<br>');
        this.result = `<strong>❌ You made more than 3 mistakes.</strong><br>${wrong}`;
        this.resultClass = 'error';
      } else {
        const wrong = this.incorrectGuesses.join('<br>');
        this.result = `<strong>You got the following words wrong:</strong><br>${wrong}`;
        this.resultClass = 'error';
      }
    },

    restartTest() {
      const reshuffled = [...this.words.sort(() => 0.5 - Math.random())].slice(0, 10);
      this.randWords = reshuffled;
      this.incorrectGuesses = [];
      this.selected = '';
      this.score = 0;
      this.result = '';
      this.resultClass = '';
      this.testOver = false;
      this.feedback = '';//
      this.showFeedback = false;//
    },
  }
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}
.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}
.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
.ui.label {
  min-width: 140px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
