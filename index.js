// Simulação de um Firewall de Aplicação Web (WAF)
// Neste exemplo, bloquearemos IPs que fazem solicitações excessivas em um curto período de tempo.
const rateLimit = {};

function blockIP(ip) {
  rateLimit[ip] = (rateLimit[ip] || 0) + 1;
  if (rateLimit[ip] > 10) {
    alert(`Seu IP ${ip} foi bloqueado temporariamente por exceder o limite de solicitações.`);
  }
}

const btnElement = document.querySelector('button');
const allowedRequests = 10; // Limite de solicitações permitidas em um curto período de tempo
let requestCount = 0;

function handleButtonClick() {
  requestCount++;
  if (requestCount > allowedRequests) {
    btnElement.disabled = true;
    setTimeout(() => {
      requestCount = 0;
      btnElement.disabled = false;
    }, 5000); // Bloquear temporariamente o botão por 5 segundos
    alert(`Você atingiu o limite de solicitações permitidas. Tente novamente em alguns segundos.`);
  } else {
    blockIP('192.168.0.1'); // Substitua '192.168.0.1' pelo IP do cliente real
  }
}

btnElement.addEventListener('click', handleButtonClick);
