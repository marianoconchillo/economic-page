const getValue = async () => {
  try {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    const url = `http://localhost:5000/api/dollar`;
    const resp = await fetch(url);

    if(resp.status == 200) {
        const data = await resp.json();
        const h2 = document.getElementById('fecha');
        h2.innerHTML += data.fecha;

        const compra = document.getElementsByClassName('compra');
        compra[0].innerHTML += data.compra;
        compra[1].innerHTML += data.compra;

        const venta = document.getElementsByClassName('venta');
        venta[0].innerHTML += data.venta;
        venta[1].innerHTML += data.venta;

        loader.style.display = "none";

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Los datos no pudieron obtenerse!",
          });
    }

  } catch (error) {
    console.log(error);
  }
};

getValue();
