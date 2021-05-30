const router = require( 'express' ).Router();
const { User, Post, Comment } = require( '../../models' );
// const withAuth = require( '../../utils/auth' );

    // GET all users - /api/users
router.get('/', ( req, res ) => {
    User.findAll( {
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
    // expects { username: 'bbb', email: 'bbb', password: 'bbb' }
    User.create( { 
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    } )
    .then( dbUserData => {
        res.json( dbUserData )
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err );
    } );
} );

    // DELETE /api/users/1
router.delete('/:id', ( req, res ) => {
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