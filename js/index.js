const form = document.querySelector("form");
const imagenQrcode = document.querySelector('[data-qrcode="qrcode-image"]');
const conteinerBtnAcao = document.querySelector('[data-qrcode="acao-qrcode"]');
const donwloadQrcodeBtn = document.querySelector(
  '[data-qrcode="download-qrcode"]'
);
const conteinerAjuda = document.querySelector(".ajuda-qrcode");
const containerLoading = document.querySelector('[data-qrcode="messagem-download-qrcode"]')
const barraLoading = document.querySelector('[data-qrcode="messagem-download-qrcode"] p')

const urlAPI = (valueQr) =>
  `https://chart.apis.google.com/chart?cht=qr&chl=${valueQr}&chs=300`;

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
    imagenQrcode.src = QRCODE;
  } else {
    alert("Para gerar um QrCode digite algo. Seja criativo ;-)");
  }
  return imagenQrcode;
};

let controle;
const ativandoDownload = async (qrTexto) => {
  let imageQrcode = await aplicandoQrcode(qrTexto);
  if (imageQrcode.src.includes("https")) {
    controle = true;
  }
};

conteinerBtnAcao.children[1].onclick = () => {
  location.reload();
};

form.addEventListener("submit", (event) => {
  let entradaQR = event.target.entradaQr.value;
  ativandoDownload(entradaQR);
  event.target.reset();
  event.preventDefault();
});



donwloadQrcodeBtn.addEventListener("click", () => {
  const dowload = (imagenUrl) => {
    const elementDowload = document.createElement("a");
    fetch(imagenUrl).then(async (retornoURL) => {
      const urlBlob = await retornoURL.blob();
      elementDowload.href = URL.createObjectURL(urlBlob);
      elementDowload.download = "seu-qrcode";
      elementDowload.click();
      URL.revokeObjectURL(elementDowload.href);
    });
  };
    if(controle){
      barraLoading.classList.add('loading')
      containerLoading.classList.remove('off')
    }
  setTimeout(()=>{
    containerLoading.classList.add('off')
    barraLoading.classList.remove('loading')
  },1000)
  return controle ? dowload(imagenQrcode.src) : false;
});

const conteinerQrcode =  document.querySelector('[data-qrcode="conteiner-qrcode"]')

conteinerAjuda.children[0].addEventListener("click", () => {
  const videoAjudaElement = document.querySelector('[data-qrcode="video-qrcode"]')
  videoAjudaElement.classList.toggle('video-ajuda-on')
   
  
});


   

