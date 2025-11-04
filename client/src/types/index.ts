export interface ITask {
  _id: string;
  name: string;
  status: 'Incomplete' | 'Complete';
  createdAt: string;
  updatedAt: string;
  user: string;
}
export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData extends ILoginData {
  name: string;
}

export interface IUserAuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}