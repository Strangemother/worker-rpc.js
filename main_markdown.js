var parse = function(text){
    mdr.send('render', text);
};

var markdownRender = function(data){
    // console.log('markdownRender', data)
    var node = document.getElementById('markdown_render');
    node.innerHTML = data;
    highlight(node)
}

var highlight = function(node) {
    var codeBlocks = node.getElementsByTagName('pre');
    window.codes = codeBlocks
    for (var i = codeBlocks.length - 1; i >= 0; i--) {
        var pre = codeBlocks[i];
        var id = pre.id;
        var content = pre.innerHTML

        if(id === '') {
            id = ID.gen()
            pre.id = id;
        };

        mdr.send('highlight', { id: id, html: content })
    }
}

mdr = new MarkdownRenderer(markdownRender, '/javascript/markdown_worker.js');
mdr.start()

var node = document.getElementById('markdown_raw');
parse(node.innerHTML)
