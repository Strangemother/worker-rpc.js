<div align="center">

# WorkerRPC JS

`WorkerRPC` provides a no-config, automated API for your [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) functions.
Run JavaScript functions within a separate thread without effort.<br>

</div>

Install, create, and use:

<table>
<thead><tr>
  <th align="left">Worker</th>
  <th align="left">Main Thread</th>
</tr></thead>
<tbody><tr valign="top"><td>

Create worker functions

_my-worker-rpc.js_

```js
// Worker; my-worker-rpc.js

importScripts(`./WorkerRPC.js`)

/* Create an instance of the worker RPC */
const rpc = new WorkerRPC

/* Make functions */
rpc.foo = (name) => `${name} eats apples`;
```

It's ready to go.

</td><td>

Call worker functions

_main-app.js_

```js
// Main File; main-app.js

/* Create in instance of the worker RPC */
const rpc = new WorkerRPC('my-worker-rpc.js')

/* Call your functions */

rpc.foo('the floor', console.log)
// the floor eats apples.
```

Just call the functions. No prep required.

</td></tbody></table>

**That's it!**

+ No compilation
+ No heavy install steps
+ No config required


## Setup

> [!TIP]
> The library requires no additional setup. Import/install the single requirement and you're done.

Import `WorkerRPC.js` in your view (main thread), and in worker file.

<table>
<thead><tr>
  <th align="left">Worker</th>
  <th align="left">Main Thread</th>
</tr></thead>
<tbody><tr valign="top"><td>

import `WorkerRPC.js` within the worker file

_my-worker-rpc.js_

```js
// Worker
importScripts(`./WorkerRPC.js`)
```

</td><td>

Apply the same file in the in the main thread

_index.html_
```jinja
<!-- Primary thread -->
<script src="./WorkerRPC.js"></script>
```

</td></tbody></table>

With the `WorkerRPC` class available in both the view and worker, we're ready to run it.

## Usage

Create a new instance of the `WorkerRPC` in the worker and the main thread.

> [!TIP]
> The primary thread loads the worker.
> The main thread needs the `path` as the first arguments, the _worker_ does not need a path (because that path would be _itself_.)

<table>
<thead><tr>
  <th align="left">Worker</th>
  <th align="left">Main Thread</th>
</tr></thead>
<tbody><tr valign="top"><td>

Create a new instance of the `WorkerRPC`

_my-worker-rpc.js_
```js
/* Worker file setup. */
const rpc = new WorkerRPC
```

</td><td>

Create a new instance of the `WorkerRPC` with the worker `path`

_my-app.js_
```js
/* Main "my-app.js".
Provide the path to your worker file */
const rpc = new WorkerRPC('my-worker-rpc.js')
```

</td></tbody></table>

Setup complete! The `WorkerRPC` unit will run the worker and setup the message pipes.

Now we can apply functions in the worker, to call from your main thread.


## Worker Functions

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
const rpc = new WorkerRPC

rpc.double = function(value) {
    return value * 2
}
```

That's it! `double()` is ready to call.

</td><td>

Your main thread can call the function `rpc.double(value, callback)`

```js
/* Main Thread */
const rpc = new WorkerRPC('my-worker-rpc.js')

/* Use our functions */
rpc.double(20, value => {
    console.log('doubled:', value)
    // doubled: 40
})
```

</td></tbody></table>


## Options


### Callback

Within the main thread, we provide a `path` and an optional `callback` for all calls:

```js
// Main thread setup options
var worker = new WorkerRPC(path[, callback])
```

### Early Worker Config

Within the worker, we can define the methods early; providing an object of methods for the RPC:

```js
// Worker; setup with early config
exports = {
    foo: (v) => `${v} World`
}
/* Provide an object as the first argument,
to apply functions early */
const rpc = new WorkerRPC(exports)
```

This is functionally identical to:

```js
const rpc = new WorkerRPC
rpc.foo = v => `${v} World`
```

In all cases, the main thread will have access functions in the worker

```js
// Main thread; calling the worker
const callback = function(value){
    console.log(value) // Hello World
}

worker.foo('Hello', callback)
```

### Promise Calls

For any long-running process within your worker, we can return a `WorkerPromise`. This informs the main thread when the work is complete through a `WorkerPromise.done()` method:

```js
// Worker; Quick example
rpc.longRunning = function(data){
    const promise = rpc.promise()
    setTimeout(() => promise.done(data), 3000)
    return promise;
}
```

> [!TIP]
> The library handles promises automatically, for implementation (on the main thread) we can pretend promises don't exist and just write handlers.

### Worker Code Implementation

Within the worker function we can respond with a _promise_ for delayed calls. The `rpc.promise()` can generate a new one. Later we call `promise.done(data)` to send the result::

```js
// Worker; Example.
importScripts(`./WorkerRPC.js`)
const rpc = new WorkerRPC

/* This function return a `WorkerPromise` instance.
Later we resolve it with the the `promise.done()` call. */
rpc.delayedCall = function(data){
    /* Will take 5 seconds to complete. */
    const promise = rpc.promise()

    /* Long running process. */
    setTimeout(() => promise.done(data), 5000)

    /* Return the promise, to be handled quietly.*/
    return promise;
}
```

This new function `delayedCall` is ready to use within the main thread.


### Main Thread Usage

Promises are handled automatically by the `rpc` object. Knowing a function exists we call it as normal. The handler is called when the worker resolves with `promise.done(...)`:

```js
/* Main Thread; Calling to (above) function */
const rpc = new WorkerRPC('my-worker-rpc.js')

rpc.delayedCall({}, console.log)
// 5 second delay
// ...
```

Under the hood, the `rpc` object manages the promise resolution. The handler (in this case `console.log`) is held in a function cache until resolved.

