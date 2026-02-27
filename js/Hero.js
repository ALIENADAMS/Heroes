export class Hero {

    expTable = []

    constructor(initialData = {})
    {
        this.data = initialData;
        this.container = document.getElementById('stats');
    }

    render()
    {
        const elements = this.container.querySelectorAll('[data-hero]');

        elements.forEach(el => {
            const hero = el.dataset.hero;
            el.textContent = this.get(hero);
        });
    }

    get(name)
    {
        return this.data[name] ?? 0;
    }

    setExp(exp, expToNext)
    {
        console.log('Set actually exp');
        const expBar = document.getElementById('hero_exp');
        console.log('Actually lvl: ' + this.data['lvl'] + '. Actually exp: ' + this.data['exp'] + '. To next level: ' + expToNext);
        if(exp == 0)
        {
            expBar.style.width = '1px';
        }
        else
        {
            expBar.style.width = exp + 'px';
        }
    }

    getExp()
    {
        console.log('Actually exp: ' + this.data['exp']);
    }

    getExpToNextLevel()
    {
        return this.data['baseExp'] * this.data['lvl'];
    }

    addExp(expToAdd)
    {
        console.log('Add ' + expToAdd + ' exp');
        this.data['exp'] += expToAdd;
        const expBar = document.getElementById('hero_exp');
        expBar.style.width = this.data['exp'] + 'px';
        this.calculateLevel();

        this.render();
    }

    calculateLevel()
    {
        let requiredExp = this.getExpToNextLevel();
        const heroLvl = document.getElementById('lvl');
        const expBar = document.getElementById('hero_exp');
        let expToNextLvl = requiredExp - this.data['exp'];
        console.log('Actually level: ' + this.data['lvl']);
        console.log('Actually exp: ' + this.data['exp']);
        console.log('Require ' + expToNextLvl + ' exp to next level');
        let progress = this.data['exp'] / (this.data['exp'] + expToNextLvl) * 100;
        console.log('Progress = ' + progress + '%');
        expBar.style.width = progress + 'px';
        expBar.textContent = progress + '%';

        while(this.data['exp'] >= requiredExp)
        {
            this.data['exp'] -= requiredExp;
            this.data['lvl']++;
            console.log('Actually level: ' + this.data['lvl']);
            heroLvl.textContent = this.data['lvl'];
            requiredExp = this.getExpToNextLevel();
            console.log('Required to next level: ' + requiredExp);
        }
        this.render();
    }

    getStats()
    {
        console.log('Hero stats');
        console.log('Attack: ' + this.data['attack']);
        console.log('Defense: ' + this.data['defense']);
        console.log('Magic: ' + this.data['magic']);
    }

    increaseStat(statName, amount)
    {
        console.log('increaseStat method');
        console.log('Stat value: ' + this.data[statName]);
        console.log(statName + ' += ' + amount);
        this.data[statName] += amount;
        console.log('New value of ' + statName + ' = ' + this.data[statName]);
        this.render();
    }

    toJSON()
    {
        return {
            level: this.data['lvl'],
            exp: this.data['exp'],
            attack: this.data['attack'],
            defense: this.data['defense'],
            magin: this.data['magic']
        };
    }

    load(data)
    {
        this.data['lvl'] = data['lvl'];
        this.data['exp'] = data['exp'];
        this.data['attack'] = data['attack'];
        this.data['defense'] = data['defense'];
        this.data['magic'] = data['magic'];
    }
}

const response = await fetch('../src/data/hero.json');
const json = await response.json();

const heroes = new Hero(json);
console.log(heroes);

heroes.render();
heroes.setExp(0, 100);
//heroes.addExp(10);
heroes.calculateLevel();
//resources.subtract('wood', 10);
//resources.add('wood', 10);
//heroes.getStats();
//heroes.increaseStat('attack', 3);