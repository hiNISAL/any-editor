export default {
  name: 'underline',
  tip: 'underline',

  icon: '',
  word: 'U',

  event: {
    click(e, ctx) {
      console.log('underline');
      console.log(e);
      console.log(ctx);
    }
  }
};
