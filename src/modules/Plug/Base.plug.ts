import { Plug, IPlug } from './Plug';
import { $create, $, $on } from '@/helpers/utils';

class Base extends Plug implements IPlug {
  constructor(config, ctx) {
    super(config, ctx);

    this.createDOM();
    this.setEvent();
  }

  private createDOM() {
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
  }

  /**
   * 设置事件
   */
  private setEvent() {
    const events = this.events;

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
