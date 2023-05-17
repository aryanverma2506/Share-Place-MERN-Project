"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[96],{8096:function(e,t,i){i.r(t);var a=i(4165),n=i(5861),r=i(9439),l=i(2791),u=i(7689),s=i(2461),o=i(3301),d=i(9106),c=i(7009),p=i(8898),v=i(343),f=i(6776),g=i(509),h=i(8249),m=i(1140),I=i(184);t.default=function(){var e=(0,l.useContext)(h.V),t=(0,u.s0)(),i=(0,g.x)(),E=i.error,x=i.isLoading,y=i.sendRequest,N=i.clearError,Z=(0,f.c)({image:{value:null,isValid:!1},title:{value:"",isValid:!1},description:{value:"",isValid:!1},address:{value:"",isValid:!1},latitude:{value:"",isValid:!1},longitude:{value:"",isValid:!1}},!1),_=(0,r.Z)(Z,2),T=_[0],V=_[1];function b(){return(b=(0,n.Z)((0,a.Z)().mark((function i(n){var r;return(0,a.Z)().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return n.preventDefault(),i.prev=1,(r=new FormData).append("image",T.inputs.image.value),r.append("title",T.inputs.title.value),r.append("address",T.inputs.address.value),r.append("description",T.inputs.description.value),r.append("latitude",T.inputs.latitude.value),r.append("longitude",T.inputs.longitude.value),i.next=11,y({url:"".concat("http://localhost:8080/api","/places/"),method:"POST",headers:{Authorization:"Bearer "+e.token},body:r});case 11:t("/"),i.next=17;break;case 14:i.prev=14,i.t0=i.catch(1),console.log(i.t0);case 17:case"end":return i.stop()}}),i,null,[[1,14]])})))).apply(this,arguments)}return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(c.Z,{error:E,onClear:N}),(0,I.jsxs)("form",{className:"".concat(m.Z["place-form"]),onSubmit:function(e){return b.apply(this,arguments)},children:[x&&(0,I.jsx)(p.Z,{asOverlay:!0}),(0,I.jsx)(o.Z,{id:"image",center:!0,onInput:V,errorText:"Please provide an image"}),(0,I.jsx)(s.Z,{id:"title",label:"Title",type:"text",onInput:V,validators:[(0,v.hg)()],errorText:"Please enter a valid title."}),(0,I.jsx)(s.Z,{id:"address",label:"Address",type:"textarea",onInput:V,validators:[(0,v.Ss)(5)],errorText:"Please enter a valid address."}),(0,I.jsx)(s.Z,{id:"description",label:"Description",type:"textarea",onInput:V,validators:[(0,v.Ss)(5)],errorText:"Please enter a valid description (at least 5 characters)."}),(0,I.jsx)(s.Z,{id:"latitude",label:"Latitude",type:"number",min:-91,max:90,onInput:V,validators:[(0,v.hg)(),(0,v.p0)(),(0,v.qE)(-91),(0,v.TS)(90)],errorText:"Latitude should be between -90 to 90 degrees."}),(0,I.jsx)(s.Z,{id:"longitude",label:"Longitude",type:"number",min:-181,max:180,onInput:V,validators:[(0,v.hg)(),(0,v.p0)(),(0,v.qE)(-181),(0,v.TS)(180)],errorText:"Longitude should be between -180 to 180 degrees."}),(0,I.jsx)(d.Z,{type:"submit",disabled:!T.isValid,children:"ADD PLACE"})]})]})}},3301:function(e,t,i){i.d(t,{Z:function(){return v}});var a=i(9439),n=i(1413),r=i(2791),l=i(9106),u="ImageUpload_form-control__S+NdZ",s="ImageUpload_image-upload__CzPQI",o="ImageUpload_center__jXDTo",d="ImageUpload_image-upload__preview__+ww3b",c=i(184);function p(e,t){switch(t.type){case"INPUT_CHANGE":return(0,n.Z)((0,n.Z)({},e),{},{file:t.file||e.file,isValid:t.isValid||e.isValid});case"PREVIEW_FILE":return(0,n.Z)((0,n.Z)({},e),{},{filePreviewUrl:t.filePreviewUrl||e.filePreviewUrl});default:return e}}var v=function(e){var t=(0,r.useReducer)(p,{file:void 0,filePreviewUrl:null,isValid:!1}),i=(0,a.Z)(t,2),n=i[0],v=i[1],f=(0,r.useRef)(null);return(0,r.useEffect)((function(){if(n.file){var e=new FileReader;e.onload=function(){v({type:"PREVIEW_FILE",filePreviewUrl:e.result})},e.readAsDataURL(n.file)}}),[n.file]),(0,c.jsxs)("div",{className:"".concat(u),children:[(0,c.jsx)("input",{id:e.id,ref:f,style:{display:"none"},type:"file",accept:".png, .jpg, .jpeg",onChange:function(t){var i,a=n.isValid;t.target.files&&1===t.target.files.length?(i=t.target.files[0],v({type:"INPUT_CHANGE",file:i,isValid:!0}),a=!0):(v({type:"INPUT_CHANGE",file:void 0,isValid:!1}),a=!1),e.onInput(e.id,i,a)}}),(0,c.jsxs)("div",{className:"".concat(s," ").concat(e.center?o:""),children:[(0,c.jsxs)("div",{className:"".concat(d),children:[n.filePreviewUrl&&(0,c.jsx)("img",{src:n.filePreviewUrl.toString(),alt:"Preview"}),!n.filePreviewUrl&&(0,c.jsx)("p",{children:"Please pick an image."})]}),(0,c.jsx)(l.Z,{type:"button",onClick:function(){var e;null===(e=f.current)||void 0===e||e.click()},children:"PICK IMAGE"}),!n.isValid&&(0,c.jsx)("p",{children:e.errorText})]})]})}},2461:function(e,t,i){i.d(t,{Z:function(){return c}});var a=i(9439),n=i(1413),r=i(2791),l=i(343),u="Input_form-control__4leYh",s="Input_form-control--invalid__JOT1a",o=i(184);function d(e,t){switch(t.type){case"CHANGE":return(0,n.Z)((0,n.Z)({},e),{},{step:t.step||e.step,value:t.value||"",isValid:(0,l.ZP)(t.value||"",t.validators)});case"TOUCH":return(0,n.Z)((0,n.Z)({},e),{},{isTouched:!0});default:return e}}var c=function(e){var t,i=(0,r.useReducer)(d,{step:1,value:(null===(t=e.initialValue)||void 0===t?void 0:t.toString())||"",isValid:e.initialValid||!1,isTouched:!1}),n=(0,a.Z)(i,2),l=n[0],c=n[1],p=e.id,v=e.onInput,f=l.value,g=l.isValid;function h(t){if("number"===t.target.type){var i=1;if(Number.isInteger(parseFloat(t.target.value)))i=1;else if(0!==t.target.value.trim().length){var a=(t.target.value.split(".")[1]||"").length;i=parseFloat("0.".concat("0".repeat(a-1),"1"))}c({type:"CHANGE",step:i,value:t.target.value,validators:e.validators})}else c({type:"CHANGE",value:t.target.value,validators:e.validators})}function m(){c({type:"TOUCH"})}(0,r.useEffect)((function(){v&&v(p,f,g)}),[p,f,g,v]);var I="textarea"===e.type?(0,o.jsx)("textarea",{id:e.id,rows:e.rows||3,placeholder:e.placeholder,onChange:h,onBlur:m,value:l.value}):(0,o.jsx)("input",{id:e.id,type:e.type,min:e.min,max:e.max,step:"number"===e.type?l.step:void 0,placeholder:e.placeholder,onChange:h,onBlur:m,value:l.value});return(0,o.jsxs)("div",{className:"".concat(u," ").concat(!l.isValid&&l.isTouched?s:""),children:[(0,o.jsx)("label",{htmlFor:e.id,children:e.label}),I,!l.isValid&&l.isTouched&&(0,o.jsx)("p",{children:e.errorText})]})}},6776:function(e,t,i){i.d(t,{c:function(){return s}});var a=i(9439),n=i(4942),r=i(1413),l=i(2791);function u(e,t){switch(t.type){case"INPUT_CHANGE":var i,a=!0;for(var l in e.inputs)e.inputs[l]&&(a=l===t.inputId?a&&t.isValid:a&&e.inputs[l].isValid);if(t.inputId)return(0,r.Z)((0,r.Z)({},e),{},{inputs:(0,r.Z)((0,r.Z)({},e.inputs),{},(0,n.Z)({},t.inputId,{value:null!==(i=t.value)&&void 0!==i?i:e.inputs[t.inputId].value,isValid:t.isValid})),isValid:a});break;case"SET_DATA":return{inputs:t.inputs||e.inputs,isValid:t.isValid||e.isValid};default:return e}return(0,r.Z)({},e)}function s(e,t){var i=(0,l.useReducer)(u,{inputs:e,isValid:t||!1}),n=(0,a.Z)(i,2),r=n[0],s=n[1];return[r,(0,l.useCallback)((function(e,t,i){s({type:"INPUT_CHANGE",inputId:e,value:t,isValid:i})}),[]),(0,l.useCallback)((function(e,t){s({type:"SET_DATA",inputs:e,isValid:t})}),[])]}},343:function(e,t,i){i.d(t,{Ox:function(){return d},Ss:function(){return u},TS:function(){return o},ZP:function(){return c},hg:function(){return r},p0:function(){return l},qE:function(){return s}});var a=i(7762),n=function(e){return e.REQUIRE="REQUIRE",e.NUMBER="NUMBER",e.MIN_LENGTH="MIN_LENGTH",e.MAX_LENGTH="MAX_lENGTH",e.MIN="MIN",e.MAX="MAX",e.EMAIL="EMAIL",e.FILE="FILE",e}({}),r=function(){return{type:n.REQUIRE,value:""}},l=function(){return{type:n.NUMBER,value:""}},u=function(e){return{type:n.MIN_LENGTH,value:e.toString()}},s=function(e){return{type:n.MIN,value:e.toString()}},o=function(e){return{type:n.MAX,value:e.toString()}},d=function(){return{type:n.EMAIL,value:""}};function c(e,t){var i=!0;if(t){var r,l=(0,a.Z)(t);try{for(l.s();!(r=l.n()).done;){var u=r.value;u.type===n.REQUIRE&&(i=i&&e.trim().length>0),u.type===n.NUMBER&&(i=i&&"number"===typeof+e.trim()),u.type===n.MIN_LENGTH&&(i=i&&e.trim().length>=+u.value),u.type===n.MAX_LENGTH&&(i=i&&e.trim().length<=+u.value),u.type===n.MIN&&(i=i&&+e>=+u.value),u.type===n.MAX&&(i=i&&+e<=+u.value),u.type===n.EMAIL&&(i=i&&/^\S+@\S+\.\S+$/.test(e))}}catch(s){l.e(s)}finally{l.f()}}return i}},1140:function(e,t){t.Z={"place-form":"PlaceForm_place-form__PS6qS"}}}]);
//# sourceMappingURL=96.b7523e10.chunk.js.map