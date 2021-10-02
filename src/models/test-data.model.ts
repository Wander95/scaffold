import { ITestData } from '@types';
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/index';

export interface TesDataInput extends Optional<ITestData,'id'> {}
export interface TestDataOutput extends Required<ITestData> {}

class TestDataModel extends Model<TesDataInput, TestDataOutput> implements ITestData {
  public id !: number;
  public field_name!: string;
  public field_value!: string;
  public timestamp!: string;
  public td_timestamp!: string;
  public updated_by!: number;
  public isDeleted!: boolean;
}
TestDataModel.init({
  field_name: DataTypes.STRING,
  field_value: DataTypes.STRING,
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Date.now()
  },
  td_timestamp: DataTypes.STRING,
  updated_by: DataTypes.INTEGER,
  isDeleted: DataTypes.BOOLEAN
},{
  sequelize: sequelize.init(),
  timestamps: false,
  modelName: 'wls_robot_data',
  schema: 'public'
})


export default TestDataModel
