export class AuthTokenError extends Error{
  constructor(){
    super('NOT_AUTHORIZED');
  }
}