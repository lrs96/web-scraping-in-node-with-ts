import { Response, Request } from 'express';
import cheerio from 'cheerio';
import api from '../services/api';

interface PlayerData { 
    rank: number;
    name: string;
    nationality: string;
    goals: number
}

class Players {
    async index(req: Request, res: Response) {
        try {
            api.get('stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1')
            .then(
                response => {
                    const html = response.data;
                    const $ = cheerio.load(html)
                    const statsTable: Cheerio = $('.statsTableContainer > tr');
                    const topScorers: PlayerData[] = []
                    statsTable.each((i, elem) => {
                        const rank: number = parseInt($(elem).find('.rank > strong').text())
                        const name: string = $(elem).find('.playerName > strong').text();
                        const nationality: string = $(elem).find('.playerCountry').text();
                        const goals: number = parseInt($(elem).find('.mainStat').text())
                        topScorers.push( {
                            rank,
                            name,
                            nationality,
                            goals
                        })
                    })
                    return res.json(topScorers);
                }
            )
            .catch(console.error)
   
        } catch(e) {
            return res.json({'error': e})
        }
    }
}

export default Players;