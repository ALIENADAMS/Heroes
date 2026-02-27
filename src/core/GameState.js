export class GameState {
    constructor(resources, hero)
    {
        if(!resources) throw new Error('Resources nie zostały przekazane do GameState!');
        if(!hero) throw new Error('Hero nie został przekazany do GameState!');
        this.day = 1;
        this.week = 1;
        this.resources = resources;
        this.hero = hero;
        this.dailyGoldIncome = 500;
        this.builtThisTurn = false;
    }

    nextTurn()
    {
        this.day++;
        if(this.day > 7)
        {
            this.day = 1;
            this.week++;
            this.resources.add('gold', this.dailyGoldIncome);
        }
        this.builtThisTurn = false;

        this.saveGame();
    }

    getDay()
    {
        return this.day;
    }

    getWeek()
    {
        return this.week;
    }

    getTurn()
    {
        return this.turn;
    }

    saveGame()
    {
        const gameData = {
            version: 1,
            hero: this.hero.toJSON(),
            day: this.day,
            week: this.week,
            resources: this.resources.toJSON()
        };

        localStorage.setItem('gameState', JSON.stringify(gameData));
    }

    loadGame()
    {
        const data = localStorage.getItem('gameState');
        if(!data) return;

        const parsed = JSON.parse(data);
        this.day = parsed.day;
        this.week = parsed.week;
        this.hero.load(parsed.hero);
        this.resources.load(parsed.resources);
    }

    build(building)
    {
        if(this.builtThisTurn)
        {
            return false;
        }

        for(let resource in building.cost)
        {
            if(!this.resources.hasEnough(resource, building.cost[resource]))
            {
                return false;
            }
        }

        for(let resource in building.cost)
        {
            this.resources.subtract(resource, building.cost[resource]);
        }

        this.builtThisTurn = true;
        return true;
    }
}

const game = new GameState();