    // current activity time
let startTime = new Date().getTime()
    // timeout length to match cookie, plus a small buffer
let timeoutLength = ( (1000 * 60) * 2 ) + 2000;

    // at intervfal, check time
var interval = setInterval( "checkTimeout()", 1000 );
    // compare current time to activity time
function checkTimeout() {
    var currentTime = new Date().getTime();
    if ( currentTime > startTime + timeoutLength ) {
        clearInterval( interval );
        logout();
    }
}

    // at timeout, send back to homepage
function logout() {
    document.location.replace( '/' )
}

    // listeners for activity on the page (click a key, click the mouse, move mouse) whch reset the activity time
document.addEventListener('keyup', event => { startTime = new Date().getTime() })
document.addEventListener('click', event => { startTime = new Date().getTime() })
document.addEventListener('mousemove', event => { startTime = new Date().getTime() })