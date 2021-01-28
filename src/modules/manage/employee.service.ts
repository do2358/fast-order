import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from './../../constants/ErrorCode';
import { AppException } from 'src/exception/app.exception';
import { MyLogger } from './../logger/my-logger.service';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext(EmployeeService.name);
  }

  async createOwnerEmployeee(
    phone: string,
    userId: string,
  ): Promise<EmployeeEntity> {
    try {
      const employeeEntity = new EmployeeEntity();
      employeeEntity.username = phone;
      employeeEntity.displayName = phone;
      employeeEntity.type = 1;
      employeeEntity.userId = userId;
      console.log(JSON.stringify(employeeEntity));
      const newEntity = this.employeeRepository.create(employeeEntity);
      await this.employeeRepository.save(newEntity);
      return newEntity;
    } catch (error) {
      this.myLogger.error(error);
      AppException.throwBusinessException(ErrorCode.ERR_40001());
    }
  }

  async findOwnerEmployee(userId: string): Promise<EmployeeEntity> {
    try {
      const employeeEntity = await this.employeeRepository.findOne({
        userId: userId,
        type: 1,
      });
      return employeeEntity;
    } catch (error) {
      this.myLogger.error(error);
      AppException.throwBusinessException(ErrorCode.ERR_40001());
    }
  }
}
