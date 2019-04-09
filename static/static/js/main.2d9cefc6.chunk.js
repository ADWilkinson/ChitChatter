(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,t,a){},215:function(e,t,a){e.exports=a(365)},363:function(e,t,a){e.exports=a.p+"static/media/conversation.c61c5837.png"},365:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(21),i=a.n(o),c=(a(103),a(146)),s=a(31),l=a(22),u=a.n(l),m=a(29),p=a(30),d=a(28),h=a(23),f=a(6),g=a(18),b=a(140),y=a.n(b),E=Object(g.withStyles)(function(e){return{messages:Object(h.a)({overflowY:"auto",minHeight:"25em",maxHeight:"25em",minWidth:"100%",maxWidth:"100%",overflow:"auto"},e.breakpoints.down("sm"),{minHeight:.5*window.screen.availHeight,maxHeight:.5*window.screen.availHeight,minWidth:"inherit",maxWidth:"inherit"}),log:{overflowY:"auto",minHeight:150,maxHeight:150,overflow:"auto"},noButton:Object(h.a)({},e.breakpoints.down("sm"),{visibility:"hidden"}),card:Object(h.a)({minWidth:"25em",maxWidth:"25em"},e.breakpoints.down("sm"),{minWidth:"inherit",maxWidth:"inherit"}),subtitle:{fontWeight:"bold",color:"#212e53de",minHeight:"16px",minWidth:"16px",borderRadius:8,padding:"6px 6px 0px 6px",margin:0}}})(function(e){var t=e.classes,a=Object(n.useState)(""),o=Object(d.a)(a,2),i=o[0],c=o[1],s=r.a.createRef(),l=function(){""!==i&&e.sendHandler(i),c(""),u()},u=function(){s.current.scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"})};return r.a.createElement(r.a.Fragment,null,r.a.createElement(f.d,{id:"endOfChat",className:t.messages},r.a.createElement(f.h,{container:!0,alignContent:"flex-end"},e.messageList(!0)),r.a.createElement("div",{style:{paddingTop:"80px"},ref:s})),r.a.createElement(f.e,null),r.a.createElement(f.h,{container:!0,wrap:"nowrap",justify:"center",style:{margin:12}},r.a.createElement(f.h,{item:!0,xs:10,container:!0,style:{color:"#212e53"},justifty:"center"},r.a.createElement(f.l,{label:"Type a message...",autoFocus:!0,className:t.card,value:i,onChange:function(e){c(e.target.value),u()},onKeyDown:function(e){"enter"===e.key.toLowerCase()&&""!==i&&(l(),e.preventDefault())},InputProps:{disableUnderline:!0}})),r.a.createElement(f.h,{item:!0,xs:2,container:!0,justify:"center"},r.a.createElement(f.b,{style:{color:""===i?"rgba(0,0,0,.2)":"#212e53"},variant:"text",disabled:""===i,onClick:function(){l(),e.forceScroll()}},"Send",r.a.createElement(y.a,{style:{paddingLeft:"6px",color:""===i?"rgba(0,0,0,.2)":"#212e53"},className:t.noButton})))),r.a.createElement(f.e,null),r.a.createElement(f.d,{className:t.log},r.a.createElement(f.m,{variant:"body2",className:t.subtitle},"Server Messages"),r.a.createElement(f.m,{style:{color:"#ebaca2",padding:6,margin:2},variant:"caption"},"Type '/help' for information"),r.a.createElement(f.e,null),r.a.createElement(f.h,{container:!0},e.messageList(!1))))}),x=a(5),v=a.n(x),S=a(15),w=function(e,t){switch(t.type){case"SET_CHANNEL":return Object(S.a)({},e,{channel:t.payload.name,channelIndex:t.payload.index});default:return e}},j="SET_USERS_LIST",O="SET_USER_ID",k=function(e,t){switch(t.type){case j:return Object(S.a)({},e,{users:t.payload});case O:return Object(S.a)({},e,{userId:t.payload});default:return e}},C="Global",T="UK",W=[C,T],R="SET_MESSAGE_HISTORY",N="ADD_GLOBAL_MESSAGE",A="ADD_UK_MESSAGE",I=function(e,t){switch(t.type){case R:var a={global:Object(p.a)(t.payload.global),uk:Object(p.a)(t.payload.uk)};return Object(S.a)({},e,{messages:a});case N:var n=Object(p.a)(e.messages.global);return n.push(t.payload),Object(S.a)({},e,{messages:Object(S.a)({},e.messages,{global:n})});case A:var r=Object(p.a)(e.messages.uk);return r.push(t.payload),Object(S.a)({},e,{messages:Object(S.a)({},e.messages,{uk:r})});default:return e}},L=a(141),M=r.a.createContext(),H={channel:C,channelIndex:0,users:[],userId:"",messages:{global:[],uk:[],server:[]}},_=function(e,t){for(var a=null,n=[w,k,I],r=0;r<n.length;r++){var o=(0,n[r])(e,t);Object(L.isEqual)(o,e)||(a=o)}return null!==a?a:e},z=function(e){var t=Object(n.useReducer)(_,H),a=Object(d.a)(t,2),o={state:a[0],dispatch:a[1]};return r.a.createElement(M.Provider,{value:o},e.children)},B=r.a.createContext(),U=function(e){var t={sockets:G()};return r.a.createElement(B.Provider,{value:t},e.children)},G=function e(){var t=W,a=[],n=!0,r=!1,o=void 0;try{for(var i,c=t[Symbol.iterator]();!(n=(i=c.next()).done);n=!0){var s=i.value;console.log("Connecting to channel: ",s);var l=new WebSocket("wss://"+window.location.host+"/ws/"+s);l.onclose=function(){console.dir("Connection to chat server closed, attempting to reconnect..."),setTimeout(function(){e()},1e3)};var u={name:s,socket:l};a.push(u)}}catch(m){r=!0,o=m}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return a},D=Object(g.withStyles)(function(e){return{myMessage:{minHeight:"16px",minWidth:"16px",borderRadius:12,backgroundColor:"#4a919ecf",color:"#fffafa",padding:12,margin:4},notMyMessage:{minHeight:"16px",minWidth:"16px",borderRadius:12,backgroundColor:"#212e53e6",color:"#fffafa",padding:12,margin:4}}})(function(e){var t=e.classes;return r.a.createElement(f.h,{container:!0,item:!0,xs:12,justify:e.author?"flex-end":"flex-start",style:{padding:3}},"SERVER"!==e.authorName&&r.a.createElement(f.h,{item:!0,xs:12},r.a.createElement(f.m,{align:e.author?"right":"left",variant:"caption",style:{color:"#696969",fontWeight:"bold"}},e.authorName)),r.a.createElement(f.h,{item:!0,style:{flexShrink:1}},r.a.createElement(f.m,{variant:"body2",className:e.author?t.myMessage:t.notMyMessage},e.messageContent)))}),F=Object(g.withStyles)(function(e){return{root:{flexGrow:1},content:{flexGrow:1,padding:3*e.spacing.unit},toolbar:e.mixins.toolbar,card:{marginTop:"40px",borderRadius:"20px",border:"solid thin #00000036",minWidth:"50%",maxWidth:"100%"},noTop:Object(h.a)({},e.breakpoints.down("sm"),{marginTop:"0px",paddingTop:"0px"}),noButton:Object(h.a)({},e.breakpoints.down("sm"),{display:"none"}),footerCard:{borderRadius:"25px"},rightIcon:{marginRight:e.spacing.unit}}})(function(e){var t=e.classes,a=Object(n.useContext)(M),o=a.state,i=a.dispatch,c=Object(n.useContext)(B).sockets,s=Object(n.useState)(0),l=Object(d.a)(s,2),u=l[0],m=l[1];Object(n.useEffect)(function(){setTimeout(function(){h()},400)},[]);var h=function(){var e=document.getElementById("endOfChat");e.scrollTop=e.scrollHeight};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:v()(t.root,t.content,t.toolbar)},r.a.createElement(f.h,{container:!0,justify:"center"},r.a.createElement(f.c,{className:v()(t.card,t.noTop)},r.a.createElement(f.a,{position:"static",color:"default"},r.a.createElement(f.k,{value:u,onChange:function(e,t){setTimeout(function(){h()},100),m(t),i({type:"SET_CHANNEL",payload:0===t?{name:C,index:0}:{name:T,index:1}})},indicatorColor:"primary",textColor:"primary",variant:"fullWidth"},r.a.createElement(f.j,{label:"Global"}),r.a.createElement(f.j,{label:"United Kingdom"}))),r.a.createElement(E,{forceScroll:h,messageList:function(e){var t;return t=e?(t=o.channel===C?o.messages.global:o.messages.uk).filter(function(e){return"SERVER_MESSAGE"!==e.type}):(t=[].concat(Object(p.a)(o.messages.global),Object(p.a)(o.messages.uk))).filter(function(e){return"SERVER_MESSAGE"===e.type}).reverse(),r.a.createElement(r.a.Fragment,null,t.map(function(e,t){return r.a.createElement(D,{key:t,author:e.userId===o.userId,authorName:e.sender,messageContent:e.message})}))},sendHandler:function(e){var t=c.find(function(e){return e.name===o.channel});""!==e&&t.socket.send(e)},style:{padding:16,margin:16}})))),r.a.createElement(f.h,{className:t.noButton,container:!0,justify:"center"},r.a.createElement(f.g,{variant:"extended",style:{backgroundColor:"#ce6a6b12"},"aria-label":"Github",target:"_blank",href:"https://github.com/ADWilkinson"},r.a.createElement("div",{className:t.rightIcon},r.a.createElement("i",{className:"fab fa-github"})),r.a.createElement("span",null,"Created with"," "),r.a.createElement("i",{style:{padding:"0px 7px 0px 7px",color:"#ce6a6b"},className:"fas fa-heart"}),r.a.createElement("span",null,"by Andrew Wilkinson"," "))))}),P=a(142),V=a.n(P),Y=a(143),K=a.n(Y),J=Object(g.withStyles)(function(e){return{drawer:Object(h.a)({},e.breakpoints.up("sm"),{width:240,flexShrink:0,overflowY:"auto"}),fab:{margin:e.spacing.unit},menuButton:Object(h.a)({marginRight:20},e.breakpoints.up("sm"),{display:"none"}),drawerPaper:{paddingTop:"4em",width:240,top:"inherit"},userBar:{color:"#242424e6",padding:"5px",fontWeight:"bold"},toolbar:e.mixins.toolbar}})(function(e){var t=e.classes,a=Object(n.useState)({mobileOpen:!1}),o=Object(d.a)(a,2),i=o[0],c=o[1],s=function(){c(function(e){return{mobileOpen:!e.mobileOpen}})},l=function(e){return r.a.createElement(f.h,{container:!0},r.a.createElement(f.h,{item:!0,xs:12},r.a.createElement(f.m,{style:{color:"#212e53ed"},align:"center",variant:"h6"},"Users"),r.a.createElement(f.m,{style:{color:0===e.length?"#ebaca2":"#4a919e"},align:"center",variant:"caption"},e.length," total"),r.a.createElement(f.e,{style:{margin:"5px 0px 0px 0px"}})),e.map(function(e,a){return r.a.createElement(f.h,{key:a,item:!0,xs:12},r.a.createElement(f.m,{align:"center",style:{backgroundColor:a%2===0?"#bed3c399":"rgba(74, 145, 158, 0.39)"},variant:"caption",className:t.userBar},e.id))}))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement(f.g,{color:"secondary","aria-label":"People",style:{position:"absolute",transform:"translateY(-50px)",zIndex:"1250"},onClick:s,className:v()(t.fab,t.menuButton)},r.a.createElement(V.a,null))),r.a.createElement(f.i,{smUp:!0,implementation:"css"},r.a.createElement(f.f,{variant:"temporary",open:i.mobileOpen,onClose:s,classes:{paper:t.drawerPaper}},r.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",marginBottom:"1em"}},r.a.createElement(f.g,{color:"primary","aria-label":"Back",align:"center",onClick:s,className:v()(t.fab,t.menuButton)},r.a.createElement(K.a,null))),l(e.participants))),r.a.createElement(f.i,{xsDown:!0,implementation:"css"},r.a.createElement(f.f,{classes:{paper:t.drawerPaper},variant:"permanent",open:!0},l(e.participants))))}),q=a(144),$=a(145),Q=function(){function e(t){var a=this;Object(q.a)(this,e),this.dispatchAction=function(){var e=Object(m.a)(u.a.mark(function e(t,n){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.dispatch({type:t,payload:n});case 2:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),this.addMessageToStore=function(){var e=Object(m.a)(u.a.mark(function e(t){var n;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n={userId:t.userId,sender:t.sender,channel:t.channel,recipient:t.recipient,message:t.message,timestamp:t.messageTime,type:t.type},t.channel!==C){e.next=4;break}return e.next=4,a.dispatchAction(N,n);case 4:if(t.channel!==T){e.next=7;break}return e.next=7,a.dispatchAction(A,n);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),this.setMessageHistoryToStore=function(){var e=Object(m.a)(u.a.mark(function e(t){var n,r,o,i;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],r=[],o=t.recipient,t.messageHistory.forEach(function(e){e.channel===C?n.push({userId:e.userId,sender:e.sender,channel:e.channel,recipient:e.recipient,message:e.message,timestamp:e.messageTime,type:t.type}):e.channel===T&&r.push({userId:e.userId,sender:e.sender,channel:e.channel,recipient:e.recipient,message:e.message,timestamp:e.messageTime,type:t.type})}),i={global:n,uk:r},e.next=7,a.dispatchAction(R,i);case 7:return e.next=9,a.dispatchAction(O,o);case 9:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),this.setUserListToStore=function(){var e=Object(m.a)(u.a.mark(function e(t){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.dispatchAction(j,t.participants);case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),this.dispatch=t}return Object($.a)(e,[{key:"execute",value:function(){var e=Object(m.a)(u.a.mark(function e(t){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=t.type,e.next="USER_MESSAGE"===e.t0?3:"SERVER_MESSAGE"===e.t0?6:"SERVER_UPDATE_MESSAGES"===e.t0?9:"SERVER_UPDATE_USERS"===e.t0?12:15;break;case 3:return e.next=5,this.addMessageToStore(t);case 5:return e.abrupt("break",16);case 6:return e.next=8,this.addMessageToStore(t);case 8:return e.abrupt("break",16);case 9:return e.next=11,this.setMessageHistoryToStore(t);case 11:return e.abrupt("break",16);case 12:return e.next=14,this.setUserListToStore(t);case 14:case 15:return e.abrupt("break",16);case 16:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),e}(),X=function(){var e=Object(n.useContext)(M),t=e.state,a=e.dispatch,o=Object(n.useContext)(B).sockets,i=new Q(a);return Object(n.useEffect)(function(){var e=!0,t=!1,a=void 0;try{for(var n,r=function(){var e=n.value;e.socket.onopen=function(){console.log("Succesfully connected to channel: "+e.name)},e.socket.onerror=function(){console.log("Uh oh... there was an error connected to the chat server")},e.socket.onmessage=function(){var e=Object(m.a)(u.a.mark(function e(t){var a;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=JSON.parse(t.data),e.next=3,i.execute(a);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},c=o[Symbol.iterator]();!(e=(n=c.next()).done);e=!0)r()}catch(s){t=!0,a=s}finally{try{e||null==c.return||c.return()}finally{if(t)throw a}}},[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(J,{participants:t.users}),r.a.createElement(F,{messages:t.messages}))},Z=function(e){return r.a.createElement(c.a,null,r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/",component:X})))},ee=a(64),te=a.n(ee),ae=a(100),ne=a.n(ae),re=a(98),oe=a.n(re),ie=a(51),ce=a.n(ie),se=Object(g.createMuiTheme)({palette:{primary:{light:"#ebaca2",main:"#ce6a6b",dark:"#212e53"},secondary:{light:"#bed3c3",main:"#4a919e",dark:"#212e53"},warning:{main:"#ffc071",dark:"#ffb25e"},error:{xLight:ce.a[50],main:ce.a[500],dark:ce.a[700]},success:{xLight:ne.a[50],dark:ne.a[700]}},typography:{fontFamily:"'Work Sans', sans-serif",fontSize:14,fontWeightLight:300,fontWeightRegular:400,fontWeightMedium:700,fontFamilySecondary:"'Roboto Condensed', sans-serif",useNextVariants:!0}}),le={color:se.palette.text.primary,fontWeight:se.typography.fontWeightMedium,fontFamily:se.typography.fontFamilySecondary,textTransform:"uppercase"},ue=Object(S.a)({},se,{palette:Object(S.a)({},se.palette,{background:Object(S.a)({},se.palette.background,{default:"#ebaca217",placeholder:oe.a[200]})}),typography:Object(S.a)({},se.typography,{fontHeader:le,h1:Object(S.a)({},se.typography.h1,le,{letterSpacing:0,fontSize:60}),h2:Object(S.a)({},se.typography.h2,le,{fontSize:48}),h3:Object(S.a)({},se.typography.h3,le,{fontSize:42}),h4:Object(S.a)({},se.typography.h4,le,{fontSize:36}),h5:Object(S.a)({},se.typography.h5,{fontSize:20,fontWeight:se.typography.fontWeightLight}),h6:Object(S.a)({},se.typography.h6,le,{fontSize:18}),subtitle1:Object(S.a)({},se.typography.subtitle1,{fontSize:18}),body1:Object(S.a)({},se.typography.body2,{fontWeight:se.typography.fontWeightRegular,fontSize:16}),body2:Object(S.a)({},se.typography.body1,{fontSize:14})})}),me=a(63),pe=a.n(me),de=a(61),he=a.n(de),fe=a(62),ge=a.n(fe),be=Object(g.withStyles)(function(e){return{topLayer:{zIndex:e.zIndex.drawer+1},title:{fontSize:24},toolbar:{justifyContent:"space-between"},left:{flex:1},leftLinkActive:{color:e.palette.common.white},right:{flex:1,display:"flex",justifyContent:"flex-end"},rightLink:{fontSize:16,color:e.palette.common.white,marginLeft:3*e.spacing.unit},linkSecondary:{color:e.palette.secondary.main}}})(function(e){var t=e.classes;return r.a.createElement(he.a,{position:"static",className:t.topLayer},r.a.createElement(ge.a,{className:v()(t.toolbar,t.topLayer)},r.a.createElement("div",{className:t.left}),r.a.createElement(pe.a,{variant:"h6",underline:"none",color:"inherit",className:t.title,href:"/"},"ChitChatter",r.a.createElement("img",{style:{height:"1.5em",paddingLeft:"0.5em"},src:a(363)})),r.a.createElement("div",{className:t.right})))}),ye=function(){return r.a.createElement(g.MuiThemeProvider,{theme:ue},r.a.createElement(z,null,r.a.createElement(te.a,null),r.a.createElement("header",null,r.a.createElement(be,null)),r.a.createElement(U,null,r.a.createElement("main",null,r.a.createElement(Z,null))),r.a.createElement("footer",null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(ye,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[215,1,2]]]);
//# sourceMappingURL=main.2d9cefc6.chunk.js.map