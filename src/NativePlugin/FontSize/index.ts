const sizes = ['9', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36'];

export default {
  type: 'dropdown',
  hoverShow: false,
  maxHeight: 300,

  name: 'font-size',
  tip: '字号',

  icon: '',
  word: '14px',

  style: `

  `,

  event: {
    click(ctx) {
      console.log(ctx);
      const { detail: { isTarget }, close } = ctx;

      if (isTarget) {
        close();
      }
    },
  },

  labelKey: '', // default: label
  valueKey: '', // default: value

  dropItems: sizes.map((size, index) => ({
    label: `${size}px`,
    value: index,
    a: index,
  })),
};
