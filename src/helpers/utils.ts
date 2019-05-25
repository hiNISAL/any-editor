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
