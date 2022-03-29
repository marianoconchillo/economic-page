import convert from "xml-js";
import axios from "axios";

const getInfoDolar = async (req, res) => {
  try {
    const dataDolar = await axios.get("https://www.dolarsi.com/api/dolarSiInfo.xml");
    const json = convert.xml2json(dataDolar.data, { compact: true, spaces: 4 });
    const jsonParsed = JSON.parse(json);
    return jsonParsed;
  } catch (e) {
      res.satus(500);
      console.log(e);
  }
};

export default getInfoDolar;
