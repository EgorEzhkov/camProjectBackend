import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @IsString({ message: 'Логин должно быть строкой' })
  @IsNotEmpty({
    message: 'Логин обязателен для заполнения',
  })
  @MaxLength(50, {
    message: 'Логин не должен превышать 50 символов',
  })
  login: string;

  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({
    message: 'Почта обязательна для заполнения',
  })
  @IsEmail(
    {},
    { message: 'Некорректный формат электронной почты ' },
  )
  email: string;

  @IsString({ message: 'Пароль должнен быть строкой' })
  @IsNotEmpty({
    message: 'Пароль обязателен для заполнения',
  })
  @MinLength(6, {
    message: 'Пароль должен содержать не менее 6 символов',
  })
  @MaxLength(128, {
    message: 'Пароль не должен превышать 128 символов',
  })
  password: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @MaxLength(50, {
    message: 'Имя не должно превышать 50 символов',
  })
  userName: string;
}
