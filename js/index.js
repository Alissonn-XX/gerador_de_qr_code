const form = document.querySelector('form')
const imageQrcode = document.querySelector('[data-qrcode="qrcode-image"]')
const conteinerBtnAcao = document.querySelector('[data-qrcode="acao-qrcode"]')
const qrcodeDowload = document.querySelector('[data-qrcode="download-qrcode"]')

const urlAPI = valueQR => 
   `http://chart.apis.google.com/chart?cht=qr&chl=${valueQR}&chs=300`


const geradoQrCode = async valueQr =>{
    try{
        const entradaQR = urlAPI(valueQr)
        const response = await fetch(entradaQR)
        if(!response.ok){
            throw new Error('Não foi possivel gerar o QrCode')
        }
     
       console.log(response);
        return response.url
    }catch({error,mensage}){
      console.log(`Erro: ${error} ${mensage}`);
    }
}

form.addEventListener('submit', async event=>{
    event.preventDefault()
    let entradaQr = event.target.entradaQr.value;

        if(entradaQr){
          let QRCODE = await geradoQrCode(entradaQr)
          imageQrcode.src = QRCODE;
        }
 
     event.target.reset()
  })

conteinerBtnAcao.children[1].onclick = ()=>{
   location.reload()
}
  
let controle = true


const baixandoQrcode = (caminho) =>{
     
}

