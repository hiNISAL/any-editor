import { $create, $append, $ } from '@/helpers/utils';
import { Plug, IPlug } from './Plug';

class Panel extends Plug {
  constructor(config, ctx) {
    super(config, ctx);

    this.createDOM();
  }

  private createDOM() {
    const defaultHTML = () => $create('div');

    const { html = defaultHTML } = this.config;

    const content = html(this.contexts);

    const el = $create('div', {
      html: `
        <div class="__age-menu-item ${ this.id }">
          <div class="__age-menu-item-title">
            <i class=""></i>
            <span>${ this.word }</span>
          </div>

          <div class="__ae-panel-content">
          
          </div>
        </div>
      `,
    });

    $append($('.__ae-panel-content', el), content);

    this.dom = el;
  }
}

export default Panel;
