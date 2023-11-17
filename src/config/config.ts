import { decodeTokenType } from 'src/interface/interface';
import { JwtService } from '@nestjs/jwt';
export const decodeToken = (token: string): decodeTokenType => {
  const jwtService = new JwtService();
  let data = jwtService.decode(token) as decodeTokenType;
  return data;
};
