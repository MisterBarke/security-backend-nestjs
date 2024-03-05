import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Employee{
    @Prop()
    name: string;

    @Prop()
    phone: number;

    @Prop()
    region: string;

    @Prop()
    salary: number
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);