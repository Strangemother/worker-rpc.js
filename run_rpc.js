var rpc;
var run = function(){
    rpc = new WorkerRPC('/javascript/worker/markdown.rpc.js')
}

run()
