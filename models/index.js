const User = require("./User");
const Drawing = require("./Drawing");
const Comment = require("./Comment");

User.hasMany(Drawing, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Drawing.hasMany(Comment, {
  foreignKey: "drawing_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
})

Drawing.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Drawing, {
  foreignKey: "drawing_id",
});

module.exports = { User, Drawing, Comment };
