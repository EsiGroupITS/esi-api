import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/user-dto/user-dto';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { UserEntity } from '../users/user-entity/user-entity';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {

  // Inject repositories
  constructor (
    @InjectRepository(Game) private gameRepository: Repository<CreateGameDto>,
    @InjectRepository(UserEntity)private userRepository: Repository<UserDto>
  ) {}

  // Verificar User
  async create(createGameDto: CreateGameDto, username: string) {
    //! Get the user
    const user = await this.userRepository.findOne({ where: {username} });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      //! Put the user into the game (relations)
      createGameDto.user = user
      // Grabamos el registro en la DB.
      const newGame = await this.gameRepository.save(createGameDto); 
      return newGame;
    }
    catch (e: any) { 
      throw new HttpException(e.message, e.status)
    }
  }

  // Paginación
  async findAll(paginationDto: PaginationDto) {
    try {
      // Como los dos atributos son opcionales, si no se mandan los valores, seteamos valores limit y offset por defecto
      const { limit = 10, offset = 0 } = paginationDto;
      return await this.gameRepository.find({
        take: limit,
        skip: offset,
        relations: { user: true }
      });
    } catch (e: any) {
      throw new HttpException(e.message, e.status)
    }
  }

  // Implementamos queryBuilder para buscar un juego por id o nombre
  async findOne(term: string) {
    try {
      let game: CreateGameDto;
      if( isUUID(term) ) {
        game = await this.gameRepository.findOne({ where: { id: term } });
      } else {
        const queryBuilder = this.gameRepository.createQueryBuilder();
        game = await queryBuilder //construimos el query
          .where('UPPER(title) =:title', { // Parseamos el termino de búsqueda a upperCase
            title: term.toUpperCase(), // Sí queremos agregar más métodos de búsqueda, los agregamos acá
          }).getOne(); // Con esto también nos aseguramos que no hagan inyección de dependencias en las url al querer buscar un usuario en este caso
      }

      if ( !game)
        throw new NotFoundException(`Game with ${ term } not found`);
      return game;
    } catch (e: any) {
      throw new HttpException(e.message, e.status)
    }
  }

  async update(updateGameDto: CreateGameDto, user: UserDto) {
    try {
      const { ...toUpdate } = updateGameDto;
      // Buscamos un juego por el id y cargamos sus propiedades que estén en el updateProductDto
      const game = await this.gameRepository.preload({
        ...toUpdate
      });
      if ( !game ) throw new NotFoundException(`Game not found`);
      try {
        game.user = user;
        await this.gameRepository.save( game );  //Guardamos la actualización del juego
        return game;
      } catch (e: any) {
        throw new HttpException(e.message, e.status)
      }
    } catch (e: any) {
      throw new HttpException(e.message, e.status)
    }
  } 

  async remove(id: string) {
    try {
      return await this.gameRepository.delete(id)
    } catch (e: any) {
      throw new HttpException(e.message, e.status)
    }
  }
}



