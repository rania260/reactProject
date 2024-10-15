import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,

    ) { }
    
    //logic registre
    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const {  email, password,role } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
           // username,
            email,
            password: hashedPassword,
            role,
        });
        const token = this.jwtService.sign(
            //payload: data li nheb naamllha save f token li heya =>id
            { id: user._id },
            { secret: this.configService.get<string>('JWT_SECRET') },

        );
        return { token };
    }
    //logic login
    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Email is incorrect');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Password is incorrect');
        }
        const token = this.jwtService.sign(
            { id: user._id },
            { secret: this.configService.get<string>('JWT_SECRET') },

        );
        return { token };
    }

    async validateGoogleUser(googleUser: SignUpDto) {
        const user = await this.userModel.findOne({email:googleUser.email});
        if (user) return user;
        return await this.userModel.create(googleUser);
      }
    

      async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
      }


         // Get all users
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    // Get user by ID
    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    // Update user
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }
        return updatedUser;
    }

    // Delete user
    async delete(id: string): Promise<{ message: string }> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }
        return { message: 'User deleted successfully' };
    }

    async getProfile(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }
    


}
