const router = require( 'express' ).Router();
const sequelize = require( '../config/connection' );
const { Post, User, Comment } = require( '../models' );
const withAuth = require( '../utils/auth' );

router.get( '/', withAuth, ( req, res ) => {
    Post.findAll( {
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
            'updated_at',
            [ sequelize.literal( '(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)' ), 'num_comments' ],
            [ sequelize.literal( '(SELECT MAX(created_at) FROM comment WHERE post.id = comment.post_id)' ), 'recent_post' ]   
        ],
        include: [
            {
                model: Comment,
            },
            {
                model: User,
                attributes: [ 'username' ]
            }
        ],
        order: [ [ 'updated_at', 'DESC' ] ]
    } )
    .then( dbPostData => {
        const posts = dbPostData.map( post => post.get( { plain: true } ) );
        res.render( 'dashboard', { posts, loggedIn: true, edit: true } )
    } )
    .catch( err => {
        console.log( err )
        res.status( 500 ).json( err )
    } )
} )

module.exports = router
