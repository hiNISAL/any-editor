import { $create, $append, $show, $hide, $, $on } from '@/helpers/utils';
import { Plug, IPlug } from './Plug';

class Panel extends Plug {
  constructor(config, ctx) {
    super(config, ctx);

    this.createDOM();
    this.setEvent();
  }

  private createDOM() {
    this.beforeCreate(this.contexts);

    const defaultHTML = () => $create('div');

    const { html = defaultHTML, width = '', maxWidth = '' } = this.config;

    const content = html(this.contexts);

    const el = $create('div', {
      html: `
        <div class="__ae-menu-item ${ this.id }">
          <div class="__ae-menu-item-title">
            <i class=""></i>
            <span>${ this.word }</span>
          </div>

          <div
            class="__ae-panel-content"
            style="${ width ? `width: ${ width };` : '' }${ maxWidth ? `max-width: ${ maxWidth };` : '' }"
          >
          
          </div>
        </div>
      `,
    });

    this.beforeMount(this.contexts);

    $append($('.__ae-panel-content', el), content);

    this.dom = el;

    this.mounted(this.contexts);
  }

  private setEvent() {
    const { hoverShow = false } = this.config;
    const wrap = $('.__ae-menu-item', this.dom);
    const panel = $('.__ae-panel-content', this.dom);

    // 带给事件 方便触发下拉框的主动关闭
    const close = () => {
      $hide(panel);
    };

    const ctx = {...this.contexts, close};

    const { 
      click = () => {}, 
      mouseover = () => {},
      mouseout = () => {},
    } = this.events;

    if (hoverShow) {
      // 悬停显示分别绑定两个鼠标事件
      $on(wrap, 'mouseover', (e) => {
        const res = mouseover({ ...ctx, e });
        if (res !== false) {
          $show(panel);
        }
      });

      $on(wrap, 'mouseout', (e) => {
        const res = mouseout({ ...ctx, e });

        if (res !== false) {
          $hide(panel);
        }
      });
    } else {
      $on(wrap, 'click', (e) => {
        e.stopPropagation();

        const show = click({ ...ctx, event: e });

        // 如果return了false 则不展开下拉菜单
        if (show !== false) {
          $show(panel);
        }
      });
    }
  }
}

export default Panel;
