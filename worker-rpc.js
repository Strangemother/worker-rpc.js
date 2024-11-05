/*
This is an example RPC File, used by the primary. Apply functions to the `rpc` object to be called
by the _other_ (primary) script.
 */
var base = '/javascript'

importScripts(
    `${base}/worker/WorkerRPC.js`
)

var rpc = new WorkerRPC()


rpc.test = function(name){
    return 'got foo: ' + name
}
