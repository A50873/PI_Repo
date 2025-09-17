const old_msg = console.log

console.log = function(...msg) {

    old_msg( Date() + " - " + msg )

}

console.log("Teste")
