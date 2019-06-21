/*
 * File: Plug.ts
 * Project: any-editor
 * File Created: Saturday, 25th May 2019 2:35:42 pm
 * Author: NISAL_(∠ゝз:)_ (dongjianye@nears.cn)
 * -----
 * Copyright 2016 - 2019 Your Company, Your Company
 * -----
 * Description: 插件基类
 */
import { $create, createStyleTag, $, $append } from "@/helpers/utils";

export class Plug {
  public name: string = '';
  public tip: string = '';
  public icon: string = '';
  public word: string = '';
  public type: string = '';
  public events: any = {};
  public contexts: any = {};
  public config: any = {};
  public id: string = '';
  public dom: HTMLElement|null = $create('div');

  public mounted: (...args) => any = () => {};
  public beforeDestroy: (...args) => any = () => {};
  public destroyed: (...args) => any = () => {};
  public beforeCreate: (...args) => any = () => {};
  public rendered: (...args) => any = () => {};

  public constructor(config, ctx) {
    this.config = config;
    this.contexts = ctx;

    this.extractConf();
  }

  private extractConf() {
    const {
      name,
      tip,
      icon,
      word,
      event,
      type = 'base',
      id,
      lifetimes: {
        beforeCreate = () => {},
        mounted = () => {},
        beforeDestroy = () => {},
        destroyed = () => {},
        rendered = () => {},
      } = {},
    } = this.config;

    this.name = name;
    this.tip = tip;
    this.icon = icon;
    this.word = word;
    this.events = event;
    this.type = type;
    this.id = id;

    this.beforeCreate = beforeCreate;
    this.mounted = mounted;
    this.beforeDestroy = beforeDestroy;
    this.destroyed = destroyed;
    this.rendered = rendered;
  }
}

export interface IPlug {

}
