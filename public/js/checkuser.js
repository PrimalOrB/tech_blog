async function checkUserFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();

    if ( username ) {
        await fetch( '/api/users/checkuser', {
            method: 'post',
            body: JSON.stringify( {
                username
            } ),
            headers: { 'Content-Type': 'application/json' }
        } )
        .then(response => response.json())
        .then(data => {
            if( data.exists ){
                document.location.replace( `/login/${data.body}` );
            } else {
                document.location.replace( `/signup/${data.body}` );
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

document.querySelector( '.check-user-form' ).addEventListener( 'submit', checkUserFormHandler );
