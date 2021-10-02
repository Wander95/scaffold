import { config } from 'dotenv'; config({})

const CONFIG = {
  NODE_PORT: Number(process.env.NODE_PORT) || 3000,
  
  DB_CONFIG:{
    SEQUELIZE_USER: process.env.SEQUELIZE_USER || '', 
    SEQUELIZE_DB: process.env.SEQUELIZE_DB || '',
    SEQUELIZE_PASSWORD: process.env.SEQUELIZE_PASSWORD || '', 
    SEQUELIZE_HOST:process.env.SEQUELIZE_HOST || '',
    SEQUELIZE_PORT: process.env.SEQUELIZE_PORT || '',
    dialect: 'postgres'
  }
}


export default  CONFIG