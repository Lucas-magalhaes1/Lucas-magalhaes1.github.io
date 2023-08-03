// Simulação de um Firewall de Aplicação Web (WAF)
// Neste exemplo, bloquearemos IPs que fazem solicitações excessivas em um curto período de tempo.
const rateLimit = {};

function blockIP(ip) {
  rateLimit[ip] = (rateLimit[ip] || 0) + 1;
  if (rateLimit[ip] > 10) {
    alert(`Seu IP ${ip} foi bloqueado temporariamente por exceder o limite de solicitações.`);
  }
}