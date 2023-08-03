// Simulação de um Firewall de Aplicação Web (WAF)
// Neste exemplo, bloquearemos IPs que fazem solicitações excessivas em um curto período de tempo.
const rateLimit = {};

function blockIP(ip) {
  rateLimit[ip] = (rateLimit[ip] || 0) + 1;
  if (rateLimit[ip] > 10) {
    alert(`Seu IP ${ip} foi bloqueado temporariamente por exceder o limite de solicitações.`);
    btnElement.disabled = true; // Bloquear o botão
    document.cookie = "blocked=true"; // Definir um cookie para sinalizar o bloqueio
  }
}

const btnElement = document.querySelector('button');
const allowedRequests = 10; // Limite de solicitações permitidas em um curto período de tempo
let requestCount = 0;

function handleButtonClick() {
  requestCount++;
  if (requestCount > allowedRequests) {
    blockIP('192.168.0.1'); // Substitua '192.168.0.1' pelo IP do cliente real
    requestCount = 0; // Zerar o contador de solicitações
    return;
  }
  
  setTimeout(() => {
    requestCount = 0; // Zerar o contador de solicitações após o tempo determinado
  }, 5000); // Tempo de reset das solicitações (5 segundos)
}

btnElement.addEventListener('click', handleButtonClick);

// Contador para acompanhar as tentativas de envio bem-sucedidas do formulário
let successfulAttempts = 0;
const maxSuccessfulAttempts = 2; // Limite de tentativas permitidas em um curto período de tempo

// Função para validar o formulário antes de ser enviado
function validateForm() {
  // Verificar se o formulário já está bloqueado
  if (document.cookie.includes("blocked=true")) {
    alert('Você atingiu o limite de envios permitidos. Tente novamente em alguns minutos.');
    return false; // Impede o envio do formulário
  }

  // Verificar se o reCAPTCHA foi concluído
  const response = grecaptcha.getResponse();
  if (response.length === 0) {
    alert('Por favor, complete o reCAPTCHA antes de enviar o formulário.');
    return false; // Impede o envio do formulário
  }

  // Verificar se o limite de tentativas bem-sucedidas foi excedido
  successfulAttempts++;
  if (successfulAttempts > maxSuccessfulAttempts) {
    alert('Você atingiu o limite de envios permitidos. Tente novamente em alguns minutos.');
    btnElement.disabled = true; // Bloquear o botão após exceder o limite
    document.cookie = "blocked=true"; // Definir um cookie para sinalizar o bloqueio
    return false; // Impede o envio do formulário
  }

  // Aqui você pode adicionar outras verificações e validações do formulário, se necessário.

  return true; // Permite o envio do formulário
}


