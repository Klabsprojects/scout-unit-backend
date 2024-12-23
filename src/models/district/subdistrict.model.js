var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const SubDistrict = sequelize.define("subdistrict", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subDistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      districtId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'district', // Refers to the table name
            key: 'id',       // Refers to the primary key of the table
        },
      }
    }
   );
    return SubDistrict;
  };