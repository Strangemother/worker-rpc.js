# WorkerRPC

`WorkerRPC` provides a simple tool for an RPC-like interface to your own web worker.
It's plain interface provides one file, and a utility to integrate functions.

# Example

<table>
<thead><tr>
  <th align="left">Worker</th>
  <th align="left">Main Thread</th>
</tr></thead>
<tbody><tr valign="top"><td>

Put functions in your worker `my-worker-rpc.js`:

```js
// In your worker file
importScripts(`./WorkerRPC.js`)

/* Create an instance of the worker rpc */
const rpc = new WorkerRPC()

rpc.foo = (name) => `${name} eats apples`;

rpc.delayedCall = function(data){
    /* Will take 5 seconds to complete. */
    const promise = rpc.promise()
    setTimeout(
        () => promise.done(data),
        5000
    )
    return promise;
}
```

</td><td>

Call the methods it in the _primary_ thread `main-app.js`:

```js
// Create in instance of the Worker RPC
const rpc = new WorkerRPC('my-worker-rpc.js')

// Call your expected functions!

rpc.foo('the floor', console.log)
// the floor eats apples.

// Promise-like delays handled automatically.
// 5 second delay
rpc.delayedCall({}, console.log)
```

</td></tbody></table>

A `WorkerRPC` provides a quick, no-config, automated interface of functions for your [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker). Run code within a seperate thread without the effort.


# Setup

Import `WorkerRPC.js` in your view, and in worker file.

<table>
<thead><tr>
  <th align="left">Worker</th>
  <th align="left">Main Thread</th>
</tr></thead>
<tbody><tr valign="top"><td>

Within the `my-worker-rpc.js` we can use the `importScripts`:

```js
// Worker
importScripts(`./WorkerRPC.js`)
```

</td><td>

In the primary thread, we install the same file:

```jinja
<!-- Primary thread -->
<script src="./worker/WorkerRPC.js"></script>

<!-- Our implementation -->
<script src="./my-app.js"></script>
```

</td></tbody></table>


# Usage

Both sides need an instance of the RPC object. The _main_ thread needs the `path`

<table>
<thead><tr>
  <th align="left">Worker</th>
  <th align="left">Main Thread</th>
</tr></thead>
<tbody><tr valign="top"><td>

In the worker file `my-worker-rpc.js`, create a new instance of the `WorkerRPC`:
```js
/*Worker file setup. */
const rpc = new WorkerRPC()
```

</td><td>

In your main app `my-app.js`, create a new instance of the `WorkerRPC`,
and provide the worker filepath:

```js
/*Main "my-app.js".
Provide the path to your worker file */
const rpc = new WorkerRPC('my-worker-rpc.js')
```

</td></tbody></table>


Setup complete! We can now apply functions in the worker, to call from your main thread.


## Add Worker Methods

Add functions to your worker `rpc` object. Call those functions in the main thread.

<table>
<thead><tr>
  <th align="left">Worker</th>
  <th align="left">Main Thread</th>
</tr></thead>
<tbody><tr valign="top"><td>

In the worker, add functions to the `rpc` object:

```js
/* Worker */
const rpc = new WorkerRPC()

rpc.double = function(value) {
    return value * 2
}
```

That's it! this is ready to call within the main thread.

</td><td>

Your main thread can call these functions

```js
const rpc = new WorkerRPC('my-worker-rpc.js')

/* Use our functions */

rpc.double(20, (r)=> console.log('double 20 ==', r))
// double 20 == 40
```

</td></tbody></table>


## Options

Within the main thread, we provide a `path` and an optional `callback` for all calls:

```js
// Main thread setup options
var worker = new WorkerRPC(path[, callback])
```

Within the worker, we can define the methods early; providing an object of methods for the RPC:

```js
// Worker setup with early config
exports = { foo: function(v){ return `${v} apples`; } }
var rpc = new WorkerRPC(exports)
```


In all cases, the main thread will have access functions in the worker

```js
// Main thread, calling the worker
const callback = function(v){
    console.log(v) // bad apples
}

worker.foo('bad', callback)
```
