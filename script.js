const botoes = document.querySelectorAll("button");
const display = document.getElementById("display");

let primeiroNumero = null;
let operador = null;
let esperandoSegundoNumero = false;

botoes.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const valorBotao = botao.innerText;
    destacarBotao(botao);
    if (valorBotao === "+/-") {
      let numeroAtual = parseFloat(display.value);
      numeroAtual *= -1;
      display.value = numeroAtual;
    } else if (valorBotao === "%") {
      let numeroAtual = parseFloat(display.value);
      numeroAtual = numeroAtual / 100;
      display.value = numeroAtual;
    } else if (valorBotao === "AC") {
      display.value = "0";
      primeiroNumero = null;
      operador = null;
      esperandoSegundoNumero = false;
    } else if (valorBotao === "=") {
      calcular();
    } else if (valorBotao === ",") {
      const partes = display.value.split(/[\+\-\×÷]/);
      const ultimoNumero = partes[partes.length - 1];
      if (!ultimoNumero.includes(".")) {
        display.value += ".";
      }
    } else if (display.value === "0") {
      display.value = valorBotao;
    } else if (["+", "-", "×", "÷"].includes(valorBotao)) {
      primeiroNumero = display.value;
      operador = valorBotao;
      esperandoSegundoNumero = true;
    } else if (esperandoSegundoNumero) {
      display.value = valorBotao;
      esperandoSegundoNumero = false;
    } else {
      display.value += valorBotao;
    }
  });
});

function calcular() {
  try {
    if (primeiroNumero === null || operador === null) {
      return;
    }
    let segundoNumero = display.value;
    let expressao = `${primeiroNumero}${operador}${segundoNumero}`;

    expressao = expressao.replace(/×/g, "*").replace(/÷/g, "/");

    const resultado = eval(expressao);
    display.value = resultado;

    primeiroNumero = null;
    operador = null;
    esperandoSegundoNumero = false;
  } catch (error) {
    display.value = "erro";
  }
}

function destacarBotao(botaoClicado) {
  botoes.forEach((btn) => {
    btn.style.backgroundColor = "";
    btn.style.color = "";
  });
  botaoClicado.style.backgroundColor = "white";
  botaoClicado.style.color = "black";
}
