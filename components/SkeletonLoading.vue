<template>
  <div>
    <v-skeleton-loader v-if="loading" :type="type"></v-skeleton-loader>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      type: 'list-item-three-line'
    };
  }
};
</script>
