import { Base, Dialog, Custom, Dropdown } from '@/modules/Plug';

const PLUG_MAP = {
  base: Base,
  dialog: Dialog,
  custom: Custom,
  dropdown: Dropdown,
};

/**
 * 清除空格
 * @param str
 */
export const rmSpace = (str: string): string => str.replace(/\s+/g, '');

/**
 * 随机字符串
 */
export const randomString = (): string => Math.random().toString(14).substring(2);

/**
 * 创建style标签
 * @param style 
 */
export const createStyleTag = (style: string): HTMLElement => {
  const styleTag = document.createElement('style');

  styleTag.type = 'text/css';
  styleTag.innerHTML = style;

  return styleTag;
};

/**
 * 获取插件
 * @param type
 */
export const getPlug = (type: string = '') => {
  return (PLUG_MAP[type.toLocaleLowerCase()] || Base);
};

/**
 * 异步任务
 * @param fn 
 */
export const asyncTask = (fn) => {
  setTimeout(() => {
    fn();
  });
};

/**
 * 选择单元素
 * @param selector 
 * @param root 
 */
export const $ = (selector: string, root?) => {
  if (!root) {
    root = document;
  }

  return root.querySelector(selector);
}

/**
 * 选择元素集合
 * @param selector 
 * @param root 
 */
export const $$ = (selector: string, root?) => {
  if (!root) {
    root = document;
  }

  return Array.from(root.querySelectorAll(selector));
}

/**
 * 创建标签
 * @param tag 
 * @param opts 
 */
interface IOpts {
  /** 类名 */
  class?: string;
  /** html */
  html?: string;
};
export const $create = (tag: string, opts: IOpts = {class: '', html: ''}): HTMLElement => {
  const el: HTMLElement = document.createElement(tag);

  if (opts.class) {
    el.className = opts.class;
  }

  if (opts.html) {
    el.innerHTML = opts.html;
  }

  return el;
}

/**
 * 绑定事件
 * @param el 
 * @param evt 
 * @param cb 
 */
export const $on = (el, evt: string, cb) => {
  el.addEventListener(evt, cb);
}

/**
 * 插入元素
 * @param el 
 * @param children 
 */
export const $append = (el, ...children) => {
  children.forEach((child) => el.appendChild(child));
};

/**
 * 设置元素显示
 * @param el 
 * @param display 
 */
export const $show = (el, display = 'block'): void => {
  el.style.display = display;
};

/**
 * 隐藏元素
 * @param el 
 * @param display 
 */
export const $hide = (el): void => {
  el.style.display = 'none';
};
