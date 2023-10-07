const form = document.querySelector("form");
const imageQrcode = document.querySelector('[data-qrcode="qrcode-image"]');
const conteinerBtnAcao = document.querySelector('[data-qrcode="acao-qrcode"]');
const donwloadQrcodeBtn = document.querySelector(
  '[data-qrcode="download-qrcode"]'
);

const localHost = "http://127.0.0.1:5500/#";
const urlAPI = (valueQR) =>
  `https://chart.apis.google.com/chart?cht=qr&chl=${valueQR}&chs=300`;

const geradoQrCode = async (valueQr) => {
  try {
    const entradaQR = urlAPI(valueQr);
    const response = await fetch(entradaQR);
    if (!response.ok) {
      throw new Error("Não foi possivel gerar o QrCode");
    }
    return response.url;
  } catch ({ error, mensage }) {
    console.log(`Erro: ${error} ${mensage}`);
  }
};

const aplicandoQrcode = async (qrTexto) => {
  if (qrTexto) {
    let QRCODE = await geradoQrCode(qrTexto);
    imageQrcode.src = QRCODE;
  }
  return imageQrcode;
};

const downloadQr = async (qrTexto) => {
  let imageQrcode = await aplicandoQrcode(qrTexto);
  if(imageQrcode.src.includes("https")) {
       
    }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let entradaQR = event.target.entradaQr.value;
  downloadQr(entradaQR);
  event.target.reset();
});

conteinerBtnAcao.children[1].onclick = () => {
  location.reload();
};


