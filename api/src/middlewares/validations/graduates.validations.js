const careers = [
  "Ing. en Gestión Empresarial",
  "Ing. Industrial",
  "Ing. en Sistemas Computacionales",
  "Ing. Electromecánica",
  "Ing. Civil",
];

const curpRegex =
  /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

const validations = (req, res, next) => {
  if (
    req.body.idioma_extranjero.Ingles > 100 ||
    req.body.idioma_extranjero.Otro > 100
  ) {
    return res.status(400).json({
      status: false,
      statusText: "Indique un rango de dominio entre 0 y 100 por idioma.",
    });
  }
  if (!careers.includes(req.body.carrera)) {
    return res.status(400).json({
      status: false,
      statusText: "Ingrese una carrera válida.",
    });
  }

  if (!req.body.curp.match(curpRegex)) {
    return res.status(400).json({
      status: false,
      statusText: "La curp no es válida.",
    });
  }

  if (
    req.body.telefono.length < 10 ||
    req.body.tel_casa.length < 10 ||
    req.body.telefono.length > 10 ||
    req.body.tel_casa.length > 10
  ) {
    return res.status(400).json({
      status: false,
      statusText: "Los numero de telefono deben tener maximo 10 digitos.",
    });
  }

  next();
};

module.exports = validations;
