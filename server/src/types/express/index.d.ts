// This allows us to add a 'user' property to the Express Request object
import { IUser } from '../../models/userModel';
declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}