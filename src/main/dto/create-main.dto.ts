import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMainDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly calories: number;

  @IsNumber()
  readonly weight: number;
}
