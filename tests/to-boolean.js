import { run, bench, boxplot, summary, do_not_optimize } from 'mitata';

const options = ['a string', 1, null, undefined, false, {}, ''];

boxplot(() => {
  bench('!!x', () => {
    return do_not_optimize(options.forEach(x => !!x));
  }).gc('inner');

  bench('Boolean(x)', () => {
    return do_not_optimize(options.forEach(x => Boolean(x)));
  }).gc('inner');

  bench('!x', () => {
    return do_not_optimize(options.forEach(x => !(x)));
  }).gc('inner');
});


await run();
