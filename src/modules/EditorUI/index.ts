import frameStyle from '@/config/editor-content-style.config';
import { defaultHTML, baseTemplate, checkContentEmpty } from './helpers';
import { createStyleTag, randomString, getPlug, $create, $, $append, $on, $$, $hide, asyncTask } from '@/helpers/utils';
import './index.scss';

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
  // 插件id映射表
  private plugMag: any = {};
  // 插件样式集
  private plugStyle: string = '';

  /**
   * 构造函数
   * @param config
   * @param initHTML
   */
  constructor(config, initHTML: string = defaultHTML, Editor) {
    this.config = config;
    this.initHTML = initHTML;
    this.Editor = Editor;

    this.createUI();

    this.init();
  }

  private getContext() {
    return {
      document: this.editorDocument,
      window: this.editorWindow,
      UI: this,
      Editor: this.Editor,
    };
  }


  /**
   * 设置事件表
   */
  private setPlugMap() {
    const { plugins } = this.config;
    const styles: string[] = [];

    const ctx = this.getContext();

    plugins.forEach((item) => {
      item.id = `id-${ randomString() }`;

      this.plugMag[item.id] = {
        plug: new (getPlug(item.type) as any)(item, ctx),
      };

      styles.push(item.style || '');
    });

    this.plugStyle = styles.join('');
  }

  /**
   * 创建ui
   * @param initHTML
   */
  public createUI() {
    const el = $create('div', {
      class: '__any-editor-wrap',
      html: baseTemplate(),
    });
    const editorContent: any = $('iframe', el);

    this.editorContent = editorContent;
    this.dom = el;
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
   * 初始化插件等 挂载大部分内容
   */
  private init() {
    asyncTask(() => {
      const editorContent: any = this.editorContent;
      this.editorDocument = editorContent.contentDocument;
      this.editorWindow = editorContent.contentWindow;
      
      this.setPlugMap();

      this.setContent(this.initHTML);
      // 把自定义样式挂进去
      (this.editorDocument as any).querySelector('head').appendChild(frameStyle());
      // 所有插件的自定义样式挂载
      $append($('head'), createStyleTag(this.plugStyle));

      // 把插件的dom插入到编辑器
      this.renderPlug();
      // 绑定其他事件
      this.bindCommonEvents();
    });
  }

  // 渲染插件
  private renderPlug() {
    const ctx = this.getContext();

    Object.values(this.plugMag).forEach((item : any) => {
      $append(
        $('.__ae-menu', this.dom), 
        item.plug.dom,
      );

      item.plug.rendered(ctx);
    });
  }

  private bindCommonEvents() {
    $on(this.editorDocument, 'click', (e) => {
      // 隐藏dropdown类型
      $$('.drop-items', this.dom).forEach(el => $hide(el));

      // 隐藏panel类型
      $$('.__ae-panel-content', this.dom).forEach(el => $hide(el));
    });

    $on(this.dom, 'click', (e) => {
      if (!e.path.some((el) => (el.className === 'drop-items'))) {
        $$('.drop-items', this.dom).forEach(el => $hide(el));
      }
    });
  }
}

export default EditorUI;
