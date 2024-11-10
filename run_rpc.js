
const rpc = new WorkerRPC('/worker/example.rpc.js')

const poke = function() {
    return rpc.delayedCall({}, pokeHandler)
}

const pokeHandler = function(items, message) {
    console.log('Poke handler response')
    let args = Array.from(arguments)
    console.log("Args", args)
    console.log('argument[0]', items)
}
