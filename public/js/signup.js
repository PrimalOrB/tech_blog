const username = window.location.toString().split( '/' )[
    window.location.toString().split( '/' ).length - 1
];

document.querySelector( '#username-signup' ).value = username
document.querySelector( '#welcome' ).innerText = username

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if ( username && password ) {
        const response = await fetch( '/api/users', {
            method: 'post',
            body: JSON.stringify( {
                username,
                password
            } ),
            headers: { 'Content-Type': 'application/json' }
        } );
        if( response.ok ) {
            document.location.replace( '/dashboard' );
        } else {
            alert( response.statusText );
        }
    }
}

document.querySelector( '.signup-form' ).addEventListener( 'submit', signupFormHandler );
document.querySelector( '#password-signup').focus()