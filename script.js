function validateOctet(octet) {
  return octet >= 0 && octet <= 255;
}

function dataIp(event) {
  event.preventDefault();
  const ipInput = document.getElementById("ip");
  const ip = ipInput.value;
  const ipArray = ip.split(".");

  if (ipArray.length !== 4 || !ipArray.every(validateOctet)) {
    const messageErro = "Endereço IPv4 inválido, siga o padrão 000.000.000.000, onde, cada octeto deve estar no intervalo de 0 a 255.";
    const erroDiv = document.getElementById("dados");
    erroDiv.innerHTML = `<div class="resultErro">` + `<strong>` + "Error:" + `</strong>` + messageErro + `</div>`;
    return;
  }

  const firstOctet = parseInt(ipArray[0]);
  const secondOctet = parseInt(ipArray[1]);

  let mask, type;
  if (firstOctet >= 0 && firstOctet <= 127) {
    mask = "255.0.0.0";
    type = "A";
  } else if (firstOctet >= 128 && firstOctet <= 191) {
    mask = "255.255.0.0";
    type = "B";
  } else if (firstOctet >= 192 && firstOctet <= 223) {
    mask = "255.255.255.0";
    type = "C";
  } else if (firstOctet >= 224 && firstOctet <= 239) {
    mask = "";
    type = "D";
  } else {
    mask = "";
    type = "E";
  } 

  let privacy = false;
  if (
    firstOctet === 10 ||
    (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) ||
    (firstOctet === 192 && secondOctet === 168)
  ) {
    privacy = true;
  }

  const result = "Classe: " + type + "<br>" + "Máscara Padrão: " + mask + "<br>" + "Endereço: " + (privacy ? "Privado" : "Público");

  const resultDiv = document.getElementById("dados");
  resultDiv.innerHTML = `<div class="result">` + result + `</div>`;
}

const form = document.getElementById("formip");
form.addEventListener("submit", dataIp);