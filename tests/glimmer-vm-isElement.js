import { Suite, chartReport } from 'bench-node';

const suite = new Suite({
  reporter: chartReport,
  // requires no shared data between workers
  useWorkers: true,
});

suite.add('<regex>', () => {
  const elements = ['<div>', '<web-component>', '<camelCase>', '<divÑ>', '<web-compÑonent>', 'not a element', '<Component>'];
  const rDefault = /^<([\d\-a-z][\d\-A-Za-z]*)>$/;
  elements.forEach(d => rDefault.exec(d))
});
suite.add('<regex>/u', () => {
  const elements = ['<div>', '<web-component>', '<camelCase>', '<divÑ>', '<web-compÑonent>', 'not a element', '<Component>'];
  const rU = /^<([\d\-a-z][\d\-A-Za-z]*)>$/u;
  elements.forEach(d => rU.exec(d))
});
suite.add('<regex>/v', () => {
  const elements = ['<div>', '<web-component>', '<camelCase>', '<divÑ>', '<web-compÑonent>', 'not a element', '<Component>'];
  const rV = /^<([\d\-a-z][\d\-A-Za-z]*)>$/v;
  elements.forEach(d => rV.exec(d))
});

suite.run()
