import { run, bench, boxplot, summary, do_not_optimize } from 'mitata';

const options = ['a string', 1, null, {}, { toHTML() { return 'hi' } }];

function inline(value) {
  return typeof value === 'object' && value !== null && typeof value.toHTML === 'function';
}

function isIndexable(value) {
  return value !== null && typeof value === 'object';
}

function withHelper(value) {
  return isIndexable(value) && typeof value['toHTML'] === 'function';
}

boxplot(() => {
  bench('inline', () => {
    return do_not_optimize(options.forEach(inline));
  }).gc('inner');

  bench('with helper function', () => {
    return do_not_optimize(options.forEach(withHelper));
  }).gc('inner');
});


await run();
