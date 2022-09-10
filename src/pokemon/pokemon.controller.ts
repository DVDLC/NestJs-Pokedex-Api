// Libraries
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
// Services
import { PokemonService } from './pokemon.service';
// DTOS
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { paginationDTO } from '../common/dto/querys-pagination.dto';
// Pipes
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';


@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create( createPokemonDto );
  }

  @Get()
  findAll( @Query() paginationDto: paginationDTO ) {
    return this.pokemonService.findAll( paginationDto );
  }

  @Get(':term')
  findOne(@Param('term') id: string) {
    return this.pokemonService.findOne( id );
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update( term , updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.pokemonService.remove( id );
  }
}
