const Sequelize = require('sequelize');

const db = new Sequelize(
    'postgres://localhost:5432/secrets'
);

const Secret = db.define('secret', {
  secret: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

const Comment = db.define('comment', {
  comment: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Comment.belongsTo(Secret);
Secret.hasMany(Comment);

module.exports = {
    Secret: Secret,
    Comment: Comment
};
