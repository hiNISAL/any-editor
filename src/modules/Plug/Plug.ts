class Plug {
  private name: string = '';
  private tip: string = '';
  private icon: string = '';
  private word: string = '';
  private type: string = '';
  private events: any = {};
  private contexts: any = {};
  private config: any = {};
  private dom: HTMLElement|null = null;

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
      type = 'base'
    } = this.config;
    
    this.name = name;
    this.tip = tip;
    this.icon = icon;
    this.word = word;
    this.events = event;
    this.type = type;
  }
}

export default Plug;
