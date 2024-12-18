var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const AllocateForm = sequelize.define("schoolform", {
      loginId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'login', // Refers to the table name
            key: 'id',       // Refers to the primary key of the table
        },
      },
      districtId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'district', // Refers to the table name
            key: 'id',       // Refers to the primary key of the table
        },
      },
      //School details
      schoolName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      schoolAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pincode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      schoolEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      schoolContactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bunnyDetails: {
        type: DataTypes.JSON, // Use JSON type for storing an object
        allowNull: true,
      },
      cubsDetails: {
        type: DataTypes.JSON, // Use JSON type for storing an object
        allowNull: true,
      },
      bulbulsDetails: {
        type: DataTypes.JSON, // Use JSON type for storing an object
        allowNull: true,
      },
      scoutsDetails: {
        type: DataTypes.JSON, // Use JSON type for storing an object
        allowNull: true,
      },
      guidesDetails: {
        type: DataTypes.JSON, // Use JSON type for storing an object
        allowNull: true,
      },
      roverDetails: {
        type: DataTypes.JSON, // Use JSON type for storing an object
        allowNull: true,
      },
      rangerDetails: {
        type: DataTypes.JSON, // Use JSON type for storing an object
        allowNull: true,
      },
      paymentStatus: {
        type: DataTypes.ENUM({
          values: ['Pending', 'Paid', 'Error']
        }),
        defaultValue: 'Pending'
      },
      filepath: {
        type: DataTypes.STRING,
      },
    },
    );
    return AllocateForm;
  };