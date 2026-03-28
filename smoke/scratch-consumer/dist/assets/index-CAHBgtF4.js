(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();class Oe{constructor(){this.widgets=new Map,this.byUseCase=new Map,this.byCategory=new Map}register(e){const t=this.widgets.get(e.tag);t&&this.unindex(t),this.widgets.set(e.tag,e);const s=this.byUseCase.get(e.useCase)||[];s.push(e),this.byUseCase.set(e.useCase,s);const r=this.byCategory.get(e.category)||[];r.push(e),this.byCategory.set(e.category,r)}get(e){return this.widgets.get(e)}has(e){return this.widgets.has(e)}getAll(){return Array.from(this.widgets.values())}getByUseCase(e){return this.byUseCase.get(e)||[]}getByCategory(e){return this.byCategory.get(e)||[]}search(e,t){const s=e.toLowerCase().trim();let r=this.getAll();return s&&(r=r.filter(a=>{var o,n;return!!(a.name.toLowerCase().includes(s)||a.tag.toLowerCase().includes(s)||a.description.toLowerCase().includes(s)||(o=a.keywords)!=null&&o.some(l=>l.toLowerCase().includes(s))||(n=a.aliases)!=null&&n.some(l=>l.toLowerCase().includes(s)))})),t&&(r=r.filter(a=>!(t.useCase&&a.useCase!==t.useCase||t.category&&a.category!==t.category||t.status&&a.status!==t.status||t.level&&a.level!==t.level))),r}getGroupedByUseCase(){return new Map(this.byUseCase)}getGroupedByCategory(){return new Map(this.byCategory)}getStats(){const e=this.getAll();return{total:e.length,byStatus:this.countBy(e,"status"),byCategory:this.countBy(e,"category"),byUseCase:this.countBy(e,"useCase"),byLevel:this.countBy(e,"level")}}getUseCases(){return Array.from(this.byUseCase.keys())}getCategories(){return Array.from(this.byCategory.keys())}clear(){this.widgets.clear(),this.byUseCase.clear(),this.byCategory.clear()}unindex(e){const t=this.byUseCase.get(e.useCase);if(t){const r=t.filter(a=>a.tag!==e.tag);r.length?this.byUseCase.set(e.useCase,r):this.byUseCase.delete(e.useCase)}const s=this.byCategory.get(e.category);if(s){const r=s.filter(a=>a.tag!==e.tag);r.length?this.byCategory.set(e.category,r):this.byCategory.delete(e.category)}}countBy(e,t){return e.reduce((s,r)=>{const a=String(r[t]||"unknown");return s[a]=(s[a]||0)+1,s},{})}}const _=new Oe;function Re(i,e={}){const t=e.duplicatePolicy||"error";i.forEach(s=>{if(!_.has(s.tag)){_.register(s);return}if(t!=="ignore"){if(t==="overwrite"){_.register(s);return}throw new Error(`Duplicate widget metadata for tag "${s.tag}"`)}})}const $e=i=>`/widgets/${i.category}/${i.tag}/`;let _e=$e;function Te(i){_e=i||$e}function be(i){return _e(i)}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=globalThis,ee=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),ne=new WeakMap;let we=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ee&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ne.set(t,e))}return e}toString(){return this.cssText}};const Ne=i=>new we(typeof i=="string"?i:i+"",void 0,te),se=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,r,a)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[a+1],i[0]);return new we(t,i,te)},De=(i,e)=>{if(ee)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),r=I.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},le=ee?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return Ne(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:He,defineProperty:Le,getOwnPropertyDescriptor:ke,getOwnPropertyNames:ze,getOwnPropertySymbols:Be,getPrototypeOf:je}=Object,b=globalThis,ce=b.trustedTypes,Ie=ce?ce.emptyScript:"",Q=b.reactiveElementPolyfillSupport,R=(i,e)=>i,W={toAttribute(i,e){switch(e){case Boolean:i=i?Ie:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},re=(i,e)=>!He(i,e),de={attribute:!0,type:String,converter:W,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);let P=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=de){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&Le(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){const{get:r,set:a}=ke(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){const n=r==null?void 0:r.call(this);a==null||a.call(this,o),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??de}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;const e=je(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){const t=this.properties,s=[...ze(t),...Be(t)];for(const r of s)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const r of s)t.unshift(le(r))}else e!==void 0&&t.push(le(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return De(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var a;const s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){const o=(((a=s.converter)==null?void 0:a.toAttribute)!==void 0?s.converter:W).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){var a,o;const s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const n=s.getPropertyOptions(r),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((a=n.converter)==null?void 0:a.fromAttribute)!==void 0?n.converter:W;this._$Em=r;const h=l.fromAttribute(t,n.type);this[r]=h??((o=this._$Ej)==null?void 0:o.get(r))??h,this._$Em=null}}requestUpdate(e,t,s,r=!1,a){var o;if(e!==void 0){const n=this.constructor;if(r===!1&&(a=this[e]),s??(s=n.getPropertyOptions(e)),!((s.hasChanged??re)(a,t)||s.useDefault&&s.reflect&&a===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:a},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),a!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,o]of this._$Ep)this[a]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[a,o]of r){const{wrapped:n}=o,l=this[a];n!==!0||this._$AL.has(a)||l===void 0||this.C(a,void 0,o,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(r=>{var a;return(a=r.hostUpdate)==null?void 0:a.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var r;return(r=s.hostUpdated)==null?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[R("elementProperties")]=new Map,P[R("finalized")]=new Map,Q==null||Q({ReactiveElement:P}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis,he=i=>i,q=T.trustedTypes,ue=q?q.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ae="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,Ce="?"+$,We=`<${Ce}>`,x=document,D=()=>x.createComment(""),H=i=>i===null||typeof i!="object"&&typeof i!="function",ie=Array.isArray,qe=i=>ie(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",K=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,ge=/>/g,w=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fe=/'/g,me=/"/g,Se=/^(?:script|style|textarea|title)$/i,Ge=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),u=Ge(1),E=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ye=new WeakMap,A=x.createTreeWalker(x,129);function xe(i,e){if(!ie(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ue!==void 0?ue.createHTML(e):e}const Fe=(i,e)=>{const t=i.length-1,s=[];let r,a=e===2?"<svg>":e===3?"<math>":"",o=O;for(let n=0;n<t;n++){const l=i[n];let h,p,d=-1,y=0;for(;y<l.length&&(o.lastIndex=y,p=o.exec(l),p!==null);)y=o.lastIndex,o===O?p[1]==="!--"?o=pe:p[1]!==void 0?o=ge:p[2]!==void 0?(Se.test(p[2])&&(r=RegExp("</"+p[2],"g")),o=w):p[3]!==void 0&&(o=w):o===w?p[0]===">"?(o=r??O,d=-1):p[1]===void 0?d=-2:(d=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?w:p[3]==='"'?me:fe):o===me||o===fe?o=w:o===pe||o===ge?o=O:(o=w,r=void 0);const v=o===w&&i[n+1].startsWith("/>")?" ":"";a+=o===O?l+We:d>=0?(s.push(h),l.slice(0,d)+Ae+l.slice(d)+$+v):l+$+(d===-2?n:v)}return[xe(i,a+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class L{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let a=0,o=0;const n=e.length-1,l=this.parts,[h,p]=Fe(e,t);if(this.el=L.createElement(h,s),A.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=A.nextNode())!==null&&l.length<n;){if(r.nodeType===1){if(r.hasAttributes())for(const d of r.getAttributeNames())if(d.endsWith(Ae)){const y=p[o++],v=r.getAttribute(d).split($),j=/([.?@])?(.*)/.exec(y);l.push({type:1,index:a,name:j[2],strings:v,ctor:j[1]==="."?Qe:j[1]==="?"?Ke:j[1]==="@"?Ze:F}),r.removeAttribute(d)}else d.startsWith($)&&(l.push({type:6,index:a}),r.removeAttribute(d));if(Se.test(r.tagName)){const d=r.textContent.split($),y=d.length-1;if(y>0){r.textContent=q?q.emptyScript:"";for(let v=0;v<y;v++)r.append(d[v],D()),A.nextNode(),l.push({type:2,index:++a});r.append(d[y],D())}}}else if(r.nodeType===8)if(r.data===Ce)l.push({type:2,index:a});else{let d=-1;for(;(d=r.data.indexOf($,d+1))!==-1;)l.push({type:7,index:a}),d+=$.length-1}a++}}static createElement(e,t){const s=x.createElement("template");return s.innerHTML=e,s}}function U(i,e,t=i,s){var o,n;if(e===E)return e;let r=s!==void 0?(o=t._$Co)==null?void 0:o[s]:t._$Cl;const a=H(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==a&&((n=r==null?void 0:r._$AO)==null||n.call(r,!1),a===void 0?r=void 0:(r=new a(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=r:t._$Cl=r),r!==void 0&&(e=U(i,r._$AS(i,e.values),r,s)),e}class Ve{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,r=((e==null?void 0:e.creationScope)??x).importNode(t,!0);A.currentNode=r;let a=A.nextNode(),o=0,n=0,l=s[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new z(a,a.nextSibling,this,e):l.type===1?h=new l.ctor(a,l.name,l.strings,this,e):l.type===6&&(h=new Je(a,this,e)),this._$AV.push(h),l=s[++n]}o!==(l==null?void 0:l.index)&&(a=A.nextNode(),o++)}return A.currentNode=x,r}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class z{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),H(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){var a;const{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=L.createElement(xe(s.h,s.h[0]),this.options)),s);if(((a=this._$AH)==null?void 0:a._$AD)===r)this._$AH.p(t);else{const o=new Ve(r,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new L(e)),t}k(e){ie(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,r=0;for(const a of e)r===t.length?t.push(s=new z(this.O(D()),this.O(D()),this,this.options)):s=t[r],s._$AI(a),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const r=he(e).nextSibling;he(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class F{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,a){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(e,t=this,s,r){const a=this.strings;let o=!1;if(a===void 0)e=U(this,e,t,0),o=!H(e)||e!==this._$AH&&e!==E,o&&(this._$AH=e);else{const n=e;let l,h;for(e=a[0],l=0;l<a.length-1;l++)h=U(this,n[s+l],t,l),h===E&&(h=this._$AH[l]),o||(o=!H(h)||h!==this._$AH[l]),h===c?e=c:e!==c&&(e+=(h??"")+a[l+1]),this._$AH[l]=h}o&&!r&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Qe extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class Ke extends F{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ze extends F{constructor(e,t,s,r,a){super(e,t,s,r,a),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??c)===E)return;const s=this._$AH,r=e===c&&s!==c||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==c&&(s===c||r);r&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Je{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}}const Z=T.litHtmlPolyfillSupport;Z==null||Z(L,z),(T.litHtmlVersions??(T.litHtmlVersions=[])).push("3.3.2");const Xe=(i,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let r=s._$litPart$;if(r===void 0){const a=(t==null?void 0:t.renderBefore)??null;s._$litPart$=r=new z(e.insertBefore(D(),a),a,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis;let S=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Xe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}};var ve;S._$litElement$=!0,S.finalized=!0,(ve=C.litElementHydrateSupport)==null||ve.call(C,{LitElement:S});const J=C.litElementPolyfillSupport;J==null||J({LitElement:S});(C.litElementVersions??(C.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ye={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:re},et=(i=Ye,e,t)=>{const{kind:s,metadata:r}=t;let a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),a.set(t.name,i),s==="accessor"){const{name:o}=t;return{set(n){const l=e.get.call(this);e.set.call(this,n),this.requestUpdate(o,l,i,!0,n)},init(n){return n!==void 0&&this.C(o,void 0,i,n),n}}}if(s==="setter"){const{name:o}=t;return function(n){const l=this[o];e.call(this,n),this.requestUpdate(o,l,i,!0,n)}}throw Error("Unsupported decorator location: "+s)};function f(i){return(e,t)=>typeof t=="object"?et(i,e,t):((s,r,a)=>{const o=r.hasOwnProperty(a);return r.constructor.createProperty(a,s),o?Object.getOwnPropertyDescriptor(r,a):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function B(i){return f({...i,state:!0,attribute:!1})}var m=function(i,e,t,s){var r=arguments.length,a=r<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(i,e,t,s);else for(var n=i.length-1;n>=0;n--)(o=i[n])&&(a=(r<3?o(a):r>3?o(e,t,a):o(e,t))||a);return r>3&&a&&Object.defineProperty(e,t,a),a};let g=class extends S{constructor(){super(...arguments),this.query="",this.useCase="",this.category="",this.status="",this.debounceDelay=250,this.showCategoryFilter=!0,this.showStatusFilter=!0,this.placeholder="Search components...",this.results=[],this.debounceTimer=null}connectedCallback(){super.connectedCallback(),this.performSearch()}disconnectedCallback(){super.disconnectedCallback(),this.debounceTimer&&clearTimeout(this.debounceTimer)}performSearch(){const e={};this.useCase&&(e.useCase=this.useCase),this.category&&(e.category=this.category),this.status&&(e.status=this.status),this.results=_.search(this.query,e),this.dispatchEvent(new CustomEvent("widget-search-results",{detail:{results:this.results,query:this.query,filters:e},bubbles:!0,composed:!0}))}onQueryInput(e){this.query=e.target.value,this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>this.performSearch(),this.debounceDelay)}onCategoryChange(e){this.category=e.target.value||"",this.performSearch()}onStatusChange(e){this.status=e.target.value||"",this.performSearch()}render(){return u`
      <div class="search-container">
        <input
          class="search-input"
          type="search"
          placeholder=${this.placeholder}
          .value=${this.query}
          @input=${this.onQueryInput}
        />

        <div class="filters">
          ${this.showCategoryFilter?u`
                <select class="filter-select" .value=${this.category} @change=${this.onCategoryChange}>
                  <option value="">All categories</option>
                  <option value="atoms">Atoms</option>
                  <option value="molecules">Molecules</option>
                  <option value="organisms">Organisms</option>
                  <option value="charts">Charts</option>
                  <option value="features">Features</option>
                  <option value="integrations">Integrations</option>
                </select>
              `:c}
          ${this.showStatusFilter?u`
                <select class="filter-select" .value=${this.status} @change=${this.onStatusChange}>
                  <option value="">All statuses</option>
                  <option value="stable">Stable</option>
                  <option value="new">New</option>
                  <option value="alpha">Alpha</option>
                  <option value="deprecated">Deprecated</option>
                  <option value="legacy">Legacy</option>
                </select>
              `:c}
        </div>
      </div>
    `}};g.styles=se`
    :host {
      display: block;
    }

    .search-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: end;
    }

    .search-input,
    .filter-select {
      border: 1px solid #d0d5dd;
      border-radius: 6px;
      padding: 8px 10px;
      font: inherit;
      font-size: 14px;
      background: #fff;
      color: #101828;
    }

    .search-input {
      min-width: 220px;
      flex: 1;
    }

    .filters {
      display: flex;
      gap: 8px;
    }
  `;m([f({type:String})],g.prototype,"query",void 0);m([f({type:String,attribute:"use-case"})],g.prototype,"useCase",void 0);m([f({type:String})],g.prototype,"category",void 0);m([f({type:String})],g.prototype,"status",void 0);m([f({type:Number,attribute:"debounce-delay"})],g.prototype,"debounceDelay",void 0);m([f({type:Boolean,attribute:"show-category-filter"})],g.prototype,"showCategoryFilter",void 0);m([f({type:Boolean,attribute:"show-status-filter"})],g.prototype,"showStatusFilter",void 0);m([f({type:String})],g.prototype,"placeholder",void 0);m([B()],g.prototype,"results",void 0);g=m([ae("widget-search")],g);var V=function(i,e,t,s){var r=arguments.length,a=r<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(i,e,t,s);else for(var n=i.length-1;n>=0;n--)(o=i[n])&&(a=(r<3?o(a):r>3?o(e,t,a):o(e,t))||a);return r>3&&a&&Object.defineProperty(e,t,a),a};const tt={"design-system":"Design System",buttons:"Buttons & Links",cards:"Cards",forms:"Forms & Input",feedback:"Feedback & Status",navigation:"Navigation & Progress","data-display":"Data Display",charts:"Charts & Visualizations",layout:"Layout",modals:"Modals & Dialogs",onboarding:"Onboarding",icons:"Icons",integrations:"Integrations"},st=["design-system","buttons","cards","forms","feedback","navigation","data-display","charts","layout","modals","onboarding","icons","integrations"];let M=class extends S{constructor(){super(...arguments),this.searchQuery="",this.searchResults=null,this.isSearching=!1}get stats(){return _.getStats()}get groupedWidgets(){return _.getGroupedByUseCase()}handleSearch(e){this.searchQuery=e.detail.query,this.searchResults=e.detail.results,this.isSearching=!!(e.detail.query||e.detail.filters.category||e.detail.filters.status||e.detail.filters.useCase)}clearSearch(){var t;this.searchQuery="",this.searchResults=null,this.isSearching=!1;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("widget-search");e&&(e.query="",e.category="",e.status="")}renderCard(e){return u`
      <a class="widget-card" href=${be({category:e.category,tag:e.tag})}>
        <div><strong>${e.name}</strong></div>
        <div class="widget-tag">&lt;${e.tag}&gt;</div>
        <p class="widget-description">${e.description}</p>
      </a>
    `}renderSearchResults(){var e;return(e=this.searchResults)!=null&&e.length?u`
      <div class="category-section">
        <div class="results-header">
          <h2>Search Results (${this.searchResults.length})</h2>
          <button class="clear-search" @click=${this.clearSearch} type="button">Clear search</button>
        </div>
        <div class="widgets-grid">${this.searchResults.map(t=>this.renderCard(t))}</div>
      </div>
    `:u`<div>No results found.</div>`}renderCategories(){return u`
      ${st.map(e=>{const t=this.groupedWidgets.get(e);return t!=null&&t.length?u`
          <section class="category-section">
            <div class="category-header">
              <h2>${tt[e]}</h2>
              <span class="category-count">${t.length}</span>
            </div>
            <div class="widgets-grid">${t.map(s=>this.renderCard(s))}</div>
          </section>
        `:c})}
    `}render(){return u`
      <div class="catalogue-container">
        <h1>Widget Library</h1>
        <p>${this.stats.total} components</p>
        <widget-search @widget-search-results=${this.handleSearch}></widget-search>
        ${this.isSearching?this.renderSearchResults():this.renderCategories()}
      </div>
    `}};M.styles=se`
    :host {
      display: block;
      color: var(--widget-atlas-text, var(--color-text, #162018));
      font-family: var(--widget-atlas-font-body, var(--font-body, "Source Sans 3", system-ui, sans-serif));
      line-height: 1.5;
    }

    .catalogue-container {
      max-width: var(--widget-atlas-layout-max, 1200px);
      margin: 0 auto;
      padding: var(--widget-atlas-space-lg, var(--space-lg, 1rem));
    }

    .widgets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
    }

    .widget-card {
      display: block;
      border: 1px solid var(--widget-atlas-border, var(--color-border, #d7ddd5));
      border-radius: var(--widget-atlas-radius-md, var(--radius-md, 0.625rem));
      padding: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      color: inherit;
      text-decoration: none;
      background: var(--widget-atlas-surface, var(--color-surface, #fff));
    }

    .widget-card:hover {
      border-color: var(--widget-atlas-border-strong, var(--color-border, #d7ddd5));
    }

    .category-section {
      margin-top: var(--widget-atlas-space-xl, var(--space-xl, 1.5rem));
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
      margin-bottom: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
    }

    .category-count {
      color: var(--widget-atlas-text-secondary, var(--color-text-secondary, #4d5d52));
      font-size: 12px;
      border: 1px solid var(--widget-atlas-border, var(--color-border, #d7ddd5));
      border-radius: 999px;
      padding: 2px var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: var(--widget-atlas-space-lg, var(--space-lg, 1rem)) 0;
    }

    .clear-search {
      border: none;
      background: transparent;
      color: var(--widget-atlas-link, var(--color-primary, #0a5c36));
      cursor: pointer;
    }

    .widget-tag {
      font-family: var(--widget-atlas-font-mono, var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace));
      font-size: 12px;
      color: var(--widget-atlas-text-secondary, var(--color-text-secondary, #4d5d52));
    }

    .widget-description {
      color: var(--widget-atlas-text-secondary, var(--color-text-secondary, #4d5d52));
      font-size: 13px;
      margin: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem)) 0;
    }

    h1 {
      margin: 0;
      font-family: var(
        --widget-atlas-font-display,
        var(--font-display, "DM Serif Display", Georgia, serif)
      );
      font-size: clamp(1.6rem, 3vw, 2.1rem);
    }

    h2 {
      margin: 0;
      font-size: 1.25rem;
    }
  `;V([B()],M.prototype,"searchQuery",void 0);V([B()],M.prototype,"searchResults",void 0);V([B()],M.prototype,"isSearching",void 0);M=V([ae("widget-catalogue-page")],M);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=i=>i.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ee={CHILD:2},Pe=i=>(...e)=>({_$litDirective$:i,values:e});class Ue{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=(i,e)=>{var s;const t=i._$AN;if(t===void 0)return!1;for(const r of t)(s=r._$AO)==null||s.call(r,e,!1),N(r,e);return!0},G=i=>{let e,t;do{if((e=i._$AM)===void 0)break;t=e._$AN,t.delete(i),i=e}while((t==null?void 0:t.size)===0)},Me=i=>{for(let e;e=i._$AM;i=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(i))break;t.add(i),ot(e)}};function it(i){this._$AN!==void 0?(G(this),this._$AM=i,Me(this)):this._$AM=i}function at(i,e=!1,t=0){const s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(s))for(let a=t;a<s.length;a++)N(s[a],!1),G(s[a]);else s!=null&&(N(s,!1),G(s));else N(this,i)}const ot=i=>{i.type==Ee.CHILD&&(i._$AP??(i._$AP=at),i._$AQ??(i._$AQ=it))};class nt extends Ue{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,s){super._$AT(e,t,s),Me(this),this.isConnected=e._$AU}_$AO(e,t=!0){var s,r;e!==this.isConnected&&(this.isConnected=e,e?(s=this.reconnected)==null||s.call(this):(r=this.disconnected)==null||r.call(this)),t&&(N(this,e),G(this))}setValue(e){if(rt(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const X=new WeakMap,lt=Pe(class extends nt{render(i){return c}update(i,[e]){var s;const t=e!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=e,this.ht=(s=i.options)==null?void 0:s.host,this.rt(this.ct=i.element)),c}rt(i){if(this.isConnected||(i=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let t=X.get(e);t===void 0&&(t=new WeakMap,X.set(e,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,i),i!==void 0&&this.G.call(this.ht,i)}else this.G.value=i}get lt(){var i,e;return typeof this.G=="function"?(i=X.get(this.ht??globalThis))==null?void 0:i.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Y extends Ue{constructor(e){if(super(e),this.it=c,e.type!==Ee.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===c||e==null)return this._t=void 0,this.it=e;if(e===E)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Y.directiveName="unsafeHTML",Y.resultType=1;const ct=Pe(Y);var oe=function(i,e,t,s){var r=arguments.length,a=r<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(i,e,t,s);else for(var n=i.length-1;n>=0;n--)(o=i[n])&&(a=(r<3?o(a):r>3?o(e,t,a):o(e,t))||a);return r>3&&a&&Object.defineProperty(e,t,a),a};let k=class extends S{constructor(){super(...arguments),this.tag="",this.meta=null}connectedCallback(){super.connectedCallback(),this.loadMeta()}updated(e){e.has("tag")&&this.loadMeta()}loadMeta(){this.meta=this.tag&&_.get(this.tag)||null}mountPropPreview(e,t,s){if(!(e instanceof HTMLElement))return;const r=document.createElement(t);Object.entries(s).forEach(([a,o])=>{r[a]=o}),e.replaceChildren(r)}renderPreview(e){return e.props&&this.meta?u`
        <div
          class="example-preview"
          ${lt(t=>this.mountPropPreview(t,this.meta.tag,e.props))}
        ></div>
      `:u`
      <div class="example-preview">
        ${ct(e.code)}
      </div>
    `}renderExample(e){const t=e.showPreview??!0,s=e.showCode??!0;return u`
      <article class="example" id=${e.id}>
        <h3>${e.title}</h3>
        ${e.description?u`<p>${e.description}</p>`:c}
        ${t?this.renderPreview(e):c}
        ${s?u`<pre class="code">${e.code}</pre>`:c}
      </article>
    `}renderRelated(){var e,t;return(t=(e=this.meta)==null?void 0:e.relatedComponents)!=null&&t.length?u`
      <section>
        <h3>Related Components</h3>
        <div class="related-components">
          ${this.meta.relatedComponents.map(s=>{const r=_.get(s);return r?u`
              <a
                class="related-link"
                href=${be({category:r.category,tag:r.tag})}
              >
                &lt;${r.tag}&gt;
              </a>
            `:c})}
        </div>
      </section>
    `:c}render(){return this.meta?u`
      <main class="demo">
        <h1>${this.meta.name}</h1>
        <p>${this.meta.description}</p>
        <p><code>&lt;${this.meta.tag}&gt;</code></p>

        <section>
          <h2>Examples</h2>
          ${this.meta.examples.map(e=>this.renderExample(e))}
        </section>

        ${this.renderRelated()}
      </main>
    `:u`
        <div class="demo">
          <div class="error">
            <strong>Widget not found</strong>
            <p>No metadata found for "${this.tag}".</p>
          </div>
        </div>
      `}};k.styles=se`
    :host {
      display: block;
      color: var(--widget-atlas-text, var(--color-text, #162018));
      font-family: var(--widget-atlas-font-body, var(--font-body, "Source Sans 3", system-ui, sans-serif));
      line-height: 1.5;
    }

    .demo {
      max-width: var(--widget-atlas-layout-max, var(--layout-max, 1100px));
      margin: 0 auto;
      padding: var(--widget-atlas-space-lg, var(--space-lg, 1rem));
    }

    .related-components {
      display: flex;
      gap: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
      flex-wrap: wrap;
      margin-top: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
    }

    .related-link {
      border: 1px solid var(--widget-atlas-border, var(--color-border, #d7ddd5));
      border-radius: var(--widget-atlas-radius-sm, var(--radius-sm, 0.375rem));
      padding: var(--widget-atlas-space-xs, var(--space-xs, 0.25rem))
        var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
      text-decoration: none;
      color: var(--widget-atlas-text, var(--color-text, #162018));
      font-family: var(
        --widget-atlas-font-mono,
        var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)
      );
      font-size: 12px;
    }

    .error {
      color: var(--widget-atlas-danger-text, #b42318);
      border: 1px solid var(--widget-atlas-danger-border, #fecdca);
      border-radius: var(--widget-atlas-radius-md, var(--radius-md, 0.625rem));
      padding: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      background: var(--widget-atlas-danger-surface, #fef3f2);
    }

    .example {
      border: 1px solid var(--widget-atlas-border, var(--color-border, #d7ddd5));
      border-radius: var(--widget-atlas-radius-md, var(--radius-md, 0.625rem));
      padding: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      margin-bottom: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      background: var(--widget-atlas-surface, var(--color-surface, #fff));
    }

    .example-preview {
      border: 1px dashed var(--widget-atlas-border-strong, var(--color-border, #d7ddd5));
      border-radius: var(--widget-atlas-radius-sm, var(--radius-sm, 0.375rem));
      padding: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      margin-top: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
      background: var(--widget-atlas-surface-raised, var(--color-surface-raised, #f2f5ef));
    }

    .code {
      background: #111827;
      color: #f9fafb;
      padding: var(--widget-atlas-space-sm, var(--space-sm, 0.5rem));
      border-radius: var(--widget-atlas-radius-sm, var(--radius-sm, 0.375rem));
      overflow: auto;
      font-family: var(
        --widget-atlas-font-mono,
        var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)
      );
      font-size: 12px;
      white-space: pre;
    }

    h1 {
      margin: 0;
      font-family: var(
        --widget-atlas-font-display,
        var(--font-display, "DM Serif Display", Georgia, serif)
      );
      font-size: clamp(1.6rem, 3vw, 2.1rem);
    }

    h2 {
      margin-top: var(--widget-atlas-space-lg, var(--space-lg, 1rem));
      margin-bottom: var(--widget-atlas-space-md, var(--space-md, 0.75rem));
      font-size: 1.5rem;
    }

    h3 {
      margin: 0;
      font-size: 1.25rem;
    }
  `;oe([f({type:String})],k.prototype,"tag",void 0);oe([B()],k.prototype,"meta",void 0);k=oe([ae("widget-demo-page")],k);function dt(i){({...i})}const ht=[{tag:"scratch-button",name:"Scratch Button",description:"Smoke-test widget registered from an external consumer.",category:"atoms",useCase:"buttons",level:"atom",status:"stable",properties:[],events:[],slots:[],cssProperties:[],parts:[],examples:[{id:"default",title:"Default",code:"<scratch-button>Click</scratch-button>"}]}];Re(ht,{duplicatePolicy:"overwrite"});Te(({tag:i})=>`#/${i}`);dt({"scratch-button":["scratch-consumer/index.html"]});
