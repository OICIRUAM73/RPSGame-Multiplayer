import{S as t,i as s,s as e,p as l,t as r,q as o,r as a,c as n,k as h,x as c,d as f,u as i,f as u,a as p,R as g,b as d,D as m,B as v}from"./client.bd4cea99.js";function b(t,s,e){const l=t.slice();return l[1]=s[e],l}function E(t){let s,e,p,g,d=t[1].title+"";return{c(){s=l("li"),e=l("a"),p=r(d),this.h()},l(t){s=o(t,"LI",{});var l=a(s);e=o(l,"A",{rel:!0,href:!0});var r=a(e);p=n(r,d),r.forEach(h),l.forEach(h),this.h()},h(){c(e,"rel","prefetch"),c(e,"href",g="blog/"+t[1].slug)},m(t,l){f(t,s,l),i(s,e),i(e,p)},p(t,s){1&s&&d!==(d=t[1].title+"")&&u(p,d),1&s&&g!==(g="blog/"+t[1].slug)&&c(e,"href",g)},d(t){t&&h(s)}}}function x(t){let s,e,u,x,j,R=t[0],q=[];for(let s=0;s<R.length;s+=1)q[s]=E(b(t,R,s));return{c(){s=p(),e=l("h1"),u=r("Recent posts"),x=p(),j=l("ul");for(let t=0;t<q.length;t+=1)q[t].c();this.h()},l(t){g('[data-svelte="svelte-hfp9t8"]',document.head).forEach(h),s=d(t),e=o(t,"H1",{});var l=a(e);u=n(l,"Recent posts"),l.forEach(h),x=d(t),j=o(t,"UL",{class:!0});var r=a(j);for(let t=0;t<q.length;t+=1)q[t].l(r);r.forEach(h),this.h()},h(){document.title="Blog",c(j,"class","svelte-1frg2tf")},m(t,l){f(t,s,l),f(t,e,l),i(e,u),f(t,x,l),f(t,j,l);for(let t=0;t<q.length;t+=1)q[t].m(j,null)},p(t,[s]){if(1&s){let e;for(R=t[0],e=0;e<R.length;e+=1){const l=b(t,R,e);q[e]?q[e].p(l,s):(q[e]=E(l),q[e].c(),q[e].m(j,null))}for(;e<q.length;e+=1)q[e].d(1);q.length=R.length}},i:m,o:m,d(t){t&&h(s),t&&h(e),t&&h(x),t&&h(j),v(q,t)}}}function j({params:t,query:s}){return this.fetch("blog.json").then(t=>t.json()).then(t=>({posts:t}))}function R(t,s,e){let{posts:l}=s;return t.$set=t=>{"posts"in t&&e(0,l=t.posts)},[l]}export default class extends t{constructor(t){super(),s(this,t,R,x,e,{posts:0})}}export{j as preload};