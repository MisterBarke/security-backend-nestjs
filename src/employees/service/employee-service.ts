import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { isEmployee } from "../interface/employees.interface";
import { PostEmployeeDto } from "../dtos/post-employee.dto";
import { NotFoundException } from "@nestjs/common";


export class EmployeeService {
    constructor(@InjectModel('Employee') private employeeModel: Model<isEmployee>) { }

    async postEmployee(postEmployeeDto: PostEmployeeDto):
        Promise<isEmployee> {
        const newEmployee = await new this.employeeModel(postEmployeeDto);
        return newEmployee.save();
    }

    async updateEmployee(employeeId: string, updateEmployeeDto: PostEmployeeDto):
        Promise<isEmployee> {
        const existingEmployee = await this.employeeModel.findByIdAndUpdate(employeeId,
            {
                $set: {
                    name: updateEmployeeDto.name,
                    phone: updateEmployeeDto.phone,
                    salary: updateEmployeeDto.salary,
                    region: updateEmployeeDto.region,
                }
            },
            { new: true, runValidators: true });
        if (!existingEmployee) {
            throw new NotFoundException('This employee was not found');
        }
        return existingEmployee;
    }

    async getAllEmployees(): Promise<isEmployee[]> {
        const allEmployeesData = await this.employeeModel.find();
        if (!allEmployeesData || allEmployeesData.length == 0) {
            throw new NotFoundException('No employee found');
        }
        return allEmployeesData;
    }

    async getEmployee(employeeId: string): Promise<isEmployee> {
        const existingEmployee = await this.employeeModel.findById(employeeId).exec();
        if (!existingEmployee) {
            throw new NotFoundException('This employee was not found');
        }
        return existingEmployee;
    }

    async deleteEmployee(employeeId: string): Promise<isEmployee> {
        const deletedEmployee = await this.employeeModel.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            throw new NotFoundException('This employee was not found');
        }
        return deletedEmployee;
    }
}