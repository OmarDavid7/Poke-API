
document.addEventListener('DOMContentLoaded', ()=>{
    const randon = getRamdomInt(1,151);
    fetchData(randon);
})

const getRamdomInt = (min,max)=>{
    return Math.floor(Math.random() * (max - min) + min);
}

const fetchData = async(id)=>{
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        console.log(data)

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            especial: data.stats[3].base_stat,
        }
        pintarCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (pokemon)=>{
    console.log(pokemon);
    const flex = document.querySelector(".flex");
    const template = document.getElementById('template').content;
    const fragment = document.createDocumentFragment();

    const clone = template.cloneNode(true);
    
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    clone.querySelector('.card-boddy-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp}</span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Exp';
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + 'K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.defensa + 'K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.especial + 'K';
    


    fragment.appendChild(clone);
    flex.appendChild(fragment);
}

