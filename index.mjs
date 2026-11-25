import express from 'express';
import fetch from 'node-fetch';
//const Quote = (await import("inspirational-quotes")).default; LOOKS LIKE A BUG IN npm inspirational-quotes, so I am using the following instead:
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const quotes = require("inspirational-quotes/data/data.json");

function randomQuote() {
  const temp = quotes[Math.floor(Math.random() * quotes.length)];
  return {
    text: temp.text
  };
}
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get('/', async(req, res) => {
    res.render("index")
});

app.get("/apitest", (req, res) => {
  let quote = randomQuote();
  const params = new URLSearchParams({
    SERVICE: "WMS",
    REQUEST: "GetMap",
    VERSION: "1.1.1",
    LAYERS: "MODIS_Terra_CorrectedReflectance_TrueColor",
    STYLES: "",
    FORMAT: "image/jpeg",
    SRS: "EPSG:4326",
    BBOX: "-125,24,-66,50", 
    WIDTH: "1200",
    HEIGHT: "600",
    TIME: "2024-10-15",
  });

  const image = `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?${params}`;

  res.render("apitest", { image, quote });
});



app.get('/one', (req, res) => {
 res.render('one', {quote: randomQuote()});
});

app.get('/two', (req, res) => {
 let quote = randomQuote();
 console.log(quote);
 res.render('two', {quote: randomQuote()});
});

app.get('/three', (req, res) => {
 let quote = randomQuote();
 console.log(quote);
 res.render('three', {quote: randomQuote()});
});



app.listen(3000, () => {
   console.log('server started');
});

