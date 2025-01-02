let livros = []
const generos = [
    "Aventura", "Autobiografia", "Clássico", "Comédia", "Comédia Romântica", "Conto", "Ciência", "Contemporâneo", "Drama", "Distopia", "Educação", "Épico",
    "Fábula", "Fantasia", "Ficção científica", "Filosofia", "Horror", "Infantil", "Infanto-juvenil", "Jovem adulto", "Magia", "Mistério", "Novela", "Policial", 
    "Romance", "Sátira", "Suspense", "Terror", "Tragédia", "Vampirismo"
];
const btsGeneros = document.querySelectorAll('.btGenero');
const generosSelecionados = new Set();
const gridGeneros = document.querySelector(".gridGeneros");
const booksContainer = document.getElementById("books-container");
let cont = 0;

fetch("../livros.json")
    .then((response) => response.json())
    .then(livrosJson => {
        livros = livrosJson
    })
    .catch(error => console.error("Erro ao carregar os livros", error));

function mudarBotao(button, genero) {
    if (generosSelecionados.has(genero)) {
        generosSelecionados.delete(genero);
        button.classList.remove('selected');
      } else {
        generosSelecionados.add(genero);
        button.classList.add('selected');
      }
}

function preencherFormulario() {
    generos.forEach(genero => {
        let div = document.createElement("div");
        div.classList.add("item-genero");

        div.innerHTML = `
            <div class="btGenero" data-value="${genero}">${genero}</div>
        `;

        const button = div.querySelector(".btGenero")
        button.addEventListener("click", () => mudarBotao(button, genero))

        gridGeneros.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", preencherFormulario());

function recomendarMelhores() {
    document.querySelector(".container:last-of-type h2").innerHTML = "Aqui estão nossas recomendações:"

    let arrayGeneros = Array.from(generosSelecionados)
    //alert('Gêneros selecionados: ' + arrayGeneros.join(', '));
    for (let i = 0; i<livros.length; i++) {
        livros[i].pontuacao = 0;
    }

    arrayGeneros.forEach(generoSelecionado => {
        livros.forEach(livro => {
            if (livro.generos.includes(generoSelecionado)) {
                livro.pontuacao ++;
            }
        })
    })

    let livrosOrdenados = livros.sort((a, b) => b.pontuacao - a.pontuacao);

    livrosRecomendados = livrosOrdenados.filter(livro => livro.pontuacao > 0).slice(0, 6)

    booksContainer.innerHTML = ""

    livrosRecomendados.forEach(livro => {
        let div = document.createElement("div");
        div.classList.add("livro")
    
        div.innerHTML = `
            <img src="${livro.image}" alt="${livro.nome}">
            <p>${livro.nome}</p>
            <b>Autor: </b>${livro.autor}<br>
            <b>Gêneros: </b>${livro.generos.join(", ")}
        `;
    
        booksContainer.appendChild(div);
    });    
}

function limparRecomendaçoes() {
    booksContainer.innerHTML = ""
    document.querySelector(".container:last-of-type h2").innerHTML = ""

    document.querySelectorAll('.btGenero').forEach(botao => {
        botao.classList.remove('selected');
    });
    
    generosSelecionados.clear();
}