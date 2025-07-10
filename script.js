const botoes = document.querySelectorAll("button");
const display = document.getElementById("display");

botoes.forEach(function (botao) {
  botao.addEventListener("click", function () {
    //display.value += botao.innerText;
    const valorBotao = botao.innerText;

    if (valorBotao === "AC") {
      display.value = "0";
    } else if (valorBotao === "=") {
      calcular();
    } else if (display.value === "0") {
      display.value = valorBotao;
    } else {
      display.value += valorBotao;
    }
  });
});
function calcular() {
  try {
    let expressaoMatematica = display.value
      .replace(/×/g, "*")
      .replace(/÷/g, "/");
    display.value = eval(expressaoMatematica);
  } catch (error) {
    display.value = "erro";
  }
}
