import { $create, $, $on } from '@/helpers/utils';

export default {
  type: 'panel',

  name: 'video',
  tip: 'video',

  icon: '',
  word: 'V',

  width: '300px',

  style: `
    .__ae-plugin-video {
      padding: 8px;
      display: flex;   
    }

    .__ae-plugin-video * {
      outline: 0;
    }

    .__ae-plugin-video input {
      height: 24px;
      flex: 1;
      line-height: 24px;
      padding: 0 8px;
    }

    .__ae-plugin-video button {
      border: 0 none;
      height: 27px;
      margin-left: 8px;
      line-height: 27px;
      display: inline-block;
      width: 40px;
      cursor: pointer;
    }

    .__ae-plugin-video button:hover {
      background: #f4f4f4;
    }
  `,

  html(ctx) {
    const el = $create('div', {
      html: `
        <div class="__ae-plugin-video">
          <input type="text" placeholder="视频地址">
          <button>添加</button>
        </div>
      `
    });

    $on($('button', el), 'click', (e) => {
      e.stopPropagation();

      const src = $('input', el).value;

      ctx.close();
    });

    return el;
  },

  event: {
    click(ctx) {
      // console.log(ctx);
    }
  },

  lifetimes: {
    mounted() {

    },

    beforeDestroy() {

    },

    destroyed() {

    },

    rendered(ctx) {

    },
  },
};
