import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}
@Schema({
    timestamps: true
})
@ApiTags('users')
export class User {
    @Prop({unique: [true,'Duplicate email entered']})
    @ApiProperty()
    email:string;
    
    @Prop()
    @ApiProperty()
    password:string;
    @Prop({ 
        type: String, 
        enum: UserRole, 
        default: UserRole.USER 
    })
    @ApiProperty({ enum: UserRole, default: UserRole.USER })
    role: UserRole; 


    
    @ApiProperty()
    @IsOptional()
    firstname:string;
    
    @ApiProperty()
    @IsOptional()
    lastname:string;
}

export const UserSchema = SchemaFactory.createForClass(User);