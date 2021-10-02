import { ITestData } from "@types";
import TestDataService from "../services/test-data.service";


class TestDataController {
  constructor(){}

  async getAllTestData(){
    const checking = await TestDataService.findAllTestData();
    
  }
}

export default TestDataController;