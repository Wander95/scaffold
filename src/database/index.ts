import { Sequelize } from 'sequelize';
import CONFIG from '../config/index';

class sequelize {
  private connection:Sequelize;

  constructor(){
    this.connection = new Sequelize(
      CONFIG.DB_CONFIG.SEQUELIZE_DB, 
      CONFIG.DB_CONFIG.SEQUELIZE_USER, 
      CONFIG.DB_CONFIG.SEQUELIZE_PASSWORD, {
        host: CONFIG.DB_CONFIG.SEQUELIZE_HOST,
        dialect: 'postgres',
        logging: false, 
      },
    )
  }
  
  init(){
    return this.connection;
  }
  async testDatabase(){
    try {
      await this.connection.authenticate()
      console.log(`Database connected`)
    } catch (err) {
      console.log(`Database not connected`)
      console.log(err)
    }
  }
}

export default new sequelize()