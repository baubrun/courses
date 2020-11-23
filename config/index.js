import dotenv from "dotenv";
dotenv.config();


const config = {
    jwtSecret: process.env.JWT_SECRET || "YO.fdgdUR_seasdf55cbksoas9agasdfcret_key",
    mongoUri: process.env.MONGODB_URI, 
    port: process.env.PORT || 5000  
  }
  
  export default config
  