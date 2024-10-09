import { CanActivate, ConsoleLogger, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService){}

 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request)
    
    if(!token){
        throw new ForbiddenException('token not found ')
    }

    try {
        const payload = await this.jwtService.verifyAsync(token, {secret: this.configService.get('JWT_SECRET')});
        request.user = payload;
        console.log(payload)
    } catch (error) {
        console.log(error)
        throw new UnauthorizedException('Token invalid')
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string{
  
    const [type, token] = request.headers.authorization?.split(' ');

    return type === 'Bearer' ? token: undefined;
  }
}



