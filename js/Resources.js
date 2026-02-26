export class Resources {
    constructor(initialData = {})
    {
        this.data = initialData;
        this.container = document.getElementById('resources');
    }

    render()
    {
        const elements = this.container.querySelectorAll('[data-resource]');

        elements.forEach(el => {
            const name = el.dataset.resource;
            el.textContent = this.get(name);
            if(this.get(name) <= 0)
            {
                el.classList.add('error');
            }
            else
            {
                el.classList.remove('error');
            }
        });
    }

    get(name)
    {
        return this.data[name] ?? 0;
    }

    add(name, amount)
    {
        if(!this.data[name])
        {
            this.data[name] = 0;
        }

        this.data[name] += amount;
        this.render();
    }

    subtract(name, amount)
    {
        if(this.get(name) < amount)
        {
            return false;
        }

        this.data[name] -= amount;
        this.render();
        return true;
    }

    hasEnough(name, amount)
    {
        return this.get(name) >= amount;
    }

    toJSON()
    {
        return {
            gold: this.data['gold'],
            wood: this.data['wood'],
            ore: this.data['ore'],
            gem: this.data['gem']
        };
    }

    load(data)
    {
        this.data['gold'] = data['gold'];
        this.data['wood'] = data['wood'];
        this.data['ore'] = data['ore'];
        this.data['gem'] = data['gem'];
    }
}

const response = await fetch('../src/data/resources.json');
const json = await response.json();

const resources = new Resources(json);
console.log(resources);

resources.render();
//resources.subtract('wood', 10);
//resources.add('wood', 10);