import getInfoDolar from "../services/dolarSi.js";
import { formatNumber } from "../util/util.js";
import moment from "moment";

export const getDolarBlue = async (req, res) => {
  try {
    const data = await getInfoDolar();
    const valores = {
      fecha: moment().format("DD-MM-YYYY"),
      compra: formatNumber(data.cotiza.Dolar.casa380.compra._text),
      venta: formatNumber(data.cotiza.Dolar.casa380.venta._text),
    };
    res.status(200);
    res.send(valores);
  } catch (e) {
    res.status(500);
    console.log(e);
  }
};

export const getEvolucionDolarBlue = async (req, res) => {
  try {

    const limit = req.query.limit;
    const from = req.query.from;

    const data = await getInfoDolar();
    const valores = data.cotiza.evolucion_dolar.blue.mes;

    const day = moment().format("DD");

    const arrayValores = [];
    Object.keys(valores).forEach((key) =>
      arrayValores.push(valores[key]));

    var j = day - 2;
    var arrayAux = [];

    for (var i = 0; i < day - 1; i++) {
      arrayAux.push({
        valor: arrayValores[j]._text,
        date: moment().subtract(i + 1, "days").format("DD-MM-YYYY"),
      });

      j--;
    }

    for (var i = day - 1; i < 31; i++) {
      arrayAux.push({
        valor: arrayValores[i]._text,
        date: moment().subtract(i + 1, "days").format("DD-MM-YYYY"),
      });
    }

    if(limit > arrayAux.length) {
      const respuesta = arrayAux.slice(from, arrayAux.length);
      res.status(200);
      res.send(respuesta)
    } else {
      const respuesta = arrayAux.slice(from, limit);
      res.status(200);
      res.send(respuesta)
    }

  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};
