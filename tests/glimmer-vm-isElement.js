import { run, bench, boxplot, summary, do_not_optimize } from 'mitata';

const elements = ['<div>', '<web-component>', '<camelCase>', '<divÑ>', '<web-compÑonent>', 'not a element', '<Component>'];
const rDefault = /^<([\d\-a-z][\d\-A-Za-z]*)>$/;
const rU = /^<([\d\-a-z][\d\-A-Za-z]*)>$/u;
const rV = /^<([\d\-a-z][\d\-A-Za-z]*)>$/v;

boxplot(() => {
  bench('<regex>', () => {
    return do_not_optimize(elements.forEach(d => rDefault.exec(d)));
  }).gc('inner');

  bench('<regex>/u', () => {
    return do_not_optimize(elements.forEach(d => rU.exec(d)));
  }).gc('inner');

  bench('<regex>/v', () => {
    return do_not_optimize(elements.forEach(d => rV.exec(d)));
  }).gc('inner');

});


await run();
