module.exports = (link) => {
  return `
    <div style="font-family: arial;font-family:arial;border: 1px solid #0006;">
        <div class="container" style="font-family: arial;">
                             <div class="col-md-12">
                                 <div class="box" style="border: 1px solid #e9ecef;padding: 5px;">
                                      <h1><Strong>¡Hola!</Strong></h1> 
                                      <p style="font-size: 20px;">
                                          Estas recibiendo este correo electrónico por que solicitaste un cambio de contraseña para tu cuenta.
                                          Este enlance solo estara activo 15 minutos despues de que el cambio de contraseña ha sido solicitado.
                                      
                                         <br>
                                         <br>
                                         <center> 
                                             <a  style="text-decoration: none;color: 
                                             #fff;background-color: #9317c2;border-color: #9317c2;
                                             display: inline-block;
                                             margin-bottom: 0;font-weight: 400;
                                             text-align: center;white-space: nowrap;
                                             vertical-align: middle;-ms-touch-action: manipulation;
                                             touch-action: manipulation;cursor: pointer;background-image: none;
                                             border: 1px solid transparent;
                                             padding: 6px 12px;font-size: 20px;line-height: 1.42857143;
                                             border-radius: 4px;-webkit-user-select: none;-moz-user-select: none;
                                             -ms-user-select: none;user-select: none;"  
                                             style="font-size: 20px;" href="${link}" >Cambiar contraseña</a>
                                         </center>
                                         <br>
                                         <br>
                                             <p style="font-size: 20px;">
                                             Si tu no solicitaste un cambio de contraseña puedes ignorar este correo electrónico                                       
                                                 <br>
                                                Instituto Tecnológico José Mario Molina Pasquel y Henríquez
                                             </p>
                                      </p>  
                                 </div>
                             </div>
          </div>
 
    </div>`;
};
