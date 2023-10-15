import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleEnum } from 'src/auth/roles/role-enum/role-enum';
import { Role } from 'src/auth/roles/role.decorator';
import { RoleGuard } from 'src/auth/roles/role.guard';
import { UserEntity } from '../users/user-entity/user-entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { CreateGameDto } from './dto/create-game.dto';




// Guards y Roles para Games

@UseGuards(AuthGuard, RoleGuard)
@Role(RoleEnum.Admin, RoleEnum.User, RoleEnum.Superuser)
@Controller('games')

export class GamesController {
  constructor(private gamesService: GamesService) {}

 
  @Post('create')
  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  create(
    @GetUser() user:{ id: string},
    @Body() createGameDto: CreateGameDto,
  ){
    
    return this.gamesService.create(createGameDto, user.id);
  
  }
  
/*
  testingPrivateRoute(
    @GetUser(['name', 'username']) user: UserEntity,       // Usamos el decorador creado get-user. Y obtenemos al usuario de la request
  ) {
    return {
      ok: true,
      message: 'User obtenido',
      user,
    }
  }*/

  // Implementamos paginación
  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    console.log(paginationDto)
    return this.gamesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.gamesService.findOne(term);
  }

  @Patch(':id')
  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  update(
    //@Param('id', ParseUUIDPipe) id: string, 
    @Body() updateGameDto: UpdateGameDto,
    @GetUser() user: UserEntity,
    ) {
    return this.gamesService.update( updateGameDto, user);
  }


  @Role(RoleEnum.Superuser)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.remove(id);
  }
}