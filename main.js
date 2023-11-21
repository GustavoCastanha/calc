// Variável para controlar se a calculadora está no modo Bhaskara
let isBhaskaraMode = false;

// Variáveis para os coeficientes da equação de segundo grau (ax^2 + bx + c)
let a = '';
let b = '';
let c = '';

// Variáveis para armazenar a entrada do usuário e o coeficiente atual sendo inserido
let currentInput = '';
let currentCoefficient = 'a';

// Flag para indicar se a seleção do próximo coeficiente está pendente
let awaitingCoefficientSelection = false;

// Seleciona o elemento HTML com a classe "screen" e armazena em uma constante
const screen = document.querySelector(".screen");

// Seleciona todos os elementos HTML com a classe "btn" e armazena em uma constante
const buttons = document.querySelectorAll(".btn");

// Itera sobre cada botão e adiciona um ouvinte de evento de clique
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Obtém o texto do botão pressionado
        const pressedButton = button.textContent;

        // Limpa a tela se houver um erro anterior
        if (currentInput === "Error!") {
            currentInput = "";
        }

        // Verifica se a seleção do próximo coeficiente está pendente
        if (awaitingCoefficientSelection) {
            // Atualiza o coeficiente atual com base no botão pressionado
            if (pressedButton === "B") {
                currentCoefficient = 'b';
                screen.textContent = "Insira o coeficiente B";
            } else if (pressedButton === "C") {
                currentCoefficient = 'c';
                screen.textContent = "Insira o coeficiente C";
            }
            awaitingCoefficientSelection = false;
            return;
        }

        // Limpa todas as variáveis se o botão "C" for pressionado
        if (button.id === "c") {
            screen.textContent = "0";
            isBhaskaraMode = false;
            a = '';
            b = '';
            c = '';
            currentInput = '';
            currentCoefficient = 'a';
            return;
        }

        // Remove o último caractere da entrada
        if (button.id === "delete") {
            currentInput = currentInput.slice(0, -1);
            screen.textContent = currentInput || "0";
            return;
        }

        // Lógica para o botão "="
        if (button.id === "equals") {
            // Verifica se está no modo Bhaskara ou não
            if (isBhaskaraMode) {
                // Converte os coeficientes para números
                a = parseFloat(a);
                b = parseFloat(b);
                c = parseFloat(c);
                // Calcula o delta
                const delta = b * b - 4 * a * c;
                // Calcula as raízes com base no valor de delta
                if (delta > 0) {
                    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
                    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
                    // Exibe as raízes na tela
                    screen.innerHTML = `Raízes:<br>X1 = ${x1.toFixed(2)}<br>X2 = ${x2.toFixed(2)}`;
                } else if (delta === 0) {
                    const x1 = -b / (2 * a);
                    screen.innerHTML = `Raízes:<br>X1 = X2 = ${x1.toFixed(2)}`;
                } else {
                    // Exibe uma mensagem se não houver raízes reais
                    screen.textContent = "Raízes: Não existem raízes reais";
                }
            } else {
                // Calcula o resultado da expressão matemática inserida
                try {
                    const result = eval(currentInput);
                    // Exibe o resultado na tela, limitando o número de dígitos
                    if (result.toString().length > 15) {
                        screen.textContent = "+" + (result.toString().length - 15);
                    } else {
                        screen.textContent = result;
                    }
                } catch {
                    // Exibe "Error!" se houver um erro na expressão
                    screen.textContent = "Error!";
                }
            }
            return;
        }

        // Lógica para o botão "bhaskara"
        if (button.id === "bhaskara") {
            // Ativa o modo Bhaskara e solicita o coeficiente A
            if (!isBhaskaraMode) {
                isBhaskaraMode = true;
                a = '';
                b = '';
                c = '';
                currentCoefficient = 'a';
                screen.textContent = "Insira o coeficiente A";
            }
            return;
        }

        // Lógica para o botão "nextCoefficient"
        if (button.id === "nextCoefficient") {
            // Ativa a seleção do próximo coeficiente e solicita B ou C
            awaitingCoefficientSelection = true;
            screen.textContent = "Escolha o próximo coeficiente: B ou C";
            return;
        }

        // Lógica para entrada de coeficientes no modo Bhaskara
        if (isBhaskaraMode) {
            if (currentCoefficient === 'a') {
                // Adiciona o dígito ao coeficiente A
                if (a.length < 13) {
                    a += pressedButton;
                    currentInput = a;
                    screen.textContent = currentInput;
                }
            } else if (currentCoefficient === 'b') {
                // Adiciona o dígito ao coeficiente B
                if (b.length < 13) {
                    b += pressedButton;
                    currentInput = b;
                    screen.textContent = currentInput;
                }
            } else if (currentCoefficient === 'c') {
                // Adiciona o dígito ao coeficiente C
                if (c.length < 13) {
                    c += pressedButton;
                    currentInput = c;
                    screen.textContent = currentInput;
                }
            }
        } else {
            // Se a função Bhaskara não estiver ativada, permite a entrada de números independentemente
            if (currentInput.length < 15) {
            if (currentInput === "0") {
                currentInput = pressedButton;
            } else {
                currentInput += pressedButton;
            }
            screen.textContent = currentInput;
        }
    });
});
