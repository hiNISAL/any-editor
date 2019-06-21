export interface Plug {
  name: string,
  type?: 'base'|'dropdown'|'panel'|'custom',
  tip?: string,
  icon?: string,
  word?: string,
  style?: ((...args) => any)|string,
};

export interface Base extends Plug {
  event?: any,
};

export interface Dropdown extends Plug {

};

export interface Panel extends Plug {

};

export interface Dialog extends Plug {

};

export interface Custom extends Plug {

};
