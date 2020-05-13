<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <div v-html="about_md"></div>
          <!-- <img src="/v.png" alt="Vuetify.js" class="mb-5" /> -->
          <!-- <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote> -->
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import about_md from '../README.md';
export default {
  computed: {
    about_md() {
      return about_md;
    }
  }
};
</script>
