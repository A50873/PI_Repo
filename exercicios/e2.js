/*
const old_msg = console.log

console.log = function(...msg) {

    old_msg( Date() + " - " + msg )

}

console.log("Teste")
*/

function changeConsoleLog() {

    const oldConsoleLog = console.log;

    console.log = function(...rest){
        oldConsoleLog.call(console,Date(),...rest);
    }
}

console.log(Date(), "X", "Y");

changeConsoleLog();

console.log(Date(), "X", "Y");
