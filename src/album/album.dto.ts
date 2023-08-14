import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null;

  @IsNumber()
  @IsOptional()
  year: number;
}
