(this.webpackJsonpcovidtracker=this.webpackJsonpcovidtracker||[]).push([[0],{52:function(e,t,a){e.exports=a(97)},57:function(e,t,a){},96:function(e,t,a){},97:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(7),l=a.n(c),o=(a(57),a(9)),i=a(22),u=a.n(i);function d(e){var t=Object(n.useState)(),a=Object(o.a)(t,2),c=a[0],l=a[1];Object(n.useEffect)((function(){i()}),[e.dates]);var i=function(){if(e.dates){var t=Object.entries(e.dates).map((function(t,a){if(void 0!==t[1][e.countryCode])return{id:a,date_value:t[0],data:{confirmed:t[1][e.countryCode].confirmed,deaths:t[1][e.countryCode].deaths}}}));u(t)}},u=function(e){var t=[];e.map((function(a,n){if(void 0!==a){if(n===e.length-1||void 0==e[n+1]&&n!==e.length-1)return void t.push(a.data.confirmed);if(void 0!==e[n+1])return void t.push(a.data.confirmed)}t.push(null)})),console.log("confirmedArray: ",t);var a=[null];t.map((function(e,n){if(t.length>1)if(n===t.length-1){var r=t[n]-t[n-1];a[n]=r}else if(null!==e){var c=t[n+1]-e;a[n]=c}else a[n]=null})),console.log("newArr: ",a);var n=e.map((function(t,n){return n===e.length-1&&t?{id:t.id,date_value:t.date_value,data:{confirmed:t.data.confirmed,deaths:t.data.deaths,daily:a[n]}}:void 0!==t?{id:t.id,date_value:t.date_value,data:{confirmed:t.data.confirmed,deaths:t.data.deaths,daily:a[n-1]>0?a[n-1]:null}}:void 0}));l(n),console.log("New confirmed: ",n)},d=function(){return Object.entries(c).map((function(e,t){var a=Object(o.a)(e,2),n=(a[0],a[1]);return r.a.createElement("div",{className:"date-box",key:t},r.a.createElement("div",null,!n&&r.a.createElement("div",{className:"date-text"},r.a.createElement("div",null,r.a.createElement("b",null,"No data for this date"))),n&&r.a.createElement("div",{className:"date-text"},n.date_value&&r.a.createElement("div",null,r.a.createElement("b",null,s(n.date_value))),n.data.confirmed&&r.a.createElement("div",null,"Confirmed: ",n.data.confirmed.toLocaleString()),n.data.deaths&&r.a.createElement("div",null,"Deaths: ",n.data.deaths.toLocaleString()),n.data.daily&&r.a.createElement("div",{style:{color:"red"}},"Daily infected: ",n.data.daily.toLocaleString()))))}))},s=function(e){var t=e.match(/\d+/g),a=t[0].substring(2),n=t[1];return t[2]+"/"+n+"/"+a};return r.a.createElement("div",{className:"datelist"},c&&r.a.createElement(d,null))}function s(e){return e.countryImage&&r.a.createElement("div",null,r.a.createElement("h3",null,e.countryName),r.a.createElement("img",{className:"flag",src:e.countryImage,alt:e.countryName+"'s flag",width:"200px"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(d,{dates:e.dateList,countryCode:e.A3CountryCode}))}a(75),a(76);var m=a(48);function v(e){return r.a.createElement("div",null,r.a.createElement("p",{className:"no-margin subheader"},"Select a range of dates"),r.a.createElement(m.DateRange,{editableDateInputs:!0,onChange:function(t){e.setDateRange([t.selection]),e.dateWasSet(t.selection)},moveRangeOnFirstSelection:!1,ranges:e.dateRange}))}var f=a(133),g=a(132),h=a(131);function p(e){var t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],l=a[1];Object(n.useEffect)((function(){u.a.get("https://restcountries.eu/rest/v2/all").then((function(e){l(e.data.map((function(e){return{name:e.name,A3:e.alpha3Code}})))}))}),[]);var i=Object.entries(c).map((function(e,t){var a=Object(o.a)(e,2),n=(a[0],a[1]);return r.a.createElement("option",{key:t,value:n.A3},n.name)}));return r.a.createElement("div",null,r.a.createElement(g.a,{variant:"outlined"},r.a.createElement(f.a,{htmlFor:"outlined-age-native-simple"},"Country"),r.a.createElement(h.a,{native:!0,value:e.A3CountryCode,onChange:function(t){e.countryPicked(t)},label:"Country",inputProps:{name:"Country",id:"outlined-age-native-simple"}},r.a.createElement("option",{"aria-label":"None",value:""}),i)))}var b=a(130);function E(){var e=Object(n.useState)(new Date),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(new Date),i=Object(o.a)(l,2),d=i[0],m=i[1],f=Object(n.useState)([]),g=Object(o.a)(f,2),h=g[0],E=g[1],y=Object(n.useState)([]),j=Object(o.a)(y,2),O=j[0],C=j[1],S=Object(n.useState)(""),k=Object(o.a)(S,2),A=k[0],N=k[1],D=Object(n.useState)(""),w=Object(o.a)(D,2),x=w[0],R=w[1],_=Object(n.useState)([]),I=Object(o.a)(_,2),L=I[0],F=I[1],P=Object(n.useState)(),T=Object(o.a)(P,2),W=T[0],J=T[1],M=Object(n.useState)([{startDate:a,endDate:d,key:"selection"}]),B=Object(o.a)(M,2),V=B[0],Y=B[1],q=Object(n.useRef)();Object(n.useEffect)((function(){u.a.get("https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-09-04/2020-09-04").then((function(e){C(e.data.countries)}))}),[]),Object(n.useEffect)((function(){H()}),[V]);var z=function(e){var t=new Date(e),a=""+(t.getMonth()+1),n=""+t.getDate(),r=t.getFullYear();return a.length<2&&(a="0"+a),n.length<2&&(n="0"+n),[r,a,n].join("-")},G={headers:{"Content-Type":"application/json",Accept:"application/json","Access-Control-Allow-Origin":"http://localhost:3000","Access-Control-Allow-Credentials":"true"}},H=function(){u.a.get("https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/".concat(z(a),"/").concat(z(d))).then((function(e){E(e.data.data),J(!1),q.current.scrollIntoView({behavior:"smooth"})}))},K=function(e){c(z(e.startDate)),m(z(e.endDate))};return r.a.createElement("div",null,r.a.createElement("h1",{className:"header no-margin"},"Covid Tracker"),r.a.createElement(v,{setDateRange:Y,dateWasSet:K,dateRange:V}),r.a.createElement("p",{className:"subheader margin-5"},"Select a Country"),r.a.createElement(p,{A3CountryCode:A,A3CountryCodeList:O,countryPicked:function(e){if(""!==e.target.value){F(""),R("");var t=e.target.value;N(t),J(!0),u.a.get("https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/alpha/".concat(t),G).then((function(e){F(e.data.name),R(e.data.flag),J(!1),H()}))}},dateWasSet:K}),!W&&r.a.createElement("div",{ref:q},r.a.createElement(s,{dateList:h,A3CountryCode:A,countryImage:x,countryName:L})),W&&r.a.createElement("div",{style:{marginTop:"5px"}},r.a.createElement(b.a,null)))}a(96);var y=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(E,null))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.1c87508f.chunk.js.map