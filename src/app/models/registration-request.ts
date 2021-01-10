export class User {
  fullName: string;
  lastname:string;
  username: string;
  password: string;
  email: string;
  place: string;
  date: string;
  userType: string;
}

export class RegistrationRequest{
  username:string;
  password:string;
  userType:string;
  firstname:string;
  lastname:string;
  date:string;
  email:string;
  place: string;
}

export function makeModeratorFromRequest(request: RegistrationRequest): User {
  return {
      fullName: request.firstname,
      lastname: request.lastname,
      username: request.lastname,
      password: request.password,
      email: request.email,
      place: request.place,
      date: request.date,
      userType: 'regUser'
  };
}

export function makeRegUserFromRequest(request: RegistrationRequest): User {
  return {
      fullName: request.firstname,
      lastname: request.lastname,
      username: request.lastname,
      password: request.password,
      email: request.email,
      place: request.place,
      date: request.date,
      userType: 'moderator'
  };
}
