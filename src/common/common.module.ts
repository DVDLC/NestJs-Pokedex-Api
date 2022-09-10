import { Injectable, Module } from '@nestjs/common';
import { AxiosAdapter } from './providers/axios.adapter';

@Module({
    providers: [ AxiosAdapter ],
    exports: [ AxiosAdapter ]
})
export class CommonModule {}
