const User = require("../models/User");
const Company = require("../models/CompanyProfile");
const Graduated = require("../models/GraduatedProfile");
const helpers = require("../helpers/helpers");

const controller = {};

controller.getGraduatedProfile = async (req, res) => {
  try {
    const data = await Graduated.FindOne(req.user.id);
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.uploadGraduatedCV = async (req, res) => {
  const files = req.files;
  const curriculum = files.cv[0];

  try {
    await Graduated.UpdateCurriculum(curriculum.filename, req.user.id);

    res.json({
      status: true,
      statusText: "Curriculum subido correctamente.",
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.getGraduatedCV = async (req, res) => {
  try {
    const graduated = await Graduated.FindOne(req.user.id);
    res.json(graduated.curriculum);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.saveOrUpdateGraduatedProfile = async (req, res) => {
  const { correo, clave, ...rest } = req.body;

  const basicData = {
    correo,
    clave,
    fk_rol: 2,
  };
  try {
    const profileExists = await Graduated.FindOne(req.user.id);

    if (!profileExists.id) {
      //Verificamos duplicidad de campos
      const correoExists = await helpers.isDuplicatedOnUpdate(
        "usuarios",
        "correo",
        req.user.id,
        req.body.correo
      );
      if (correoExists) {
        return res.json({
          status: false,
          statusText: "Este correo electronico ya esta registrado.",
        });
      }
      const nControlExists = await helpers.isDuplicated(
        "perfil_egresado",
        "no_control",
        req.body.no_control
      );
      if (nControlExists) {
        return res.json({
          status: false,
          statusText: "Este numero de control ya esta registrado.",
        });
      }

      const curpExists = await helpers.isDuplicated(
        "perfil_egresado",
        "curp",
        req.body.curp
      );
      if (curpExists) {
        return res.json({
          status: false,
          statusText: "Esta curp ya esta registrada.",
        });
      }
      //Si no hubo ningun error, insertamos el perfil y el usuario
      //En esta constante guardaremos los resultados de la insercion del usuario, nos regresa el id insertado
      //por lo que nos sirve para agregar el perfil

      //Si recibimos una clave, significa que se quiere editar, entonces la hasheamos
      if (basicData.clave !== null && basicData.clave !== undefined) {
        basicData.clave = await helpers.encryptPassword(basicData.clave);
      } else {
        //Si no recibimos una clave, entonces eliminamos la propiedad del objeto
        //Para no mutar la clave actual guardada en la base de datos
        delete basicData.clave;
      }
      await User.Update(basicData, req.user.id);
      const profileData = {
        fk_usuario: req.user.id,
        curriculum: "Pendiente",
        ...rest,
      };

      await Graduated.Create(profileData);
      return res.json({
        status: true,
        statusText: "Perfil creado correctamente.",
      });
    }

    //Validamos duplicacion de campos
    const correoExists = await helpers.isDuplicatedOnUpdate(
      "usuarios",
      "correo",
      req.user.id,
      basicData.correo
    );

    if (correoExists) {
      return res.json({
        status: false,
        statusText: "Este correo electronico ya esta registrado.",
      });
    }
    const nControlExists = await helpers.isDuplicatedOnUpdate(
      "perfil_egresado",
      "no_control",
      req.user.id,
      req.body.no_control
    );

    if (nControlExists) {
      return res.json({
        status: false,
        statusText: "Este numero de control ya esta registrado.",
      });
    }

    const curpExists = await helpers.isDuplicatedOnUpdate(
      "perfil_egresado",
      "curp",
      req.user.id,
      req.body.curp
    );
    if (curpExists) {
      return res.json({
        status: false,
        statusText: "Esta curp ya esta registrada.",
      });
    }

    //Si recibimos una clave, significa que se quiere editar, entonces la hasheamos
    if (basicData.clave !== null && basicData.clave !== undefined) {
      basicData.clave = await helpers.encryptPassword(basicData.clave);
    } else {
      //Si no recibimos una clave, entonces eliminamos la propiedad del objeto
      //Para no mutar la clave actual guardada en la base de datos
      delete basicData.clave;
    }

    await User.Update(basicData, req.user.id);
    await Graduated.Update(rest, req.user.id);
    return res.json({
      status: true,
      statusText: "Perfil editado correctamente.",
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.getCompanyProfile = async (req, res) => {
  try {
    const data = await Company.FindOne(req.user.id);
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.saveOrUpdateCompanyProfile = async (req, res) => {
  const { correo, clave, ...rest } = req.body;

  const basicData = {
    correo,
    clave,
    fk_rol: 3,
  };
  try {
    const profileExists = await Company.FindOne(req.user.id);

    if (!profileExists.nombre_comercial) {
      //Verificamos duplicidad de campos
      const correoExists = await helpers.isDuplicatedOnUpdate(
        "usuarios",
        "correo",
        req.user.id,
        basicData.correo
      );

      if (correoExists) {
        return res.json({
          status: false,
          statusText: "Este correo electronico ya esta registrado.",
        });
      }

      //Si recibimos una clave, significa que se quiere editar, entonces la hasheamos
      if (basicData.clave !== null && basicData.clave !== undefined) {
        basicData.clave = await helpers.encryptPassword(basicData.clave);
      } else {
        //Si no recibimos una clave, entonces eliminamos la propiedad del objeto
        //Para no mutar la clave actual guardada en la base de datos
        delete basicData.clave;
      }
      await User.Update(basicData, req.user.id);
      const profileData = {
        fk_usuario: req.user.id,
        ...rest,
      };
      await Company.Create(profileData);
      return res.json({
        status: true,
        statusText: "Perfil creado correctamente.",
      });
    }

    //Validamos duplicacion de campos
    const correoExists = await helpers.isDuplicatedOnUpdate(
      "usuarios",
      "correo",
      req.user.id,
      basicData.correo
    );

    if (correoExists) {
      return res.json({
        status: false,
        statusText: "Este correo electronico ya esta registrado.",
      });
    }

    //Si recibimos una clave, significa que se quiere editar, entonces la hasheamos
    if (basicData.clave !== null && basicData.clave !== undefined) {
      basicData.clave = await helpers.encryptPassword(basicData.clave);
    } else {
      //Si no recibimos una clave, entonces eliminamos la propiedad del objeto
      //Para no mutar la clave actual guardada en la base de datos
      delete basicData.clave;
    }

    await User.Update(basicData, req.user.id);
    await Company.Update(rest, req.user.id);
    return res.json({
      status: true,
      statusText: "Perfil editado correctamente.",
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.getUserProfile = async (req, res) => {
  try {
    const data = await User.FindOne(req.user.id);
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.saveOrUpdateUserProfile = async (req, res) => {
  const { correo, clave } = req.body;

  const basicData = {
    correo,
    clave,
    fk_rol: 1,
  };
  try {
    //Validamos duplicacion de campos
    const correoExists = await helpers.isDuplicatedOnUpdate(
      "usuarios",
      "correo",
      req.user.id,
      basicData.correo
    );

    if (correoExists) {
      return res.json({
        status: false,
        statusText: "Este correo electronico ya esta registrado.",
      });
    }

    //Si recibimos una clave, significa que se quiere editar, entonces la hasheamos
    if (basicData.clave !== null && basicData.clave !== undefined) {
      basicData.clave = await helpers.encryptPassword(basicData.clave);
    } else {
      //Si no recibimos una clave, entonces eliminamos la propiedad del objeto
      //Para no mutar la clave actual guardada en la base de datos
      delete basicData.clave;
    }

    await User.Update(basicData, req.user.id);
    return res.json({
      status: true,
      statusText: "Perfil editado correctamente.",
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

module.exports = controller;
