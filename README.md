# WorkerRPC

`WorkerRPC` provides a simple tool for an RPC-like interface to your own web worker.
It's plain interface provides one file, and a utility to integrate functions.


# Example

Run it in the _primary_ thread `main-app.js`:

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


rpc.foo = function(name){
    return `${name} eats apples`;
}

rpc.delayedCall = function(data){
    /* Will take 5 seconds to complete. */
    let content = ['... some response ...']
    const promise = rpc.promise()
    setTimeout(
        () => promise.done(content),
        5000
    )
    return promise;
}
```

</td><td>


```js
// Create in instance of the Worker RPC
const rpc = new WorkerRPC('my-worker-rpc.js')

// Call your expected functions!

rpc.foo('the floor', console.log)
// the floor eats apples.

// Promise-like delays handled automatically.
rpc.delayedCall({}, console.log) // 5 second delay
```

</td></tbody></table>

A `WorkerRPC` provides a quick, no-config, automated interface of functions for your [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker). Run code within a seperate thread without the effort.


## Setup

Two step setup:

1. Import `WorkerRPC.js` in your view, provide it your worker-file path.
2. Import `WorkerRPC.js` in your worker file.



<table>
<thead><tr>
  <th align="left">Worker</th>
  <th align="left">Main Thread</th>
</tr></thead>
<tbody><tr valign="top"><td>


```js
// Load the library.
importScripts(`./WorkerRPC.js`)
```

</td><td>

```jinja
<!-- This library -->
<script src="./worker/WorkerRPC.js"></script>
```

</td></tbody></table>


## Usage

Both sides need an instance of the worker:

<table>
<thead><tr>
  <th align="left">Worker</th>
  <th align="left">Main Thread</th>
</tr></thead>
<tbody><tr valign="top"><td>

```js
/*Worker; Create an instance of the RPC
The worker does not need its own path.*/
const rpc = new WorkerRPC()
```

</td><td>


```js
/*Main Thread; Create in instance of the RPC
Provide the path to your worker file */
const rpc = new WorkerRPC('my-worker-rpc.js')
```

</td></tbody></table>


### Add Methods

1. Apply functions to your worker `rpc` object
2. Call those functions in the view


<table>
<thead><tr>
  <th align="left">Worker</th>
  <th align="left">Main Thread</th>
</tr></thead>
<tbody><tr valign="top"><td>

```js
const rpc = new WorkerRPC()

rpc.double = function(value) {
    return value * 2
}
```

</td><td>


```js
const rpc = new WorkerRPC('my-worker-rpc.js')
console.log(rpc.methods())
// ['double']

rpc.double(20, (r)=> console.log('double 20 ==', r))
```

</td></tbody></table>



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
