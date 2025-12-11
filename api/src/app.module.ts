import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from './modules/organizations/organizations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user', 
      password: 'password',
      database: 'hr_ext_db',
      autoLoadEntities: true,
      synchronize: false, 
    }),
    OrganizationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}