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

      <section v-if="voices.length > 0 " class="hero">
        <div class="columns">
          <div class="column">
            <drop-down :items="voices" :label="'voice'" :callback="voiceCallback"></drop-down>
          </div>
          <div class="column">
            <input-text placeholder="type here" :callback="textCallback"></input-text>   
          </div>
        </div>
      </section>

      <section>
        <div class="columns">
          <div class="column">
            <fader-control :defvalue="volume" param="volume"></fader-control>
            <p class="notification is-info ">volume</p>
          </div>
          <div class="column">
            <fader-control :defvalue="pitch" param='pitch'></fader-control>
            <p class="notification is-info">pitch</p>
          </div>
          <div class="column">
            <fader-control :defvalue="rate" param='rate'></fader-control>
            <p class="notification is-info">rate</p>
          </div>
         
        </div>
        
      </section>

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
import FaderControl from "./components/faderControl.vue";
export default {
  name: "app",
  components: { DropDown, InputText, FaderControl },
  data() {
    return {
      header: "Compatible with this browser!",
      voices: [],
      voiceSelected: false,
      text: false,
      msg: null,
      pitch: 1,
      rate: 1,
      volume: 0.75
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
      this.msg.volume = this.volume;
      this.msg.pitch = this.pitch;
      this.msg.rate = this.rate;
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
