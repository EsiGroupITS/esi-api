import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { RoleEnum } from 'src/auth/roles/role-enum/role-enum';
import { Role } from 'src/auth/roles/role.decorator';
import { RoleGuard } from 'src/auth/roles/role.guard';
import { UserDto } from 'src/users/user-dto/user-dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesService } from './games.service';

// Guards y Roles para Games
@UseGuards(AuthGuard, RoleGuard)
@Role(RoleEnum.Admin, RoleEnum.User, RoleEnum.Superuser)
@Controller('games')
//Set the tag for GAMES
@ApiTags('games')
export class GamesController {

  constructor(
    private gamesService: GamesService
  ) {}

  @Post('create')
  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Approved', type: CreateGameDto })
  @ApiResponse({ status: 403, description: 'Forbidden. No role admitted' })
  @ApiResponse({ status: 500, description: 'Internal Server Error'})
  async create(
    @GetUser() user:{ id: string},
    @Body() createGameDto: CreateGameDto,
    @Res() res: Response
  ){
    const result = await this.gamesService.create(createGameDto, user.id);
    res.status(HttpStatus.CREATED).json({
      ok: true,
      result,
      msg: 'Approved'
    })
  }

  // Implementamos paginación
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Approved', type: CreateGameDto, isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden. No role admitted'})
  @ApiResponse({ status: 500, description: 'Internal Server Error'})
  async findAll(@Query() paginationDto:PaginationDto, @Res() res: Response) {
    const result = await this.gamesService.findAll(paginationDto);
    res.status(HttpStatus.OK).json({
      ok: true,
      result,
      msg: 'Approved'
    })
  }

  @Get(':term')
  @ApiResponse({ status: HttpStatus.OK, description: 'Approved', type: CreateGameDto })
  @ApiResponse({ status: 500, description: 'Internal Server Error'})
  findOne(@Param('term') term: string) {
    return this.gamesService.findOne(term);
  }

  @Patch(':id')
  @Role(RoleEnum.Superuser, RoleEnum.Admin)
  @ApiResponse({ status: HttpStatus.OK, description: 'Approved', type: CreateGameDto })
  @ApiResponse({ status: 403, description: 'Forbidden. No role admitted'})
  @ApiResponse({ status: 500, description: 'Internal Server Error'})
  update(
    @Body() updateGameDto: CreateGameDto,
    @GetUser() user: UserDto,
    ) {
    return this.gamesService.update( updateGameDto, user);
  }


  @Role(RoleEnum.Superuser)
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Approved' })
  @ApiResponse({ status: 403, description: 'Forbidden. No role admitted'})
  @ApiResponse({ status: 500, description: 'Internal Server Error'})
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    await this.gamesService.remove(id);
    res.status(HttpStatus.OK).json({
      ok: true,
      msg: 'Deleted'
    })
  }
}