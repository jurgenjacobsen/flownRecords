import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('aviwx')
export class AviwxController {
    constructor(private readonly httpService: HttpService) {}

    @Get(':stationICAO')
    async getAviwx(@Param('stationICAO') stationICAO: string): Promise<any> {
        const URL = `https://aviationweather.gov/api/data/metar?ids=${stationICAO}&format=json&taf=true`;

        try {
            const response = await firstValueFrom(this.httpService.get(URL));
            return response.data;
        } catch (error) {
            return { error: 'Failed to fetch data', details: error.message };
        }
    }
}

