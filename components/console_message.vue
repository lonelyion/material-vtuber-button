<template>
  <div style="display: none;" />
</template>
<script>
import moment from 'moment';
export default {
  mounted() {
    let started = moment('20200107', 'YYYYMMDD');
    const heart = 'color: #FF5A79; font-size: 105px;';
    console.log('%c❤%c白上フブキ%c❤', heart, 'color: #0EBCF8; font-size: 105px; font-weight: bold;', heart);
    console.log(
      '%c' + this.$t('site.title') + '(^・ω・^§)ﾉ',
      'color: #6CB9F6',
      'https://github.com/oruyanke/fubuki-button'
    );
    console.log('The project has lived for ' + moment().diff(started, 'days') + ' days.');
  }
};
</script>
