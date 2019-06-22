import { $create } from '@/helpers/utils';
// import { Plug } from '@/types/plug/plug';

const FormPlug = {
  name: 'form',
  tip: '表单生成器',

  html(ctx) {
    const el = $create('div', {
      html: `
      
      `,
    });

    return el;
  },
};

export default FormPlug;
