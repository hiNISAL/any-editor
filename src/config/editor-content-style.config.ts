import { createStyleTag } from './../helpers/utils';
import { rmSpace } from "@/helpers/utils";

// 编辑区域内的样式
// 为了保证外部内容不影响编辑区域 所以使用了iframe进行隔离
const style: string = `
  * {
    margin: 0;
    padding: 0;
    outline: none;
    word-wrap: break-word;
    word-break: break-all;
  }

  body {
    position: relative;
  }

  .__ae-frame-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 8px;
  }
`;

export default (): HTMLElement => {
  return createStyleTag(style);
};
