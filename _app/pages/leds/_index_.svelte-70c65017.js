import{S as J,i as K,s as W,e as v,v as E,c as $,a as I,w as S,P as O,f as j,x as U,p as g,n as y,d as m,A as B,I as P,j as F,l as L,b as q,F as V,Q as R,R as A,a3 as Z,a4 as x,V as ee,E as C,m as te,o as ne,H as se,X as M,Y as N,T as D}from"../../chunks/vendor-61e2293a.js";import{p as le}from"../../chunks/stores-4c526871.js";import{M as ae,i as ie}from"../../chunks/Main-b958c480.js";import{I as H}from"../../chunks/Icon-13adc768.js";import{S as ue}from"../../chunks/Search-710526cf.js";import{d as Q}from"../../chunks/index-dbb8b31c.js";import"../../chunks/Regex-c2d27ea0.js";function X(n,t,l){const u=n.slice();return u[15]=t[l],u[16]=t,u[17]=l,u}function Y(n){let t,l,u,e,o,a,r,i,p,b;function d(...f){return n[7](n[15],...f)}function k(){n[12].call(l,n[15])}o=new H({props:{name:"trash"}});function w(){return n[13](n[17])}return{c(){t=v("li"),l=v("input"),u=F(),e=v("button"),E(o.$$.fragment),a=F(),this.h()},l(f){t=$(f,"LI",{class:!0});var s=I(t);l=$(s,"INPUT",{type:!0,class:!0}),u=L(s),e=$(s,"BUTTON",{class:!0});var c=I(e);S(o.$$.fragment,c),c.forEach(m),a=L(s),s.forEach(m),this.h()},h(){q(l,"type","text"),q(l,"class","svelte-p1wcye"),q(e,"class","svelte-p1wcye"),q(t,"class","svelte-p1wcye")},m(f,s){j(f,t,s),V(t,l),R(l,n[0].titles[n[0].titles.findIndex(d)].name),V(t,u),V(t,e),U(o,e,null),V(t,a),i=!0,p||(b=[A(l,"input",k),A(e,"click",w),Z(r=ie.call(null,t,n[17]===n[5].films.length-1))],p=!0)},p(f,s){n=f,s&33&&l.value!==n[0].titles[n[0].titles.findIndex(d)].name&&R(l,n[0].titles[n[0].titles.findIndex(d)].name),r&&x(r.update)&&s&32&&r.update.call(null,n[17]===n[5].films.length-1)},i(f){i||(g(o.$$.fragment,f),i=!0)},o(f){y(o.$$.fragment,f),i=!1},d(f){f&&m(t),B(o),p=!1,ee(b)}}}function re(n){let t,l,u=n[5].films,e=[];for(let a=0;a<u.length;a+=1)e[a]=Y(X(n,u,a));const o=a=>y(e[a],1,1,()=>{e[a]=null});return{c(){t=v("ul");for(let a=0;a<e.length;a+=1)e[a].c();this.h()},l(a){t=$(a,"UL",{class:!0});var r=I(t);for(let i=0;i<e.length;i+=1)e[i].l(r);r.forEach(m),this.h()},h(){q(t,"class","svelte-p1wcye"),C(t,"focused",n[4])},m(a,r){j(a,t,r);for(let i=0;i<e.length;i+=1)e[i].m(t,null);l=!0},p(a,r){if(r&33){u=a[5].films;let i;for(i=0;i<u.length;i+=1){const p=X(a,u,i);e[i]?(e[i].p(p,r),g(e[i],1)):(e[i]=Y(p),e[i].c(),g(e[i],1),e[i].m(t,null))}for(te(),i=u.length;i<e.length;i+=1)o(i);ne()}r&16&&C(t,"focused",a[4])},i(a){if(!l){for(let r=0;r<u.length;r+=1)g(e[r]);l=!0}},o(a){e=e.filter(Boolean);for(let r=0;r<e.length;r+=1)y(e[r]);l=!1},d(a){a&&m(t),se(e,a)}}}function oe(n){let t,l,u,e,o,a,r,i,p;function b(s){n[8](s)}function d(s){n[9](s)}function k(s){n[10](s)}function w(s){n[11](s)}let f={placeholder:"Film",options:n[0].titles.map(z)};return n[4]!==void 0&&(f.focused=n[4]),n[1]!==void 0&&(f.input=n[1]),n[2]!==void 0&&(f.value=n[2]),n[3]!==void 0&&(f.query=n[3]),t=new ue({props:f}),M.push(()=>N(t,"focused",b)),M.push(()=>N(t,"input",d)),M.push(()=>N(t,"value",k)),M.push(()=>N(t,"query",w)),i=new H({props:{name:"plus"}}),{c(){E(t.$$.fragment),a=F(),r=v("button"),E(i.$$.fragment)},l(s){S(t.$$.fragment,s),a=L(s),r=$(s,"BUTTON",{});var c=I(r);S(i.$$.fragment,c),c.forEach(m)},m(s,c){U(t,s,c),j(s,a,c),j(s,r,c),U(i,r,null),p=!0},p(s,c){const h={};c&1&&(h.options=s[0].titles.map(z)),!l&&c&16&&(l=!0,h.focused=s[4],D(()=>l=!1)),!u&&c&2&&(u=!0,h.input=s[1],D(()=>u=!1)),!e&&c&4&&(e=!0,h.value=s[2],D(()=>e=!1)),!o&&c&8&&(o=!0,h.query=s[3],D(()=>o=!1)),t.$set(h)},i(s){p||(g(t.$$.fragment,s),g(i.$$.fragment,s),p=!0)},o(s){y(t.$$.fragment,s),y(i.$$.fragment,s),p=!1},d(s){B(t,s),s&&m(a),s&&m(r),B(i)}}}function fe(n){let t,l,u;return t=new ae({props:{$$slots:{form:[oe],default:[re]},$$scope:{ctx:n}}}),t.$on("submit",n[14]),{c(){l=v("div"),E(t.$$.fragment),this.h()},l(e){l=$(e,"DIV",{style:!0});var o=I(l);S(t.$$.fragment,o),this.h()},h(){O(l,"display","contents"),O(l,"--rows","1fr auto")},m(e,o){j(e,l,o),U(t,l,null),u=!0},p(e,[o]){const a={};o&262207&&(a.$$scope={dirty:o,ctx:e}),t.$set(a)},i(e){u||(g(t.$$.fragment,e),u=!0)},o(e){y(t.$$.fragment,e),u=!1},d(e){e&&m(l),B(t,e)}}}const z=n=>({label:n.name,value:n._id});function ce(n,t,l){let u,e,o;P(n,le,_=>l(6,e=_)),P(n,Q,_=>l(0,o=_));let a,r="",i="",p=!1;const b=(_,T)=>T._id===_;function d(_){p=_,l(4,p)}function k(_){a=_,l(1,a)}function w(_){r=_,l(2,r)}function f(_){i=_,l(3,i)}function s(_){o.titles[o.titles.findIndex(T=>T._id===_)].name=this.value,Q.set(o)}const c=_=>{l(5,u.films=u.films.filter((T,G)=>G!==_),u)},h=()=>{l(5,u.films=[...u.films,r],u),l(3,i=""),a.focus()};return n.$$.update=()=>{n.$$.dirty&65&&l(5,u=o.leds[e.params.index])},[o,a,r,i,p,u,e,b,d,k,w,f,s,c,h]}class ve extends J{constructor(t){super();K(this,t,ce,fe,W,{})}}export{ve as default};