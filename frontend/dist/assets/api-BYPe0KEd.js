import{g as o,n as t}from"./index-DG0u--Z4.js";/**
 * @license lucide-react v0.533.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],d=o("x",r),i={register:e=>t.post("/auth/register",e).then(a=>a.data),login:(e,a)=>t.post("/auth/login",{email:e,password:a}).then(s=>s.data)},u={getProfile:()=>t.get("/users/profile").then(e=>e.data),updateProfile:e=>t.put("/users/profile",e).then(a=>a.data),deleteAccount:()=>t.delete("/users/profile").then(e=>e.data),getAllUsers:()=>t.get("/users").then(e=>e.data)};export{d as X,i as a,u};
