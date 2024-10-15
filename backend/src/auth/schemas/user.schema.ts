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
    @Prop({ unique: [true, 'Duplicate email entered'] })
    @ApiProperty()
    email: string;
    
    @Prop()
    @ApiProperty()
    password: string;

    @Prop({ 
        type: String, 
        enum: UserRole, 
        default: UserRole.USER 
    })
    @ApiProperty({ enum: UserRole, default: UserRole.USER })
    role: UserRole; 

    @Prop()
    @ApiProperty()
    @IsOptional()
    firstname: string;
    
    @Prop()
    @ApiProperty()
    @IsOptional()
    lastname: string;

    // Nouveau champ par rania
    @Prop()
    @ApiProperty()
    @IsOptional()
    profilePicture: string;

    
    @Prop()
    @ApiProperty()
    @IsOptional()
    bio: string;

    
    @Prop({ type: [String] })
    @ApiProperty()
    @IsOptional()
    skills: string[];

    
    @Prop({ type: [{ title: String, description: String, link: String }] })
    @ApiProperty()
    @IsOptional()
    projects: { title: string, description: string, link: string }[];

   
    @Prop({ type: { github: String, linkedin: String, twitter: String } })
    @ApiProperty()
    @IsOptional()
    socialLinks: { github: string, linkedin: string, twitter: string };
}

export const UserSchema = SchemaFactory.createForClass(User);
