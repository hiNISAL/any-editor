import { $create } from '@/helpers/utils';
export default {
  type: 'panel',

  name: 'video',
  tip: 'video',

  icon: '',
  word: 'V',

  style: {
    width: '300px',
  },

  html(ctx) {
    console.log(ctx);

    const el = $create('div', {
      html: `
        <div class="__ae-plugin-video">
          <div>
            <input type="text" placeholder="视频地址">
            <button>添加</button>
          </div>
        </div>
      `
    })

    return el;
  },

  css() {
    return `
    
    `;
  },

  event: {
    click(ctx) {
      console.log(ctx);
    }
  }
};
