import TestDataModel, { TestDataOutput } from "../models/test-data.model";
import { Error } from 'sequelize'
import { ITestData } from "@types";

interface IGetAllReturn {
  isEmpty: boolean, 
  data: []
}

interface ISequelizeError{
  internalError: boolean, 
  error:unknown 
}

type getReturn = ()=> Promise<ITestData> 


class TestDataService {

  async findAllTestData():Promise<TestDataModel[] >{
    // try {
      const allTestData = await TestDataModel.findAll({
        where:{
          isDeleted: false
        }
      })
      
      // if(allTestData.length === 0) return { isEmpty:true, data:[] } 
      return allTestData
    // } catch (error) {
    //   console.log(`error`, error);
    //   return 
    // }
  }

  async findOneTestData(){
    return TestDataModel.findAll()
    .then((data)=>{
      return data
    })
    .catch(error=>{
      return { internalError: true, error }
    })
   
  }
}

export default new TestDataService()