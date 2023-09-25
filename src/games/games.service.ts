import { Injectable, InternalServerErrorException, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { UpdateGameDto } from './dto/update-game.dto';
import { UserEntity } from '../users/user-entity/user-entity';

@Injectable()
export class GamesService {

  // Manejo de errores

  private readonly logger = new Logger('GamesService')  // El error de consola va a decir GamesService, vamos a ver los Logs como aparecen en la consola de Nest

  // Inject repositories

  constructor (
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,

  ) {}

  // Verificar User
  
  async create(createGameDto: CreateGameDto, user: UserEntity) {

    try {

      const { ...gameDetails } = createGameDto;

      const game = this.gameRepository.create({        // Creamos el registro en memoria
        ...gameDetails,
        user,
    });                        

    await this.gameRepository.save( game );        // Grabamos el registro en la DB.

    return { ...game };

    } catch (error) { 

      this.handleDbExecptions(error);
    }
  }

  // Paginación

  findAll(paginationDto:PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto; // Como los dos atributos son opcionales, si no se mandan los valores, seteamos valores limit y offset por defecto

    return this.gameRepository.find({
      take: limit,
      skip: offset

      // TODO relaciones


    });
  }

  // Implementamos queryBuilder para buscar un juego por id o nombre
  async findOne(term: string) {

    let game: Game;

    if( isUUID(term) ) {
      game = await this.gameRepository.findOneBy({ id: term});
      
    } else {
      const queryBuilder = this.gameRepository.createQueryBuilder();
      game = await queryBuilder //construimos el query
        .where('UPPER(title) =:title', {          // Parseamos el termino de búsqueda a upperCase
          title: term.toUpperCase(),              // Sí queremos agregar más métodos de búsqueda, los agregamos acá
        }).getOne();                // Con esto también nos aseguramos que no hagan inyección de dependencias en las url al querer buscar un usuario en este caso
    }

    if ( !game)
      throw new NotFoundException(`Game with ${ term } not found`);

    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto, user: UserEntity) {

    const game = await this.gameRepository.preload({
      id: id,           // Buscamos un juego por el id y cargamos sus propiedades que estén en el updateProductDto
      ...updateGameDto
    });

    if ( !game ) throw new NotFoundException(`Game with id: ${ id } not found`);

    try {

      game.user = user;
      await this.gameRepository.save( game );  //Guardamos la actualización del juego
      return game;
    } catch (error) {
      this.handleDbExecptions(error);
    }
  } 

  async remove(id: string) {
    const game = await this.findOne( id );
    await this.gameRepository.remove( game);
  }

  // Acá manejamos lo errores que podamos tener en el CRUD

  private handleDbExecptions(error: any) {

    if ( error.code ==='23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpecter error, check server logs');
  }
}

