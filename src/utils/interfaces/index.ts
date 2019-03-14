export default interface TokenData {
  token: string;
  expiresIn: number;
}

export interface DataStoredInToken {
  id: number;
  username: string;
}
