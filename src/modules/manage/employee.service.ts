import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from './../../constants/ErrorCode';
import { AppException } from 'src/exception/app.exception';
import { MyLogger } from './../logger/my-logger.service';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { Injectable } from '@nestjs/common';
import { EmployeeRole } from 'src/constants/EmplyeeContant';
import { MD5 } from 'src/util/ValidateUtils';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext(EmployeeService.name);
  }

  async createOwnerEmployee(
    phone: string,
    userId: string,
    password: string,
    displayName: string,
  ): Promise<EmployeeEntity> {
    try {
      const employeeEntity = new EmployeeEntity();
      employeeEntity.username = phone;
      employeeEntity.displayName = displayName;
      employeeEntity.password = MD5(MD5(password));
      employeeEntity.type = EmployeeRole.OWNER;
      employeeEntity.userId = userId;
      console.log(JSON.stringify(employeeEntity));
      const newEntity = this.employeeRepository.create(employeeEntity);
      await this.employeeRepository.save(newEntity);
      delete newEntity.password;
      delete newEntity.isDelete;
      delete newEntity.fcmToken;
      delete newEntity.deletedAt;
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
        type: EmployeeRole.OWNER,
      });
      if (employeeEntity) {
        delete employeeEntity.password;
        delete employeeEntity.isDelete;
        delete employeeEntity.fcmToken;
        delete employeeEntity.deletedAt;
      }
      return employeeEntity;
    } catch (error) {
      this.myLogger.error(error);
      AppException.throwBusinessException(ErrorCode.ERR_40001());
    }
  }
}
