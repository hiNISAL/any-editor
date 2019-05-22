import frameStyle from '@/config/editor-content-style.config';
import { defaultHTML, baseTemplate, checkContentEmpty } from './helpers';
import './index.scss';
import { randomString } from '@/helpers/utils';

class EditorUI {
  public dom: HTMLElement|null = null;
  public editorContent: HTMLIFrameElement|null = null;
  public Editor: any = null;

  // 配置
  private config: any = {};
  // 初始化的 html 内容
  private initHTML: string = defaultHTML;
  // 编辑区域内的 document 对象
  private editorDocument: null|Document = null;
  // 编辑区域内的 window 对象
  private editorWindow: null|Window = null;
  // 事件id映射表
  private eventMap: any = {};

  /**
   * 构造函数
   * @param config
   * @param initHTML
   */
  constructor(config, initHTML: string = defaultHTML, Editor) {
    this.config = config;
    this.initHTML = initHTML;
    this.Editor = Editor;

    this.initConf();

    this.createUI();

    this.setEventMap();

    this.initIframe();
  }

  /**
   * 预处理配置文件
   */
  private initConf() {
    this.config.plugins.forEach((plug) => {
      plug.id = `id-${ randomString() }`;
    });
  }


  /**
   * 设置事件表
   */
  private setEventMap() {
    const { plugins } = this.config;
    
    plugins.forEach((item) => {
      const dom = this.dom!.querySelector(`.${item.id}`);

      this.eventMap[item.id] = {
        event: item.event,
        dom,
        _config: item,
      };

      this.setPlugEvent(item.id);
    });
  }

  /**
   * 设置插件的事件
   * @param id
   */
  private setPlugEvent(id) {
    const item = this.eventMap[id];

    // 遍历事件列表中的所有事件 并且进行绑定
    for (const [k, v] of Object.entries(item.event)) {
      item.dom!.addEventListener(k, (e) => {
        (v as any)(e, {
          document: this.editorDocument,
          window: this.editorWindow,
          UI: this,
          Editor: this.Editor,
          _config: item._config,
        });
      });
    }
  }

  /**
   * 创建ui
   * @param initHTML
   */
  public createUI() {
    const element: HTMLElement = document.createElement('div');
    element.className = '__any-editor-wrap'

    element.innerHTML = baseTemplate(this.config);

    const editorContent: any = element.querySelector('iframe');

    this.editorContent = editorContent;
    this.dom = element;
  }

  /**
   * 设置编辑器内容
   * @param content 
   */
  public setContent(content: string) {
    const initHTML = checkContentEmpty(content);

    this.editorDocument!.body.innerHTML = initHTML;
  }

  /**
   * 等待iframe初始化 并获得doc win等内容
   */
  private initIframe() {
    setTimeout(() => {
      const editorContent: any = this.editorContent;
      this.editorDocument = editorContent.contentDocument;
      this.editorWindow = editorContent.contentWindow;

      this.setContent(this.initHTML);
      // 把自定义样式挂进去
      (this.editorDocument as any).querySelector('head').appendChild(frameStyle());
    });
  }
}

export default EditorUI;
