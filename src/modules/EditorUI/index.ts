import frameStyle from '@/config/editor-content-style.config';
import { defaultHTML, baseTemplate, checkContentEmpty } from './helpers';
import './index.scss';

class EditorUI {
  public dom: HTMLElement|null = null;
  public editorContent: HTMLIFrameElement|null = null;

  private config: any = {};
  private initHTML: string = defaultHTML;

  /**
   * 构造函数
   * @param config
   * @param initHTML
   */
  constructor(config, initHTML: string = defaultHTML) {
    this.config = config;
    this.initHTML = initHTML;

    this.createUI();

    this.registerEvents();
  }

  /**
   * 创建ui
   * @param initHTML
   */
  public createUI() {
    const element: HTMLElement = document.createElement('div');
    element.className = '__any-editor-wrap'

    element.innerHTML = baseTemplate();

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

    (this.editorContent as any).contentDocument.body.innerHTML = initHTML;
  }

  /**
   * 注册事件
   */
  private registerEvents() {
    /**
     * 注册 window 的 onload 事件
     * 在 onload 后对 iframe 内容进行初始化
     */
    window.addEventListener('load', () => {
      const editorContent: any = this.editorContent;
      this.setContent(this.initHTML);

      // 把自定义样式挂进去
      editorContent.contentDocument.querySelector('head').appendChild(frameStyle());
    });
  }
}

export default EditorUI;
