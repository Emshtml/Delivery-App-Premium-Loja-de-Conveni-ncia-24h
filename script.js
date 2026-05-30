/*
==============================================================================
Delivery App Premium
Loja de Conveniência 24h

Copyright (c) 2026 SentientFlow Labs

Todos os direitos reservados.

Licença Comercial Proprietária.
==============================================================================
*/

let carrinho = JSON.parse(
    localStorage.getItem("carrinho")
) || [];

const productsGrid =
    document.getElementById("productsGrid");

const searchInput =
    document.getElementById("searchInput");

const cartButton =
    document.getElementById("cartButton");

const cartModal =
    document.getElementById("cartModal");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");

const whatsappButton =
    document.getElementById("whatsappButton");

const pixButton =
    document.getElementById("pixButton");

const pixModal =
    document.getElementById("pixModal");

const closePix =
    document.getElementById("closePix");

let categoriaAtual = "todos";

/* ======================================================
   RENDERIZA PRODUTOS
====================================================== */

function renderProdutos(lista = produtos) {

    productsGrid.innerHTML = "";

    lista.forEach(produto => {

        productsGrid.innerHTML += `

        <div class="product-card">

            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
                class="product-image">

            <div class="product-content">

                <h3 class="product-title">
                    ${produto.nome}
                </h3>

                <p class="product-description">
                    ${produto.descricao}
                </p>

                <div class="product-footer">

                    <span class="product-price">
                        R$ ${produto.preco.toFixed(2)}
                    </span>

                    <button
                        class="add-cart"
                        onclick="adicionarCarrinho(${produto.id})">

                        Adicionar

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

/* ======================================================
   ADICIONAR CARRINHO
====================================================== */

function adicionarCarrinho(id){

    const produto =
        produtos.find(p => p.id === id);

    const existe =
        carrinho.find(item => item.id === id);

    if(existe){

        existe.quantidade++;

    } else {

        carrinho.push({

            ...produto,

            quantidade:1

        });

    }

    salvarCarrinho();

    atualizarCarrinho();

}

/* ======================================================
   REMOVER ITEM
====================================================== */

function removerItem(id){

    carrinho = carrinho.filter(
        item => item.id !== id
    );

    salvarCarrinho();

    atualizarCarrinho();

}

/* ======================================================
   SALVAR LOCALSTORAGE
====================================================== */

function salvarCarrinho(){

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}

/* ======================================================
   ATUALIZAR CARRINHO
====================================================== */

function atualizarCarrinho(){

    cartItems.innerHTML = "";

    let total = 0;

    let quantidadeTotal = 0;

    carrinho.forEach(item => {

        total +=
            item.preco * item.quantidade;

        quantidadeTotal +=
            item.quantidade;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>
                    ${item.nome}
                </strong>

                <p>
                    Qtd:
                    ${item.quantidade}
                </p>

            </div>

            <div>

                <strong>

                    R$
                    ${(item.preco * item.quantidade)
                    .toFixed(2)}

                </strong>

                <br>

                <button
                    onclick="removerItem(${item.id})">

                    Remover

                </button>

            </div>

        </div>

        `;

    });

    if(total > 0){

        total += CONFIG.entrega.taxa;

    }

    cartTotal.textContent =
        total.toFixed(2);

    cartCount.textContent =
        quantidadeTotal;

}/* ======================================================
   BUSCA
====================================================== */

searchInput.addEventListener(
    "input",
    function(){

        const termo =
            this.value.toLowerCase();

        let lista = produtos.filter(
            produto =>
                produto.nome
                .toLowerCase()
                .includes(termo)
        );

        if(categoriaAtual !== "todos"){

            lista = lista.filter(
                produto =>
                    produto.categoria ===
                    categoriaAtual
            );

        }

        renderProdutos(lista);

    }
);

/* ======================================================
   CATEGORIAS
====================================================== */

document
.querySelectorAll(".category-btn")
.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            document
            .querySelectorAll(".category-btn")
            .forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            categoriaAtual =
                btn.dataset.category;

            if(categoriaAtual === "todos"){

                renderProdutos(produtos);

                return;
            }

            renderProdutos(

                produtos.filter(
                    produto =>
                    produto.categoria ===
                    categoriaAtual
                )

            );

        }
    );

});

/* ======================================================
   MODAL CARRINHO
====================================================== */

cartButton.addEventListener(
    "click",
    () => {

        cartModal.classList.remove(
            "hidden"
        );

    }
);

closeCart.addEventListener(
    "click",
    () => {

        cartModal.classList.add(
            "hidden"
        );

    }
);

/* ======================================================
   MODAL PIX
====================================================== */

pixButton.addEventListener(
    "click",
    () => {

        pixModal.classList.remove(
            "hidden"
        );

        document.getElementById(
            "pixKey"
        ).textContent =
            CONFIG.pix.chave;

    }
);

closePix.addEventListener(
    "click",
    () => {

        pixModal.classList.add(
            "hidden"
        );/* ======================================================
   FINALIZAR WHATSAPP
====================================================== */

whatsappButton.addEventListener(
    "click",
    finalizarPedido
);

function finalizarPedido(){

    const nome =
        document.getElementById(
            "customerName"
        ).value;

    const endereco =
        document.getElementById(
            "customerAddress"
        ).value;

    const observacoes =
        document.getElementById(
            "customerNotes"
        ).value;

    if(carrinho.length === 0){

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }

    let mensagem =
`🛒 *NOVO PEDIDO*

👤 Cliente:
${nome}

📍 Endereço:
${endereco}

━━━━━━━━━━━━━━━

`;

    carrinho.forEach(item => {

        mensagem +=

`${item.nome}
Qtd: ${item.quantidade}
Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}

`;

    });

    let total = carrinho.reduce(

        (acc,item) =>
        acc + (
            item.preco *
            item.quantidade
        ),

        0

    );

    total += CONFIG.entrega.taxa;

    mensagem +=

`━━━━━━━━━━━━━━━

🚚 Taxa:
R$ ${CONFIG.entrega.taxa.toFixed(2)}

💰 Total:
R$ ${total.toFixed(2)}

📝 Observações:
${observacoes}

Pagamento via PIX.
`;

    const url =

`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;

    window.open(
        url,
        "_blank"
    );

}

/* ======================================================
   INICIALIZAÇÃO
====================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderProdutos();

        atualizarCarrinho();

    }
);

    }
);
