import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: 'Informe um email válido' })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma senha válida' })
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
