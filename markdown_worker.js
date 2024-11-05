_m = function(s) {
    return 'Worker: ' + s
}

var _ = function(l){
    // console.log( _m(l) );

}


class Callers {

    constructor(){
        importScripts('vendor/marked.js', 'vendor/highlight.pack.js')
    }

    render(data) {
        var s = data.content
        _('render', s);
        var self = this;
        marked(s, (function(data){
            return function (err, content) {
                if (err) throw err;
                self.rendered(data, content);
            }
       })(data) ) ;
    }

    rendered(data, content) {
        _(`Rendered ${data.name}`)
        // console.log(content)
        this.send(data, content)
    }

    highlight(data) {
        var result = self.hljs.highlightAuto(data.content.html);
        return { id: data.content.id, content: result }
    }

    send(data, content) {
        postMessage({
            ref: data
            , name: data.name
            , content: content
        })
    }

}


var callers = new Callers();


onmessage = function(e){
    // console.log( _m('Receive message'), e )
    postMessage('got');
    var data = e.data;
    var name = data.name;
    if(callers[name] !== undefined) {
        callers[name](data);
    } else {
        _(`Caller ${name} does not exist`)
    }

}


