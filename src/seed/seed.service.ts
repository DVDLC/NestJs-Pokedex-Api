// Libraries
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// Entities
import { Pokemon } from '../pokemon/entities/pokemon.entity';
// Interfaces
import { PokeResponse } from './interfaces/poke-response.interface';
// providers
import { AxiosAdapter } from '../common/providers/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({})

    const data = await this.http.get<PokeResponse>( 'https://pokeapi.co/api/v2/pokemon?limit=650' )
    const pokemonToInsert: { name: string, no: number }[] = []

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const no: number = +segments[ segments.length - 2 ]

      pokemonToInsert.push({ name, no })
    })

    await this.pokemonModel.insertMany( pokemonToInsert )

    return 'Seed executed'
  }
}
