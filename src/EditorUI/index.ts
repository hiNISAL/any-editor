import frameStyle from '@/config/editor-content-style.config';
import './index.scss';

const baseTemplate = () :string => {
  return `
    <div class="__ae-menu">

    </div>
    <div class="__ae-content">
      <iframe id="__ae-content-area"></iframe>
    </div>
  `;
};

const defaultHTML = '<div contentEditable><p><br></p></div>';

class EditorUI {
  public dom: HTMLElement|null = null;
  public editorContent: HTMLIFrameElement|null = null;

  private config: any = {};
  private initHTML: string = '';

  constructor(config, initHTML: string = defaultHTML) {
    this.config = config;

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

  private registerEvents() {
    window.addEventListener('load', () => {
      const editorContent: any = this.editorContent;
      editorContent.contentDocument.write(this.initHTML);

      editorContent.contentDocument.designMode = 'on';

      editorContent.contentDocument.body.style = frameStyle();
    });
  }
}

export default EditorUI;
