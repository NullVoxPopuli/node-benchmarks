import { run, bench, boxplot, summary, do_not_optimize } from 'mitata';

let vTrue = true;
let vFalse = false;

/**
  * NOTE: JIT optimization is at play
  *       https://www.npmjs.com/package/mitata
  *
  *       Try to de-optimize
  */

const go = (name, x) => boxplot(() => void summary(() => void bench(name, function*() { yield x })))

summary(() => {
  bench('if ()', (() => {
    if (vTrue) { }
    if (true) { }
    if (false) { }
    if (vFalse) { }
  }))

  bench('if (!()', () => {
    if (!vTrue) { }
    if (!true) { }
    if (!false) { }
    if (!vFalse) { }
  })
  bench('if (x === true)', () => {
    if (vTrue === true) { }
    if (true === true) { }
    if (false === true) { }
    if (vFalse === true) { }
  })
  bench('if (x == true)', () => {
    if (vTrue == true) { }
    if (true == true) { }
    if (false == true) { }
    if (vFalse == true) { }
  })

  bench('if (x === false)', () => {
    if (vTrue === false) { }
    if (true === false) { }
    if (false === false) { }
    if (vFalse === false) { }
  })

  bench('if (x == false)', () => {
    if (vTrue == false) { }
    if (true == false) { }
    if (false == false) { }
    if (vFalse == false) { }
  })
});


await run();
