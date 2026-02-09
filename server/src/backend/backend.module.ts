import { Module } from '@nestjs/common';

import { CbcLogModule } from './cbc-log/cbc-log.module';
import { WebSiteModule } from './web-site/web-site.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MediaModule } from './media/media.module';
import { ExhibitsModule } from './exhibits/exhibits.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';

@Module({
    imports: [CbcLogModule, WebSiteModule, FileUploadModule, MediaModule, ExhibitsModule, AuthModule, MenuModule],
    providers: [],
    controllers: []
})
export class BackendModule { }
