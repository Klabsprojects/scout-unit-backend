var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const District = sequelize.define("district", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      distId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Custom validation for the distId format
        // validate: {
        //   is: {
        //     args: /^[0-9]{2}-[0-9]{3}$/,  // Regex for format: 01-001
        //     msg: 'distId must be in the format of "XX-XXX" where X is a digit.'
        //   }
        // }
      },
    }
   );
    return District;
  };