import { $create, $, $on, $show, $hide } from '@/helpers/utils';
import { Plug, IPlug } from './Plug';

interface IDropItem {
  label: any,
  value: any,
  title?: string,
};

class Dropdown extends Plug {
  private dropItems: IDropItem[] = [];
  private hoverShow: boolean = false;
  private maxHeight: number = 0;

  private constructor(config, ctx) {
    super(config, ctx);

    const { dropItems = [], maxHeight = 0, hoverShow = false } = config;

    this.dropItems = dropItems;
    this.maxHeight = maxHeight;
    this.hoverShow = hoverShow;
    
    this.createDOM();
    this.setEvent();
  }

  private createDOM() {
    const el = $create('div', {
      class: '__ae-menu',
      html: `
        <div class="__age-menu-item ${ this.id }">
          <div class="__age-menu-item-title" title="${ this.tip }">
            <i class=""></i>
            <span>${ this.word }</span>
          </div> 
          <div class="drop-items" style="display: none; ${
            this.maxHeight > 0
              ? `overflow: hidden; overflow-y: scroll; max-height: ${ this.maxHeight }px;`
              : 'height: auto'
          }">
            ${
              this.dropItems.map((item) => {
                return `
                  <div class="item" ${ item.title ? `title="${ item.title }"` : '' }>
                    ${ item.label }
                  </div>
                `;
              }).join('')
            }
          </div>
        </div>
      `,
    });
    
    this.dom = el;
  }

  private setEvent() {
    const hoverShow = this.hoverShow;
    const dropWrap = $('.drop-items', this.dom);
    const menu = $('.__age-menu-item', this.dom);

    // 根据是否悬停就展开列表做不同的事件绑定
    if (hoverShow) {
      $on(menu, 'mouseover', (e) => {
        $show(dropWrap);
      });

      $on(menu, 'mouseout', (e) => {
        $hide(dropWrap);
      });
    } else {
      $on(menu, 'click', (e) => {
        e.stopPropagation();

        $show(dropWrap);
      });
    }
  }
}

export default Dropdown;
