import {sign} from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const generateToken = (userData: any) => {
  const token = sign(userData, process.env.TOKEN_SECRET);
  return token;
};

export {
  generateToken,
};