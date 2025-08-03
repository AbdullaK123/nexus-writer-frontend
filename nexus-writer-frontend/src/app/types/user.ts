
export interface User {
  id: string;
  username: string;
  email: string;
  profile_img?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserResponse {
  username: string;
  email: string;
  profile_img?: string;
}


export type credentials = {
    email: string;
    password: string;
}

export type registrationInfo = {
    username: string;
    email: string;
    password: string;
}