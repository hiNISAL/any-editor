export const rmSpace = (str: string): string => str.replace(/\s+/g, '');

export const createStyleTag = (style: string): HTMLElement => {
  const styleTag = document.createElement('style');

  styleTag.type = 'text/css';
  styleTag.innerHTML = style;

  return styleTag;
}

export const randomString = (): string => Math.random().toString(14).substring(2);
