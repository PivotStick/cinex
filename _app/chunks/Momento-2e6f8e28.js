class u{static diffMinutes(s,n){const[t,r]=n.split(":").map(Number);s=new Date(s);const o=new Date(s);return o.setHours(t,r,0,0),Math.round((o-s)/1e3/60)}static diff(s,n){const t=Math.abs(s-n),r=Math.floor(t/(1e3*60*60*24)),o=Math.floor(t/(1e3*60*60))%24,a=Math.floor(t/(1e3*60))%60,e=Math.floor(t/1e3)%60;return{days:r,hours:o,minutes:a,seconds:e,ms:t}}}export{u as M};
