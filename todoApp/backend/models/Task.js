```javascript
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming there's a database config file to establish connection

class Task extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title is required'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Description is required'
          }
        }
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Due date is required'
          },
          isDate: {
            msg: 'Must be a valid date'
          }
        }
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Low'
      }
    }, {
      sequelize,
      modelName: 'tasks',
      timestamps: false
    });
  }
}

Task.init(sequelize);

module.exports = Task;
```