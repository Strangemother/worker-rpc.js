console.log('example.rpc::rpc start')
importScripts(`./WorkerRPC.js`)

const rpc = new WorkerRPC()

console.log('example.rpc::rpc awake')

rpc.test = function(name){
    return 'got foo: ' + name
}

rpc.lots = function(values){
    let v = values.reduce((a,b)=>a+b)
    debugger
    console.log('message back', v)
    return v
}


rpc.delayedCall = function(data){
    const promise = rpc.promise()
    longProcess(promise)
    return promise;
}

const longProcess = (promise) => {
    /* Will take 5 seconds to complete. */
    let content = '... some response ...'
    // setTimeout(() => promise.done(1, {}, content), 2000)
    setTimeout(() => promise.done.apply(promise, [1, {}, content]), 2000)
}