const router = require( 'express' ).Router();
const { Comment, User, Post } = require( '../../models' );
const withAuth = require( '../../utils/auth' );

// GET all comments - /api/comments
router.get('/', ( req, res ) => {
    Comment.findAll( {
        attributes: [ 
            'id', 
            'comment_text', 
            'created_at',
            'updated_at'     
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['title']
            }
        ]
        } )
        .then( dbCommentData => res.json( dbCommentData ) )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json( err );
        } );
} );

    // GET one comment /api/comments/1
router.get('/:id', ( req, res ) => {
    Comment.findOne( {
        where: {
        id: req.params.id
        },
        attributes: [ 
            'id', 
            'comment_text', 
            'created_at',
            'updated_at'     
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['title']
            }
        ]
    } )
    .then( dbCommentData => {
        if( !dbCommentData ) {
            res.status( 404 ).json( { message: 'No comment found with this id' } );
            return;
        }
        res.json( dbCommentData );
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } )
} );

    // comment new comment /api/comments
router.post('/', withAuth, ( req, res ) => {
    // expects { comment_text: 'bbb', user_id: 'bbb', post_id: 'bbb' }
    Comment.create( { 
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    } )
    .then( dbCommentData => {
        res.json( dbCommentData )
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err );
    } );
} );

    // UPDATE a comment
router.put( '/:id', withAuth, ( req, res ) => {
    Comment.update( 
        {
            comment_text: req.body.comment_text
        } ,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then( dbCommentData => {
        if( !dbCommentData ) {
            res.status( 404 ).json( { message: 'No post found with this id' } );
            return;
        }
        res.json( dbCommentData );
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } );
} );

    // DELETE /api/comments/1
router.delete('/:id', withAuth,( req, res ) => {
    Comment.destroy( {
        where: {
            id: req.params.id
        }
    } )
    .then( dbCommentData => {
        if( !dbCommentData ) {
            res.status( 404 ).json( { message: 'No comment found with this id' } );
            return;
        }
        res.json( dbCommentData );
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err )
    } );
} );

module.exports = router