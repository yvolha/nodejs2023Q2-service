import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
