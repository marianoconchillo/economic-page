const getValues = async () => {
  try {
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    const tabla = document.getElementById("tabla");
    tabla.style.display = "none";

    const url = `http://localhost:5000/api/dollar/historical?limit=${limValues}&from=0`;
    const resp = await fetch(url);
    if (resp.status == 200) {
      const data = await resp.json();
      data.forEach((value) => {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.textContent = value.date;
        tr.appendChild(th1);
        let th2 = document.createElement("th");
        th2.textContent = value.valor;
        tr.appendChild(th2);

        table.appendChild(tr);
      });

      loader.style.display = "none";
      tabla.style.display = "table";
    } else {
      //Show alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Los datos no pudieron obtenerse!",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const updateValues = async (page) => {
  try {
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    const tabla = document.getElementById("tabla");
    tabla.style.display = "none";

    tr = table.childNodes;
    let fromValues = page * limValues;
    const url = `http://localhost:5000/api/dollar/historical?limit=${
      fromValues + limValues
    }&from=${fromValues}`;
    const resp = await fetch(url);

    if (resp.status == 200) {
      const data = await resp.json();
      const after = document.getElementById("after");

      if (data.length < limValues) {
        // Deshabilitar botón siguiente en la última página
        after.style.cssText = "pointer-events: none; cursor: default; background-color: grey;";

        let count = 0;
        let limit = limValues - data.length;

        while (count < limit) {  
          table.removeChild(table.firstChild);
          count++;
        }

      } else if (data.length > tr.length) {
        // Activamos botón siguiente
        after.style.cssText = "pointer-events: auto; cursor: pointer;";
        for (i = tr.length; i < data.length; i++) {
          let tr = document.createElement("tr");
          let th1 = document.createElement("th");
          tr.appendChild(th1);
          let th2 = document.createElement("th");
          tr.appendChild(th2);
          table.appendChild(tr);
        }
      }

      for (i = 0; i < data.length; i++) {
        th = tr[i].childNodes;

        th[0].textContent = data[i].date;
        th[1].textContent = data[i].valor;
      }

      loader.style.display = "none";
      tabla.style.display = "table";
    } else {
      console.log("ERROR");
      //Show alert
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "¡No hay mas datos historicos!",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

//HTML nodes to manipulate
const table = document.querySelector(".table-content");
const section = document.querySelector("section");

const prevbtn = document.createElement("button");
section.appendChild(prevbtn);

const limValues = 10;
getValues();

let currentPage = 0;

const deshabilitarBoton = () => {
  const before = document.getElementById("before");
  before.style.cssText =
    "pointer-events: none; cursor: default; background-color: grey";
};

deshabilitarBoton();

const nextPage = () => {
  const before = document.getElementById("before");
  before.style.cssText = "pointer-events: auto; cursor: pointer";

  currentPage = currentPage + 1;
  updateValues(currentPage);
};

const prevPage = () => {
  if (currentPage > 0) {
    currentPage = currentPage - 1;
    updateValues(currentPage);
  }

  if (currentPage === 0) {
    deshabilitarBoton();
  }
};
