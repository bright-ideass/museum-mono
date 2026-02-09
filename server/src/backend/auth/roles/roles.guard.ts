import { Injectable, Inject, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<number[]>('roles', [
            context.getClass(),
            context.getHandler(),
        ]);
        if (!roles.length) {
            return true;
        }
        const request = context.switchToHttp().getRequest();         
        if (!request.user?.Roles.length) {
            throw new UnauthorizedException();
        }
        
        if (!roles.some(value => request.user?.Roles?.includes(value))) {
            throw new UnauthorizedException();
        }


        return true;
    }
}
