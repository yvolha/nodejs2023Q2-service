import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
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
  artistId: string | null;

  @IsNumber()
  @IsOptional()
  year: number;
}
