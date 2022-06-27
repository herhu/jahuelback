export interface IAuth {
    token: string;
    party: boolean;
  }
  
  export interface IAuthContext {
    auth: IAuth;
    setAuth: (state: IAuth) => void;
  }
  
  export interface IUserLogin {
    email: string
    password: string
    typeUser: number,
    remember?: Boolean
  }
  
  export interface IUsersPanel {
    company: string
    email: string
    name: string
  }
  
  export interface IuserCreate {
    email: string,
    name: string,
    surname: string,
    rut: string,
    position: string,
    password: string,
    typeUser: string
  }
  
  