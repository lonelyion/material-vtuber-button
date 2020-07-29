<template>
  <a
    :href="'https://www.youtube.com/watch?v=' + videoKey"
    target="_blank"
    rel="noreferrer"
    style="text-decoration: none;"
  >
    {{ content }}
  </a>
</template>

<script>
export default {
  name: 'YoutubeLink',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    videoKey: String,
    // eslint-disable-next-line vue/require-default-prop
    content: String
  }
};
</script>

<style scoped></style>
