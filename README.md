# worker-rpc.js

Web Workers explicity run code within a seperate thread. You create a new webworker with a string path denoting file run path. You communicate to a web worker through a standard messaging pip.

Using a Web Worker is simple and you can find some greate examples online for usage. The supplied code provides an RPC like tool for comminicating with a web worker.

### RPC style

+ A RPC should be easy to setup each side
+ RPC in worker should not affect standards
+ Worker should work normally (under-the-hood) to bypass api

It's named a Worker RPC (rather than RPC Worker) for explicit understanding
of the class tool. To use a script; within your app:

```js
var worker = new WorkerRPC(path[, callback])
```

Within the worker, define a RPC

```js
exports = { foo: function(v){ return `${v} apples`; } }
var rpc = new WorkerRPC(exports)
```

Using the worker through RPC defined calls

```js
callback = function(v){
        console.log(v) // bad apples
    }

worker.foo('bad', callback)
```

args edit:

    <script language="javascript" type="text/javascript" src='/javascript/worker/WorkerRPC.js'></script>
    <script language="javascript" type="text/javascript" src='/javascript/run_rpc.js'></script>
