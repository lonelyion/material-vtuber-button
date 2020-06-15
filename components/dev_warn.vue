<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title class="headline">
        {{ $t('dev.title') }}
      </v-card-title>
      <v-card-text>
        {{ $t('dev.desc') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="return_to_official()">
          {{ $t('dev.to_stable') }}
        </v-btn>
        <v-btn text @click="dialog = false">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  mounted() {
    if (window.location.host.startsWith('dev')) {
      this.dialog = true;
    }
  },
  methods: {
    return_to_official() {
      window.location.href = 'https://fubuki.moe';
    }
  }
};
</script>
