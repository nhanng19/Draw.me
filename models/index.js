const User = require('./User');
const Drawing = require('./Drawing');

User.hasMany(Drawing, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Drawing.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Drawing };
