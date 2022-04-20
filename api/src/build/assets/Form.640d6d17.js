import{r as i,t as o,L as F}from"./vendor.b272e12a.js";import{e as k,c as N,u as w,a as e,f as S,j as a,g as E,C as j,F as x,i as h}from"./index.eb6b2ee8.js";import{u as p}from"./users.service.a5c69e27.js";const D={correo:"",clave:"",confirmar:"",fk_rol:""},L=()=>{const{form:t,setForm:C,handleChange:n}=k(D),{verifySession:d}=N(),[r,f]=i.exports.useState(!1),[u,g]=i.exports.useState(!1),{navigate:l,location:v,params:m}=w(),b=i.exports.useCallback(async()=>{const c=await d(()=>p.GetOne(m.id));if(!c.id){l("/accounts"),o.error("Este registro no existe.");return}C(c)},[m.id,l]),y=async c=>{if(c.preventDefault(),r){const s=await d(()=>p.Update(t,m.id));if(!s.status)return o.error(s.statusText);o.success("Cuenta editada correctamente."),l("/accounts")}else{const s=await d(()=>p.Save(t));if(!s.status)return o.error(s.statusText);o.success("Cuenta guardada correctamente."),l("/accounts")}};return i.exports.useEffect(()=>{if(v.pathname.includes("edit")){b(),f(!0);return}g(!0),f(!1)},[v.pathname,b]),e(S,{title:r?"Editar usuario":"Datos del usuario",children:a("form",{onSubmit:y,children:[e(E,{children:a(j,{id:"DatosUsuario",text:"Datos del usuario",buttonClass:"btn btn-link btn-block text-left text-primary font-weight-bolder collapsed",children:[r?e(x,{children:a("div",{className:"form-check mb-4 d-flex justify-content-end",children:[e("input",{style:{cursor:"pointer"},className:"form-check-input",onChange:()=>g(!u),type:"checkbox",id:"changeClave"}),e("label",{style:{cursor:"pointer"},className:"form-check-label mr-3",htmlFor:"changeClave",children:"\xBFCambiar clave?"})]})}):null,a("div",{className:"row",children:[e("div",{className:`${u?"col-lg-3":"col-lg-6"}`,children:e(h,{inputId:"txtCorreo",placeholder:"Correo",type:"email",name:"correo",setValue:n,value:t.correo})}),u?a(x,{children:[e("div",{className:"col-lg-4","data-aos":`${r?"fade-down":""}`,children:e(h,{inputId:"txtClave",placeholder:"Clave",type:"password",name:"clave",setValue:n,value:t.clave})}),e("div",{className:"col-lg-4","data-aos":`${r?"fade-down":""}`,children:e(h,{inputId:"txtClaveCon",placeholder:"Confirmar",type:"password",setValue:n,name:"confirmar",value:t.confirmar})})]}):null,e("div",{className:"col-lg-12",children:a("select",{className:"form-control form-select mb-3",style:{height:"47px"},onChange:n,name:"fk_rol",value:t.fk_rol,children:[e("option",{value:"",children:"Rol (Seleccione una opci\xF3n)"}),e("option",{value:"1",children:"Administrador"}),e("option",{value:"2",children:"Egresado"}),e("option",{value:"3",children:"Empresa"})]})})]})]})}),a("div",{className:"d-flex mt-3 justify-content-center",children:[e("button",{type:"submit",className:"btn btn-primary mx-3",children:r?"Guardar cambios":"Guardar"}),e(F,{to:-1,className:"btn btn-danger",children:"Cancelar"})]})]})})};export{L as F};
