import { rmSpace } from '@/helpers/utils';

/**
 * 编辑器的基本模版
 * 包含上下两块区域
 */
export const baseTemplate = () :string => {
  return `
    <div class="__ae-menu">
      <div class="item">
        <i class=""></i>
        <span>U</span>
      </div>
    </div>
    <div class="__ae-content">
      <iframe id="__ae-content-area"></iframe>
    </div>
  `;
};

/**
 * 编辑区域默认内容
 */
export const defaultHTML = '<div class="__ae-frame-content" contentEditable><p><br></p></div>';

/**
 * 校验要塞入编辑区域的内容是否为空
 * @param html 
 */
export const checkContentEmpty = (html: string) => {
  const el: HTMLElement = document.createElement('div');

  el.innerHTML = html;

  if (rmSpace(el.innerText)) {
    return `
      <div class="__ae-frame-content" contentEditable>
        <p>${ html }</p>
      </div>
    `;
  }

  return defaultHTML;
};
