import { IsString } from "class-validator";
import { Capitalize } from "src/common/decorators/capitalize.decorator";
import { Trim } from "src/common/decorators/trim.decorator";

export class CreateTagDto {
  @Trim()
  @IsString()
  @Capitalize()
  name: string;
}
