import { LoggerModule } from './../logger/logger.module';
import { StoreEmployeeEntity } from './entity/store-employee.enity';
import { StoreEntity } from './entity/store.enity';
import { EmployeeEntity } from './entity/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { Module } from '@nestjs/common';
import { ManageController } from './manage.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      StoreEntity,
      StoreEmployeeEntity,
    ]),
    LoggerModule,
  ],
  controllers: [ManageController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class ManageModule {}
