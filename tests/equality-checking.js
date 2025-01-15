import { Bench } from 'tinybench'

const bench = new Bench({
  name: 'equality checking', time: 100,
  setup: (_task, mode) => {
    // Run the garbage collector before warmup at each cycle
    if (mode === 'warmup' && typeof globalThis.gc === 'function') {
      globalThis.gc()
    }
  },
});

let vTrue = true;
let vFalse = false;

bench.add('if ()', () => {
  if (vTrue) { }
  if (true) { }
  if (false) { }
  if (vFalse) { }
}).add('if (!()', () => {
  if (!vTrue) { }
  if (!true) { }
  if (!false) { }
  if (!vFalse) { }
}).add('if (x === true)', () => {
  if (vTrue === true) { }
  if (true === true) { }
  if (false === true) { }
  if (vFalse === true) { }
}).add('if (x == true)', () => {
  if (vTrue == true) { }
  if (true == true) { }
  if (false == true) { }
  if (vFalse == true) { }
}).add('if (x === false)', () => {
  if (vTrue === false) { }
  if (true === false) { }
  if (false === false) { }
  if (vFalse === false) { }
}).add('if (x == false)', () => {
  if (vTrue == false) { }
  if (true == false) { }
  if (false == false) { }
  if (vFalse == false) { }
})

  ;

await bench.run();

console.log(bench.name)
console.table(bench.table())

