module.exports = {
    insert_post: function(post_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        

        if (!('status' in post_details)) post_details.status = 'draft';
        if (!('has_article' in post_details)) post_details.has_article = 0;
        if (!('article_content' in post_details)) post_details.article_content = '';
        if (!('alt' in post_details)) post_details.alt = '';

        if ('author' in post_details && 'date' in post_details && 'post_content' in post_details && 'type' in post_details && 'title' in post_details) {
            this.pool.getConnection(function(err, connection) {
                connection.query(
                    'INSERT INTO posts (author_email, post_date, post_content, post_type, post_title, post_status, post_has_article, article_content, alt) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);', 
                    [post_details.author, post_details.date, post_details.post_content, post_details.type, post_details.title, post_details.status, post_details.has_article, post_details.article_content, post_details.alt],
                    function(err, result) {
                        if (err) throw err;
                        connection.release();
                        callback(result);
                    }
                );
            });
        } else {
            throw new Error('You need to provide all the parameters to insert_post call.');
        }

    }
}