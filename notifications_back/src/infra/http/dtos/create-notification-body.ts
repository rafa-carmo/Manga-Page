import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator'

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string

  @IsNotEmpty()
  @Length(5, 240)
  content: string

  @IsNotEmpty()
  mangaSlug: string

  @IsNotEmpty()
  chapter: string

  @IsString()
  @Length(5, 240)
  discordId: string
}
