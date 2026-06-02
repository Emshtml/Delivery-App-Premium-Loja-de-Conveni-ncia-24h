/*
==============================================================================
Delivery App Premium
Loja de Conveniência 24h

Copyright (c) 2026 SentientFlow Labs

Todos os direitos reservados.

Licença Comercial Proprietária.
==============================================================================
*/

const CONFIG = {

    /* ==========================================================
       IDENTIDADE DA LOJA
    ========================================================== */

    empresa: "Conveniência 24h",

    slogan: "Entrega rápida todos os dias",

    logo: "./assets/img/logo.png",

    banner: "./assets/img/banner.jpg",

    favicon: "./assets/img/logo.png",

    /* ==========================================================
       CONTATO
    ========================================================== */

    whatsapp: "5511976794749",

    email: "contato@conveniencia24h.com",

    instagram: "@conveniencia24h",

    endereco:
        "São Paulo - SP",

    /* ==========================================================
       PIX
    ========================================================== */

    pix: {

        chave: "SUA_CHAVE_PIX_AQUI",

        nomeRecebedor:
            "Conveniência 24h",

        cidade:
            "SAO PAULO"

    },

    /* ==========================================================
       TEMA
    ========================================================== */

    tema: {

        primary: "#16a34a",

        primaryDark: "#15803d",

        secondary: "#18181b",

        background: "#f4f4f5",

        card: "#ffffff",

        text: "#18181b"

    },

    /* ==========================================================
       ENTREGA
    ========================================================== */

    entrega: {

        taxa: 5.00,

        minimoPedido: 15.00,

        entregaGratisAcimaDe: 80.00

    },

    /* ==========================================================
       HORÁRIOS
    ========================================================== */

    funcionamento: {

        segunda: "24h",
        terca: "24h",
        quarta: "24h",
        quinta: "24h",
        sexta: "24h",
        sabado: "24h",
        domingo: "24h"

    }

};


/* ==============================================================
   APLICAÇÃO AUTOMÁTICA DO TEMA
============================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const root = document.documentElement;

    root.style.setProperty(
        "--primary",
        CONFIG.tema.primary
    );

    root.style.setProperty(
        "--primary-dark",
        CONFIG.tema.primaryDark
    );

    root.style.setProperty(
        "--secondary",
        CONFIG.tema.secondary
    );

    root.style.setProperty(
        "--bg",
        CONFIG.tema.background
    );

    root.style.setProperty(
        "--card",
        CONFIG.tema.card
    );

    root.style.setProperty(
        "--text",
        CONFIG.tema.text
    );

});
