const { sequelize, Sequelize } = require("../config/db")

const User = sequelize.define('User', {

    Name: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING
    },
    Password: {
        type: Sequelize.STRING
      }
  })
  
module.exports = User
/* sequelize.sync({ force: true });  */ 



  
