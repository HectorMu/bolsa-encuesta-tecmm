import{d as t,h as o}from"./index.cbff710e.js";const n=async()=>{try{return await(await fetch(`${t}/users/getall`,o.authGetConfig())).json()}catch(e){console.log(e)}},a=async e=>{try{return await(await fetch(`${t}/users/getone/${e}`,o.authGetConfig())).json()}catch(s){console.log(s)}},c=async e=>{try{return await(await fetch(`${t}/users/save`,o.authPostConfig(e))).json()}catch(s){console.log(s)}},u=async(e,s)=>{try{return await(await fetch(`${t}/users/update/${s}`,o.authPutConfig(e))).json()}catch(r){console.log(r)}},i=async e=>{try{return await(await fetch(`${t}/users/delete/${e}`,o.authDeleteConfig())).json()}catch(s){console.log(s)}};var l={List:n,GetOne:a,Save:c,Update:u,Delete:i};export{l as u};
