import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { adminAuthDTO } from 'src/common/dto/exhibits-Img-list.dto';


@Injectable()
export class AuthService {
    constructor() { }

    async createToken(data: adminAuthDTO) {
        // const roles = await this.adminService.getAdminByRole(id);
        const expiresIn = data.Timeout * 60;
        const secretOrKey = process.env.JWT_SECRET;
        const user = { AuthSessionToken: data?.AuthSessionToken, Roles: data?.Roles };
        const token = jwt.sign(user, secretOrKey, { expiresIn });
        return { expires_in: expiresIn, token, UserName: data.UserName, DeptName: data.DeptName, LastLogin: data.LastLogin, NextTimeout: data.NextTimeout, };
    }

    async validateUser(signedAdmin): Promise<boolean> {
        if (signedAdmin && signedAdmin.account) {
            return Boolean();
        }
        return false;
    }

}
