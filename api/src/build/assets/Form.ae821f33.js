var N=Object.defineProperty,P=Object.defineProperties;var R=Object.getOwnPropertyDescriptors;var u=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var j=(e,t,a)=>t in e?N(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,w=(e,t)=>{for(var a in t||(t={}))S.call(t,a)&&j(e,a,t[a]);if(u)for(var a of u(t))v.call(t,a)&&j(e,a,t[a]);return e},G=(e,t)=>P(e,R(t));var k=(e,t)=>{var a={};for(var s in e)S.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(e!=null&&u)for(var s of u(e))t.indexOf(s)<0&&v.call(e,s)&&(a[s]=e[s]);return a};import{r as c,t as n}from"./vendor.b272e12a.js";import{c as T,e as y,u as H,a as _,f as O,k as U,l as q,N as z}from"./index.eb6b2ee8.js";import{g as l}from"./graduates.service.fe2621dd.js";const L=()=>{const{verifySession:e}=T(),{form:t,setForm:a,handleChange:s}=y(q),{form:f,setForm:b,handleChange:D}=y(z.idioma_extranjero),[g,h]=c.exports.useState(!1),[x,p]=c.exports.useState(!1),{navigate:d,location:E,params:m}=H(),F=c.exports.useCallback(async()=>{const i=await e(()=>l.GetOne(m.id));if(!i.id){d("/graduated"),n.error("Este registro no existe.");return}const C=i,{idioma_extranjero:o}=C,r=k(C,["idioma_extranjero"]);a(r),b(o)},[m.id,d]),I=async i=>{i.preventDefault();const o=G(w({},t),{idioma_extranjero:f});if(console.log(o),g){x||delete o.clave;const r=await e(()=>l.Update(o,m.id));if(!r.status)return n.error(r.statusText);n.success("Egresado editado correctamente."),d("/graduated")}else{const r=await e(()=>l.Save(o));if(!r.status)return n.error(r.statusText);n.success("Egresado guardado correctamente."),d("/graduated")}};return c.exports.useEffect(()=>{if(E.pathname.includes("edit")){F(),h(!0);return}p(!0),h(!1)},[E.pathname,F]),_(O,{title:g?"Editar egresado":"Datos del egresado",children:_(U,{handleSubmit:I,graduated:t,handleEntriesChange:s,handleIdiomaExtranjeroChange:D,onEditing:g,onChangePassword:x,toggleChangePassword:p,idiomaExtranjero:f})})};export{L as F};
