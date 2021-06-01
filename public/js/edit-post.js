async function editFormHandler( event ){
    event.preventDefault();

    const title = document.querySelector( 'input[name="post-title"]').value;
    const content = document.querySelector( 'textarea[name="post-content"]').value;

        // get pre-queury param url
    const post_id_init = window.location.toString().split( '?' )[0];
        // split and extract id
    const post_id = post_id_init.split( '/' )[
        window.location.toString().split( '/' ).length - 1
    ];
    
    const response = await fetch( '/api/posts' , {
        method: 'PUT',
        body: JSON.stringify( {
            post_id,
            title,
            content
        } ),
        headers: {
            'Content-Type': 'application/json'
        }
    } );

    if( response.ok ) {
        document.location.replace( '/dashboard' );
    } else {
        alert( response.statusText )
    }
}

document.querySelector( '.edit-post-form' ).addEventListener( 'submit', editFormHandler );
