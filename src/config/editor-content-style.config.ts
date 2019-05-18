const style = {
  'word-wrap': 'break-word',
  'word-break': 'break-all',
};

export default () => {
  const styleArr: string[] = [];
  for (const [k, v] of Object.entries(style)) {
    styleArr.push(`${k}: ${v}`);
  }

  return styleArr.join(';');
};
