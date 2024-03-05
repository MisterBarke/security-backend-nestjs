import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { PostEmployeeDto } from 'src/employees/dtos/post-employee.dto';
import { EmployeeService } from '../service/employee-service';

@Controller('employees')
export class EmployeesController {
    constructor (private readonly employeeService: EmployeeService){}

    @Get()
    async getEmployees(@Res() response){
        try {
            const employeesData = await this.employeeService.getAllEmployees();
            return response.status(HttpStatus.OK).json({
                message: 'Here are all employees',
                employeesData
            })
        } catch (error) {
            return response.status(error.status).json(error.response)
        }
    }
    
    @Post()
   async postEmployee(@Res() response, @Body() postEmployeeDto: PostEmployeeDto){
       try {
        const newEmployee = await this.employeeService.postEmployee(postEmployeeDto);
         return response.status(HttpStatus.CREATED).json({
            message: 'Employee has been created',
            newEmployee: newEmployee
         })
       } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
            message:'Error, employee not created',
            statusCode: 400,
            error: 'Bad request'
        })
       }
        
    }

    @Delete('/:id')
    async deleteEmployee(@Res() response, @Param('id') id: string){
        try {
            const deletedEmployee = await this.employeeService.deleteEmployee(id);
            return response.status(HttpStatus.OK).json({
                message: 'Employee deleted successfully', deletedEmployee
            })
        } catch (error) {
            return response.status(error.status).json({
                message:'Error, employee not deleted', error: error.response
            })
        }
    }

    @Put('/:id')
    async editEmployee(@Param('id') id: string, @Res() response, @Body() updateEmployeeDto: PostEmployeeDto){
       
        try {
            const editedEmployee = await this.employeeService.updateEmployee(id, updateEmployeeDto);
            
            return response.status(HttpStatus.OK).json({
                message: 'Employee updated successfully', editedEmployee
            })
        } catch (error) {
            return response.status(error.status).json({
                message: 'Employee not edited', error: error.response
            })
        }
    }
    @Get('/:id')
    async getOneEmployee(@Param('id') id: string, @Res() response){
        try {
            const employee = await this.employeeService.getEmployee(id);
            return response.status(HttpStatus.OK).json({
                message: 'Here is the employee', employee
            })
        } catch (error) {
            return response.status(error.status).json({
                message: 'Employee not found', error: error.response
            })
        }
    }
}
