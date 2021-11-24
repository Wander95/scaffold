import { ITestData } from '../@types';
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/index';

export interface ITesDataInput extends Optional<ITestData,'id'> {}
export interface ITestDataOutput extends Required<ITestData> {}

class TestDataModel extends Model<ITesDataInput, ITestDataOutput> implements ITestData {
  public id !: number;
  public field_name !: string;
  public field_value !: string;
  public timestamp!: string;
  public td_timestamp!: string;
  public updated_by!: number;
  public isDeleted!: boolean;
}

TestDataModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  field_name: DataTypes.STRING,
  field_value: DataTypes.STRING,
  td_timestamp: {
    type: DataTypes.DATE ,
    defaultValue:DataTypes.NOW
  },
  updated_by: DataTypes.INTEGER,
  isDeleted: DataTypes.BOOLEAN
},{
  sequelize: sequelize.init(),
  timestamps: false,
  freezeTableName: true,
  modelName: 'wls_robot_data',
  schema: 'public'
})


export default TestDataModel
