module.exports = {
    update_subscription: function(sub_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};
        this.pool.getConnection(function(err, connection) {
            if (err) callback(err);
            connection.query(
                'UPDATE email_subscriptions SET subscription_date = ?, subscription_active = ?  WHERE subscription_email = ?;', [sub_details.date, sub_details.active, sub_details.email],
                function(err, result) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result);
                    }
                }
            );
        });

    }
}
