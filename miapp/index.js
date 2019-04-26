var express = require('express');
var app = express();
const fs = require('fs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


app.get('/',function(req, res){
    res.send('Hola mundo desde Express')
});


app.get('/sumaro/:n1/:n2',function(req, res){
    numero1 = parseInt(req.params.n1);
    numero2 = parseInt(req.params.n2);
    total = numero1 + numero2;
    res.send('LA SUMAAA ES ' + total);
});

app.post('/',function(req, res){
    res.send('llamda POST misma url')
});

app.post('/demo/sumar',function(req, res){
    n1 = parseInt(req.body.num1);
    n2 = parseInt(req.body.num2);
    total = n1 + n2;
    res.send('LA SUMAAA ES ' + total);
});


/* Tarea que hacer*/

app.post('/cursos', function (req, res) {
    
    let basico = req.body.basico;
    let intermedio = req.body.intermedio;
    let avanzado = req.body.avanzado;
    let curso = req.body.curso;
    let efectivo = req.body.cred;

    let costo = 0;
    let descuento = 0;
    if (curso == 'java') {
        costo = 1200;
    } else if (curso == 'php'){
        costo = 800;
    } else {
        costo = 1500;
    }

    
    fs.readFile('./public/views/resultado.html', (err, html) => {
        let htmlString = html.toString();
        cont = 0;
        if (basico !== undefined) {
            htmlString = htmlString.replace('{basico}', basico);
            cont++;
        } else {
            htmlString = htmlString.replace('{basico}', " ");
        }
        if (intermedio !== undefined) {
            htmlString = htmlString.replace('{intermedio}', intermedio);
            cont++;
        } else {
            htmlString = htmlString.replace('{intermedio}', " ");
        }
        if (avanzado !== undefined) {
            htmlString = htmlString.replace('{avanzado}', avanzado);
            cont++;
        } else {
            htmlString = htmlString.replace('{avanzado}', " ");
        }
        costo = costo*cont;
        if (efectivo !== "credito"){
            descuento = costo*0.1;
        }
        let metodoPago = "";
        if (efectivo !== undefined) {
            metodoPago = efectivo;
        } else {
            metodoPago = credito;
        }
        let costoFinal = costo - descuento;
        htmlString = htmlString.replace('{curso}', curso);
        htmlString = htmlString.replace('{metodoPago}', metodoPago);
        htmlString = htmlString.replace('{costo}', costo);
        htmlString = htmlString.replace('{descuento}', descuento);
        htmlString = htmlString.replace('{costoFinal}', costoFinal);
        res.writeHead(200, { 'Content-type': 'text' });
        res.write(htmlString);
        res.end();
    });
 //  res.send("Total es" + basico +" "+pago);
});


app.put('/',function(req, res){
    res.send('Recibimos un PUT')
});

app.delete('/',function(req, res){
    res.send('Recibimos un Delete en /user')
});

app.use(function(req,res,next){
    res.status(404).send("Error 404");
});

app.listen(3000,function(){
    console.log('Aplicaicon de ejemplo escuchando desde el puerto 3000')
});
