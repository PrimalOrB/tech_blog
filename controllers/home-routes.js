const router = require( 'express' ).Router();
const sequelize = require( '../config/connection' );
const { Post, User, Comment } = require( '../models' );

        // homepage / show all posts
router.get( '/',  (req, res ) => {
    Post.findAll( {
        attributes: [ 
            'id', 
            'title',
            'content', 
            'created_at',
            'updated_at'     
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ],
        order: [ [ 'updated_at', 'DESC' ] ],
    } )
    .then( dbPostData => {
        const posts = dbPostData.map( post => post.get( { plain: true } ) )
        res.render( 'homepage', { 
            posts,
            loggedIn: req.session.loggedIn
        } )
    } )
    .catch( err => {
        console.log( err );
        res.status( 500 ).json( err );
    } );
} );

    // 
router.get( '/post/:id', (req, res ) => {
    Post.findOne( {
        where: {
            id: req.params.id
        },
        attributes: [ 
            'id', 
            'title',
            'content', 
            'created_at',
            'updated_at'     
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    } )
    .then( dbPostData => {
        if( !dbPostData ) {
            res.status( 404 ).json( { message: 'No post found with this id' } )
            return
        }
        const post = dbPostData.get( { plain: true } )
        res.render( 'single-post',  { 
            post,
            loggedIn: req.session.loggedIn
         } )
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err )
    } )
} );

router.get( '/edit/:id', (req, res ) => {
    Post.findOne( {
        where: {
            id: req.params.id
        },
        attributes: [ 
            'id', 
            'title',
            'content', 
            'created_at'     
        ]
    } )
    .then( dbPostData => {
        if( !dbPostData ) {
            res.status( 404 ).json( { message: 'No post found with this id' } )
            return
        }
        console.log( dbPostData )
        const post = dbPostData.get( { plain: true } )
        res.render( 'edit-post',  { 
            post,
            loggedIn: req.session.loggedIn
         } )
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err )
    } )
} );

    // login route from username check
router.get( '/login/:username', ( req, res ) => {
    if( req.session.loggedIn ) {
        res.redirect( '/' );
        return
    }
    const username = req.params.username
    res.render( 'login', {
        username
    } );
} );

    // login route blank
router.get( '/login/', ( req, res ) => {
    if( req.session.loggedIn ) {
        res.redirect( '/' );
        return
    }
    const username = req.params.username
    res.render( 'login' );
} );

    // signup for existing user route
router.get( '/signup/:username', (req, res ) => {
    if( req.session.loggedIn ) {
        res.redirect( '/' );
        return
    }
    const username = req.params.username
    res.render( 'signup', {
        username
    } );
} );
    // check for existing user route
 router.get( '/checkuser', (req, res ) => {
    res.render( 'checkuser' )
} );



module.exports = router
