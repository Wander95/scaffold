import express, { Application,ErrorRequestHandler,Request,Response,NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import csurf from 'csurf';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

// * Local modules
import sequelize from './database/index';
import RootRouter from './routes/index';
import CONFIG from './config/index';

class App {
  private port:number;
  private app:Application;

  constructor(){
    this.port = CONFIG.NODE_PORT;
    this.app = express();
  }

  async intServer(){
    this.app.use(express.urlencoded({ extended:true }))
    this.app.use(express.json())
    this.app.use(cookieParser())

    // this.app.use(csurf({}))
    this.app.use(session({
      name: '_store',
      secret: process.env.COOKIE_SECRET || 'ad@$%6Gqw+df/asd',
      resave: false,
      saveUninitialized: true,
      // cookie: {secure: false, maxAge: oneDay },
    }))
    this.app.use(morgan("dev"))
    this.app.use(helmet())
    
    this.app.use('/api/v1',RootRouter)

    // * 500 error
    this.app.use((
      error:ErrorRequestHandler, 
      req:Request, 
      res:Response, 
      next:NextFunction
    )=>{
        console.log(`error`, error)
        res.status(500).send('500: Internal Server Error');
    });

    this.app.get('/',(req,res)=>{
      res.json({
        message:'it is working'
      })
    })

    await sequelize.testDatabase()
    this.app.listen(this.port,()=>{
      console.log(`Server running ${this.port}`)
    })
  }
}

export default App;