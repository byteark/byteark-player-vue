(function(e){function t(t){for(var n,i,a=t[0],l=t[1],s=t[2],u=0,p=[];u<a.length;u++)i=a[u],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);d&&d(t);while(p.length)p.shift()();return c.push.apply(c,s||[]),o()}function o(){for(var e,t=0;t<c.length;t++){for(var o=c[t],n=!0,a=1;a<o.length;a++){var l=o[a];0!==r[l]&&(n=!1)}n&&(c.splice(t--,1),e=i(i.s=o[0]))}return e}var n={},r={app:0},c=[];function i(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=n,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(o,n,function(t){return e[t]}.bind(null,n));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var s=0;s<a.length;s++)t(a[s]);var d=l;c.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"349e":function(e,t,o){"use strict";o("df0c")},"56d7":function(e,t,o){"use strict";o.r(t);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("7a23"),r=o("6c02"),c={id:"app"};function i(e,t,o,r,i,a){var l=Object(n["resolveComponent"])("router-view");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",c,[Object(n["createVNode"])(l)])}var a={},l=(o("f099"),o("6b0d")),s=o.n(l);const d=s()(a,[["render",i]]);var u=d;Object(n["pushScopeId"])("data-v-0aae1662");var p={class:"container"},m=Object(n["createElementVNode"])("section",{class:"section-welcome"},[Object(n["createElementVNode"])("div",{class:"heading"},[Object(n["createElementVNode"])("h1",null,"ByteArk Player Container for Vue.js")]),Object(n["createElementVNode"])("p",null,[Object(n["createTextVNode"])(" Welcome! This is an example for ByteArk Player Container for Vue.js For the repository, see "),Object(n["createElementVNode"])("a",{href:"https://github.com/byteark/byteark-player-vue"},"https://github.com/byteark/byteark-player-vue")])],-1),h={class:"section-examples"},b=Object(n["createElementVNode"])("h2",null,"Examples",-1),f=Object(n["createElementVNode"])("p",null," The following is the most common example for videos that inline with your content. This player is created with fluid layout mode, and setting aspect ratio to 16:9. ",-1),v={class:"section-more-examples"},y=Object(n["createElementVNode"])("h2",null,"More Examples",-1),g=Object(n["createTextVNode"])(" Fluid Layout "),j=Object(n["createTextVNode"])(" Fill Layout ");function O(e,t,o,r,c,i){var a=Object(n["resolveComponent"])("ByteArkPlayerContainer"),l=Object(n["resolveComponent"])("router-link");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",p,[m,Object(n["createElementVNode"])("section",h,[b,f,Object(n["createVNode"])(a,{onReady:i.onPlayerReady,onFirstplay:i.onVideoFirstPlay,onPlay:i.onVideoPlay,onPause:i.onVideoPause,onEnded:i.onVideoEnded,onTimeupdate:i.onTimeChanged,onSeeking:i.onVideoSeeked,onWaiting:i.onWaitingVideo,onFullscreenchange:i.onToggleFullScreen,onVolumechange:i.onVolumeChanged,onRatechange:i.onPlaybackSpeedChanged,onEnterpictureinpicture:i.onPiPEntered,onLeavepictureinpicture:i.onPiPExited,options:c.options},null,8,["onReady","onFirstplay","onPlay","onPause","onEnded","onTimeupdate","onSeeking","onWaiting","onFullscreenchange","onVolumechange","onRatechange","onEnterpictureinpicture","onLeavepictureinpicture","options"])]),Object(n["createElementVNode"])("section",v,[y,Object(n["createElementVNode"])("ul",null,[Object(n["createElementVNode"])("li",null,[Object(n["createVNode"])(l,{to:"/fluid"},{default:Object(n["withCtx"])((function(){return[g]})),_:1})]),Object(n["createElementVNode"])("li",null,[Object(n["createVNode"])(l,{to:"/fill"},{default:Object(n["withCtx"])((function(){return[j]})),_:1})])])])])}Object(n["popScopeId"])();var V=o("8d59"),k=o.n(V),E={data:function(){return{player:null,options:{fluid:!0,autoplay:!1,aspectRatio:"16:9",poster:"https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg",sources:{src:"https://inox-bhm9yr.cdn.byteark.com/video-objects/RI2PimuHxDXw/playlist.m3u8",type:"application/x-mpegURL",title:"Big Buck Bunny"},playbackRates:[.5,1,1.5,2]}}},components:{ByteArkPlayerContainer:k.a},methods:{onPlayerReady:function(e){this.player=e,console.log("I'm Ready!")},onVideoFirstPlay:function(e){console.log("This is the first play.")},onVideoPlay:function(e,t){console.log("You hit play, Current Time: ".concat(t," seconds."))},onVideoPause:function(e,t){console.log("You hit pause, Current Time: ".concat(t," seconds."))},onTimeChanged:function(e,t){console.log("Time Updated, , Current Time: ".concat(t," seconds."))},onVideoEnded:function(e){console.log("The video ended. What to watch next?")},onVideoSeeked:function(e,t){console.log("You seeked the video to: ".concat(t," seconds."))},onWaitingVideo:function(e){console.log("Waiting for the video...")},onToggleFullScreen:function(e,t){t?console.log("You entered Full Screen Mode."):console.log("You exited Full Screen Mode.")},onVolumeChanged:function(e,t){console.log("You adjusted the volume to ".concat(t))},onPlaybackSpeedChanged:function(e,t){console.log("You adjusted the playback speed to ".concat(t,"x"))},onPiPEntered:function(e){console.log("You entered Picture-in-Picture Mode.")},onPiPExited:function(e){console.log("You exited Picture-in-Picture Mode.")}}};o("349e");const P=s()(E,[["render",O],["__scopeId","data-v-0aae1662"]]);var N=P,B={class:"container-fill"},w={style:{width:"100%",height:"75vh"}},S={class:"container mt-4"},C={class:"row"},x={class:"col-sm-8 mt-1"},T={class:"col-sm-4 mt-1"};function F(e,t,o,r,c,i){var a=Object(n["resolveComponent"])("ByteArkPlayerContainer"),l=Object(n["resolveComponent"])("NavBar"),s=Object(n["resolveComponent"])("VideoInfo"),d=Object(n["resolveComponent"])("VideoList");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",B,[Object(n["createElementVNode"])("div",w,[Object(n["createVNode"])(a,{onReady:t[0]||(t[0]=function(e){return i.console.log("I'm Ready!")}),onFirstplay:t[1]||(t[1]=function(e){return i.console.log("This is the first play.")}),onPlay:t[2]||(t[2]=function(e){return i.console.log("You hit play.")}),onPause:t[3]||(t[3]=function(e){return i.console.log("You hit pause.")}),onEnded:t[4]||(t[4]=function(e){return i.console.log("The video ended. What to watch next?")}),onTimeupdate:t[5]||(t[5]=function(e){return i.console.log("Time Updated.")}),onSeeking:t[6]||(t[6]=function(e){return i.console.log("You seeked the video.")}),onWaiting:t[7]||(t[7]=function(e){return i.console.log("Waiting for the video...")}),onFullscreenchange:t[8]||(t[8]=function(e){return i.console.log("You toggled Full Screen Mode.")}),onVolumechange:t[9]||(t[9]=function(e){return i.console.log("You adjusted the volume.")}),onRatechange:t[10]||(t[10]=function(e){return i.console.log("You adjusted the playback speed.")}),onEnterpictureinpicture:t[11]||(t[11]=function(e){return i.console.log("You entered Picture-in-Picture Mode.")}),onLeavepictureinpicture:t[12]||(t[12]=function(e){return i.console.log("You exited Picture-in-Picture Mode.")}),options:c.options},null,8,["options"])]),Object(n["createVNode"])(l),Object(n["createElementVNode"])("div",S,[Object(n["createElementVNode"])("div",C,[Object(n["createElementVNode"])("div",x,[Object(n["createVNode"])(s,{video:c.video},null,8,["video"])]),Object(n["createElementVNode"])("div",T,[Object(n["createVNode"])(d,{videos:c.videos,onOnVideoSelected:i.setVideo},null,8,["videos","onOnVideoSelected"])])])])])}var R=o("5530"),Y=(o("d3b7"),o("25f0"),{class:"navbar navbar-light bg-light"}),I={class:"container"},L=Object(n["createTextVNode"])(" ByteArk Player Container for Vue.js "),M={class:"navbar-nav"},W={class:"nav-item"},_=Object(n["createElementVNode"])("span",{class:"mr-1"},"←",-1),A=Object(n["createElementVNode"])("span",null,"Back to Home",-1);function U(e,t){var o=Object(n["resolveComponent"])("router-link");return Object(n["openBlock"])(),Object(n["createElementBlock"])("header",Y,[Object(n["createElementVNode"])("div",I,[Object(n["createVNode"])(o,{class:"navbar-brand",to:"/"},{default:Object(n["withCtx"])((function(){return[L]})),_:1}),Object(n["createElementVNode"])("ul",M,[Object(n["createElementVNode"])("li",W,[Object(n["createVNode"])(o,{class:"nav-link",to:"/"},{default:Object(n["withCtx"])((function(){return[_,A]})),_:1})])])])])}const D={},q=s()(D,[["render",U]]);var H=q,J=(o("a4d3"),o("e01a"),{class:"h4"}),Z={class:"text-muted mt-4"};function G(e,t,o,r,c,i){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[Object(n["createElementVNode"])("h1",J,Object(n["toDisplayString"])(o.video.title),1),Object(n["createElementVNode"])("p",Z,Object(n["toDisplayString"])(o.video.description),1)])}var z={props:{video:{type:Object,required:!0}}};const K=s()(z,[["render",G]]);var X=K,$=Object(n["createElementVNode"])("h2",{class:"h6 mb-3"},"Recommended Videos",-1);function Q(e,t,o,r,c,i){var a=Object(n["resolveComponent"])("VideoListItem");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[$,(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(o.videos,(function(e,t){return Object(n["openBlock"])(),Object(n["createElementBlock"])("ul",{class:"list-unstyled",key:t},[Object(n["createVNode"])(a,{key:e.videoId,title:e.title,poster:e.poster,video:e,onOnVideoSelected:i.setVideo},null,8,["title","poster","video","onOnVideoSelected"])])})),128))])}Object(n["pushScopeId"])("data-v-e13839be");var ee=["src","alt"],te={class:"media-body"},oe={class:"h6 mt-0 mb-1"};function ne(e,t,o,r,c,i){return Object(n["openBlock"])(),Object(n["createElementBlock"])("li",null,[Object(n["createElementVNode"])("a",{class:"media my-2",onClick:t[0]||(t[0]=Object(n["withModifiers"])((function(){return i.onClick&&i.onClick.apply(i,arguments)}),["prevent"]))},[Object(n["createElementVNode"])("img",{class:"rounded mr-3",src:o.poster,alt:o.title},null,8,ee),Object(n["createElementVNode"])("div",te,[Object(n["createElementVNode"])("p",oe,Object(n["toDisplayString"])(o.title),1)])])])}Object(n["popScopeId"])();var re={props:{title:{type:String,required:!0},poster:{type:String,required:!0},video:{required:!0}},methods:{onClick:function(){this.$emit("onVideoSelected",this.video)}}};o("9e55");const ce=s()(re,[["render",ne],["__scopeId","data-v-e13839be"]]);var ie=ce,ae={props:{videos:{type:Array,required:!0}},components:{VideoListItem:ie},methods:{setVideo:function(e){this.$emit("onVideoSelected",e)}}};const le=s()(ae,[["render",Q]]);var se=le,de=[{videoId:"1",src:"https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZheqEJUwC/playlist.m3u8",type:"application/x-mpegURL",title:"Big Buck Bunny",poster:"https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png",description:"Big Buck Bunny (code-named Project Peach) is a 2008 short computer-animated comedy film featuring animals of the forest, made by the Blender Institute, part of the Blender Foundation. Like the foundation's previous film, Elephants Dream, the film was made using Blender, a free and open-source software application for 3D computer modeling and animation developed by the same foundation. Unlike that earlier project, the tone and visuals departed from a cryptic story and dark visuals to one of comedy, cartoons, and light-heartedness."},{videoId:"2",src:"https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/TZyZhhLbiVxG/playlist.m3u8",type:"application/x-mpegURL",title:"Sintel",poster:"https://stream-image.byteark.com/image/video-cover-480p/7/H/7H6hT8Bis.png",description:'Sintel, code-named Project Durian during production, is a 2010 animated fantasy short film. It was the third Blender "open movie". It was produced by Ton Roosendaal, chairman of the Blender Foundation, written by Esther Wouda, directed by Colin Levy, at the time an artist at Pixar and art direction by David Revoy, who is known for Pepper&Carrot an open source webcomic series.[3] It was made at the Blender Institute, part of the Blender Foundation. The plot follows the character, Sintel, who is tracking down her pet Scales, a dragon. Just like the other Blender "open movies," the film was made using Blender, a free and open source software application for animation, created and supported by the Blender Foundation.'}],ue=de,pe={data:function(){return{video:null,options:{},videos:ue}},computed:{console:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(){return console}))},components:{ByteArkPlayerContainer:k.a,NavBar:H,VideoInfo:X,VideoList:se},created:function(){this.video=ue[0],this.options={fluid:!1,fill:!0,aspectRatio:"16:9",autoplay:!0,poster:this.video.poster,sources:this.video,playbackRates:[.5,1,1.5,2]}},methods:{setVideo:function(e){this.video=e,this.options=Object(R["a"])(Object(R["a"])({},this.options),{},{poster:e.poster,sources:e})}}};const me=s()(pe,[["render",F]]);var he=me,be={class:"container"},fe={class:"row mt-4"},ve={class:"col-sm-8"},ye={class:"mt-4"},ge={class:"col-sm-4"};function je(e,t,o,r,c,i){var a=Object(n["resolveComponent"])("NavBar"),l=Object(n["resolveComponent"])("ByteArkPlayerContainer"),s=Object(n["resolveComponent"])("VideoInfo"),d=Object(n["resolveComponent"])("VideoList");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[Object(n["createVNode"])(a),Object(n["createElementVNode"])("div",be,[Object(n["createElementVNode"])("div",fe,[Object(n["createElementVNode"])("div",ve,[Object(n["createVNode"])(l,{onReady:t[0]||(t[0]=function(e){return i.console.log("I'm Ready!")}),onFirstplay:t[1]||(t[1]=function(e){return i.console.log("This is the first play.")}),onPlay:t[2]||(t[2]=function(e){return i.console.log("You hit play.")}),onPause:t[3]||(t[3]=function(e){return i.console.log("You hit pause.")}),onEnded:t[4]||(t[4]=function(e){return i.console.log("The video ended. What to watch next?")}),onTimeupdate:t[5]||(t[5]=function(e){return i.console.log("Time Updated.")}),onSeeking:t[6]||(t[6]=function(e){return i.console.log("You seeked the video.")}),onWaiting:t[7]||(t[7]=function(e){return i.console.log("Waiting for the video...")}),onFullscreenchange:t[8]||(t[8]=function(e){return i.console.log("You toggled Full Screen Mode.")}),onVolumechange:t[9]||(t[9]=function(e){return i.console.log("You adjusted the volume.")}),onRatechange:t[10]||(t[10]=function(e){return i.console.log("You adjusted the playback speed.")}),onEnterpictureinpicture:t[11]||(t[11]=function(e){return i.console.log("You entered Picture-in-Picture Mode.")}),onLeavepictureinpicture:t[12]||(t[12]=function(e){return i.console.log("You exited Picture-in-Picture Mode.")}),options:c.options},null,8,["options"]),Object(n["createElementVNode"])("div",ye,[Object(n["createVNode"])(s,{video:c.video},null,8,["video"])])]),Object(n["createElementVNode"])("div",ge,[Object(n["createVNode"])(d,{videos:c.videos,onOnVideoSelected:i.setVideo},null,8,["videos","onOnVideoSelected"])])])])])}var Oe={data:function(){return{video:null,options:{},videos:ue}},computed:{console:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(){return console}))},components:{ByteArkPlayerContainer:k.a,NavBar:H,VideoInfo:X,VideoList:se},created:function(){this.video=ue[0],this.options={fluid:!0,aspectRatio:"16:9",autoplay:!0,poster:this.video.poster,sources:this.video,playbackRates:[.5,1,1.5,2]}},methods:{setVideo:function(e){this.video=e,this.options=Object(R["a"])(Object(R["a"])({},this.options),{},{poster:e.poster,sources:e})}}};const Ve=s()(Oe,[["render",je]]);var ke=Ve,Ee=Object(r["a"])({history:Object(r["b"])(),routes:[{path:"",component:u,children:[{path:"",name:"SampleBlog",component:N},{path:"/fluid",name:"Fluid",component:ke},{path:"/fill",name:"Fill",component:he}]}]}),Pe=Ee;Object(n["createApp"])(u).use(Pe).mount("#app")},"77a0":function(e,t,o){},"9e55":function(e,t,o){"use strict";o("77a0")},df0c:function(e,t,o){},eb70:function(e,t,o){},f099:function(e,t,o){"use strict";o("eb70")}});
//# sourceMappingURL=app.01f1a37e.js.map