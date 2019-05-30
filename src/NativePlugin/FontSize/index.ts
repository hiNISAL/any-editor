const sizes = ['9', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36'];

export default {
  type: 'dropdown',
  hoverShow: true,
  maxHeight: 300,

  name: 'font-size',
  tip: '字号',

  icon: '',
  word: '14px',

  style: `

  `,

  event: {
    click(e, ctx) {
      ctx.close();
    },
  },

  dropItems: sizes.map((size, index) => ({
    label: `${size}px`,
    value: index,
  })),
};
