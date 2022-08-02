const Sequelize = require("sequelize")
const sequelize = new Sequelize('dbusuarios', 'postgres', '1998', {
    host: 'localhost',
    dialect: 'postgres'
  });

  (async function(){
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })()


module.exports = {
  sequelize:sequelize,
  Sequelize:Sequelize
}  
