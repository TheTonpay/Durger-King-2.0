(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[222],{2013:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/checkout",function(){return n(8240)}])},1713:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(5893);function s(e){let{width:t,height:n,fill:s}=e;return(0,r.jsx)("svg",{width:t,height:n,viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M2.56223 0.565186H12.3244C12.6698 0.565186 13.0149 0.616186 13.3756 0.785248C13.8079 0.987811 14.0372 1.30725 14.1978 1.54344C14.2103 1.56181 14.222 1.58075 14.2328 1.60012C14.4217 1.93812 14.519 2.30306 14.519 2.69562C14.519 3.06862 14.4307 3.475 14.2328 3.82919C14.2309 3.83256 14.229 3.83594 14.2271 3.83931L8.05948 14.4915C7.92347 14.7264 7.67314 14.8705 7.4028 14.8696C7.13246 14.8686 6.88312 14.7227 6.74879 14.4868L0.694445 3.85731C0.692704 3.8545 0.690963 3.85156 0.689223 3.84869C0.550663 3.61912 0.336391 3.26412 0.298907 2.80594C0.264469 2.38469 0.358645 1.96256 0.569188 1.59656C0.779731 1.2305 1.0967 0.937873 1.47794 0.758748C1.88672 0.566686 2.30096 0.565186 2.56223 0.565186ZM6.64871 2.08694H2.56223C2.29375 2.08694 2.19069 2.10356 2.11864 2.13744C2.019 2.18419 1.93533 2.26106 1.87938 2.35837C1.82343 2.45569 1.79813 2.56844 1.80733 2.68125C1.81262 2.746 1.83885 2.82 1.99357 3.07656C1.9968 3.08194 1.99997 3.08737 2.00308 3.09281L6.64871 11.249V2.08694ZM8.16223 2.08694V11.2893L12.9155 3.07987C12.9691 2.98187 13.0055 2.84025 13.0055 2.69562C13.0055 2.57831 12.9813 2.47644 12.9272 2.37137C12.8705 2.28937 12.8359 2.24594 12.807 2.21619C12.7822 2.19075 12.7631 2.17712 12.7361 2.1645C12.6237 2.11181 12.5087 2.08694 12.3244 2.08694H8.16223Z",fill:s})})}},8240:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var r=n(5893),s=n(2734),i=n(7357),a=n(155),o=n(5861),c=n(3946),d=n(3321),l=n(9008),u=n.n(l),g=n(7294),C=n(1023),m=n(5675),S=n.n(m),h=n(1713),p=n(1163),_=n(7446),f=n(5201),E=n(8741);let w={ISSUE_INVOICE:1263431856,REQUEST_PURCHASE:918001077,EDIT_STORE:2696066589,DELETE_STORE:4215982618,DEACTIVATE_STORE:4190082615,ACTIVATE_STORE:2538605999};class A{static createFromAddress(e){return new A(e)}static createFromConfig(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=(0,f.beginCell)().storeAddress(f.Address.parse(e.owner)).storeRef((0,f.comment)(e.name)).storeRef((0,f.comment)(e.description)).storeRef((0,f.comment)(e.image)).storeUint(e.mcc_code,16).storeInt(e.active?-1:0,2).storeRef(e.invoice_code).endCell(),s={code:t,data:r};return new A((0,f.contractAddress)(n,s),s)}async sendDeploy(e,t,n){await e.internal(t,{value:n,sendMode:f.SendMode.PAY_GAS_SEPARATELY,body:(0,f.beginCell)().endCell()})}async sendEditStore(e,t,n){await e.internal(t,{value:n.value,sendMode:f.SendMode.PAY_GAS_SEPARATELY,body:(0,f.beginCell)().storeUint(w.EDIT_STORE,32).storeUint(0,64).storeRef((0,f.comment)(n.name)).storeRef((0,f.comment)(n.description)).storeRef((0,f.comment)(n.image)).storeUint(n.mcc_code,16).endCell()})}async sendDeactivateStore(e,t,n){await e.internal(t,{value:n,sendMode:f.SendMode.PAY_GAS_SEPARATELY,body:(0,f.beginCell)().storeUint(w.DEACTIVATE_STORE,32).storeUint(0,64).endCell()})}async sendActivateStore(e,t,n){await e.internal(t,{value:n,sendMode:f.SendMode.PAY_GAS_SEPARATELY,body:(0,f.beginCell)().storeUint(w.ACTIVATE_STORE,32).storeUint(0,64).endCell()})}async sendIssueInvoice(e,t,n){await e.internal(t,{value:n.value,sendMode:f.SendMode.PAY_GAS_SEPARATELY,body:(0,f.beginCell)().storeUint(w.ISSUE_INVOICE,32).storeUint(0,64).storeRef((0,f.beginCell)().storeAddress(f.Address.parse(n.customer)).endCell()).storeRef((0,f.comment)(n.invoice_id)).storeUint(n.amount,64).endCell()})}async sendRequestPurchase(e,t,n){await e.internal(t,{value:n.value,sendMode:f.SendMode.PAY_GAS_SEPARATELY,body:(0,f.beginCell)().storeUint(w.REQUEST_PURCHASE,32).storeUint(0,64).storeRef((0,f.comment)(n.invoice_id)).storeUint(n.amount,64).endCell()})}async getStoreName(e){let t=await e.get("get_store_name",[]);return t.stack.readString()}async getStoreDescription(e){let t=await e.get("get_store_description",[]);return t.stack.readString()}async getStoreImage(e){let t=await e.get("get_store_image",[]);return t.stack.readString()}async getStoreMccCode(e){let t=await e.get("get_store_mcc_code",[]);return t.stack.readNumber()}async getStoreOwner(e){let t=await e.get("get_store_owner",[]);return t.stack.readAddress()}async getStoreActive(e){let t=await e.get("get_store_active",[]);return -1===t.stack.readNumber()}async getStoreData(e){let t=await e.get("get_store_data",[]);return{owner:t.stack.readAddress().toString(),name:t.stack.readString().substring(4),description:t.stack.readString().substring(4),image:t.stack.readString().substring(4),mcc_code:t.stack.readNumber(),active:-1===t.stack.readNumber()}}constructor(e,t){this.address=e,this.init=t}}var v=n(3395);let y=e=>{let t=function(){let[e,t]=(0,g.useState)(null);return(0,g.useEffect)(()=>{let e=async()=>{let e=await (0,v.getHttpEndpoint)({network:"testnet"});return new E.TonClient({endpoint:e})};e().then(e=>{t(e)})},[]),e}(),[n,r]=(0,g.useState)(null);return(0,g.useEffect)(()=>{t&&e&&r(t.open(new A(f.Address.parse(e))))},[e,t]),n};function b(){let e=(0,s.Z)(),t=(0,p.useRouter)(),{sender:n}=function(){let[e]=(0,_.dG)();return{sender:{send:async t=>{let{to:n,value:r,body:s,init:i}=t;null==e||e.sendTransaction({messages:[{address:n.toString(),amount:r.toString(),payload:null==s?void 0:s.toBoc().toString("base64"),stateInit:i?(0,f.beginCell)().storeWritable((0,f.storeStateInit)(i)).endCell().toBoc().toString("base64"):void 0}],validUntil:Date.now()+3e5})},connected:null==e?void 0:e.connected}}}(),l="EQBoUTnpsxUNX_6RZTy2dgDFimJUL8cuIZwQjHb5OFlwh8pm",m=y(l),E=(0,_.EK)(),[w,A]=(0,g.useState)([]);(0,g.useEffect)(()=>{A(JSON.parse(localStorage.getItem("cart")||"[]"))},[]);let{startListening:v,stopListening:b}=function(e,t){let[n,r]=(0,g.useState)(!0),s=()=>r(!1),i=()=>r(!0),[a,o]=(0,g.useState)([]),c=(0,g.useCallback)(async()=>{if(!function(e){try{return f.Address.parse(e),!0}catch(e){return!1}}(e))return[];let t=await fetch("https://testnet.tonapi.io/v1/event/getAccountEvents?account=".concat(e,"&limit=10"),{headers:{"Content-Type":"application/json"}}),n=await t.json();return n.events},[e]);return(0,g.useEffect)(()=>{c().then(e=>{o(e)})},[c,e]),(0,g.useEffect)(()=>{if(!n)return;let e=setInterval(()=>{c().then(e=>{let n=e.filter(e=>!a.some(t=>t.event_id===e.event_id));n.forEach(e=>t(e)),o(e)})},4e3);return()=>clearInterval(e)},[n,c,a]),{stopListening:s,startListening:i}}(l,e=>{let t=e.actions.find(e=>"ContractDeploy"==e.type);t&&(window.location.href="https://beta.pay.thetonpay.app/i/".concat(t.ContractDeploy.address))});return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(u(),{children:[(0,r.jsx)("title",{children:"Durger King 2.0 - Checkout"}),(0,r.jsx)("meta",{name:"description",content:"Durger King reborn - pay with TON"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsxs)(i.Z,{p:2,pb:e.spacing(8),children:[(0,r.jsx)(a.Z,{}),(0,r.jsxs)(o.Z,{variant:"h5",gutterBottom:!0,children:[(0,r.jsx)(c.Z,{onClick:()=>{t.back()},children:(0,r.jsx)(C.Z,{})}),"Checkout"]}),w.map(t=>(0,r.jsxs)(i.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",mb:2},children:[(0,r.jsxs)(i.Z,{sx:{display:"flex",alignItems:"center"},gap:2,children:[(0,r.jsx)(S(),{src:"/".concat(t.image),width:96,height:96,alt:t.name}),(0,r.jsxs)(o.Z,{variant:"h6",children:[t.name," x ",t.quantity]})]}),(0,r.jsxs)(i.Z,{sx:{display:"flex",alignItems:"center"},gap:1,children:[(0,r.jsxs)(o.Z,{variant:"h6",children:[Math.round(t.price*t.quantity*100)/100," "]}),(0,r.jsx)(h.Z,{width:e.spacing(3),height:e.spacing(3),fill:"#0088CC"})]})]},t.name))]}),(0,r.jsx)(d.Z,{variant:"contained",disabled:!n||!m||!E,sx:{position:"fixed",width:"auto",bottom:e.spacing(1),left:e.spacing(1),right:e.spacing(1),height:e.spacing(6),color:"white"},onClick:async()=>{n&&m&&E&&(await m.sendRequestPurchase(n,{value:(0,f.toNano)("0.02"),invoice_id:Date.now().toString(),amount:(0,f.toNano)(w.reduce((e,t)=>e+t.price*t.quantity,0).toString())}),v())},children:"Confirm order"})]})}},5024:function(){}},function(e){e.O(0,[753,425,774,888,179],function(){return e(e.s=2013)}),_N_E=e.O()}]);