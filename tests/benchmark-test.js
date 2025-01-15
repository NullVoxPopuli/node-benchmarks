/**
 * We never trust benchmark tools out of the box.
 */
import { Suite, chartReport } from 'bench-node';

const suite = new Suite({
  reporter: chartReport,
  useWorkers: true,
});


suite.add('basic', () => {
  const alot = 100_000;
  Array(alot).fill(true);
});
suite.add('complex', () => {
  const alot = 100_000;
  let a = [];

  Array(alot).forEach(() => a.push(true));
});

suite.add('iteration', () => {
  const alot = 100_000;
  let a = [];

  for (let i = 0; i < alot; i++) {
    a.push(true);
  }

});

suite.run()
