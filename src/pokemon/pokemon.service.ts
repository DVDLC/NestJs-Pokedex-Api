// Libraries
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
// DTOS
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
// Entity
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(CreatePokemonDto: CreatePokemonDto) {

    CreatePokemonDto.name = CreatePokemonDto.name.toLowerCase()

    try {
      const pokemon = await this.pokemonModel.create(CreatePokemonDto)
      return pokemon

    }catch ( err ) {
      this.handleExeptions( err )
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne( term: string ) {

    let pokemon: Pokemon

    if( !isNaN( +term ) ){
      pokemon = await this.pokemonModel.findOne({ no: term })
    }
    
    if( !pokemon && isValidObjectId( term ) ){
      pokemon = await this.pokemonModel.findById( term )
    }

    if( !pokemon ){
      pokemon = await this.pokemonModel.findOne({ name: term })
    }

    if( !pokemon ) throw new NotFoundException( 'Pokemon do not exist' )

    return pokemon
  }

  async update( term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( term )
 
    

    try {
      if( updatePokemonDto.name ) updatePokemonDto.name = updatePokemonDto.name.toLowerCase()

      await pokemon.updateOne( updatePokemonDto )
      return { ...pokemon.toJSON(), ...updatePokemonDto  }

    } catch( err ){
      this.handleExeptions( err )
    }
   
  }

  async remove(id: string) {
    
    const pokemon = await this.findOne( id )
    await pokemon.deleteOne()
    
    return pokemon;
  }


  private handleExeptions( err: any ){
    if( err.code === 11000 ) throw new BadRequestException( `Pokemon already exist in DB ${ JSON.stringify( err.keyValue ) }` )
      else throw new InternalServerErrorException( ' Something went wrong | talk with the admin' )
  }

}
