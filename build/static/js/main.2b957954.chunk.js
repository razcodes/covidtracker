(this.webpackJsonpcovidtracker=this.webpackJsonpcovidtracker||[]).push([[0],{18:function(e,t,a){e.exports=a(46)},23:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(5),r=a.n(o),l=(a(23),a(3)),i=a(6),u=a.n(i),s=a(61);function m(e){return!e.isLoading&&e.country&&c.a.createElement("div",null,c.a.createElement("h3",null,e.countryName),c.a.createElement("img",{src:e.countryImage,width:"200px"}),0!==e.dateList.length&&Object.entries(e.dateList).map((function(t){var a=Object(l.a)(t,2),n=(a[0],a[1][e.country]),o=n.confirmed,r=n.date_value,i=n.deaths;return c.a.createElement("div",null,c.a.createElement("div",null,"Date: ",r),c.a.createElement("div",null,"Confirmed: ",o.toLocaleString()),c.a.createElement("div",null,"Deaths: ",i.toLocaleString()),c.a.createElement("br",null))})))}function d(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),a=t[0],o=t[1],r=Object(n.useState)("2020-09-04"),i=Object(l.a)(r,2),d=i[0],p=i[1],g=Object(n.useState)("2020-09-09"),h=Object(l.a)(g,2),v=h[0],b=h[1],E=Object(n.useState)([]),f=Object(l.a)(E,2),j=f[0],O=f[1],y=Object(n.useState)("ABW"),k=Object(l.a)(y,2),w=k[0],C=k[1],S=Object(n.useState)(""),A=Object(l.a)(S,2),L=A[0],x=A[1],D=Object(n.useState)([]),N=Object(l.a)(D,2),B=N[0],I=N[1],R=Object(n.useState)(!0),F=Object(l.a)(R,2),P=F[0],W=F[1];Object(n.useEffect)((function(){u.a.get("https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-09-04/2020-09-04").then((function(e){O(e.data.data["2020-09-04"])})),W(!1)}),[]);var J={headers:{"Content-Type":"application/json",Accept:"application/json","Access-Control-Allow-Origin":"http://localhost:3000","Access-Control-Allow-Credentials":"true"}},M=function(e,t){W(!0),W(!0),u.a.get("https://cors-anywhere.herokuapp.com/http://countryapi.gear.host/v1/Country/getCountries?pAlpha3Code=".concat(w),J).then((function(e){console.log("Name: ",e.data.Response[0].Name),console.log("Flag: ",e.data.Response[0].Flag),I(e.data.Response[0].Name),x(e.data.Response[0].Flag)})),W(!1),x(""),I(""),console.log("startDate: "+e),console.log("endDate: "+t),u.a.get("https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/".concat(e,"/").concat(t)).then((function(e){o(e.data.data)})),W(!1)};return c.a.createElement("div",null,c.a.createElement("p",null,"Pick starting date"),c.a.createElement("input",{type:"date",min:"2020-04-01",max:Date.now(),onChange:function(e){return p(e.target.value)}}),c.a.createElement("p",null,"Pick ending date"),c.a.createElement("input",{type:"date",min:"2020-04-01",max:Date.now(),onChange:function(e){return b(e.target.value)}}),c.a.createElement("p",null,"Pick Country"),c.a.createElement("select",{name:"countries",id:"countries",value:w,onChange:function(e){C(e.target.value),W(!0)}},Object.keys(j).map((function(e){return c.a.createElement("option",{value:e},e)}))),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement(s.a,{variant:"contained",color:"primary",onClick:function(e){return M(d,v)}},"SUBMIT"),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement(m,{dateList:a,country:w,countryImage:L,countryName:B,isLoading:P}))}a(45);var p=function(){return c.a.createElement("div",null,c.a.createElement(d,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.2b957954.chunk.js.map