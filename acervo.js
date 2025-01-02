let livros = []
let livrosOrdenados = []
const container = document.getElementById("books-container");

document.addEventListener("DOMContentLoaded", () => {
    fetch("../livros.json")
    .then((response) => response.json())
    .then(livrosJson => {
        livros = livrosJson
        livrosOrdenados = [...livros].sort((a, b) => a.nome.localeCompare(b.nome)); 

        mostrarLivros()
    })
    .catch(error => console.error("Erro ao carregar os livros", error));
})

function mostrarLivros() {
    container.innerHTML = ""

    livrosOrdenados.forEach(livro => {
        let div = document.createElement("div");
        div.classList.add("livro")

        div.innerHTML = `
            <img src="${livro.image}" alt="${livro.nome}">
            <p>${livro.nome}</p>
            <b>Autor(a): </b>${livro.autor}<br>
            <b>Gêneros: </b>${livro.generos.join(", ")}
        `;

        container.appendChild(div);
    });
}

function buscarLivro() {
    const input = document.getElementById("inputLivro")
    let data = input.value.toLowerCase()

    container.innerHTML = ""

    if (data === "") {
        mostrarLivros()
        return
    }

    let livrosAtualizados = livros.filter(livro => 
        livro.nome.toLowerCase().includes(data)
    );

    if (livrosAtualizados.length === 0) {
        container.innerHTML = "<p>Nenhum livro encontrado.</p>";
    }

    livrosAtualizados.forEach(livro => {
        let div = document.createElement("div");
        div.classList.add("livro")

        div.innerHTML = `
            <img src="${livro.image}" alt="${livro.nome}">
            <p>${livro.nome}</p>
            <b>Autor: </b>${livro.autor}<br>
            <b>Gêneros: </b>${livro.generos.join(", ")}
        `;

        container.appendChild(div);
    });
}