/*

create an RPC worker for markdown processing using JS only.

*/

var base = '/javascript'

importScripts(
    `${base}/worker/WorkerRPC.js`
    , `${base}/vendor/marked.js`
    , `${base}/vendor/highlight.pack.js`
)

var rpc = new WorkerRPC()

onmessage = function(e){
    console.log('markdown.rpc.js heard message', e.data)
    rpc.receive(e)
}

console.log('Building worker', rpc)

_send = function(data, content){
    postMessage({
        ref: data
        , name: data.name
        , content: content
    })
}

rpc.render = function(data){
    var self = this;
    var promise = rpc.promise()

    var markedCb = function (err, content) {
        if (err) throw err;
        console.log('Render done')
        setTimeout(function(){
            promise.done(content);

        }, 2000)
    }

    marked(data, markedCb);

    return promise;
}

rpc.highlight = function(data) {
    var result = self.hljs.highlightAuto(data.content.html);
    return { id: data.content.id, content: result }
}

rpc.foo = function(name){
    return name + ' apples';
}

console.log('Building done')
