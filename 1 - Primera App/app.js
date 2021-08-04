/*let lista = [2000, 2005, 2001, 2012, 1989];

let anios = lista.map(el => 2019-el);


let contador = 0;
let verificacion;
let aniosplus = lista.map((el)=>{

    if ((2021-el) > 17 ){
        verificacion = "Autorizado";
        return verificacion;
    }
    else {
        verificacion = "Denegado";
        return verificacion;
    }
});

console.log(anios);
console.log(aniosplus);
*/

//Funciones Callback
/*function Mensaje(callback) {
  console.log("Mensaje antes de la llamada Callback");
  callback();
}

function Saludo() {
  console.log("Saludo después de la llamada al Callback");
}

Mensaje(Saludo);

function Sumar(num1, num2, callback) {
  let resultado = num1 + num2;
  callback(resultado);
}

function Resultado(res) {
  console.log(res);
}

Sumar(5, 8, Resultado);
*/
//funcion callback de setTimeout que ejecuta después de segundos

/*
setTimeout(() => {
    console.log("esto se va a ejecutar despúes de 3 segundos")
}, 3000);
*/

//promesas
//tienen 4 estados Fullfilled (cuando se ha cumplido, rejected, ha fallado. pending, cuando está pendiente de resolver y settled cuando ya falló o funcionó)

/*const mensaje = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (true) {
      resolve("esto se va a ejecutar despúes de 3 segundos");
    } else {
      reject("hubo un eror");
    }
  }, 3000);
});

mensaje
  .then((msj) => {
    console.log(msj);
  })
  .catch((error) => {
    console.log(error);
  });
*/
//Async y Await
//todo async devuelbe una promesa, lo devuelbe resuelto o rechazado.
//siempre que se usa async se utiliza await 1 o más veces.

//const mensaje = new Promise((resolve, reject) => {
function mensaje() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (false) {
        resolve("esto se va a ejecutar despúes de 3 segundos");
      } else {
        reject("hubo un eror");
      }
    }, 3000);
  });
};

async function llamadaAsync(){
        console.log("Llamada");
    const resultado = await mensaje();
    console.log(resultado);
    return resultado;
};

llamadaAsync().then(x=> console.log(x)).catch(e => console.log(e));


//comentario de prueba
