/*
Copyright (c) 2026 SentientFlow Labs
Todos os direitos reservados.
*/

document
.getElementById("salvarConfig")
.addEventListener("click", () => {

    const configCustom = {

        whatsapp:
        document.getElementById("whatsapp").value,

        pix:
        document.getElementById("pix").value

    };

    localStorage.setItem(
        "configCustom",
        JSON.stringify(configCustom)
    );

    alert("Configurações salvas.");

});

document
.getElementById("adicionarProduto")
.addEventListener("click", () => {

    const produto = {

        id: Date.now(),

        nome:
        document.getElementById("nome").value,

        preco:
        Number(
            document.getElementById("preco").value
        ),

        categoria:
        document.getElementById("categoria").value,

        descricao:
        document.getElementById("descricao").value,

        imagem:
        document.getElementById("imagem").value

    };

    let extras = JSON.parse(
        localStorage.getItem("produtosExtras")
    ) || [];

    extras.push(produto);

    localStorage.setItem(
        "produtosExtras",
        JSON.stringify(extras)
    );

    alert("Produto cadastrado.");

});
