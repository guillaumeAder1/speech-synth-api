<template>
  <section class="section">
    <div id="app" class="container">   
     <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Speech Synthesis API
          </h1>
          <h2 v-if="isSupported" class="subtitle">
            {{header}}
          </h2>
          <h2 v-else>Sorry, the API is not compatible with this browser...</h2>
        </div>
      </div>
    </section>
      <template v-if="voices.length > 0 ">
        <drop-down :items="voices" :label="'voice'" :callback="voiceCallback"/>
        <input-text :defaultvalue="'type here'" :callback="textCallback"/>
        
      </template>

      <div v-if="listVoice.length > 0">
         <drop-down :items="listVoice" :label="'voice'" :callback="voiceCallback"/>
      </div>

      <template v-if="isValid">
        <button class="button" @click="speak">start</button>
      </template>
    </div>
  </section>
</template>

<script>
//https://github.com/craigh411/vue-text-to-speech/blob/master/src/vue-text-to-speech.vue
// https://stackoverflow.com/questions/21513706/getting-the-list-of-voices-in-speechsynthesis-of-chrome-web-speech-api

import DropDown from "./components/dropDown.vue";
import InputText from "./components/input.vue";
export default {
  name: "app",
  components: { DropDown, InputText },
  data() {
    return {
      header: "Compatible with this browser!",
      voices: [],
      listVoice: [],
      voiceSelected: false,
      text: false,
      msg: null
    };
  },

  computed: {
    isValid() {
      return this.text && this.voiceSelected ? true : false;
    },
    isSupported() {
      return "speechSynthesis" in window;
    }
  },
  methods: {
    speak() {
      this.msg.text = this.text;
      this.msg.volume = 1;
      this.msg.pitch = 1;
      this.msg.rate = 0.1;
      this.msg.voice = this.voiceSelected;
      window.speechSynthesis.speak(this.msg);
    },

    textCallback(str) {
      console.log(str);
      this.text = str.trim() !== "" ? str : false;
    },
    voiceCallback(voice) {
      console.log(voice);
      this.voiceSelected = voice.name ? voice : false;
    }
  },
  mounted() {
    this.msg = new SpeechSynthesisUtterance();
    /**
     * wait until chrome loads voices...
     */
    new Promise(resolve => {
      window.speechSynthesis.onvoiceschanged = function() {
        resolve(window.speechSynthesis.getVoices());
      };
    }).then(voices => (this.voices = voices));
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
