import { Suite, chartReport } from 'bench-node';
import { Bench } from 'tinybench'

const workerSuite = new Suite({
  reporter: chartReport,
  // requires no shared data between workers
  useWorkers: true,
});

const suite = new Suite({
  reporter: chartReport,
});

const elements = ['<div>', '<web-component>', '<camelCase>', '<divÑ>', '<web-compÑonent>', 'not a element', '<Component>'];
const rDefault = /^<([\d\-a-z][\d\-A-Za-z]*)>$/;
const rU = /^<([\d\-a-z][\d\-A-Za-z]*)>$/u;
const rV = /^<([\d\-a-z][\d\-A-Za-z]*)>$/v;


workerSuite.add('<regex>', () => {
  const elements = ['<div>', '<web-component>', '<camelCase>', '<divÑ>', '<web-compÑonent>', 'not a element', '<Component>'];
  const rDefault = /^<([\d\-a-z][\d\-A-Za-z]*)>$/;
  elements.forEach(d => rDefault.exec(d))
});
workerSuite.add('<regex>/u', () => {
  const elements = ['<div>', '<web-component>', '<camelCase>', '<divÑ>', '<web-compÑonent>', 'not a element', '<Component>'];
  const rU = /^<([\d\-a-z][\d\-A-Za-z]*)>$/u;
  elements.forEach(d => rU.exec(d))
});
workerSuite.add('<regex>/v', () => {
  const elements = ['<div>', '<web-component>', '<camelCase>', '<divÑ>', '<web-compÑonent>', 'not a element', '<Component>'];
  const rV = /^<([\d\-a-z][\d\-A-Za-z]*)>$/v;
  elements.forEach(d => rV.exec(d))
});


suite.add('<regex>', () => {
  elements.forEach(d => rDefault.exec(d))
});
suite.add('<regex>/u', () => {
  elements.forEach(d => rU.exec(d))
});
suite.add('<regex>/v', () => {
  elements.forEach(d => rV.exec(d))
});

// console.log('\n\nIn workers');
// await workerSuite.run()
//
// console.log('\n\nNot in workers');
// await suite.run();
//
console.log('\n\nwith tinybench');
const bench = new Bench({
  name: 'regex flag comparison', time: 100,
  setup: (_task, mode) => {
    // Run the garbage collector before warmup at each cycle
    if (mode === 'warmup' && typeof globalThis.gc === 'function') {
      globalThis.gc()
    }
  },
});

bench.add('<regex>', () => {
  elements.forEach(d => rDefault.exec(d))
}).add('<regex>/u', () => {
  elements.forEach(d => rU.exec(d))
}).add('<regex>/v', () => {
  elements.forEach(d => rV.exec(d))
});

await bench.run();

console.log(bench.name)
console.table(bench.table())

