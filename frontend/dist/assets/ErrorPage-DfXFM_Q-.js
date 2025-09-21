import{w as Dt,P as g,j as W,L as Ua}from"./index-DG0u--Z4.js";/*!
 * Font Awesome Free 7.0.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */function Oe(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function Ha(e){if(Array.isArray(e))return e}function Ga(e){if(Array.isArray(e))return Oe(e)}function Ba(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Xa(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,zt(r.key),r)}}function Va(e,t,a){return t&&Xa(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function se(e,t){var a=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=Be(e))||t){a&&(e=a);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(l){throw l},f:n}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,o=!0,s=!1;return{s:function(){a=a.call(e)},n:function(){var l=a.next();return o=l.done,l},e:function(l){s=!0,i=l},f:function(){try{o||a.return==null||a.return()}finally{if(s)throw i}}}}function p(e,t,a){return(t=zt(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Ka(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Ja(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,n,i,o,s=[],l=!0,u=!1;try{if(i=(a=a.call(e)).next,t===0){if(Object(a)!==a)return;l=!1}else for(;!(l=(r=i.call(a)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(c){u=!0,n=c}finally{try{if(!l&&a.return!=null&&(o=a.return(),Object(o)!==o))return}finally{if(u)throw n}}return s}}function qa(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qa(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function it(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,r)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?it(Object(a),!0).forEach(function(r){p(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):it(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function ve(e,t){return Ha(e)||Ja(e,t)||Be(e,t)||qa()}function j(e){return Ga(e)||Ka(e)||Be(e)||Qa()}function Za(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function zt(e){var t=Za(e,"string");return typeof t=="symbol"?t:t+""}function ue(e){"@babel/helpers - typeof";return ue=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ue(e)}function Be(e,t){if(e){if(typeof e=="string")return Oe(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Oe(e,t):void 0}}var ot=function(){},Xe={},Wt={},Yt=null,Ut={mark:ot,measure:ot};try{typeof window<"u"&&(Xe=window),typeof document<"u"&&(Wt=document),typeof MutationObserver<"u"&&(Yt=MutationObserver),typeof performance<"u"&&(Ut=performance)}catch{}var er=Xe.navigator||{},st=er.userAgent,lt=st===void 0?"":st,R=Xe,A=Wt,ft=Yt,ie=Ut;R.document;var _=!!A.documentElement&&!!A.head&&typeof A.addEventListener=="function"&&typeof A.createElement=="function",Ht=~lt.indexOf("MSIE")||~lt.indexOf("Trident/"),ye,tr=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,ar=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Slab Press|Slab|Whiteboard)?.*/i,Gt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"}},rr={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},Bt=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],P="classic",te="duotone",Xt="sharp",Vt="sharp-duotone",Kt="chisel",Jt="etch",qt="jelly",Qt="jelly-duo",Zt="jelly-fill",ea="notdog",ta="notdog-duo",aa="slab",ra="slab-press",na="thumbprint",ia="whiteboard",nr="Classic",ir="Duotone",or="Sharp",sr="Sharp Duotone",lr="Chisel",fr="Etch",ur="Jelly",cr="Jelly Duo",dr="Jelly Fill",mr="Notdog",vr="Notdog Duo",hr="Slab",gr="Slab Press",pr="Thumbprint",br="Whiteboard",oa=[P,te,Xt,Vt,Kt,Jt,qt,Qt,Zt,ea,ta,aa,ra,na,ia];ye={},p(p(p(p(p(p(p(p(p(p(ye,P,nr),te,ir),Xt,or),Vt,sr),Kt,lr),Jt,fr),qt,ur),Qt,cr),Zt,dr),ea,mr),p(p(p(p(p(ye,ta,vr),aa,hr),ra,gr),na,pr),ia,br);var yr={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"}},xr={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"}},wr=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),Ar={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},whiteboard:{semibold:"fawsb"}},sa=["fak","fa-kit","fakd","fa-kit-duotone"],ut={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Sr=["kit"],kr="kit",Pr="kit-duotone",Ir="Kit",Or="Kit Duotone";p(p({},kr,Ir),Pr,Or);var Er={kit:{"fa-kit":"fak"}},jr={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Cr={kit:{fak:"fa-kit"}},ct={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},xe,oe={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Fr=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press"],Nr="classic",Tr="duotone",_r="sharp",$r="sharp-duotone",Mr="chisel",Lr="etch",Rr="jelly",Dr="jelly-duo",zr="jelly-fill",Wr="notdog",Yr="notdog-duo",Ur="slab",Hr="slab-press",Gr="thumbprint",Br="whiteboard",Xr="Classic",Vr="Duotone",Kr="Sharp",Jr="Sharp Duotone",qr="Chisel",Qr="Etch",Zr="Jelly",en="Jelly Duo",tn="Jelly Fill",an="Notdog",rn="Notdog Duo",nn="Slab",on="Slab Press",sn="Thumbprint",ln="Whiteboard";xe={},p(p(p(p(p(p(p(p(p(p(xe,Nr,Xr),Tr,Vr),_r,Kr),$r,Jr),Mr,qr),Lr,Qr),Rr,Zr),Dr,en),zr,tn),Wr,an),p(p(p(p(p(xe,Yr,rn),Ur,nn),Hr,on),Gr,sn),Br,ln);var fn="kit",un="kit-duotone",cn="Kit",dn="Kit Duotone";p(p({},fn,cn),un,dn);var mn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"}},vn={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"]},Ee={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"}},hn=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],la=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr"].concat(Fr,hn),gn=["solid","regular","light","thin","duotone","brands","semibold"],fa=[1,2,3,4,5,6,7,8,9,10],pn=fa.concat([11,12,13,14,15,16,17,18,19,20]),bn=["aw","fw","pull-left","pull-right"],yn=[].concat(j(Object.keys(vn)),gn,bn,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",oe.GROUP,oe.SWAP_OPACITY,oe.PRIMARY,oe.SECONDARY]).concat(fa.map(function(e){return"".concat(e,"x")})).concat(pn.map(function(e){return"w-".concat(e)})),xn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},N="___FONT_AWESOME___",je=16,ua="fa",ca="svg-inline--fa",U="data-fa-i2svg",Ce="data-fa-pseudo-element",wn="data-fa-pseudo-element-pending",Ve="data-prefix",Ke="data-icon",dt="fontawesome-i2svg",An="async",Sn=["HTML","HEAD","STYLE","SCRIPT"],da=["::before","::after",":before",":after"],ma=(function(){try{return!0}catch{return!1}})();function ae(e){return new Proxy(e,{get:function(a,r){return r in a?a[r]:a[P]}})}var va=f({},Gt);va[P]=f(f(f(f({},{"fa-duotone":"duotone"}),Gt[P]),ut.kit),ut["kit-duotone"]);var kn=ae(va),Fe=f({},Ar);Fe[P]=f(f(f(f({},{duotone:"fad"}),Fe[P]),ct.kit),ct["kit-duotone"]);var mt=ae(Fe),Ne=f({},Ee);Ne[P]=f(f({},Ne[P]),Cr.kit);var Je=ae(Ne),Te=f({},mn);Te[P]=f(f({},Te[P]),Er.kit);ae(Te);var Pn=tr,ha="fa-layers-text",In=ar,On=f({},yr);ae(On);var En=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],we=rr,jn=[].concat(j(Sr),j(yn)),Q=R.FontAwesomeConfig||{};function Cn(e){var t=A.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Fn(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(A&&typeof A.querySelector=="function"){var Nn=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Nn.forEach(function(e){var t=ve(e,2),a=t[0],r=t[1],n=Fn(Cn(a));n!=null&&(Q[r]=n)})}var ga={styleDefault:"solid",familyDefault:P,cssPrefix:ua,replacementClass:ca,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};Q.familyPrefix&&(Q.cssPrefix=Q.familyPrefix);var K=f(f({},ga),Q);K.autoReplaceSvg||(K.observeMutations=!1);var m={};Object.keys(ga).forEach(function(e){Object.defineProperty(m,e,{enumerable:!0,set:function(a){K[e]=a,Z.forEach(function(r){return r(m)})},get:function(){return K[e]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(t){K.cssPrefix=t,Z.forEach(function(a){return a(m)})},get:function(){return K.cssPrefix}});R.FontAwesomeConfig=m;var Z=[];function Tn(e){return Z.push(e),function(){Z.splice(Z.indexOf(e),1)}}var B=je,F={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function _n(e){if(!(!e||!_)){var t=A.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var a=A.head.childNodes,r=null,n=a.length-1;n>-1;n--){var i=a[n],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return A.head.insertBefore(t,r),e}}var $n="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function vt(){for(var e=12,t="";e-- >0;)t+=$n[Math.random()*62|0];return t}function J(e){for(var t=[],a=(e||[]).length>>>0;a--;)t[a]=e[a];return t}function qe(e){return e.classList?J(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function pa(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Mn(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,'="').concat(pa(e[a]),'" ')},"").trim()}function he(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,": ").concat(e[a].trim(),";")},"")}function Qe(e){return e.size!==F.size||e.x!==F.x||e.y!==F.y||e.rotate!==F.rotate||e.flipX||e.flipY}function Ln(e){var t=e.transform,a=e.containerWidth,r=e.iconWidth,n={transform:"translate(".concat(a/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),o="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},u={transform:"translate(".concat(r/2*-1," -256)")};return{outer:n,inner:l,path:u}}function Rn(e){var t=e.transform,a=e.width,r=a===void 0?je:a,n=e.height,i=n===void 0?je:n,o="";return Ht?o+="translate(".concat(t.x/B-r/2,"em, ").concat(t.y/B-i/2,"em) "):o+="translate(calc(-50% + ".concat(t.x/B,"em), calc(-50% + ").concat(t.y/B,"em)) "),o+="scale(".concat(t.size/B*(t.flipX?-1:1),", ").concat(t.size/B*(t.flipY?-1:1),") "),o+="rotate(".concat(t.rotate,"deg) "),o}var Dn=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function ba(){var e=ua,t=ca,a=m.cssPrefix,r=m.replacementClass,n=Dn;if(a!==e||r!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),o=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");n=n.replace(i,".".concat(a,"-")).replace(o,"--".concat(a,"-")).replace(s,".".concat(r))}return n}var ht=!1;function Ae(){m.autoAddCss&&!ht&&(_n(ba()),ht=!0)}var zn={mixout:function(){return{dom:{css:ba,insertCss:Ae}}},hooks:function(){return{beforeDOMElementCreation:function(){Ae()},beforeI2svg:function(){Ae()}}}},T=R||{};T[N]||(T[N]={});T[N].styles||(T[N].styles={});T[N].hooks||(T[N].hooks={});T[N].shims||(T[N].shims=[]);var E=T[N],ya=[],xa=function(){A.removeEventListener("DOMContentLoaded",xa),ce=1,ya.map(function(t){return t()})},ce=!1;_&&(ce=(A.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(A.readyState),ce||A.addEventListener("DOMContentLoaded",xa));function Wn(e){_&&(ce?setTimeout(e,0):ya.push(e))}function re(e){var t=e.tag,a=e.attributes,r=a===void 0?{}:a,n=e.children,i=n===void 0?[]:n;return typeof e=="string"?pa(e):"<".concat(t," ").concat(Mn(r),">").concat(i.map(re).join(""),"</").concat(t,">")}function gt(e,t,a){if(e&&e[t]&&e[t][a])return{prefix:t,iconName:a,icon:e[t][a]}}var Se=function(t,a,r,n){var i=Object.keys(t),o=i.length,s=a,l,u,c;for(r===void 0?(l=1,c=t[i[0]]):(l=0,c=r);l<o;l++)u=i[l],c=s(c,t[u],u,t);return c};function wa(e){return j(e).length!==1?null:e.codePointAt(0).toString(16)}function pt(e){return Object.keys(e).reduce(function(t,a){var r=e[a],n=!!r.icon;return n?t[r.iconName]=r.icon:t[a]=r,t},{})}function _e(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=a.skipHooks,n=r===void 0?!1:r,i=pt(t);typeof E.hooks.addPack=="function"&&!n?E.hooks.addPack(e,pt(t)):E.styles[e]=f(f({},E.styles[e]||{}),i),e==="fas"&&_e("fa",t)}var ee=E.styles,Yn=E.shims,Aa=Object.keys(Je),Un=Aa.reduce(function(e,t){return e[t]=Object.keys(Je[t]),e},{}),Ze=null,Sa={},ka={},Pa={},Ia={},Oa={};function Hn(e){return~jn.indexOf(e)}function Gn(e,t){var a=t.split("-"),r=a[0],n=a.slice(1).join("-");return r===e&&n!==""&&!Hn(n)?n:null}var Ea=function(){var t=function(i){return Se(ee,function(o,s,l){return o[l]=Se(s,i,{}),o},{})};Sa=t(function(n,i,o){if(i[3]&&(n[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){n[l.toString(16)]=o})}return n}),ka=t(function(n,i,o){if(n[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){n[l]=o})}return n}),Oa=t(function(n,i,o){var s=i[2];return n[o]=o,s.forEach(function(l){n[l]=o}),n});var a="far"in ee||m.autoFetchSvg,r=Se(Yn,function(n,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!a&&(s="fas"),typeof o=="string"&&(n.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(n.unicodes[o.toString(16)]={prefix:s,iconName:l}),n},{names:{},unicodes:{}});Pa=r.names,Ia=r.unicodes,Ze=ge(m.styleDefault,{family:m.familyDefault})};Tn(function(e){Ze=ge(e.styleDefault,{family:m.familyDefault})});Ea();function et(e,t){return(Sa[e]||{})[t]}function Bn(e,t){return(ka[e]||{})[t]}function Y(e,t){return(Oa[e]||{})[t]}function ja(e){return Pa[e]||{prefix:null,iconName:null}}function Xn(e){var t=Ia[e],a=et("fas",e);return t||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function D(){return Ze}var Ca=function(){return{prefix:null,iconName:null,rest:[]}};function Vn(e){var t=P,a=Aa.reduce(function(r,n){return r[n]="".concat(m.cssPrefix,"-").concat(n),r},{});return oa.forEach(function(r){(e.includes(a[r])||e.some(function(n){return Un[r].includes(n)}))&&(t=r)}),t}function ge(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.family,r=a===void 0?P:a,n=kn[r][e];if(r===te&&!e)return"fad";var i=mt[r][e]||mt[r][n],o=e in E.styles?e:null,s=i||o||null;return s}function Kn(e){var t=[],a=null;return e.forEach(function(r){var n=Gn(m.cssPrefix,r);n?a=n:r&&t.push(r)}),{iconName:a,rest:t}}function bt(e){return e.sort().filter(function(t,a,r){return r.indexOf(t)===a})}var yt=la.concat(sa);function pe(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.skipLookups,r=a===void 0?!1:a,n=null,i=bt(e.filter(function(v){return yt.includes(v)})),o=bt(e.filter(function(v){return!yt.includes(v)})),s=i.filter(function(v){return n=v,!Bt.includes(v)}),l=ve(s,1),u=l[0],c=u===void 0?null:u,d=Vn(i),h=f(f({},Kn(o)),{},{prefix:ge(c,{family:d})});return f(f(f({},h),Zn({values:e,family:d,styles:ee,config:m,canonical:h,givenPrefix:n})),Jn(r,n,h))}function Jn(e,t,a){var r=a.prefix,n=a.iconName;if(e||!r||!n)return{prefix:r,iconName:n};var i=t==="fa"?ja(n):{},o=Y(r,n);return n=i.iconName||o||n,r=i.prefix||r,r==="far"&&!ee.far&&ee.fas&&!m.autoFetchSvg&&(r="fas"),{prefix:r,iconName:n}}var qn=oa.filter(function(e){return e!==P||e!==te}),Qn=Object.keys(Ee).filter(function(e){return e!==P}).map(function(e){return Object.keys(Ee[e])}).flat();function Zn(e){var t=e.values,a=e.family,r=e.canonical,n=e.givenPrefix,i=n===void 0?"":n,o=e.styles,s=o===void 0?{}:o,l=e.config,u=l===void 0?{}:l,c=a===te,d=t.includes("fa-duotone")||t.includes("fad"),h=u.familyDefault==="duotone",v=r.prefix==="fad"||r.prefix==="fa-duotone";if(!c&&(d||h||v)&&(r.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(r.prefix="fab"),!r.prefix&&qn.includes(a)){var x=Object.keys(s).find(function(w){return Qn.includes(w)});if(x||u.autoFetchSvg){var b=wr.get(a).defaultShortPrefixId;r.prefix=b,r.iconName=Y(r.prefix,r.iconName)||r.iconName}}return(r.prefix==="fa"||i==="fa")&&(r.prefix=D()||"fas"),r}var ei=(function(){function e(){Ba(this,e),this.definitions={}}return Va(e,[{key:"add",value:function(){for(var a=this,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];var o=n.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){a.definitions[s]=f(f({},a.definitions[s]||{}),o[s]),_e(s,o[s]);var l=Je[P][s];l&&_e(l,o[s]),Ea()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,r){var n=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(n).map(function(i){var o=n[i],s=o.prefix,l=o.iconName,u=o.icon,c=u[2];a[s]||(a[s]={}),c.length>0&&c.forEach(function(d){typeof d=="string"&&(a[s][d]=u)}),a[s][l]=u}),a}}])})(),xt=[],X={},V={},ti=Object.keys(V);function ai(e,t){var a=t.mixoutsTo;return xt=e,X={},Object.keys(V).forEach(function(r){ti.indexOf(r)===-1&&delete V[r]}),xt.forEach(function(r){var n=r.mixout?r.mixout():{};if(Object.keys(n).forEach(function(o){typeof n[o]=="function"&&(a[o]=n[o]),ue(n[o])==="object"&&Object.keys(n[o]).forEach(function(s){a[o]||(a[o]={}),a[o][s]=n[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){X[o]||(X[o]=[]),X[o].push(i[o])})}r.provides&&r.provides(V)}),a}function $e(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];var i=X[e]||[];return i.forEach(function(o){t=o.apply(null,[t].concat(r))}),t}function H(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];var n=X[e]||[];n.forEach(function(i){i.apply(null,a)})}function z(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return V[e]?V[e].apply(null,t):void 0}function Me(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,a=e.prefix||D();if(t)return t=Y(a,t)||t,gt(Fa.definitions,a,t)||gt(E.styles,a,t)}var Fa=new ei,ri=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,H("noAuto")},ni={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return _?(H("beforeI2svg",t),z("pseudoElements2svg",t),z("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,Wn(function(){oi({autoReplaceSvgRoot:a}),H("watch",t)})}},ii={icon:function(t){if(t===null)return null;if(ue(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:Y(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var a=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=ge(t[0]);return{prefix:r,iconName:Y(r,a)||a}}if(typeof t=="string"&&(t.indexOf("".concat(m.cssPrefix,"-"))>-1||t.match(Pn))){var n=pe(t.split(" "),{skipLookups:!0});return{prefix:n.prefix||D(),iconName:Y(n.prefix,n.iconName)||n.iconName}}if(typeof t=="string"){var i=D();return{prefix:i,iconName:Y(i,t)||t}}}},I={noAuto:ri,config:m,dom:ni,parse:ii,library:Fa,findIconDefinition:Me,toHtml:re},oi=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot,r=a===void 0?A:a;(Object.keys(E.styles).length>0||m.autoFetchSvg)&&_&&m.autoReplaceSvg&&I.dom.i2svg({node:r})};function be(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return re(r)})}}),Object.defineProperty(e,"node",{get:function(){if(_){var r=A.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function si(e){var t=e.children,a=e.main,r=e.mask,n=e.attributes,i=e.styles,o=e.transform;if(Qe(o)&&a.found&&!r.found){var s=a.width,l=a.height,u={x:s/l/2,y:.5};n.style=he(f(f({},i),{},{"transform-origin":"".concat(u.x+o.x/16,"em ").concat(u.y+o.y/16,"em")}))}return[{tag:"svg",attributes:n,children:t}]}function li(e){var t=e.prefix,a=e.iconName,r=e.children,n=e.attributes,i=e.symbol,o=i===!0?"".concat(t,"-").concat(m.cssPrefix,"-").concat(a):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},n),{},{id:o}),children:r}]}]}function fi(e){var t=["aria-label","aria-labelledby","title","role"];return t.some(function(a){return a in e})}function tt(e){var t=e.icons,a=t.main,r=t.mask,n=e.prefix,i=e.iconName,o=e.transform,s=e.symbol,l=e.maskId,u=e.extra,c=e.watchable,d=c===void 0?!1:c,h=r.found?r:a,v=h.width,x=h.height,b=[m.replacementClass,i?"".concat(m.cssPrefix,"-").concat(i):""].filter(function(O){return u.classes.indexOf(O)===-1}).filter(function(O){return O!==""||!!O}).concat(u.classes).join(" "),w={children:[],attributes:f(f({},u.attributes),{},{"data-prefix":n,"data-icon":i,class:b,role:u.attributes.role||"img",viewBox:"0 0 ".concat(v," ").concat(x)})};!fi(u.attributes)&&!u.attributes["aria-hidden"]&&(w.attributes["aria-hidden"]="true"),d&&(w.attributes[U]="");var y=f(f({},w),{},{prefix:n,iconName:i,main:a,mask:r,maskId:l,transform:o,symbol:s,styles:f({},u.styles)}),S=r.found&&a.found?z("generateAbstractMask",y)||{children:[],attributes:{}}:z("generateAbstractIcon",y)||{children:[],attributes:{}},k=S.children,$=S.attributes;return y.children=k,y.attributes=$,s?li(y):si(y)}function wt(e){var t=e.content,a=e.width,r=e.height,n=e.transform,i=e.extra,o=e.watchable,s=o===void 0?!1:o,l=f(f({},i.attributes),{},{class:i.classes.join(" ")});s&&(l[U]="");var u=f({},i.styles);Qe(n)&&(u.transform=Rn({transform:n,width:a,height:r}),u["-webkit-transform"]=u.transform);var c=he(u);c.length>0&&(l.style=c);var d=[];return d.push({tag:"span",attributes:l,children:[t]}),d}function ui(e){var t=e.content,a=e.extra,r=f(f({},a.attributes),{},{class:a.classes.join(" ")}),n=he(a.styles);n.length>0&&(r.style=n);var i=[];return i.push({tag:"span",attributes:r,children:[t]}),i}var ke=E.styles;function Le(e){var t=e[0],a=e[1],r=e.slice(4),n=ve(r,1),i=n[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(we.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:a,icon:o}}var ci={found:!1,width:512,height:512};function di(e,t){!ma&&!m.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function Re(e,t){var a=t;return t==="fa"&&m.styleDefault!==null&&(t=D()),new Promise(function(r,n){if(a==="fa"){var i=ja(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&ke[t]&&ke[t][e]){var o=ke[t][e];return r(Le(o))}di(e,t),r(f(f({},ci),{},{icon:m.showMissingIcons&&e?z("missingIconAbstract")||{}:{}}))})}var At=function(){},De=m.measurePerformance&&ie&&ie.mark&&ie.measure?ie:{mark:At,measure:At},q='FA "7.0.1"',mi=function(t){return De.mark("".concat(q," ").concat(t," begins")),function(){return Na(t)}},Na=function(t){De.mark("".concat(q," ").concat(t," ends")),De.measure("".concat(q," ").concat(t),"".concat(q," ").concat(t," begins"),"".concat(q," ").concat(t," ends"))},at={begin:mi,end:Na},le=function(){};function St(e){var t=e.getAttribute?e.getAttribute(U):null;return typeof t=="string"}function vi(e){var t=e.getAttribute?e.getAttribute(Ve):null,a=e.getAttribute?e.getAttribute(Ke):null;return t&&a}function hi(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(m.replacementClass)}function gi(){if(m.autoReplaceSvg===!0)return fe.replace;var e=fe[m.autoReplaceSvg];return e||fe.replace}function pi(e){return A.createElementNS("http://www.w3.org/2000/svg",e)}function bi(e){return A.createElement(e)}function Ta(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.ceFn,r=a===void 0?e.tag==="svg"?pi:bi:a;if(typeof e=="string")return A.createTextNode(e);var n=r(e.tag);Object.keys(e.attributes||[]).forEach(function(o){n.setAttribute(o,e.attributes[o])});var i=e.children||[];return i.forEach(function(o){n.appendChild(Ta(o,{ceFn:r}))}),n}function yi(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var fe={replace:function(t){var a=t[0];if(a.parentNode)if(t[1].forEach(function(n){a.parentNode.insertBefore(Ta(n),a)}),a.getAttribute(U)===null&&m.keepOriginalSource){var r=A.createComment(yi(a));a.parentNode.replaceChild(r,a)}else a.remove()},nest:function(t){var a=t[0],r=t[1];if(~qe(a).indexOf(m.replacementClass))return fe.replace(t);var n=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(s,l){return l===m.replacementClass||l.match(n)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(s){return re(s)}).join(`
`);a.setAttribute(U,""),a.innerHTML=o}};function kt(e){e()}function _a(e,t){var a=typeof t=="function"?t:le;if(e.length===0)a();else{var r=kt;m.mutateApproach===An&&(r=R.requestAnimationFrame||kt),r(function(){var n=gi(),i=at.begin("mutate");e.map(n),i(),a()})}}var rt=!1;function $a(){rt=!0}function ze(){rt=!1}var de=null;function Pt(e){if(ft&&m.observeMutations){var t=e.treeCallback,a=t===void 0?le:t,r=e.nodeCallback,n=r===void 0?le:r,i=e.pseudoElementsCallback,o=i===void 0?le:i,s=e.observeMutationsRoot,l=s===void 0?A:s;de=new ft(function(u){if(!rt){var c=D();J(u).forEach(function(d){if(d.type==="childList"&&d.addedNodes.length>0&&!St(d.addedNodes[0])&&(m.searchPseudoElements&&o(d.target),a(d.target)),d.type==="attributes"&&d.target.parentNode&&m.searchPseudoElements&&o([d.target],!0),d.type==="attributes"&&St(d.target)&&~En.indexOf(d.attributeName))if(d.attributeName==="class"&&vi(d.target)){var h=pe(qe(d.target)),v=h.prefix,x=h.iconName;d.target.setAttribute(Ve,v||c),x&&d.target.setAttribute(Ke,x)}else hi(d.target)&&n(d.target)})}}),_&&de.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function xi(){de&&de.disconnect()}function wi(e){var t=e.getAttribute("style"),a=[];return t&&(a=t.split(";").reduce(function(r,n){var i=n.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),a}function Ai(e){var t=e.getAttribute("data-prefix"),a=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",n=pe(qe(e));return n.prefix||(n.prefix=D()),t&&a&&(n.prefix=t,n.iconName=a),n.iconName&&n.prefix||(n.prefix&&r.length>0&&(n.iconName=Bn(n.prefix,e.innerText)||et(n.prefix,wa(e.innerText))),!n.iconName&&m.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(n.iconName=e.firstChild.data)),n}function Si(e){var t=J(e.attributes).reduce(function(a,r){return a.name!=="class"&&a.name!=="style"&&(a[r.name]=r.value),a},{});return t}function ki(){return{iconName:null,prefix:null,transform:F,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function It(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=Ai(e),r=a.iconName,n=a.prefix,i=a.rest,o=Si(e),s=$e("parseNodeAttributes",{},e),l=t.styleParser?wi(e):[];return f({iconName:r,prefix:n,transform:F,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var Pi=E.styles;function Ma(e){var t=m.autoReplaceSvg==="nest"?It(e,{styleParser:!1}):It(e);return~t.extra.classes.indexOf(ha)?z("generateLayersText",e,t):z("generateSvgReplacementMutation",e,t)}function Ii(){return[].concat(j(sa),j(la))}function Ot(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!_)return Promise.resolve();var a=A.documentElement.classList,r=function(d){return a.add("".concat(dt,"-").concat(d))},n=function(d){return a.remove("".concat(dt,"-").concat(d))},i=m.autoFetchSvg?Ii():Bt.concat(Object.keys(Pi));i.includes("fa")||i.push("fa");var o=[".".concat(ha,":not([").concat(U,"])")].concat(i.map(function(c){return".".concat(c,":not([").concat(U,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=J(e.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),n("complete");else return Promise.resolve();var l=at.begin("onTree"),u=s.reduce(function(c,d){try{var h=Ma(d);h&&c.push(h)}catch(v){ma||v.name==="MissingIcon"&&console.error(v)}return c},[]);return new Promise(function(c,d){Promise.all(u).then(function(h){_a(h,function(){r("active"),r("complete"),n("pending"),typeof t=="function"&&t(),l(),c()})}).catch(function(h){l(),d(h)})})}function Oi(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Ma(e).then(function(a){a&&_a([a],t)})}function Ei(e){return function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:Me(t||{}),n=a.mask;return n&&(n=(n||{}).icon?n:Me(n||{})),e(r,f(f({},a),{},{mask:n}))}}var ji=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,n=r===void 0?F:r,i=a.symbol,o=i===void 0?!1:i,s=a.mask,l=s===void 0?null:s,u=a.maskId,c=u===void 0?null:u,d=a.classes,h=d===void 0?[]:d,v=a.attributes,x=v===void 0?{}:v,b=a.styles,w=b===void 0?{}:b;if(t){var y=t.prefix,S=t.iconName,k=t.icon;return be(f({type:"icon"},t),function(){return H("beforeDOMElementCreation",{iconDefinition:t,params:a}),tt({icons:{main:Le(k),mask:l?Le(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:y,iconName:S,transform:f(f({},F),n),symbol:o,maskId:c,extra:{attributes:x,styles:w,classes:h}})})}},Ci={mixout:function(){return{icon:Ei(ji)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=Ot,a.nodeCallback=Oi,a}}},provides:function(t){t.i2svg=function(a){var r=a.node,n=r===void 0?A:r,i=a.callback,o=i===void 0?function(){}:i;return Ot(n,o)},t.generateSvgReplacementMutation=function(a,r){var n=r.iconName,i=r.prefix,o=r.transform,s=r.symbol,l=r.mask,u=r.maskId,c=r.extra;return new Promise(function(d,h){Promise.all([Re(n,i),l.iconName?Re(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(v){var x=ve(v,2),b=x[0],w=x[1];d([a,tt({icons:{main:b,mask:w},prefix:i,iconName:n,transform:o,symbol:s,maskId:u,extra:c,watchable:!0})])}).catch(h)})},t.generateAbstractIcon=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.transform,s=a.styles,l=he(s);l.length>0&&(n.style=l);var u;return Qe(o)&&(u=z("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(u||i.icon),{children:r,attributes:n}}}},Fi={mixout:function(){return{layer:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.classes,i=n===void 0?[]:n;return be({type:"layer"},function(){H("beforeDOMElementCreation",{assembler:a,params:r});var o=[];return a(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(j(i)).join(" ")},children:o}]})}}}},Ni={mixout:function(){return{counter:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.title;var n=r.classes,i=n===void 0?[]:n,o=r.attributes,s=o===void 0?{}:o,l=r.styles,u=l===void 0?{}:l;return be({type:"counter",content:a},function(){return H("beforeDOMElementCreation",{content:a,params:r}),ui({content:a.toString(),extra:{attributes:s,styles:u,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(j(i))}})})}}}},Ti={mixout:function(){return{text:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.transform,i=n===void 0?F:n,o=r.classes,s=o===void 0?[]:o,l=r.attributes,u=l===void 0?{}:l,c=r.styles,d=c===void 0?{}:c;return be({type:"text",content:a},function(){return H("beforeDOMElementCreation",{content:a,params:r}),wt({content:a,transform:f(f({},F),i),extra:{attributes:u,styles:d,classes:["".concat(m.cssPrefix,"-layers-text")].concat(j(s))}})})}}},provides:function(t){t.generateLayersText=function(a,r){var n=r.transform,i=r.extra,o=null,s=null;if(Ht){var l=parseInt(getComputedStyle(a).fontSize,10),u=a.getBoundingClientRect();o=u.width/l,s=u.height/l}return Promise.resolve([a,wt({content:a.innerHTML,width:o,height:s,transform:n,extra:i,watchable:!0})])}}},La=new RegExp('"',"ug"),Et=[1105920,1112319],jt=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),xr),xn),jr),We=Object.keys(jt).reduce(function(e,t){return e[t.toLowerCase()]=jt[t],e},{}),_i=Object.keys(We).reduce(function(e,t){var a=We[t];return e[t]=a[900]||j(Object.entries(a))[0][1],e},{});function $i(e){var t=e.replace(La,"");return wa(j(t)[0]||"")}function Mi(e){var t=e.getPropertyValue("font-feature-settings").includes("ss01"),a=e.getPropertyValue("content"),r=a.replace(La,""),n=r.codePointAt(0),i=n>=Et[0]&&n<=Et[1],o=r.length===2?r[0]===r[1]:!1;return i||o||t}function Li(e,t){var a=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(t),n=isNaN(r)?"normal":r;return(We[a]||{})[n]||_i[a]}function Ct(e,t){var a="".concat(wn).concat(t.replace(":","-"));return new Promise(function(r,n){if(e.getAttribute(a)!==null)return r();var i=J(e.children),o=i.filter(function(G){return G.getAttribute(Ce)===t})[0],s=R.getComputedStyle(e,t),l=s.getPropertyValue("font-family"),u=l.match(In),c=s.getPropertyValue("font-weight"),d=s.getPropertyValue("content");if(o&&!u)return e.removeChild(o),r();if(u&&d!=="none"&&d!==""){var h=s.getPropertyValue("content"),v=Li(l,c),x=$i(h),b=u[0].startsWith("FontAwesome"),w=Mi(s),y=et(v,x),S=y;if(b){var k=Xn(x);k.iconName&&k.prefix&&(y=k.iconName,v=k.prefix)}if(y&&!w&&(!o||o.getAttribute(Ve)!==v||o.getAttribute(Ke)!==S)){e.setAttribute(a,S),o&&e.removeChild(o);var $=ki(),O=$.extra;O.attributes[Ce]=t,Re(y,v).then(function(G){var ne=tt(f(f({},$),{},{icons:{main:G,mask:Ca()},prefix:v,iconName:S,extra:O,watchable:!0})),M=A.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(M,e.firstChild):e.appendChild(M),M.outerHTML=ne.map(function(Ya){return re(Ya)}).join(`
`),e.removeAttribute(a),r()}).catch(n)}else r()}else r()})}function Ri(e){return Promise.all([Ct(e,"::before"),Ct(e,"::after")])}function Di(e){return e.parentNode!==document.head&&!~Sn.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Ce)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var zi=function(t){return!!t&&da.some(function(a){return t.includes(a)})},Wi=function(t){if(!t)return[];var a=new Set,r=t.split(/,(?![^()]*\))/).map(function(l){return l.trim()});r=r.flatMap(function(l){return l.includes("(")?l:l.split(",").map(function(u){return u.trim()})});var n=se(r),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;if(zi(o)){var s=da.reduce(function(l,u){return l.replace(u,"")},o);s!==""&&s!=="*"&&a.add(s)}}}catch(l){n.e(l)}finally{n.f()}return a};function Ft(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(_){var a;if(t)a=e;else if(m.searchPseudoElementsFullScan)a=e.querySelectorAll("*");else{var r=new Set,n=se(document.styleSheets),i;try{for(n.s();!(i=n.n()).done;){var o=i.value;try{var s=se(o.cssRules),l;try{for(s.s();!(l=s.n()).done;){var u=l.value,c=Wi(u.selectorText),d=se(c),h;try{for(d.s();!(h=d.n()).done;){var v=h.value;r.add(v)}}catch(b){d.e(b)}finally{d.f()}}}catch(b){s.e(b)}finally{s.f()}}catch(b){m.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(o.href," (").concat(b.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(b){n.e(b)}finally{n.f()}if(!r.size)return;var x=Array.from(r).join(", ");try{a=e.querySelectorAll(x)}catch{}}return new Promise(function(b,w){var y=J(a).filter(Di).map(Ri),S=at.begin("searchPseudoElements");$a(),Promise.all(y).then(function(){S(),ze(),b()}).catch(function(){S(),ze(),w()})})}}var Yi={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=Ft,a}}},provides:function(t){t.pseudoElements2svg=function(a){var r=a.node,n=r===void 0?A:r;m.searchPseudoElements&&Ft(n)}}},Nt=!1,Ui={mixout:function(){return{dom:{unwatch:function(){$a(),Nt=!0}}}},hooks:function(){return{bootstrap:function(){Pt($e("mutationObserverCallbacks",{}))},noAuto:function(){xi()},watch:function(a){var r=a.observeMutationsRoot;Nt?ze():Pt($e("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Tt=function(t){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,n){var i=n.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return r.flipX=!0,r;if(o&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(o){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},a)},Hi={mixout:function(){return{parse:{transform:function(a){return Tt(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-transform");return n&&(a.transform=Tt(n)),a}}},provides:function(t){t.generateAbstractTransformGrouping=function(a){var r=a.main,n=a.transform,i=a.containerWidth,o=a.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(n.x*32,", ").concat(n.y*32,") "),u="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),c="rotate(".concat(n.rotate," 0 0)"),d={transform:"".concat(l," ").concat(u," ").concat(c)},h={transform:"translate(".concat(o/2*-1," -256)")},v={outer:s,inner:d,path:h};return{tag:"g",attributes:f({},v.outer),children:[{tag:"g",attributes:f({},v.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:f(f({},r.icon.attributes),v.path)}]}]}}}},Pe={x:0,y:0,width:"100%",height:"100%"};function _t(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function Gi(e){return e.tag==="g"?e.children:[e]}var Bi={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-mask"),i=n?pe(n.split(" ").map(function(o){return o.trim()})):Ca();return i.prefix||(i.prefix=D()),a.mask=i,a.maskId=r.getAttribute("data-fa-mask-id"),a}}},provides:function(t){t.generateAbstractMask=function(a){var r=a.children,n=a.attributes,i=a.main,o=a.mask,s=a.maskId,l=a.transform,u=i.width,c=i.icon,d=o.width,h=o.icon,v=Ln({transform:l,containerWidth:d,iconWidth:u}),x={tag:"rect",attributes:f(f({},Pe),{},{fill:"white"})},b=c.children?{children:c.children.map(_t)}:{},w={tag:"g",attributes:f({},v.inner),children:[_t(f({tag:c.tag,attributes:f(f({},c.attributes),v.path)},b))]},y={tag:"g",attributes:f({},v.outer),children:[w]},S="mask-".concat(s||vt()),k="clip-".concat(s||vt()),$={tag:"mask",attributes:f(f({},Pe),{},{id:S,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[x,y]},O={tag:"defs",children:[{tag:"clipPath",attributes:{id:k},children:Gi(h)},$]};return r.push(O,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(k,")"),mask:"url(#".concat(S,")")},Pe)}),{children:r,attributes:n}}}},Xi={provides:function(t){var a=!1;R.matchMedia&&(a=R.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],n={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:f(f({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=f(f({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:f(f({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||s.children.push({tag:"animate",attributes:f(f({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:f(f({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:f(f({},o),{},{values:"1;0;0;0;0;1;"})}]}),a||r.push({tag:"path",attributes:f(f({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Vi={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-symbol"),i=n===null?!1:n===""?!0:n;return a.symbol=i,a}}}},Ki=[zn,Ci,Fi,Ni,Ti,Yi,Ui,Hi,Bi,Xi,Vi];ai(Ki,{mixoutsTo:I});I.noAuto;I.config;I.library;I.dom;var Ye=I.parse;I.findIconDefinition;I.toHtml;var Ji=I.icon;I.layer;I.text;I.counter;var qi={};function Ue(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function Qi(e){if(Array.isArray(e))return e}function Zi(e){if(Array.isArray(e))return Ue(e)}function L(e,t,a){return(t=so(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function eo(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function to(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,n,i,o,s=[],l=!0,u=!1;try{if(i=(a=a.call(e)).next,t!==0)for(;!(l=(r=i.call(a)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(c){u=!0,n=c}finally{try{if(!l&&a.return!=null&&(o=a.return(),Object(o)!==o))return}finally{if(u)throw n}}return s}}function ao(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ro(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $t(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,r)}return a}function C(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?$t(Object(a),!0).forEach(function(r){L(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):$t(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function no(e,t){if(e==null)return{};var a,r,n=io(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)===-1&&{}.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function io(e,t){if(e==null)return{};var a={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;a[r]=e[r]}return a}function Mt(e,t){return Qi(e)||to(e,t)||Ra(e,t)||ao()}function He(e){return Zi(e)||eo(e)||Ra(e)||ro()}function oo(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function so(e){var t=oo(e,"string");return typeof t=="symbol"?t:t+""}function me(e){"@babel/helpers - typeof";return me=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},me(e)}function Ra(e,t){if(e){if(typeof e=="string")return Ue(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Ue(e,t):void 0}}var lo="7.0.0",Ge;try{var fo=require("@fortawesome/fontawesome-svg-core/package.json");Ge=fo.version}catch{Ge=typeof process<"u"&&qi.FA_VERSION||"7.0.0"}function uo(e){var t=e.beat,a=e.fade,r=e.beatFade,n=e.bounce,i=e.shake,o=e.flash,s=e.spin,l=e.spinPulse,u=e.spinReverse,c=e.pulse,d=e.fixedWidth,h=e.inverse,v=e.border,x=e.listItem,b=e.flip,w=e.size,y=e.rotation,S=e.pull,k=e.swapOpacity,$=e.rotateBy,O=e.widthAuto,G=co(Ge,lo),ne=L(L(L(L(L(L({"fa-beat":t,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":n,"fa-shake":i,"fa-flash":o,"fa-spin":s,"fa-spin-reverse":u,"fa-spin-pulse":l,"fa-pulse":c,"fa-fw":d,"fa-inverse":h,"fa-border":v,"fa-li":x,"fa-flip":b===!0,"fa-flip-horizontal":b==="horizontal"||b==="both","fa-flip-vertical":b==="vertical"||b==="both"},"fa-".concat(w),typeof w<"u"&&w!==null),"fa-rotate-".concat(y),typeof y<"u"&&y!==null&&y!==0),"fa-pull-".concat(S),typeof S<"u"&&S!==null),"fa-swap-opacity",k),"fa-rotate-by",G&&$),"fa-width-auto",G&&O);return Object.keys(ne).map(function(M){return ne[M]?M:null}).filter(function(M){return M})}function co(e,t){for(var a=e.split("-"),r=Mt(a,2),n=r[0],i=r[1],o=t.split("-"),s=Mt(o,2),l=s[0],u=s[1],c=n.split("."),d=l.split("."),h=0;h<Math.max(c.length,d.length);h++){var v=c[h]||"0",x=d[h]||"0",b=parseInt(v,10),w=parseInt(x,10);if(b!==w)return b>w}for(var y=0;y<Math.max(c.length,d.length);y++){var S=c[y]||"0",k=d[y]||"0";if(S!==k&&S.length!==k.length)return S.length<k.length}return!(i&&!u)}function mo(e){return e=e-0,e===e}function Da(e){return mo(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,a){return a?a.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var vo=["style"];function ho(e){return e.charAt(0).toUpperCase()+e.slice(1)}function go(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,a){var r=a.indexOf(":"),n=Da(a.slice(0,r)),i=a.slice(r+1).trim();return n.startsWith("webkit")?t[ho(n)]=i:t[n]=i,t},{})}function za(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var r=(t.children||[]).map(function(l){return za(e,l)}),n=Object.keys(t.attributes||{}).reduce(function(l,u){var c=t.attributes[u];switch(u){case"class":l.attrs.className=c,delete t.attributes.class;break;case"style":l.attrs.style=go(c);break;default:u.indexOf("aria-")===0||u.indexOf("data-")===0?l.attrs[u.toLowerCase()]=c:l.attrs[Da(u)]=c}return l},{attrs:{}}),i=a.style,o=i===void 0?{}:i,s=no(a,vo);return n.attrs.style=C(C({},n.attrs.style),o),e.apply(void 0,[t.tag,C(C({},n.attrs),s)].concat(He(r)))}var Wa=!1;try{Wa=!0}catch{}function po(){if(!Wa&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function Lt(e){if(e&&me(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(Ye.icon)return Ye.icon(e);if(e===null)return null;if(e&&me(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function Ie(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?L({},e,t):{}}var Rt={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,rotateBy:!1,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1,widthAuto:!1},nt=Dt.forwardRef(function(e,t){var a=C(C({},Rt),e),r=a.icon,n=a.mask,i=a.symbol,o=a.className,s=a.title,l=a.titleId,u=a.maskId,c=Lt(r),d=Ie("classes",[].concat(He(uo(a)),He((o||"").split(" ")))),h=Ie("transform",typeof a.transform=="string"?Ye.transform(a.transform):a.transform),v=Ie("mask",Lt(n)),x=Ji(c,C(C(C(C({},d),h),v),{},{symbol:i,title:s,titleId:l,maskId:u}));if(!x)return po("Could not find icon",c),null;var b=x.abstract,w={ref:t};return Object.keys(a).forEach(function(y){Rt.hasOwnProperty(y)||(w[y]=a[y])}),bo(b[0],w)});nt.displayName="FontAwesomeIcon";nt.propTypes={beat:g.bool,border:g.bool,beatFade:g.bool,bounce:g.bool,className:g.string,fade:g.bool,flash:g.bool,mask:g.oneOfType([g.object,g.array,g.string]),maskId:g.string,fixedWidth:g.bool,inverse:g.bool,flip:g.oneOf([!0,!1,"horizontal","vertical","both"]),icon:g.oneOfType([g.object,g.array,g.string]),listItem:g.bool,pull:g.oneOf(["right","left"]),pulse:g.bool,rotation:g.oneOf([0,90,180,270]),rotateBy:g.bool,shake:g.bool,size:g.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:g.bool,spinPulse:g.bool,spinReverse:g.bool,symbol:g.oneOfType([g.bool,g.string]),title:g.string,titleId:g.string,transform:g.oneOfType([g.string,g.object]),swapOpacity:g.bool,widthAuto:g.bool};var bo=za.bind(null,Dt.createElement);/*!
 * Font Awesome Free 7.0.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2025 Fonticons, Inc.
 */var yo={prefix:"fas",iconName:"circle-xmark",icon:[512,512,[61532,"times-circle","xmark-circle"],"f057","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c9.4-9.4 24.6-9.4 33.9 0l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9z"]},xo=yo;const Ao=()=>W.jsx("div",{className:"recipe-detail-container flex items-center justify-center px-4 ingrdientsDiv",children:W.jsxs("div",{className:"bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-red-300 text-center mt-[150px]",children:[W.jsx(nt,{icon:xo,className:"text-red-600 text-6xl mb-4"}),W.jsx("h1",{className:"text-4xl font-bold text-red-700 mb-4",children:"Something Went Wrong"}),W.jsx("p",{className:"text-gray-700 mb-2",children:"An unexpected error occurred while loading this page."}),W.jsx("p",{className:"text-sm text-gray-500 mb-6",children:"Please try again later or contact support."}),W.jsx(Ua,{to:"/",className:"bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300",children:"Go to Home"})]})});export{Ao as default};
