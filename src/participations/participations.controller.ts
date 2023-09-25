import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { RoleEnum } from 'src/auth/roles/role-enum/role-enum';
import { Role } from 'src/auth/roles/role.decorator';

@Controller('participations')
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService) {}

  @Post()
  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  create(@Body() createParticipationDto: CreateParticipationDto) {
    return this.participationsService.create(createParticipationDto);
  }

  @Get()
  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  findAll() {
    return this.participationsService.findAll();
  }

  @Get(':id')
  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  findOne(@Param('id') id: string) {
    return this.participationsService.findOne(+id);
  }

  @Patch(':id')
  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updateParticipationDto: UpdateParticipationDto) {
    return this.participationsService.update(+id, updateParticipationDto);
  }

  @Delete(':id')
  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.participationsService.remove(+id);
  }
}
