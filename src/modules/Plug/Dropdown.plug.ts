import { $create, $, $on, $show, $hide } from '@/helpers/utils';
import { Plug, IPlug } from './Plug';

interface IDropItem {
  label: any,
  value: any,
  title?: string,
};

interface IDetail {
  isTarget: boolean,
  el: any,
  value: string,
  label: string,
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
        <div class="__ae-menu-item ${ this.id }">
          <div class="__ae-menu-item-title" title="${ this.tip }">
            <i class=""></i>
            <span>${ this.word }</span>
          </div> 
          <div class="drop-items" style="display: none; ${
            this.maxHeight > 0
              ? `overflow: hidden; overflow-y: scroll; max-height: ${ this.maxHeight }px;`
              : 'height: auto'
          }">
            ${
              this.dropItems.map((item, index) => {
                return `
                  <div
                    class="item "
                    ${ item.title ? `title="${ item.title }"` : '' }
                    data-value="${ item.value }"
                    data-label="${ item.label }"
                    data-index="${ index }"
                  >
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

  private getDetail(target): IDetail {
    // 获取到塞在属性里的数据
    const label = target.getAttribute('data-label');
    const value = target.getAttribute('data-value');

    let detail: IDetail = { el: null, isTarget: false, label: '', value: '' };

    // item表示是否命中下拉框内的内容
    if (label && value) {
      detail = { label, value, el: target, isTarget: true };
    } else {
      detail = { el: target, isTarget: false, label: '', value: '' };
    }

    return detail;
  }

  private setEvent() {
    const hoverShow = this.hoverShow;
    const dropWrap = $('.drop-items', this.dom);
    const menu = $('.__ae-menu-item', this.dom);

    // 带给事件 方便触发下拉框的主动关闭
    const close = () => {
      $hide(dropWrap);
    };

    const ctx = {...this.contexts, close};

    const { 
      click = () => {}, 
      mouseover = () => {},
      mouseout = () => {},
    } = this.events;

    // 根据是否悬停就展开列表做不同的事件绑定
    if (hoverShow) {
      // 悬停显示分别绑定两个鼠标事件
      $on(menu, 'mouseover', (e) => {
        const res = mouseover({ ...ctx, e });
        if (res !== false) {
          $show(dropWrap);
        }
      });

      $on(menu, 'mouseout', (e) => {
        const res = mouseout({ ...ctx, e });

        if (res !== false) {
          $hide(dropWrap);
        }
      });

      // 选项要点击 所以还是要点的
      $on(menu, 'click', (e) => {
        const { target } = e;

        const detail = this.getDetail(target);

        click({...ctx, detail, event: e});
      });
    } else {
      $on(menu, 'click', (e) => {
        e.stopPropagation();

        const detail: IDetail = this.getDetail(e.target);

        const show = click({ ...ctx, detail, event: e });

        // 如果return了false 则不展开下拉菜单
        if (show !== false && !detail.isTarget) {
          $show(dropWrap);
        }
      });
    }
  }
}

export default Dropdown;
