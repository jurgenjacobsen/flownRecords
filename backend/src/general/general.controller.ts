import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('gen')
export class GeneralController {
    @Get('/wx/:ad') 
    getWx(@Req() req: Request) {
        const ad = req.params.ad;
        const raw = fetch(`
            https://aviationweather.gov/api/data/metar?ids=${ad}&format=json&taf=true
        `);

        return raw.then(response => response.json())
            .then(data => {
                return {
                    status: 'success',
                    data: data?.[0]
                };
            })
            .catch(error => {
                return {
                    status: 'error',
                    message: error.message
                };
            });
    }
}
