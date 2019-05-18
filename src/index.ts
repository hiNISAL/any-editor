import EDITOR_CONFIG from './config/editor.config';

class AnyEditor {
  static config = EDITOR_CONFIG;

  constructor() {
    console.log(AnyEditor.config);
  }
}

export default AnyEditor;
