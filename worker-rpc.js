/*
This is an example RPC File, used by the primary.

Apply functions to the `rpc` object, to be called by the _other side_ (primary) script.
*/

/*  In the web-worker we load the worker utility. */
importScripts(`./worker/WorkerRPC.js`)

/* Our instance to receive jobs from the other (primary) script*/
var rpc = new WorkerRPC()

/* Create functions,
to be called as required by the other (primary) script.
*/
rpc.test = function(name){
    return 'got foo: ' + name
}
