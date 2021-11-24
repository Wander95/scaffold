import { ITestData } from "@types";
import { Request, Response, NextFunction } from 'express';
import TestDataService from "../services/test-data.service";


class TestDataController {
  constructor(){}

  async getAllTestData(req:Request,res:Response){
    
    const testData = await TestDataService.findAllTestData();

    if(testData.isEmpty) return res.status(200).json({
      path: req.originalUrl,
      status: 'success',
      code: 200,
      message: 'There is no data yet',
      data: [],
    })

    if(testData.internalError) return res.status(500).json({
      path: req.originalUrl,
      status: 'fail',
      code: 500,
      error: true,
      message: 'An error occurred trying to get all data',
      data: [],
    })

    return res.status(200).json({
      path: req.originalUrl,
      status: 'success',
      code: 200,
      message: 'Data found',
      data: testData.data,
    })
  }

  async getOneTestData(req:Request,res:Response){
    const { testDataId } = req.params;

    const testData = await TestDataService.findOneTestData(Number(testDataId));

    if(testData.notFound) return res.status(400).json({
      path: req.originalUrl,
      status: 'fail',
      code: 400,
      message: `Test data ${testDataId} not found`,
      data: [],
    })

    if(testData.internalError) return res.status(500).json({
      path: req.originalUrl,
      status: 'fail',
      code: 500,
      error: true,
      message: 'An error occurred trying to get test data',
      data: [],
    })

    return res.status(200).json({
      path: req.originalUrl,
      status: 'success',
      code: 200,
      message: 'Test Data found',
      data: testData.data,
    })
  }

  async postOneTestData(req:Request,res:Response){
    const bodyData:ITestData = req.body;

    const createdTestData = await TestDataService.createOneTestData(bodyData);

    if(createdTestData.internalError) return res.status(500).json({
      path: req.originalUrl,
      status: 'fail',
      code: 500,
      error: true,
      message: 'An error occurred trying to get test data',
      data: [],
    })

    return res.status(201).json({
      path: req.originalUrl,
      status: 'success',
      code: 201,
      message: 'Test Data created',
      data: createdTestData.data,
    })
  }

  async putOneTestData(req:Request,res:Response){
    const { testDataId } = req.params;
    const bodyData:ITestData = req.body;

    const updatedData = await TestDataService.updateOneTestData(bodyData,Number(testDataId));

    if(updatedData.notFound) return res.status(400).json({
      path: req.originalUrl,
      status: 'fail',
      code: 400,
      message: `Test data ${testDataId} not found`,
      data: [],
    })

    if(updatedData.internalError) return res.status(500).json({
      path: req.originalUrl,
      status: 'fail',
      code: 500,
      error: true,
      message: 'An error occurred trying to get update data',
      data: [],
    })

    return res.status(200).json({
      path: req.originalUrl,
      status: 'success',
      code: 200,
      message:`Test Data ${testDataId} updated`,
      data: updatedData.data,
    })
  }


  async deleteOneTestData(req:Request,res:Response){
    const { testDataId } = req.params;

    const testData = await TestDataService.findOneTestData(Number(testDataId));

    if(testData.notFound) return res.status(400).json({
      path: req.originalUrl,
      status: 'success',
      code: 400,
      message: `Test data ${testDataId} not found`,
      data: [],
    })

    if(testData.internalError) return res.status(500).json({
      path: req.originalUrl,
      status: 'fail',
      code: 500,
      error: true,
      message: 'An error occurred trying to get test data',
      data: [],
    })

    return res.status(200).json({
      path: req.originalUrl,
      status: 'success',
      code: 200,
      message: `Test data ${testDataId} deleted`,
      data: testData.data,
    })
  }
}

export default new TestDataController();