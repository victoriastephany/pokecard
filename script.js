const typeColor = {
    bug: '#8BD674',
	dragon: '#7383B9',
	electric: '#F2CB55',
	fairy: '#EBA8C3',
	fighting: '#EB4971',
	fire: '#FFA756',
	flying: '#83A2E3',
	grass: '#8BBE8A',
	ground: '#F78551',
	ghost: '#8571BE',
	ice: '#91D8DF',
	normal: '#B5B9C4',
	poison: '#9F6E97',
	psychic: '#FF6568',
	rock: '#D4C294',
	water: '#58ABF6',
	dark: '#6F6E78',
	steel: '#4C91B2',
    }


const url = "https://pokeapi.co/api/v2/pokemon/"
const card = document.querySelector('#card')
const btn = document.querySelector('#btn')

function getPokemon(){
    let id = Math.floor(Math.random() * 1008) + 1
    const finalUrl = url + id

    fetch(finalUrl)
    .then(res => res.json())
    .then(data => genCard(data))
}

function genCard(data){
    console.log(data)

    const hp = data.stats[0].base_stat
    const pokeName = data.name
    const attack = data.stats[1].base_stat
    const defense = data.stats[2].base_stat
    const speed = data.stats[5].base_stat
    const imgSrc = data.sprites.other["official-artwork"].front_default

    console.log(hp,pokeName,attack,defense,speed,imgSrc)
    
    card.innerHTML = `
    <p class="hp">
        <span>HP</span>
        ${hp}
    </p>
    <img src=${imgSrc} alt=${pokeName}/>
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types"></div>
    <div class="stats">
        <div>
            <h3>${attack}</h3>
            <p>Attack</p>
        </div>

        <div>
            <h3>${defense}</h3>
            <p>Defense</p>
        </div>

        <div>
            <h3>${speed}</h3>
            <p>Speed</p>
        </div>

    </div>
    `

    appendTypes(data.types)

    const themeColor = typeColor[data.types[0].type.name]
    styleCard(themeColor)
}

function appendTypes(types){
    types.forEach(item => {
        let span = document.createElement('span')
        span.textContent = item.type.name
        document.querySelector('.types').appendChild(span)
    })
}

function styleCard(color){
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`

    card.querySelectorAll('.types span').forEach(badget => {
        badget.style.backgroundColor = typeColor[badget.innerText]
    })
}

btn.addEventListener('click', getPokemon)
window.addEventListener('load',getPokemon)

