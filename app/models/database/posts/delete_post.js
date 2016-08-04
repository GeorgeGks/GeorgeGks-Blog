module.exports = {
    delete_post: function(post_id, callback) {

        if (typeof(callback) === 'undefined') callback = function() {};

        if (post_id != null || post_id != undefined) {
            this.pool.getConnection(function(err, connection) {
                conenction.query(
                    'DELETE FROM posts WHERE post_ID = ?', [post_id],
                    function(err, result) {
                        if (err) throw err;
                        connection.release();
                        callback(result);
                    }
                );
            });
        } else {
            throw new Error('No parameter provided to delete_post call.');
        }
    }
}
