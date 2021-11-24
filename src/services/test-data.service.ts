import TestDataModel from "../models/test-data.model";
import { ITestData } from "../@types";

interface IGetAllReturn<T> {
  isEmpty?: boolean;
  internalError?: boolean; 
  error?:unknown;
  data?: T[];
}

interface IBaseReturn<T>{
  notFound?: boolean;
  internalError?: boolean; 
  error?:unknown;
  data?: T;
}

class TestDataService {

  async findAllTestData():Promise<IGetAllReturn<ITestData> >{
    try {
      const allTestData = await TestDataModel.findAll({
        where:{
          isDeleted: false
        }
      })
      
      if(allTestData.length === 0) return { isEmpty:true, data:[] } 
      return { data:allTestData}
    } catch (error) {
      console.log(`error`, error);
      return { internalError: true }
    }
  }

  async findOneTestData(testDataId:number):Promise<IBaseReturn<ITestData> >{

    try {
      const testData = await TestDataModel.findOne({
        where:{
          id: testDataId,
          isDeleted: false
        }
      });

      if(!testData) return { notFound: true }

      return { data:testData }
    } catch (error) {
      console.log(error)
      return { internalError: true }
    }
  }

  async createOneTestData(testDataInfo:ITestData):Promise<IBaseReturn<ITestData> >{

    try {
      const createdData = await TestDataModel.create({
        field_name: testDataInfo.field_name,
        field_value: testDataInfo.field_value,
        isDeleted: false,
        td_timestamp: testDataInfo.td_timestamp,
        updated_by: testDataInfo.updated_by,
        id: testDataInfo.id
      });

      return { internalError: false,notFound: false,data:createdData }
    } catch (error) {
      console.log(error)
      return { internalError: true, notFound: false }
    }
  }

  async updateOneTestData(testDataInfo:ITestData,testDataId:number):Promise<IBaseReturn<ITestData> >{

    try {
      const foundData = await TestDataModel.findByPk(testDataId);

      if(!foundData) return { notFound: true,internalError: false }

      const updatedData = await foundData.update({
        field_name: testDataInfo.field_name,
        field_value: testDataInfo.field_value,
        td_timestamp: testDataInfo.td_timestamp,
        updated_by: testDataInfo.updated_by
      })
  
      return { 
        internalError:false,
        notFound:false,
        data:updatedData 
      }

    } catch (error) {
      console.log(error)
      return { internalError: true, notFound: false }
    }
  }

  async deleteOneTestData(testDataInfo:ITestData,testDataId:number):Promise<IBaseReturn<ITestData> >{

    try {
      const foundData = await TestDataModel.findByPk(testDataId);

      if(!foundData) return { notFound: true,internalError: false }

      const updatedData = await foundData.update({
        field_name: testDataInfo.field_name,
        field_value: testDataInfo.field_value,
        isDeleted: true,
        td_timestamp: testDataInfo.td_timestamp,
        updated_by: testDataInfo.updated_by
      })
  
      return { 
        internalError:false,
        notFound:false,
        data:updatedData 
      }

    } catch (error) {
      console.log(error)
      return { internalError: true, notFound: false }
    }
  }
}

export default new TestDataService()