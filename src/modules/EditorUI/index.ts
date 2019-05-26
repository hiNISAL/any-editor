import frameStyle from '@/config/editor-content-style.config';
import { defaultHTML, baseTemplate, checkContentEmpty } from './helpers';
import { randomString, getPlug, $create, $, $append, $on, $$, $hide, asyncTask } from '@/helpers/utils';
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

    this.initIframe();
  }


  /**
   * 设置事件表
   */
  private setPlugMap() {
    const { plugins } = this.config;
    const styles: string[] = [];

    plugins.forEach((item) => {
      item.id = `id-${ randomString() }`;

      this.plugMag[item.id] = {
        plug: new (getPlug(item.type) as any)(item, {
          document: this.editorDocument,
          window: this.editorWindow,
          UI: this,
          Editor: this.Editor,
        }),
      };

      styles.push(item.style || '');
    });

    this.plugStyle = styles.join('');
    console.log(this.plugMag);
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
   */
  private initIframe() {
    asyncTask(() => {
      const editorContent: any = this.editorContent;
      this.editorDocument = editorContent.contentDocument;
      this.editorWindow = editorContent.contentWindow;
      
      this.setPlugMap();

      this.setContent(this.initHTML);
      // 把自定义样式挂进去
      (this.editorDocument as any).querySelector('head').appendChild(frameStyle());
   
      // 把插件的dom插入到编辑器
      this.renderPlug();
      // 绑定其他事件
      this.bindCommonEvents();
    });
  }

  // 渲染插件
  private renderPlug() {
    $append(
      $('.__ae-menu', this.dom), 
      ...Object.values(this.plugMag).map((item: any) => item.plug.dom)
    );
  }

  private bindCommonEvents() {
    $on(this.editorDocument, 'click', (e) => {
      $$('.drop-items', this.dom).forEach(el => $hide(el));
    });

    $on(this.dom, 'click', (e) => {
      if (!e.path.some((el) => (el.className === 'drop-items'))) {
        $$('.drop-items', this.dom).forEach(el => $hide(el));
      }
    });
  }
}

export default EditorUI;
