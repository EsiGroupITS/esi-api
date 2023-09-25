import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleEnum } from 'src/auth/roles/role-enum/role-enum';
import { Role } from 'src/auth/roles/role.decorator';
import { RoleGuard } from 'src/auth/roles/role.guard';
import { UserEntity } from '../users/user-entity/user-entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';




// Guards y Roles para Games

@UseGuards(AuthGuard, RoleGuard)
//@Role(RoleEnum.Admin, RoleEnum.User, RoleEnum.Superuser)
@Controller('games')

export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

 
  @Post('create')
  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  create(
    //@Param('id', ParseUUIDPipe) id: string,
    @Body() createGameDto: CreateGameDto,
    @GetUser('name', 'id') user: UserEntity,
  ){
    
    return this.gamesService.create(createGameDto, user);
  
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
  }

  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
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


  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('id') users: UserEntity, 
    @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto, users);
  }


  @Role(RoleEnum.Superuser)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.remove(id);
  }
}
