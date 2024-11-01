import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { AppResponse } from 'src/common/api-response';
import { IAuthToken } from './interface';
import { AUTH_MESSAGE_CONSTANT } from 'src/common/constants/auth.constant';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() loginDto: LoginDto): Promise<AppResponse<IAuthToken>> {
    const data = await this.authService.logIn(loginDto.useremail, loginDto.password);
    
    return new AppResponse<IAuthToken>(AUTH_MESSAGE_CONSTANT.SUCCESS_MESSAGE.LOGIN_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(data)
  }
}
