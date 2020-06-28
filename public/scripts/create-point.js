/* Funcao que pega os estados transforma em json e depois pesquisa todos os estados para montar os options do select */
function populateUfs() {

    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        for( state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

/* chamada de funcao */
populateUfs()

/* funncao para a busca de cidades a partir da uf selecionada do select
salvando tbm o estado em uma variavel do tipo hidden do html */
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => {

        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

/* ouvidor de evento: clicar em alguma uf */
document.querySelector("select[name=uf]").addEventListener( "change", getCities )

// Itens de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

//array para os itens selecionados 
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //add ou remove uma classe com javascript

    itemLi.classList.toggle("selected")

    //pega o id do item selecionado
    const itemId = itemLi.dataset.id

    //verificar de existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })
    
    //se já estiver selecionados, remover da selecao ( do array )

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    }else {
        //se não estivar selecionado adicionar no array

        selectedItems.push(itemId)
    }
    
    //atualizar o campo escondido ( hidden no html ) 
    //com os itens selecionados
    collectedItems.value = selectedItems
}