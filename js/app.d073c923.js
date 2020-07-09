(function(e){function t(t){for(var i,a,n=t[0],l=t[1],c=t[2],u=0,p=[];u<n.length;u++)a=n[u],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&p.push(s[a][0]),s[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);d&&d(t);while(p.length)p.shift()();return r.push.apply(r,c||[]),o()}function o(){for(var e,t=0;t<r.length;t++){for(var o=r[t],i=!0,n=1;n<o.length;n++){var l=o[n];0!==s[l]&&(i=!1)}i&&(r.splice(t--,1),e=a(a.s=o[0]))}return e}var i={},s={app:0},r=[];function a(t){if(i[t])return i[t].exports;var o=i[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=i,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(o,i,function(t){return e[t]}.bind(null,i));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/byteark-player-vue/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],l=n.push.bind(n);n.push=t,n=n.slice();for(var c=0;c<n.length;c++)t(n[c]);var d=l;r.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"0371":function(e,t,o){"use strict";var i=o("b013"),s=o.n(i);s.a},"56d7":function(e,t,o){"use strict";o.r(t);var i=o("2b0e"),s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},r=[],a={},n=a,l=(o("5c0b"),o("2877")),c=Object(l["a"])(n,s,r,!1,null,null,null),d=c.exports,u=o("8c4f"),p=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"container"},[e._m(0),o("section",{staticClass:"section-examples"},[o("h2",[e._v("Examples")]),o("p",[e._v(" The following is the most common example for videos that inline with your content. This player is created with fluid layout mode, and setting aspect ratio to 16:9. ")]),o("ByteArkPlayerContainer",{attrs:{options:e.options}})],1),o("section",{staticClass:"section-more-examples"},[o("h2",[e._v("More Examples")]),o("ul",[o("li",[o("router-link",{attrs:{to:"/fluid"}},[e._v(" Fluid Layout ")])],1),o("li",[o("router-link",{attrs:{to:"/fill"}},[e._v(" Fill Layout ")])],1)])])])},v=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",{staticClass:"section-welcome"},[o("div",{staticClass:"heading"},[o("h1",[e._v("ByteArk Player Container for Vue.js")])]),o("p",[e._v(" Welcome! This is an example for ByteArk Player Container for Vue.js For the repository, see "),o("a",{attrs:{href:"https://github.com/byteark/byteark-player-vue"}},[e._v("https://github.com/byteark/byteark-player-vue")])])])}],m=o("8d59"),f=o.n(m),h={data(){return{options:{fluid:!0,autoplay:!1,aspectRatio:"16:9",poster:"https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg",sources:{src:"https://inox-bhm9yr.cdn.byteark.com/video-objects/RI2PimuHxDXw/playlist.m3u8",type:"application/x-mpegURL",title:"Big Buck Bunny"}}}},components:{ByteArkPlayerContainer:f.a}},y=h,b=(o("e02d"),Object(l["a"])(y,p,v,!1,null,"1e36f282",null)),g=b.exports,C=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"container-fill"},[o("div",{staticStyle:{width:"100%",height:"75vh"}},[o("ByteArkPlayerContainer",{attrs:{options:e.options}})],1),o("NavBar"),o("div",{staticClass:"container mt-4"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-sm-8 mt-1"},[o("VideoInfo",{attrs:{video:e.video}})],1),o("div",{staticClass:"col-sm-4 mt-1"},[o("VideoList",{attrs:{videos:e.videos},on:{onVideoSelected:e.setVideo}})],1)])])],1)},_=[],k=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("header",{staticClass:"navbar navbar-light bg-light"},[o("div",{staticClass:"container"},[o("router-link",{staticClass:"navbar-brand",attrs:{to:"/"}},[e._v(" ByteArk Player Container for Vue.js ")]),o("ul",{staticClass:"navbar-nav"},[o("li",{staticClass:"nav-item"},[o("router-link",{staticClass:"nav-link",attrs:{to:"/"}},[o("span",{staticClass:"mr-1"},[e._v("←")]),o("span",[e._v("Back to Home")])])],1)])],1)])},j=[],x={},B=Object(l["a"])(x,k,j,!1,null,null,null),w=B.exports,V=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h1",{staticClass:"h4"},[e._v(e._s(e.video.title))]),o("p",{staticClass:"text-muted mt-4"},[e._v(e._s(e.video.description))])])},P=[],O={props:{video:{type:Object,required:!0}}},E=O,I=Object(l["a"])(E,V,P,!1,null,null,null),S=I.exports,L=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h2",{staticClass:"h6 mb-3"},[e._v("Recommended Videos")]),e._l(e.videos,(function(t,i){return o("ul",{key:i,staticClass:"list-unstyled"},[o("VideoListItem",{key:t.videoId,attrs:{title:t.title,poster:t.poster,video:t},on:{"update:video":function(e){t=e},onVideoSelected:e.setVideo}})],1)}))],2)},R=[],$=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("li",[o("a",{staticClass:"media my-2",on:{click:function(t){return t.preventDefault(),e.onClick(t)}}},[o("img",{staticClass:"rounded mr-3",attrs:{src:e.poster,alt:e.title}}),o("div",{staticClass:"media-body"},[o("p",{staticClass:"h6 mt-0 mb-1"},[e._v(e._s(e.title))])])])])},A=[],q={props:{title:{type:String,required:!0},poster:{type:String,required:!0},video:{required:!0}},methods:{onClick(){this.$emit("onVideoSelected",this.video)}}},D=q,U=(o("0371"),Object(l["a"])(D,$,A,!1,null,"e13839be",null)),T=U.exports,F={props:{videos:{type:Array,required:!0}},components:{VideoListItem:T},methods:{setVideo(e){this.$emit("onVideoSelected",e)}}},X=F,G=Object(l["a"])(X,L,R,!1,null,null,null),M=G.exports;const N=[{videoId:"1",src:"https://inox-bhm9yr.cdn.byteark.com/video-objects/RI2PimuHxDXw/playlist.m3u8",type:"application/x-mpegURL",title:"Big Buck Bunny",poster:"https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg",description:"Big Buck Bunny (code-named Project Peach) is a 2008 short computer-animated comedy film featuring animals of the forest, made by the Blender Institute, part of the Blender Foundation. Like the foundation's previous film, Elephants Dream, the film was made using Blender, a free and open-source software application for 3D computer modeling and animation developed by the same foundation. Unlike that earlier project, the tone and visuals departed from a cryptic story and dark visuals to one of comedy, cartoons, and light-heartedness."},{videoId:"2",src:"https://inox.qoder.byteark.com/video-objects/QcgIIpjGEDo4/playlist.m3u8",type:"application/x-mpegURL",title:"Curious Little Bird",poster:"https://qoder.byteark.com/images/video-frames/1/Ep/4X/1Ep4XuKnbIaA-large.jpg",description:"This one is also a popular test video."}];var H=N,J={data(){return{video:null,options:{},videos:H}},components:{ByteArkPlayerContainer:f.a,NavBar:w,VideoInfo:S,VideoList:M},created(){this.video=H[0],this.options={fluid:!1,fill:!0,aspectRatio:"16:9",autoplay:!0,onPlayerCreated:()=>{console.log("Created!")},onReady:()=>{console.log("Ready!")},poster:this.video.poster,sources:this.video}},methods:{setVideo(e){this.video=e,this.options={...this.options,poster:e.poster,sources:e}}}},K=J,Q=Object(l["a"])(K,C,_,!1,null,null,null),W=Q.exports,z=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("NavBar"),o("div",{staticClass:"container"},[o("div",{staticClass:"row mt-4"},[o("div",{staticClass:"col-sm-8"},[o("ByteArkPlayerContainer",{attrs:{options:e.options}}),o("div",{staticClass:"mt-4"},[o("VideoInfo",{attrs:{video:e.video}})],1)],1),o("div",{staticClass:"col-sm-4"},[o("VideoList",{attrs:{videos:e.videos},on:{onVideoSelected:e.setVideo}})],1)])])],1)},Y=[],Z={data(){return{video:null,options:{},videos:H}},components:{ByteArkPlayerContainer:f.a,NavBar:w,VideoInfo:S,VideoList:M},created(){this.video=H[0],this.options={fluid:!0,aspectRatio:"16:9",autoplay:!0,onPlayerCreated:()=>{console.log("Created!")},onReady:()=>{console.log("Ready!")},poster:this.video.poster,sources:this.video}},methods:{setVideo(e){this.video=e,this.options={...this.options,poster:e.poster,sources:e}}}},ee=Z,te=Object(l["a"])(ee,z,Y,!1,null,null,null),oe=te.exports;i["a"].use(u["a"]);const ie=[{path:"",component:d,children:[{path:"/",name:"SampleBlog",component:g},{path:"/fluid",name:"Fluid",component:oe},{path:"/fill",name:"Fill",component:W}]}],se=new u["a"]({mode:"history",base:"/byteark-player-vue/",routes:ie});var re=se;i["a"].config.productionTip=!1,new i["a"]({router:re,render:e=>e(d)}).$mount("#app")},"5c0b":function(e,t,o){"use strict";var i=o("9c0c"),s=o.n(i);s.a},"9c0c":function(e,t,o){},b013:function(e,t,o){},e02d:function(e,t,o){"use strict";var i=o("f6e1"),s=o.n(i);s.a},f6e1:function(e,t,o){}});
//# sourceMappingURL=app.d073c923.js.map