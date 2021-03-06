const router = require( 'express' ).Router();
const { User, Post, Comment } = require( '../../models' );
const withAuth = require( '../../utils/auth' );

    // GET all users - /api/users
router.get('/', ( req, res ) => {
    User.findAll( {
        attributes: { exclude: [ 'password' ] },
        include: [ {
            model: Post,
            attributes: ['id', 'title', 'content', 'created_at', 'updated_at'],
            },
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'created_at', 'updated_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
            }
        ]
    } )
    .then( dbUserData => res.json( dbUserData ) )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } );
} );

    // GET one user /api/users/1
router.get('/:id', ( req, res ) => {
    User.findOne( {
        attributes: { exclude: [ 'password' ] },
        include: [ {
            model: Post,
            attributes: ['id', 'title', 'content', 'created_at', 'updated_at'],
            },
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'created_at', 'updated_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
            }
        ],
        where: {
        id: req.params.id
        }
    } )
    .then( dbUserData => {
        if( !dbUserData ) {
            res.status( 404 ).json( { message: 'No user found with this id' } );
            return;
        }
        res.json( dbUserData );
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } )
} );

    // POST new user /api/users
router.post('/', ( req, res ) => {
    // expects { username: 'bbb', password: 'bbb' }
    User.create( { 
        username: req.body.username,
        password: req.body.password
    } )
    .then( dbUserData => {
        
        req.session.save( () => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json( { user: dbUserData.username, message: 'You are now logged in!' } );
        } );
        
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err );
    } );
} );

    // check for existing user
router.post( '/checkuser', (req, res ) => {
    User.findOne( {
        where: {
            username: req.body.username
        }
    } )
    .then( dbUserData => {
        if( !dbUserData ) {
            res.status( 200 ).json( { body: req.body.username, exists: false } )
            return
        } else {
            res.status( 200 ).json( { body: req.body.username, exists: true } )
        }
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err )
    } )
} );

    // login
router.post( '/login', ( req, res ) => {
    //user input expects {username: 'bbb', password: 'blah123 '}
    User.findOne( {
        where: {
            username: req.body.username
        }
    } )
    .then( dbUserData => {
        if( !dbUserData ) {
            res.status( 400 ).json( { message: 'No user with that username!' } );
            return;
        }

        // verify user
        const validPassword = dbUserData.checkPassword( req.body.password );
        if( !validPassword ) {
            res.status( 400 ).json( { message: 'Incorrect Password!' } );
            return;
        }
        
        req.session.save( () => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json( { user: dbUserData.username, message: 'You are now logged in!' } );
        } );
    } );
} );

    // logout
router.post( '/logout', withAuth, ( req, res ) => {
    if( req.session.loggedIn ){
        req.session.destroy( () => {
            res.status( 204 ).end();
        } );
    } else {
        res.status( 404 ).end();
    }
} )

    // DELETE /api/users/1
router.delete('/:id', withAuth, ( req, res ) => {
    User.destroy( {
        where: {
            id: req.params.id
        }
    } )
    .then( dbUserData => {
        if( !dbUserData ) {
            res.status( 404 ).json( { message: 'No user found with this id' } );
            return;
        }
        res.json( dbUserData );
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err )
    } );
} );

module.exports = router