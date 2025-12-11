import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { DepartmentsModule } from './modules/departments/departments.module'; 
import { PositionsModule } from './modules/positions/positions.module'; 

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
    DepartmentsModule, 
    PositionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
