import EDITOR_CONFIG from './config/editor.config';
import frameStyle from '@/config/editor-content-style.config';
import EditorUI from './EditorUI/index';

class AnyEditor {
  static config = EDITOR_CONFIG;

  private uiContainer: null|EditorUI = null;

  constructor() {

  }

  /**
   * 创建编辑器
   * @param container 编辑器容器
   */
  public create(container: HTMLElement) {
    const initInnerHTML: string = container.innerHTML;

    this.initUI({}, initInnerHTML);

    container.innerHTML = '';
    container.appendChild(this.uiContainer!.dom!);
  }

  /**
   * 初始化编辑器的ui
   * @param config 
   * @param initHTML 
   */
  private initUI(config, initHTML) {
    this.uiContainer = new EditorUI(config, initHTML);
  }
}

export default AnyEditor;
