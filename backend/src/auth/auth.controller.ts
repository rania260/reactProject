import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';


@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    @Get('/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {}

    @Get('/google/callback')
    @UseGuards(AuthGuard('google'))
    async googleCallback(@Req() req, @Res() res) {
        const response = await this.authService.signUp(req.user);
        res.redirect(`http://localhost:5173/dashboard?token=${response.token}`);
    }

    @Post('create')
    @UseGuards(JwtAuthGuard) 
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'User successfully created.', type: User })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.authService.create(createUserDto);
    }
  
    @Get('getAll')
    @UseGuards(JwtAuthGuard) 
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Successfully retrieved all users.', type: [User] })
    async findAll() {
        return this.authService.findAll();
    }

    @Get('get/:id')
    @UseGuards(JwtAuthGuard) 
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Successfully retrieved user.', type: User })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async findById(@Param('id') id: string) {
        return this.authService.findById(id);
    }

    @Patch('update/:id')
    @UseGuards(JwtAuthGuard) 
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User successfully updated.', type: User })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
     async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.authService.update(id, updateUserDto);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard) 
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User successfully deleted.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async delete(@Param('id') id: string) {
        return this.authService.delete(id);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Successfully retrieved user profile.', type: User })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async profile(@Req() req): Promise<User> {
        return this.authService.getProfile(req.user.id);
    }

}
