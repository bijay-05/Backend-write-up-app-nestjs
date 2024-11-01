import { Body, Controller, Post, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDto } from './dto';
import { AppResponse } from 'src/common/api-response';
import { IAuthToken, IAuthUser } from './interface';
import { AUTH_MESSAGE_CONSTANT } from 'src/common/constants/auth.constant';
import { getUser } from 'src/common/decorators';
import { AuthGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  async logIn(@Body() loginDto: LoginDto): Promise<AppResponse<IAuthToken>> {
    const data = await this.authService.logIn(loginDto.useremail, loginDto.password);
    
    return new AppResponse<IAuthToken>(AUTH_MESSAGE_CONSTANT.SUCCESS_MESSAGE.LOGIN_SUCCESS).setStatus(HttpStatus.CREATED).setSuccessData(data)
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async getRefreshToken(@Body() refreshDto: RefreshDto ): Promise<AppResponse<IAuthToken>> {
    const data = await this.authService.getRefreshToken(refreshDto.token);
    
    return new AppResponse<IAuthToken>(AUTH_MESSAGE_CONSTANT.SUCCESS_MESSAGE.LOGIN_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(data);
  }

  @Delete("logout")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async logOut(@getUser() authUser: IAuthUser): Promise<AppResponse<null>> {
    await this.authService.deleteSession(authUser.sessionId);
    
    return new AppResponse<null>(AUTH_MESSAGE_CONSTANT.SUCCESS_MESSAGE.LOGOUT_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(null);
  }
}
