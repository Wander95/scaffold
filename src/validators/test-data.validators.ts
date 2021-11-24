import { ITestData } from '@types';
import * as joi from 'joi';

interface BaseSchema {
  getSchema: (method: 'PUT' | 'POST')=>joi.ObjectSchema
}

class TestDataSchema implements BaseSchema{

  constructor(){}

  getSchema(_method: 'PUT' | 'POST'){
    if(_method === 'POST'){
      return joi.object().keys({
        field_name: joi.string().required().min(3),
        field_value: joi.string().required().min(3),
        updated_by: joi.number().required().integer()
      })
    }else{
      return joi.object().keys({
        field_name: joi.string().min(3),
        field_value: joi.string().min(3),
        updated_by: joi.number().integer()
      })
    }
  }
}

new Intl.DateTimeFormat([], {})

export default new TestDataSchema()