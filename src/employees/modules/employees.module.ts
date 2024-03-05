import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesController } from 'src/employees/controllers/employees.controller';
import { EmployeeSchema } from '../schema/employee-schema';
import { EmployeeService } from '../service/employee-service';

@Module({
    controllers: [EmployeesController],
    providers: [EmployeeService],
    imports: [
        MongooseModule.forRoot('mongodb+srv://misterbarke1:D.ACe12345678@cluster0.x7pxndj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
      MongooseModule.forFeature([{
        name: 'Employee', schema: EmployeeSchema
      }])
      ],
})
export class EmployeesModule {}
