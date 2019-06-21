import { Plug, IPlug } from './Plug';
import { $create, $, $on, hideClick } from '@/helpers/utils';

class Base extends Plug implements IPlug {
  constructor(config, ctx) {
    super(config, ctx);

    this.createDOM();
    this.setEvent();
  }

  private createDOM() {
    this.beforeCreate(this.contexts);

    const el = $create('div', {
      class: '__ae-menu',
      html: `
        <div class="__ae-menu-item ${ this.id }">
          <div class="__ae-menu-item-title">
            <i class=""></i>
            <span>${ this.word }</span>
          </div>
        </div>
      `
    });

    this.dom = el;

    this.mounted(this.contexts);
  }

  /**
   * 设置事件
   */
  private setEvent() {
    const events = this.events;
    $on(this.dom, 'click', () => hideClick());

    for (const [k, v] of Object.entries(events)) {
      $on(this.dom, k, (e) => {
        (v as any)({
          ...this.contexts,
          event: e,
        });
      });
    }
  }
}

export default Base;
