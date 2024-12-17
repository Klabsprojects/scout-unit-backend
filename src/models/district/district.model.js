var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const District = sequelize.define("district", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      distId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // Custom validation for the distId format
          is: {
            args: /^[0-9]{2}-[0-9]{3}$/,  // Regex for format: 01-001
            msg: 'distId must be in the format of "XX-XXX" where X is a digit.'
          }
        }
      },
    }
   );
    return District;
  };