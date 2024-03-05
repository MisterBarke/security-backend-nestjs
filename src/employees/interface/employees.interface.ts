import {Document} from 'mongoose';

export interface isEmployee extends Document {
    readonly name: string;
    readonly salary: number;
    readonly phone: number;
    readonly region: string;
}