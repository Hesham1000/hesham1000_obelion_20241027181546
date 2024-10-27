```javascript
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    });

    this.beforeCreate(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    });
  }

  static async validatePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

module.exports = User;
```