var plantillaPersona = {
  id: 0,
  nombre: "",
  apellido: "",
  tipoDocumento: "",
  documento: 0,
  celular: 0,
  ubicacion: "",
  sintomas: [],
};

var plantillaTabla =
  '<table class="table table-bordered" id="tabla"><tr><th>nombre</th><th>accion</th></tr></table>';

function registrarSintoma() {
  let key = "*" + location.search.substring(4, location.search.length);
  let persona = JSON.parse(localStorage.getItem(key));
  let sintoma = document.forms["formularioRegistrar"]["sintoma"].value;
  persona.sintomas.push(sintoma);
  localStorage.removeItem("*" + persona.id);
  localStorage.setItem("*" + persona.id, JSON.stringify(persona));
  mostrarSintomas();
}

function mostrarSintomas() {
  let key = "*" + location.search.substring(4, location.search.length);
  let persona = JSON.parse(localStorage.getItem(key));
  let lista = "";
  for (let i = 0; i < persona.sintomas.length; i++) {
    lista += '<option value="';
    lista += persona.sintomas[i];
    lista += '">';
    lista += persona.sintomas[i];
    lista += "</option>";
  }
  document.getElementById("sintomaEliminar").innerHTML = lista;
}

function eliminarSintoma() {
  let key = "*" + location.search.substring(4, location.search.length);
  let persona = JSON.parse(localStorage.getItem(key));
  let sintomaEliminar =
    document.forms["formularioEliminar"]["sintomaEliminar"].value;
  for (let i = 0; i < persona.sintomas.length; i++) {
    if (persona.sintomas[i] == sintomaEliminar) {
      persona.sintomas.splice(i, i + 1);
      break;
    }
  }
  localStorage.removeItem("*" + persona.id);
  localStorage.setItem("*" + persona.id, JSON.stringify(persona));
  mostrarSintomas();
}

function mostrar() {
  let tabla = plantillaTabla,
    key,
    value,
    lista = [],
    persona = plantillaPersona,
    paginaVer;
  for (let i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);
    persona = JSON.parse(localStorage.getItem(key));
    if (key[0] != "*") continue;
    lista.push(persona);
  }
  lista.sort(function (a, b) {
    return a.id - b.id;
  });
  for (let i = 0; i < lista.length; i++) {
    persona = lista[i];
    paginaVer = "location.href='ver.html?id=" + escape(eval(persona.id)) + "'";
    tabla +=
      "<tr><td>" +
      persona.nombre +
      " " +
      persona.apellido +
      '</td><td><button type="button" onClick="' +
      paginaVer +
      '" class="btn btn-primary">Ver</button>';
  }
  document.getElementById("tabla").innerHTML = tabla;
}

function ver() {
  let persona = JSON.parse(
    localStorage.getItem(
      "*" + location.search.substring(4, location.search.length)
    )
  );
  let lista =
    "<li>Nombres: " +
    persona.nombre +
    "</li>" +
    "<li>Apellidos: " +
    persona.apellido +
    "</li>" +
    "<li>Documento: " +
    persona.tipoDocumento +
    " " +
    persona.documento +
    "</li>" +
    "</li>" +
    "<li>Celular: " +
    persona.celular +
    "</li>" +
    "</li>" +
    "<li>Ubicacion: " +
    persona.ubicacion +
    "</li>" +
    "</li>" +
    "<li>Sintomas: <ul>";
  if (persona.sintomas.length === 0) lista += "<li>sin sintomas</li>";
  else {
    for (let i = 0; i < persona.sintomas.length; i++)
      lista += "<li>" + persona.sintomas[i] + "</li>";
  }
  lista += "</ul></li>";
  document.getElementById("lista").innerHTML = lista;
}

function direccionar(pagina) {
  let url =
    pagina + "?id=" + location.search.substring(4, location.search.length);
  location.href = url;
}

function valores() {
  let persona = JSON.parse(
    localStorage.getItem(
      "*" + location.search.substring(4, location.search.length)
    )
  );
  console.log(persona);
  document.forms["formulario"]["nombre"].value = persona.nombre;
  document.forms["formulario"]["apellido"].value = persona.apellido;
  document.forms["formulario"]["tipoDocumento"].value = persona.tipoDocumento;
  document.forms["formulario"]["documento"].value = persona.documento;
  document.forms["formulario"]["celular"].value = persona.celular;
  document.forms["formulario"]["ubicacion"].value = persona.ubicacion;
  //localStorage.removeItem("*" + persona.id);
}

function guardar() {
  localStorage.removeItem("*" + persona.id);
  registrar();
}

function registrar() {
  var persona = plantillaPersona;
  if (location.search.length === 0) persona.id = localStorage.length;
  else persona.id = location.search.substring(4, location.search.length);
  persona.nombre = document.forms["formulario"]["nombre"].value;
  persona.apellido = document.forms["formulario"]["apellido"].value;
  persona.tipoDocumento = document.forms["formulario"]["tipoDocumento"].value;
  persona.documento = parseInt(document.forms["formulario"]["documento"].value);
  persona.celular = parseInt(document.forms["formulario"]["celular"].value);
  persona.ubicacion = document.forms["formulario"]["ubicacion"].value;
  if (persona.nombre.length === 0) {
    alert("nombre no valido");
    return false;
  }
  if (persona.apellido.length === 0) {
    alert("apellido no valido");
    return false;
  }
  if (persona.documento <= 0 || isNaN(persona.documento)) {
    alert("documento no valido");
    return false;
  }
  if (persona.celular <= 0 || isNaN(persona.celular)) {
    alert("celular no valido");
    return false;
  }
  if (persona.ubicacion.length === 0) {
    alert("ubicacion no valida");
    return false;
  }
  var key = "*" + persona.id;
  var value = JSON.stringify(persona);
  localStorage.setItem(key, value);
  if (location.search.length === 0) location.href = "index.html";
  else direccionar("ver.html");
}
