/*
 Implement a worker, using markdown lib to convert
 markdown into HTML
 */
var _id = function(){
    return ( (Math.random() + +(new Date) )).toString(14)
};

class MarkdownRenderer {
    constructor(cb, path){
        this.callback = cb
        this.path = path || '../src/markdown_worker.js';
    }

    _start(){
        this.worker = new WorkerRPC(this.path)
    }

    start() {
        /*
         Build the worker unit.
         */
        // console.log('start', this.path);
        this.worker = new Worker(this.path);
        var self = this;
        this.worker.onmessage = function(e){
            // console.log('message', e)
            self.receive.call(self, e);
        }
    }

    receive(e){
        /* Receive a message from the worker */
        // console.log('got message', e.data)
        if(this[e.data.name]) {
            this[e.data.name](e)
        }
    }

    render(e) {
        var d = e.data.content;
        if( d === null
            || d === undefined
            || d.length == 0) {
            return
        };

        // console.log('render', e.data)
        // document.getElementById('markdown').innerHTML = d
        //quill.setText(d)
        this.callback && this.callback(d, e.data)
    }

    send(name, data) {
        /*send a message to worker*/
        var pack = {
            name: name
            , content: data
            , id: _id()
        }

        var v = this.worker.postMessage(pack);
    }

}
