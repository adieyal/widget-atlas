(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class tt{constructor(){this.widgets=new Map,this.byUseCase=new Map,this.byCategory=new Map}register(e){const t=this.widgets.get(e.tag);t&&this.unindex(t),this.widgets.set(e.tag,e);const a=this.byUseCase.get(e.useCase)||[];a.push(e),this.byUseCase.set(e.useCase,a);const s=this.byCategory.get(e.category)||[];s.push(e),this.byCategory.set(e.category,s)}get(e){return this.widgets.get(e)}has(e){return this.widgets.has(e)}getAll(){return Array.from(this.widgets.values())}getByUseCase(e){return this.byUseCase.get(e)||[]}getByCategory(e){return this.byCategory.get(e)||[]}search(e,t){const a=e.toLowerCase().trim();let s=this.getAll();return a&&(s=s.filter(i=>{var o,n;return!!(i.name.toLowerCase().includes(a)||i.tag.toLowerCase().includes(a)||i.description.toLowerCase().includes(a)||(o=i.keywords)!=null&&o.some(c=>c.toLowerCase().includes(a))||(n=i.aliases)!=null&&n.some(c=>c.toLowerCase().includes(a)))})),t&&(s=s.filter(i=>!(t.useCase&&i.useCase!==t.useCase||t.category&&i.category!==t.category||t.status&&i.status!==t.status||t.level&&i.level!==t.level))),s}getGroupedByUseCase(){return new Map(this.byUseCase)}getGroupedByCategory(){return new Map(this.byCategory)}getStats(){const e=this.getAll();return{total:e.length,byStatus:this.countBy(e,"status"),byCategory:this.countBy(e,"category"),byUseCase:this.countBy(e,"useCase"),byLevel:this.countBy(e,"level")}}getUseCases(){return Array.from(this.byUseCase.keys())}getCategories(){return Array.from(this.byCategory.keys())}clear(){this.widgets.clear(),this.byUseCase.clear(),this.byCategory.clear()}unindex(e){const t=this.byUseCase.get(e.useCase);if(t){const s=t.filter(i=>i.tag!==e.tag);s.length?this.byUseCase.set(e.useCase,s):this.byUseCase.delete(e.useCase)}const a=this.byCategory.get(e.category);if(a){const s=a.filter(i=>i.tag!==e.tag);s.length?this.byCategory.set(e.category,s):this.byCategory.delete(e.category)}}countBy(e,t){return e.reduce((a,s)=>{const i=String(s[t]||"unknown");return a[i]=(a[i]||0)+1,a},{})}}const P=new tt;function at(r,e={}){const t=e.duplicatePolicy||"error";r.forEach(a=>{if(!P.has(a.tag)){P.register(a);return}if(t!=="ignore"){if(t==="overwrite"){P.register(a);return}throw new Error(`Duplicate widget metadata for tag "${a.tag}"`)}})}const Be=r=>`/widgets/${r.category}/${r.tag}/`;let Ne=Be;function st(r){Ne=r||Be}function me(r){return Ne(r)}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const te=globalThis,be=te.ShadowRoot&&(te.ShadyCSS===void 0||te.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_e=Symbol(),Ae=new WeakMap;let Le=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==_e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(be&&e===void 0){const a=t!==void 0&&t.length===1;a&&(e=Ae.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&Ae.set(t,e))}return e}toString(){return this.cssText}};const rt=r=>new Le(typeof r=="string"?r:r+"",void 0,_e),w=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((a,s,i)=>a+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[i+1],r[0]);return new Le(t,r,_e)},it=(r,e)=>{if(be)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const a=document.createElement("style"),s=te.litNonce;s!==void 0&&a.setAttribute("nonce",s),a.textContent=t.cssText,r.appendChild(a)}},ke=be?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return rt(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ot,defineProperty:nt,getOwnPropertyDescriptor:lt,getOwnPropertyNames:dt,getOwnPropertySymbols:ct,getPrototypeOf:ht}=Object,R=globalThis,Ee=R.trustedTypes,pt=Ee?Ee.emptyScript:"",he=R.reactiveElementPolyfillSupport,q=(r,e)=>r,ae={toAttribute(r,e){switch(e){case Boolean:r=r?pt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},ye=(r,e)=>!ot(r,e),Pe={attribute:!0,type:String,converter:ae,reflect:!1,useDefault:!1,hasChanged:ye};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);let N=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Pe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),s=this.getPropertyDescriptor(e,a,t);s!==void 0&&nt(this.prototype,e,s)}}static getPropertyDescriptor(e,t,a){const{get:s,set:i}=lt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){const n=s==null?void 0:s.call(this);i==null||i.call(this,o),this.requestUpdate(e,n,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Pe}static _$Ei(){if(this.hasOwnProperty(q("elementProperties")))return;const e=ht(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(q("properties"))){const t=this.properties,a=[...dt(t),...ct(t)];for(const s of a)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[a,s]of t)this.elementProperties.set(a,s)}this._$Eh=new Map;for(const[t,a]of this.elementProperties){const s=this._$Eu(t,a);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const s of a)t.unshift(ke(s))}else e!==void 0&&t.push(ke(e));return t}static _$Eu(e,t){const a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return it(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var a;return(a=t.hostConnected)==null?void 0:a.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var a;return(a=t.hostDisconnected)==null?void 0:a.call(t)})}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){var i;const a=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,a);if(s!==void 0&&a.reflect===!0){const o=(((i=a.converter)==null?void 0:i.toAttribute)!==void 0?a.converter:ae).toAttribute(t,a.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){var i,o;const a=this.constructor,s=a._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const n=a.getPropertyOptions(s),c=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)==null?void 0:i.fromAttribute)!==void 0?n.converter:ae;this._$Em=s;const g=c.fromAttribute(t,n.type);this[s]=g??((o=this._$Ej)==null?void 0:o.get(s))??g,this._$Em=null}}requestUpdate(e,t,a,s=!1,i){var o;if(e!==void 0){const n=this.constructor;if(s===!1&&(i=this[e]),a??(a=n.getPropertyOptions(e)),!((a.hasChanged??ye)(i,t)||a.useDefault&&a.reflect&&i===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(n._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:s,wrapped:i},o){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),i!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var a;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,o]of s){const{wrapped:n}=o,c=this[i];n!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,o,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(a=this._$EO)==null||a.forEach(s=>{var i;return(i=s.hostUpdate)==null?void 0:i.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(a=>{var s;return(s=a.hostUpdated)==null?void 0:s.call(a)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[q("elementProperties")]=new Map,N[q("finalized")]=new Map,he==null||he({ReactiveElement:N}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=globalThis,Re=r=>r,se=F.trustedTypes,Oe=se?se.createPolicy("lit-html",{createHTML:r=>r}):void 0,He="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Ie="?"+E,gt=`<${Ie}>`,W=document,J=()=>W.createComment(""),V=r=>r===null||typeof r!="object"&&typeof r!="function",$e=Array.isArray,ut=r=>$e(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",pe=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Te=/-->/g,Ue=/>/g,T=RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,We=/"/g,qe=/^(?:script|style|textarea|title)$/i,ft=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),l=ft(1),O=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),De=new WeakMap,U=W.createTreeWalker(W,129);function Fe(r,e){if(!$e(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Oe!==void 0?Oe.createHTML(e):e}const mt=(r,e)=>{const t=r.length-1,a=[];let s,i=e===2?"<svg>":e===3?"<math>":"",o=I;for(let n=0;n<t;n++){const c=r[n];let g,u,p=-1,C=0;for(;C<c.length&&(o.lastIndex=C,u=o.exec(c),u!==null);)C=o.lastIndex,o===I?u[1]==="!--"?o=Te:u[1]!==void 0?o=Ue:u[2]!==void 0?(qe.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=T):u[3]!==void 0&&(o=T):o===T?u[0]===">"?(o=s??I,p=-1):u[1]===void 0?p=-2:(p=o.lastIndex-u[2].length,g=u[1],o=u[3]===void 0?T:u[3]==='"'?We:Me):o===We||o===Me?o=T:o===Te||o===Ue?o=I:(o=T,s=void 0);const k=o===T&&r[n+1].startsWith("/>")?" ":"";i+=o===I?c+gt:p>=0?(a.push(g),c.slice(0,p)+He+c.slice(p)+E+k):c+E+(p===-2?n:k)}return[Fe(r,i+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class Q{constructor({strings:e,_$litType$:t},a){let s;this.parts=[];let i=0,o=0;const n=e.length-1,c=this.parts,[g,u]=mt(e,t);if(this.el=Q.createElement(g,a),U.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=U.nextNode())!==null&&c.length<n;){if(s.nodeType===1){if(s.hasAttributes())for(const p of s.getAttributeNames())if(p.endsWith(He)){const C=u[o++],k=s.getAttribute(p).split(E),ee=/([.?@])?(.*)/.exec(C);c.push({type:1,index:i,name:ee[2],strings:k,ctor:ee[1]==="."?wt:ee[1]==="?"?bt:ee[1]==="@"?_t:de}),s.removeAttribute(p)}else p.startsWith(E)&&(c.push({type:6,index:i}),s.removeAttribute(p));if(qe.test(s.tagName)){const p=s.textContent.split(E),C=p.length-1;if(C>0){s.textContent=se?se.emptyScript:"";for(let k=0;k<C;k++)s.append(p[k],J()),U.nextNode(),c.push({type:2,index:++i});s.append(p[C],J())}}}else if(s.nodeType===8)if(s.data===Ie)c.push({type:2,index:i});else{let p=-1;for(;(p=s.data.indexOf(E,p+1))!==-1;)c.push({type:7,index:i}),p+=E.length-1}i++}}static createElement(e,t){const a=W.createElement("template");return a.innerHTML=e,a}}function L(r,e,t=r,a){var o,n;if(e===O)return e;let s=a!==void 0?(o=t._$Co)==null?void 0:o[a]:t._$Cl;const i=V(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==i&&((n=s==null?void 0:s._$AO)==null||n.call(s,!1),i===void 0?s=void 0:(s=new i(r),s._$AT(r,t,a)),a!==void 0?(t._$Co??(t._$Co=[]))[a]=s:t._$Cl=s),s!==void 0&&(e=L(r,s._$AS(r,e.values),s,a)),e}class vt{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,s=((e==null?void 0:e.creationScope)??W).importNode(t,!0);U.currentNode=s;let i=U.nextNode(),o=0,n=0,c=a[0];for(;c!==void 0;){if(o===c.index){let g;c.type===2?g=new Z(i,i.nextSibling,this,e):c.type===1?g=new c.ctor(i,c.name,c.strings,this,e):c.type===6&&(g=new yt(i,this,e)),this._$AV.push(g),c=a[++n]}o!==(c==null?void 0:c.index)&&(i=U.nextNode(),o++)}return U.currentNode=W,s}p(e){let t=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class Z{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,a,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=L(this,e,t),V(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==O&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ut(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&V(this._$AH)?this._$AA.nextSibling.data=e:this.T(W.createTextNode(e)),this._$AH=e}$(e){var i;const{values:t,_$litType$:a}=e,s=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=Q.createElement(Fe(a.h,a.h[0]),this.options)),a);if(((i=this._$AH)==null?void 0:i._$AD)===s)this._$AH.p(t);else{const o=new vt(s,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=De.get(e.strings);return t===void 0&&De.set(e.strings,t=new Q(e)),t}k(e){$e(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,s=0;for(const i of e)s===t.length?t.push(a=new Z(this.O(J()),this.O(J()),this,this.options)):a=t[s],a._$AI(i),s++;s<t.length&&(this._$AR(a&&a._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var a;for((a=this._$AP)==null?void 0:a.call(this,!1,!0,t);e!==this._$AB;){const s=Re(e).nextSibling;Re(e).remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class de{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,s,i){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=d}_$AI(e,t=this,a,s){const i=this.strings;let o=!1;if(i===void 0)e=L(this,e,t,0),o=!V(e)||e!==this._$AH&&e!==O,o&&(this._$AH=e);else{const n=e;let c,g;for(e=i[0],c=0;c<i.length-1;c++)g=L(this,n[a+c],t,c),g===O&&(g=this._$AH[c]),o||(o=!V(g)||g!==this._$AH[c]),g===d?e=d:e!==d&&(e+=(g??"")+i[c+1]),this._$AH[c]=g}o&&!s&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class wt extends de{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}}class bt extends de{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}}class _t extends de{constructor(e,t,a,s,i){super(e,t,a,s,i),this.type=5}_$AI(e,t=this){if((e=L(this,e,t,0)??d)===O)return;const a=this._$AH,s=e===d&&a!==d||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==d&&(a===d||s);s&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class yt{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){L(this,e)}}const ge=F.litHtmlPolyfillSupport;ge==null||ge(Q,Z),(F.litHtmlVersions??(F.litHtmlVersions=[])).push("3.3.2");const $t=(r,e,t)=>{const a=(t==null?void 0:t.renderBefore)??e;let s=a._$litPart$;if(s===void 0){const i=(t==null?void 0:t.renderBefore)??null;a._$litPart$=s=new Z(e.insertBefore(J(),i),i,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis;let f=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=$t(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return O}};var je;f._$litElement$=!0,f.finalized=!0,(je=M.litElementHydrateSupport)==null||je.call(M,{LitElement:f});const ue=M.litElementPolyfillSupport;ue==null||ue({LitElement:f});(M.litElementVersions??(M.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xt={attribute:!0,type:String,converter:ae,reflect:!1,hasChanged:ye},Ct=(r=xt,e,t)=>{const{kind:a,metadata:s}=t;let i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),a==="setter"&&((r=Object.create(r)).wrapped=!0),i.set(t.name,r),a==="accessor"){const{name:o}=t;return{set(n){const c=e.get.call(this);e.set.call(this,n),this.requestUpdate(o,c,r,!0,n)},init(n){return n!==void 0&&this.C(o,void 0,r,n),n}}}if(a==="setter"){const{name:o}=t;return function(n){const c=this[o];e.call(this,n),this.requestUpdate(o,c,r,!0,n)}}throw Error("Unsupported decorator location: "+a)};function h(r){return(e,t)=>typeof t=="object"?Ct(r,e,t):((a,s,i)=>{const o=s.hasOwnProperty(i);return s.constructor.createProperty(i,a),o?Object.getOwnPropertyDescriptor(s,i):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function x(r){return h({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=(r,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(r,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function At(r,e){return(t,a,s)=>{const i=o=>{var n;return((n=o.renderRoot)==null?void 0:n.querySelector(r))??null};return St(t,a,{get(){return i(this)}})}}const Ge={"design-system":"Design System",buttons:"Buttons & Links",cards:"Cards",forms:"Forms & Input",feedback:"Feedback & Status",navigation:"Navigation & Progress","data-display":"Data Display",charts:"Charts & Visualizations",layout:"Layout",modals:"Modals & Dialogs",onboarding:"Onboarding",icons:"Icons",integrations:"Integrations"},Je=["design-system","buttons","cards","forms","feedback","navigation","data-display","charts","layout","modals","onboarding","icons","integrations"],kt={atoms:"Atoms",molecules:"Molecules",organisms:"Organisms",charts:"Charts",features:"Features"},Et=["atoms","molecules","organisms","charts","features"],Pt={new:"New",alpha:"Alpha",beta:"Beta",stable:"Stable",deprecated:"Deprecated",legacy:"Legacy"},Rt=["stable","beta","new","alpha","deprecated","legacy"];function ve(r){return r.split(/[-\s]+/).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}function Ve(r){switch(r){case"stable":return"success";case"beta":return"brand";case"new":return"accent";case"alpha":return"warning";case"deprecated":return"danger";case"legacy":return"muted";default:return"muted"}}const y=w`
  :host {
    --_widget-atlas-font-body: var(
      --widget-atlas-font-body,
      'Source Sans 3',
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif
    );
    --_widget-atlas-font-display: var(
      --widget-atlas-font-display,
      'Fraunces',
      'DM Serif Display',
      Georgia,
      serif
    );
    --_widget-atlas-font-mono: var(
      --widget-atlas-font-mono,
      'JetBrains Mono',
      'SFMono-Regular',
      ui-monospace,
      monospace
    );
    --_widget-atlas-surface: var(--widget-atlas-surface, #ffffff);
    --_widget-atlas-surface-muted: var(--widget-atlas-surface-muted, #f4f7f1);
    --_widget-atlas-surface-strong: var(--widget-atlas-surface-strong, #e9efe5);
    --_widget-atlas-surface-inverse: var(--widget-atlas-surface-inverse, #142117);
    --_widget-atlas-text: var(--widget-atlas-text, #172218);
    --_widget-atlas-text-muted: var(--widget-atlas-text-muted, #526255);
    --_widget-atlas-text-soft: var(--widget-atlas-text-soft, #6a796c);
    --_widget-atlas-text-inverse: var(--widget-atlas-text-inverse, #f8fbf7);
    --_widget-atlas-border: var(--widget-atlas-border, #d5ddd3);
    --_widget-atlas-border-strong: var(--widget-atlas-border-strong, #a9b6ac);
    --_widget-atlas-accent: var(--widget-atlas-accent, #1d7a52);
    --_widget-atlas-accent-strong: var(--widget-atlas-accent-strong, #0f5d3a);
    --_widget-atlas-accent-soft: var(--widget-atlas-accent-soft, #e0f2e8);
    --_widget-atlas-warning: var(--widget-atlas-warning, #b96d12);
    --_widget-atlas-warning-soft: var(--widget-atlas-warning-soft, #fff2df);
    --_widget-atlas-danger: var(--widget-atlas-danger, #b14032);
    --_widget-atlas-danger-soft: var(--widget-atlas-danger-soft, #fce9e6);
    --_widget-atlas-success: var(--widget-atlas-success, #147a4b);
    --_widget-atlas-success-soft: var(--widget-atlas-success-soft, #dff5e8);
    --_widget-atlas-info: var(--widget-atlas-info, #1965a8);
    --_widget-atlas-info-soft: var(--widget-atlas-info-soft, #e1effc);
    --_widget-atlas-shadow-sm: var(--widget-atlas-shadow-sm, 0 1px 2px rgb(13 24 16 / 0.08));
    --_widget-atlas-shadow-md: var(
      --widget-atlas-shadow-md,
      0 16px 40px rgb(12 28 18 / 0.08)
    );
    --_widget-atlas-radius-sm: var(--widget-atlas-radius-sm, 0.5rem);
    --_widget-atlas-radius-md: var(--widget-atlas-radius-md, 0.9rem);
    --_widget-atlas-radius-lg: var(--widget-atlas-radius-lg, 1.25rem);
    --_widget-atlas-space-2xs: var(--widget-atlas-space-2xs, 0.25rem);
    --_widget-atlas-space-xs: var(--widget-atlas-space-xs, 0.5rem);
    --_widget-atlas-space-sm: var(--widget-atlas-space-sm, 0.75rem);
    --_widget-atlas-space-md: var(--widget-atlas-space-md, 1rem);
    --_widget-atlas-space-lg: var(--widget-atlas-space-lg, 1.5rem);
    --_widget-atlas-space-xl: var(--widget-atlas-space-xl, 2rem);
    --_widget-atlas-space-2xl: var(--widget-atlas-space-2xl, 3rem);
    --_widget-atlas-focus-ring: var(--widget-atlas-focus-ring, 0 0 0 3px rgb(29 122 82 / 0.18));
    --_widget-atlas-code-bg: var(--widget-atlas-code-bg, #122118);
    --_widget-atlas-code-text: var(--widget-atlas-code-text, #eef6ef);
    --_widget-atlas-code-muted: var(--widget-atlas-code-muted, #aac7ad);
    --_widget-atlas-layout-max: var(--widget-atlas-layout-max, 1200px);
    color: var(--_widget-atlas-text);
    font-family: var(--_widget-atlas-font-body);
    line-height: 1.5;
  }
`,K=w`
  .control-input,
  .control-select,
  .control-button,
  .link-button {
    font: inherit;
  }

  .control-input,
  .control-select {
    min-height: 2.75rem;
    border: 1px solid var(--_widget-atlas-border);
    border-radius: var(--_widget-atlas-radius-sm);
    background: var(--_widget-atlas-surface);
    color: var(--_widget-atlas-text);
    padding: 0.7rem 0.85rem;
    box-sizing: border-box;
  }

  .control-input:focus,
  .control-select:focus,
  .control-button:focus,
  .link-button:focus {
    outline: none;
    box-shadow: var(--_widget-atlas-focus-ring);
    border-color: var(--_widget-atlas-accent);
  }

  .control-button,
  .link-button {
    border-radius: var(--_widget-atlas-radius-sm);
    cursor: pointer;
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background 160ms ease,
      color 160ms ease,
      box-shadow 160ms ease;
  }

  .control-button {
    min-height: 2.5rem;
    border: 1px solid var(--_widget-atlas-border);
    background: var(--_widget-atlas-surface);
    color: var(--_widget-atlas-text);
    padding: 0.55rem 0.9rem;
  }

  .control-button:hover {
    border-color: var(--_widget-atlas-border-strong);
    background: var(--_widget-atlas-surface-muted);
  }

  .link-button {
    border: none;
    background: transparent;
    color: var(--_widget-atlas-accent-strong);
    padding: 0;
  }

  .link-button:hover {
    color: var(--_widget-atlas-accent);
  }
`;var j=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};let S=class extends f{constructor(){super(...arguments),this.name="",this.tag="",this.description="",this.href=""}render(){return l`
      <a class="card" href=${this.href}>
        <div class="header">
          <span class="name">${this.name}</span>
          <span class="tag">&lt;${this.tag}&gt;</span>
        </div>
        <p class="description">${this.description}</p>
        <div class="meta">
          ${this.status?l`<span class="chip chip--${Ve(this.status)}">${this.status}</span>`:d}
          ${this.level?l`<span class="chip chip--level">${ve(this.level)}</span>`:d}
        </div>
      </a>
    `}};S.styles=[y,w`
      :host {
        display: block;
      }

      .card {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
        padding: var(--_widget-atlas-space-lg);
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background:
          radial-gradient(circle at top right, rgb(29 122 82 / 0.08), transparent 35%),
          var(--_widget-atlas-surface);
        color: inherit;
        text-decoration: none;
        box-shadow: var(--_widget-atlas-shadow-sm);
        transition:
          transform 180ms ease,
          border-color 180ms ease,
          box-shadow 180ms ease;
      }

      .card:hover {
        transform: translateY(-2px);
        border-color: var(--_widget-atlas-border-strong);
        box-shadow: var(--_widget-atlas-shadow-md);
      }

      .card::before {
        content: '';
        position: absolute;
        inset: 0 auto 0 0;
        width: 4px;
        border-radius: var(--_widget-atlas-radius-md) 0 0 var(--_widget-atlas-radius-md);
        background: linear-gradient(
          180deg,
          var(--_widget-atlas-accent),
          color-mix(in srgb, var(--_widget-atlas-accent) 40%, white)
        );
        opacity: 0;
        transition: opacity 180ms ease;
      }

      .card:hover::before {
        opacity: 1;
      }

      .header {
        display: flex;
        justify-content: space-between;
        gap: var(--_widget-atlas-space-sm);
        align-items: flex-start;
        margin-bottom: var(--_widget-atlas-space-sm);
      }

      .name {
        font-weight: 700;
        font-size: 1rem;
        color: var(--_widget-atlas-text);
      }

      .tag {
        flex-shrink: 0;
        padding: 0.22rem 0.5rem;
        border-radius: 999px;
        background: var(--_widget-atlas-surface-muted);
        border: 1px solid var(--_widget-atlas-border);
        color: var(--_widget-atlas-text-soft);
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.73rem;
      }

      .description {
        margin: 0 0 var(--_widget-atlas-space-lg);
        color: var(--_widget-atlas-text-muted);
        font-size: 0.95rem;
        line-height: 1.6;
        flex: 1;
      }

      .meta {
        display: flex;
        gap: var(--_widget-atlas-space-xs);
        flex-wrap: wrap;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        min-height: 1.75rem;
        padding: 0 0.65rem;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        border: 1px solid transparent;
      }

      .chip::before {
        content: '';
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 50%;
        background: currentColor;
      }

      .chip--level {
        color: var(--_widget-atlas-text-soft);
        background: var(--_widget-atlas-surface-muted);
        border-color: var(--_widget-atlas-border);
      }

      .chip--level::before {
        display: none;
      }

      .chip--success {
        color: var(--_widget-atlas-success);
        background: var(--_widget-atlas-success-soft);
      }

      .chip--brand {
        color: var(--_widget-atlas-accent-strong);
        background: var(--_widget-atlas-accent-soft);
      }

      .chip--accent {
        color: var(--_widget-atlas-info);
        background: var(--_widget-atlas-info-soft);
      }

      .chip--warning {
        color: var(--_widget-atlas-warning);
        background: var(--_widget-atlas-warning-soft);
      }

      .chip--danger {
        color: var(--_widget-atlas-danger);
        background: var(--_widget-atlas-danger-soft);
      }

      .chip--muted {
        color: var(--_widget-atlas-text-muted);
        background: var(--_widget-atlas-surface-muted);
      }
    `];j([h()],S.prototype,"name",void 0);j([h()],S.prototype,"tag",void 0);j([h()],S.prototype,"description",void 0);j([h()],S.prototype,"href",void 0);j([h()],S.prototype,"status",void 0);j([h()],S.prototype,"level",void 0);S=j([_("widget-card")],S);var Y=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};let D=class extends f{constructor(){super(...arguments),this.heading="",this.description="",this.widgets=[],this.getWidgetUrl=e=>`#/${e.tag}`}render(){return this.widgets.length?l`
      <section class="section">
        <div class="header">
          <div class="accent" aria-hidden="true"></div>
          <div class="title-wrap">
            <h2>${this.heading}</h2>
            ${this.description?l`<p>${this.description}</p>`:d}
          </div>
          <span class="count">${this.widgets.length}</span>
        </div>
        <div class="grid">
          ${this.widgets.map(e=>l`
              <widget-card
                .name=${e.name}
                .tag=${e.tag}
                .description=${e.description}
                .status=${e.status}
                .level=${e.level}
                .href=${this.getWidgetUrl(e)}
              ></widget-card>
            `)}
        </div>
      </section>
    `:d}};D.styles=[y,w`
      :host {
        display: block;
      }

      .section {
        margin-bottom: var(--_widget-atlas-space-2xl);
      }

      .header {
        display: flex;
        align-items: flex-start;
        gap: var(--_widget-atlas-space-md);
        margin-bottom: var(--_widget-atlas-space-lg);
      }

      .accent {
        width: 0.4rem;
        min-height: 2.25rem;
        border-radius: 999px;
        background: linear-gradient(
          180deg,
          var(--_widget-atlas-accent),
          color-mix(in srgb, var(--_widget-atlas-accent) 36%, white)
        );
      }

      .title-wrap {
        flex: 1;
      }

      h2 {
        margin: 0;
        font-size: 1.35rem;
        line-height: 1.2;
      }

      p {
        margin: var(--_widget-atlas-space-2xs) 0 0;
        color: var(--_widget-atlas-text-muted);
      }

      .count {
        flex-shrink: 0;
        min-width: 2rem;
        height: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.5rem;
        border-radius: 999px;
        border: 1px solid var(--_widget-atlas-border);
        background: var(--_widget-atlas-surface);
        color: var(--_widget-atlas-text-muted);
        font-size: 0.8rem;
        font-weight: 700;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
        gap: var(--_widget-atlas-space-lg);
      }
    `];Y([h()],D.prototype,"heading",void 0);Y([h()],D.prototype,"description",void 0);Y([h({attribute:!1})],D.prototype,"widgets",void 0);Y([h({attribute:!1})],D.prototype,"getWidgetUrl",void 0);D=Y([_("widget-category-section")],D);var B=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};let A=class extends f{constructor(){super(...arguments),this.code="",this.language="html",this.collapsible=!0,this.collapseThreshold=10,this.copied=!1,this.collapsed=!0,this.copiedTimer=null}disconnectedCallback(){super.disconnectedCallback(),this.copiedTimer&&clearTimeout(this.copiedTimer)}get shouldCollapse(){return this.collapsible&&this.code.split(`
`).length>this.collapseThreshold}async copyCode(){var e;(e=navigator.clipboard)!=null&&e.writeText&&(await navigator.clipboard.writeText(this.code),this.copied=!0,this.copiedTimer&&clearTimeout(this.copiedTimer),this.copiedTimer=setTimeout(()=>{this.copied=!1},1800))}toggleCollapsed(){this.collapsed=!this.collapsed}render(){const e=this.shouldCollapse&&this.collapsed;return l`
      <div class="code-container ${e?"is-collapsed":""}">
        <div class="code-header">
          <span class="language-badge">${this.language}</span>
          <button
            class="control-button copy-button ${this.copied?"is-copied":""}"
            @click=${this.copyCode}
            type="button"
          >
            ${this.copied?"Copied":"Copy"}
          </button>
        </div>
        <pre><code>${this.code}</code></pre>
        ${this.shouldCollapse?l`
              <button class="control-button expand-button" @click=${this.toggleCollapsed} type="button">
                ${this.collapsed?"Show more":"Show less"}
              </button>
            `:d}
      </div>
    `}};A.styles=[y,K,w`
      :host {
        display: block;
      }

      .code-container {
        overflow: hidden;
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-code-bg);
        color: var(--_widget-atlas-code-text);
        box-shadow: var(--_widget-atlas-shadow-sm);
      }

      .code-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--_widget-atlas-space-sm);
        padding: var(--_widget-atlas-space-sm) var(--_widget-atlas-space-md);
        border-bottom: 1px solid rgb(255 255 255 / 0.08);
        background: rgb(255 255 255 / 0.04);
      }

      .language-badge {
        color: var(--_widget-atlas-code-muted);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .copy-button {
        border-color: rgb(255 255 255 / 0.14);
        background: transparent;
        color: var(--_widget-atlas-code-text);
      }

      .copy-button:hover {
        background: rgb(255 255 255 / 0.08);
      }

      .copy-button.is-copied {
        border-color: color-mix(in srgb, var(--_widget-atlas-success) 55%, white);
        color: var(--_widget-atlas-success-soft);
      }

      pre {
        margin: 0;
        padding: var(--_widget-atlas-space-md);
        overflow: auto;
      }

      code {
        display: block;
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.82rem;
        line-height: 1.65;
        white-space: pre;
      }

      .code-container.is-collapsed pre {
        max-height: 11rem;
        position: relative;
      }

      .code-container.is-collapsed pre::after {
        content: '';
        position: absolute;
        inset: auto 0 0;
        height: 3rem;
        background: linear-gradient(transparent, var(--_widget-atlas-code-bg));
        pointer-events: none;
      }

      .expand-button {
        width: 100%;
        border: none;
        border-top: 1px solid rgb(255 255 255 / 0.08);
        background: rgb(255 255 255 / 0.04);
        color: var(--_widget-atlas-code-muted);
        padding: var(--_widget-atlas-space-sm) var(--_widget-atlas-space-md);
      }
    `];B([h({type:String})],A.prototype,"code",void 0);B([h({type:String})],A.prototype,"language",void 0);B([h({type:Boolean})],A.prototype,"collapsible",void 0);B([h({type:Number,attribute:"collapse-threshold"})],A.prototype,"collapseThreshold",void 0);B([x()],A.prototype,"copied",void 0);B([x()],A.prototype,"collapsed",void 0);A=B([_("widget-code-block")],A);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xe={ATTRIBUTE:1,CHILD:2},Ce=r=>(...e)=>({_$litDirective$:r,values:e});let Se=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,a){this._$Ct=e,this._$AM=t,this._$Ci=a}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe="important",Ot=" !"+Qe,Tt=Ce(class extends Se{constructor(r){var e;if(super(r),r.type!==xe.ATTRIBUTE||r.name!=="style"||((e=r.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((e,t)=>{const a=r[t];return a==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(r,[e]){const{style:t}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const a of this.ft)e[a]==null&&(this.ft.delete(a),a.includes("-")?t.removeProperty(a):t[a]=null);for(const a in e){const s=e[a];if(s!=null){this.ft.add(a);const i=typeof s=="string"&&s.endsWith(Ot);a.includes("-")||i?t.setProperty(a,i?s.slice(0,-11):s,i?Qe:""):t[a]=s}}return O}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class we extends Se{constructor(e){if(super(e),this.it=d,e.type!==xe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===d||e==null)return this._t=void 0,this.it=e;if(e===O)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}we.directiveName="unsafeHTML",we.resultType=1;const Ut=Ce(we);var b=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};const ze=[{id:"mobile",label:"Mobile",width:375},{id:"mobile-lg",label:"Mobile L",width:428},{id:"tablet",label:"Tablet",width:768},{id:"laptop",label:"Laptop",width:1024},{id:"desktop",label:"Desktop",width:null}];let m=class extends f{constructor(){super(...arguments),this.code="",this.showDeviceSelector=!1,this.showWidthControl=!1,this.fullWidth=!1,this.initialWidth=960,this.minWidth=280,this.maxWidth=1280,this.useSlot=!1,this.device="desktop",this.previewWidth=960}connectedCallback(){super.connectedCallback(),this.previewWidth=this.initialWidth}updated(e){e.has("code")&&!this.useSlot&&this.executeInlineScripts()}firstUpdated(){var t;const e=document.querySelectorAll('link[rel="stylesheet"]');for(const a of e)(t=this.shadowRoot)==null||t.appendChild(a.cloneNode(!0))}executeInlineScripts(){const e=this.previewFrame;if(!e)return;e.querySelectorAll("script").forEach(a=>{var i;const s=(i=a.textContent)==null?void 0:i.trim();if(a.remove(),!!s)try{new Function("demoRoot",s)(e)}catch(o){console.error("[widget-preview] Failed to execute inline demo script.",o)}})}setDevice(e){this.device=e;const t=ze.find(a=>a.id===e);t!=null&&t.width?this.previewWidth=t.width:e==="desktop"&&(this.previewWidth=this.initialWidth),this.requestUpdate()}onWidthInput(e){this.previewWidth=Number(e.target.value),this.requestUpdate()}onPresetClick(e){const t=e.currentTarget,a=t==null?void 0:t.dataset.device;a&&this.setDevice(a)}render(){const e=Tt({"--widget-atlas-preview-width":this.fullWidth?"100%":`${this.previewWidth}px`});return l`
      <div class="preview-shell">
        ${this.showDeviceSelector||this.showWidthControl&&!this.fullWidth?l`
              <div class="preview-toolbar">
                ${this.showDeviceSelector?l`
                      <div class="toolbar-group">
                        <span class="toolbar-label">Preview</span>
                        ${ze.map(t=>l`
                            <button
                              class="control-button preset-button ${this.device===t.id?"is-active":""}"
                              data-device=${t.id}
                              @click=${this.onPresetClick}
                              type="button"
                            >
                              ${t.label}
                              ${t.width?l`<span class="preset-size">${t.width}px</span>`:d}
                            </button>
                          `)}
                      </div>
                    `:d}

                ${this.showWidthControl&&!this.fullWidth?l`
                      <div class="range-row">
                        <span class="toolbar-label">Container</span>
                        <input
                          class="width-input"
                          name="preview-width"
                          type="range"
                          min=${String(this.minWidth)}
                          max=${String(this.maxWidth)}
                          .value=${String(this.previewWidth)}
                          @input=${this.onWidthInput}
                          @change=${this.onWidthInput}
                        />
                        <span class="width-value">${this.previewWidth}px</span>
                      </div>
                    `:d}
              </div>
            `:d}

        <div class="preview-canvas">
          <div
            class="preview-frame ${this.fullWidth?"is-full-width":""}"
            data-device=${this.device}
            style=${e}
          >
            ${this.useSlot?l`<slot></slot>`:Ut(this.code)}
          </div>
        </div>
      </div>
    `}};m.styles=[y,K,w`
      :host {
        display: block;
      }

      .preview-shell {
        overflow: hidden;
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-surface);
        box-shadow: var(--_widget-atlas-shadow-sm);
      }

      .preview-toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: var(--_widget-atlas-space-sm) var(--_widget-atlas-space-md);
        padding: var(--_widget-atlas-space-sm) var(--_widget-atlas-space-md);
        border-bottom: 1px solid var(--_widget-atlas-border);
        background:
          linear-gradient(180deg, rgb(255 255 255 / 0.75), transparent),
          var(--_widget-atlas-surface-muted);
      }

      .toolbar-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--_widget-atlas-space-xs);
      }

      .toolbar-label {
        color: var(--_widget-atlas-text-muted);
        font-size: 0.77rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .preset-button {
        min-height: 2rem;
        padding: 0.4rem 0.7rem;
        font-size: 0.76rem;
      }

      .preset-button.is-active {
        border-color: color-mix(in srgb, var(--_widget-atlas-accent) 36%, white);
        background: var(--_widget-atlas-accent-soft);
        color: var(--_widget-atlas-accent-strong);
      }

      .preset-size {
        color: var(--_widget-atlas-text-soft);
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.7rem;
      }

      .range-row {
        display: flex;
        align-items: center;
        gap: var(--_widget-atlas-space-sm);
        min-width: min(100%, 18rem);
      }

      .width-input {
        flex: 1;
      }

      .width-value {
        min-width: 4rem;
        color: var(--_widget-atlas-text-soft);
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.8rem;
        text-align: right;
      }

      .preview-canvas {
        padding: var(--_widget-atlas-space-lg);
        background:
          linear-gradient(90deg, rgb(23 34 24 / 0.03) 1px, transparent 1px),
          linear-gradient(rgb(23 34 24 / 0.03) 1px, transparent 1px),
          var(--_widget-atlas-surface-muted);
        background-size: 24px 24px;
      }

      .preview-frame {
        width: min(100%, var(--widget-atlas-preview-width, 100%));
        min-height: 6rem;
        margin: 0 auto;
        padding: var(--_widget-atlas-space-lg);
        border-radius: var(--_widget-atlas-radius-sm);
        border: 1px dashed var(--_widget-atlas-border-strong);
        background: var(--_widget-atlas-surface);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: var(--_widget-atlas-space-sm);
        box-sizing: border-box;
        transition: width 180ms ease;
      }

      .preview-frame.is-full-width {
        width: 100%;
      }

      .preview-frame.is-full-width > * {
        width: 100%;
      }

      @media (max-width: 820px) {
        .preview-toolbar {
          align-items: stretch;
        }

        .toolbar-group,
        .range-row {
          width: 100%;
        }
      }
    `];b([h({type:String})],m.prototype,"code",void 0);b([h({type:Boolean,attribute:"show-device-selector"})],m.prototype,"showDeviceSelector",void 0);b([h({type:Boolean,attribute:"show-width-control"})],m.prototype,"showWidthControl",void 0);b([h({type:Boolean,attribute:"full-width"})],m.prototype,"fullWidth",void 0);b([h({type:Number,attribute:"initial-width"})],m.prototype,"initialWidth",void 0);b([h({type:Number,attribute:"min-width"})],m.prototype,"minWidth",void 0);b([h({type:Number,attribute:"max-width"})],m.prototype,"maxWidth",void 0);b([h({type:Boolean,attribute:"use-slot"})],m.prototype,"useSlot",void 0);b([x()],m.prototype,"device",void 0);b([x()],m.prototype,"previewWidth",void 0);b([At(".preview-frame")],m.prototype,"previewFrame",void 0);m=b([_("widget-preview")],m);var Ze=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};let re=class extends f{constructor(){super(...arguments),this.properties=[]}render(){return l`
      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${this.properties.map(e=>l`
                <tr>
                  <td>
                    <code>${e.name}</code>
                    ${e.required||e.deprecated?l`
                          <div class="badges">
                            ${e.required?l`<span class="badge badge--required">Required</span>`:""}
                            ${e.deprecated?l`<span class="badge badge--deprecated">Deprecated</span>`:""}
                          </div>
                        `:""}
                  </td>
                  <td><code>${e.type}</code></td>
                  <td><code>${e.default}</code></td>
                  <td>${e.description}</td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `}};re.styles=[y,w`
      :host {
        display: block;
      }

      .table-shell {
        overflow: auto;
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-surface);
      }

      table {
        width: 100%;
        min-width: 42rem;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--_widget-atlas-border);
        text-align: left;
        vertical-align: top;
      }

      th {
        background: var(--_widget-atlas-surface-muted);
        color: var(--_widget-atlas-text);
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      td {
        color: var(--_widget-atlas-text-muted);
        font-size: 0.92rem;
      }

      tr:last-child td {
        border-bottom: none;
      }

      code {
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.82rem;
        color: var(--_widget-atlas-text);
      }

      .badges {
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
        margin-top: 0.35rem;
      }

      .badge {
        padding: 0.12rem 0.38rem;
        border-radius: 999px;
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
      }

      .badge--required {
        background: var(--_widget-atlas-accent-soft);
        color: var(--_widget-atlas-accent-strong);
      }

      .badge--deprecated {
        background: var(--_widget-atlas-danger-soft);
        color: var(--_widget-atlas-danger);
      }
    `];Ze([h({type:Array})],re.prototype,"properties",void 0);re=Ze([_("widget-props-table")],re);var Ke=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};let ie=class extends f{constructor(){super(...arguments),this.events=[]}render(){return l`
      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Detail</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${this.events.map(e=>l`
                <tr>
                  <td>
                    <code>${e.name}</code>
                    ${e.bubbles||e.composed?l`
                          <div class="badges">
                            ${e.bubbles?l`<span class="badge">Bubbles</span>`:""}
                            ${e.composed?l`<span class="badge">Composed</span>`:""}
                          </div>
                        `:""}
                  </td>
                  <td><code>${e.detail}</code></td>
                  <td>${e.description}</td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `}};ie.styles=[y,w`
      :host {
        display: block;
      }

      .table-shell {
        overflow: auto;
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-surface);
      }

      table {
        width: 100%;
        min-width: 38rem;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--_widget-atlas-border);
        text-align: left;
        vertical-align: top;
      }

      th {
        background: var(--_widget-atlas-surface-muted);
        color: var(--_widget-atlas-text);
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      td {
        color: var(--_widget-atlas-text-muted);
        font-size: 0.92rem;
      }

      tr:last-child td {
        border-bottom: none;
      }

      code {
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.82rem;
        color: var(--_widget-atlas-text);
      }

      .badges {
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
        margin-top: 0.35rem;
      }

      .badge {
        padding: 0.12rem 0.38rem;
        border-radius: 999px;
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        background: var(--_widget-atlas-surface-muted);
        color: var(--_widget-atlas-text-soft);
      }
    `];Ke([h({type:Array})],ie.prototype,"events",void 0);ie=Ke([_("widget-events-table")],ie);var Ye=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};let oe=class extends f{constructor(){super(...arguments),this.slots=[]}render(){return l`
      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Slot</th>
              <th>Description</th>
              <th>Accepts</th>
            </tr>
          </thead>
          <tbody>
            ${this.slots.map(e=>l`
                <tr>
                  <td><code>${e.name||"default"}</code></td>
                  <td>${e.description}</td>
                  <td>${e.accepts||"Any content"}</td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `}};oe.styles=[y,w`
      :host {
        display: block;
      }

      .table-shell {
        overflow: auto;
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-surface);
      }

      table {
        width: 100%;
        min-width: 34rem;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--_widget-atlas-border);
        text-align: left;
        vertical-align: top;
      }

      th {
        background: var(--_widget-atlas-surface-muted);
        color: var(--_widget-atlas-text);
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      td {
        color: var(--_widget-atlas-text-muted);
        font-size: 0.92rem;
      }

      tr:last-child td {
        border-bottom: none;
      }

      code {
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.82rem;
        color: var(--_widget-atlas-text);
      }
    `];Ye([h({type:Array})],oe.prototype,"slots",void 0);oe=Ye([_("widget-slots-table")],oe);var Xe=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};let ne=class extends f{constructor(){super(...arguments),this.cssProperties=[]}render(){return l`
      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${this.cssProperties.map(e=>l`
                <tr>
                  <td><code>${e.name}</code></td>
                  <td><code>${e.default}</code></td>
                  <td>${e.description}</td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `}};ne.styles=[y,w`
      :host {
        display: block;
      }

      .table-shell {
        overflow: auto;
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-surface);
      }

      table {
        width: 100%;
        min-width: 34rem;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--_widget-atlas-border);
        text-align: left;
        vertical-align: top;
      }

      th {
        background: var(--_widget-atlas-surface-muted);
        color: var(--_widget-atlas-text);
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      td {
        color: var(--_widget-atlas-text-muted);
        font-size: 0.92rem;
      }

      tr:last-child td {
        border-bottom: none;
      }

      code {
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.82rem;
        color: var(--_widget-atlas-text);
      }
    `];Xe([h({type:Array,attribute:"css-properties"})],ne.prototype,"cssProperties",void 0);ne=Xe([_("widget-css-props-table")],ne);var $=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};let v=class extends f{constructor(){super(...arguments),this.query="",this.useCase="",this.category="",this.status="",this.debounceDelay=250,this.showUseCaseFilter=!0,this.showCategoryFilter=!0,this.showStatusFilter=!0,this.placeholder="Search components...",this.results=[],this.debounceTimer=null}connectedCallback(){super.connectedCallback(),this.performSearch()}disconnectedCallback(){super.disconnectedCallback(),this.debounceTimer&&clearTimeout(this.debounceTimer)}performSearch(){const e={};this.useCase&&(e.useCase=this.useCase),this.category&&(e.category=this.category),this.status&&(e.status=this.status),this.results=P.search(this.query,e),this.dispatchEvent(new CustomEvent("widget-search-results",{detail:{results:this.results,query:this.query,filters:e},bubbles:!0,composed:!0}))}onQueryInput(e){this.query=e.target.value,this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>this.performSearch(),this.debounceDelay)}onUseCaseChange(e){this.useCase=e.target.value||"",this.performSearch()}onCategoryChange(e){this.category=e.target.value||"",this.performSearch()}onStatusChange(e){this.status=e.target.value||"",this.performSearch()}render(){return l`
      <div class="toolbar">
        <label class="search-field">
          <span class="search-label">Search</span>
          <input
            class="control-input search-input"
            type="search"
            placeholder=${this.placeholder}
            .value=${this.query}
            @input=${this.onQueryInput}
          />
        </label>
        <div class="filters">
          ${this.showUseCaseFilter?l`
                <label class="filter-field">
                  <span class="filter-label">Use Case</span>
                  <select
                    class="control-select filter-select"
                    name="use-case"
                    .value=${this.useCase}
                    @change=${this.onUseCaseChange}
                  >
                    <option value="">All use cases</option>
                    ${Je.map(e=>l`<option value=${e}>${Ge[e]}</option>`)}
                  </select>
                </label>
              `:d}
          ${this.showCategoryFilter?l`
                <label class="filter-field">
                  <span class="filter-label">Category</span>
                  <select
                    class="control-select filter-select"
                    name="category"
                    .value=${this.category}
                    @change=${this.onCategoryChange}
                  >
                    <option value="">All categories</option>
                    ${Et.map(e=>l`<option value=${e}>${kt[e]}</option>`)}
                  </select>
                </label>
              `:d}
          ${this.showStatusFilter?l`
                <label class="filter-field">
                  <span class="filter-label">Status</span>
                  <select
                    class="control-select filter-select"
                    name="status"
                    .value=${this.status}
                    @change=${this.onStatusChange}
                  >
                    <option value="">All statuses</option>
                    ${Rt.map(e=>l`<option value=${e}>${Pt[e]}</option>`)}
                  </select>
                </label>
              `:d}
        </div>
      </div>
    `}};v.styles=[y,K,w`
      :host {
        display: block;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: var(--_widget-atlas-space-md);
        align-items: end;
        padding: var(--_widget-atlas-space-md);
        border: 1px solid var(--_widget-atlas-border);
        border-radius: var(--_widget-atlas-radius-md);
        background:
          radial-gradient(circle at top right, rgb(29 122 82 / 0.08), transparent 28%),
          var(--_widget-atlas-surface);
        box-shadow: var(--_widget-atlas-shadow-sm);
      }

      .search-field {
        flex: 1 1 18rem;
      }

      .search-label,
      .filter-label {
        display: block;
        margin-bottom: var(--_widget-atlas-space-2xs);
        color: var(--_widget-atlas-text-muted);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      .search-input {
        width: 100%;
      }

      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: var(--_widget-atlas-space-sm);
      }

      .filter-field {
        min-width: 10rem;
      }

      .filter-select {
        width: 100%;
      }

      @media (max-width: 840px) {
        .filter-field {
          flex: 1 1 12rem;
        }
      }
    `];$([h({type:String})],v.prototype,"query",void 0);$([h({type:String,attribute:"use-case"})],v.prototype,"useCase",void 0);$([h({type:String})],v.prototype,"category",void 0);$([h({type:String})],v.prototype,"status",void 0);$([h({type:Number,attribute:"debounce-delay"})],v.prototype,"debounceDelay",void 0);$([h({type:Boolean,attribute:"show-use-case-filter"})],v.prototype,"showUseCaseFilter",void 0);$([h({type:Boolean,attribute:"show-category-filter"})],v.prototype,"showCategoryFilter",void 0);$([h({type:Boolean,attribute:"show-status-filter"})],v.prototype,"showStatusFilter",void 0);$([h({type:String})],v.prototype,"placeholder",void 0);$([x()],v.prototype,"results",void 0);v=$([_("widget-search")],v);var ce=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};let H=class extends f{constructor(){super(...arguments),this.searchQuery="",this.searchResults=null,this.isSearching=!1}get stats(){return P.getStats()}get groupedWidgets(){return P.getGroupedByUseCase()}handleSearch(e){this.searchQuery=e.detail.query,this.searchResults=e.detail.results,this.isSearching=!!(e.detail.query||e.detail.filters.useCase||e.detail.filters.category||e.detail.filters.status)}clearSearch(){var t;this.searchQuery="",this.searchResults=null,this.isSearching=!1;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("widget-search");e&&(e.query="",e.useCase="",e.category="",e.status="")}renderCard(e){return l`
      <widget-card
        .name=${e.name}
        .tag=${e.tag}
        .description=${e.description}
        .status=${e.status}
        .level=${e.level}
        .href=${me({category:e.category,tag:e.tag})}
      ></widget-card>
    `}renderStats(){const e=this.stats;return l`
      <div class="stats-grid">
        <article class="stat-card">
          <span class="stat-label">Total</span>
          <span class="stat-value">${e.total}</span>
        </article>
        <article class="stat-card">
          <span class="stat-label">Stable</span>
          <span class="stat-value stat-value--stable">${e.byStatus.stable??0}</span>
        </article>
        <article class="stat-card">
          <span class="stat-label">Beta</span>
          <span class="stat-value stat-value--beta">${e.byStatus.beta??0}</span>
        </article>
        <article class="stat-card">
          <span class="stat-label">New</span>
          <span class="stat-value stat-value--new">${e.byStatus.new??0}</span>
        </article>
      </div>
    `}renderSearchResults(){var e;return(e=this.searchResults)!=null&&e.length?l`
      <section>
        <div class="results-header">
          <h2>Search Results (${this.searchResults.length})</h2>
          <button class="link-button" @click=${this.clearSearch} type="button">Clear search</button>
        </div>
        <div class="results-grid">${this.searchResults.map(t=>this.renderCard(t))}</div>
      </section>
    `:l`
        <div class="empty-state">
          <h2>No matching widgets</h2>
          <p>Try a different keyword or broaden one of the filters.</p>
        </div>
      `}renderCategories(){return l`
      ${Je.map(e=>{const t=this.groupedWidgets.get(e);return t!=null&&t.length?l`
          <widget-category-section
            heading=${Ge[e]}
            .widgets=${t}
            .getWidgetUrl=${a=>me({category:a.category,tag:a.tag})}
          ></widget-category-section>
        `:d})}
    `}render(){return l`
      <div class="catalogue-container">
        <header class="catalogue-header">
          <div class="hero">
            <div>
              <span class="eyebrow">Widget Atlas</span>
              <h1>Browse the full component catalogue.</h1>
              <p class="subtitle">
                Explore reusable widgets by use case, inspect status and maturity, and jump into
                hands-on examples and API details.
              </p>
            </div>
            ${this.renderStats()}
          </div>
        </header>

        <section class="search-section">
          <widget-search @widget-search-results=${this.handleSearch}></widget-search>
        </section>

        ${this.isSearching?this.renderSearchResults():this.renderCategories()}
      </div>
    `}};H.styles=[y,K,w`
      :host {
        display: block;
        min-height: 100vh;
        background:
          radial-gradient(circle at top right, rgb(29 122 82 / 0.06), transparent 32%),
          linear-gradient(180deg, var(--_widget-atlas-surface-muted), #f8fbf7 18rem);
      }

      .catalogue-container {
        max-width: var(--_widget-atlas-layout-max);
        margin: 0 auto;
        padding: var(--_widget-atlas-space-2xl) var(--_widget-atlas-space-lg);
      }

      .catalogue-header {
        margin-bottom: var(--_widget-atlas-space-2xl);
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.5fr) minmax(18rem, 1fr);
        gap: var(--_widget-atlas-space-xl);
        align-items: end;
        margin-bottom: var(--_widget-atlas-space-xl);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.32rem 0.7rem;
        border-radius: 999px;
        background: var(--_widget-atlas-accent-soft);
        color: var(--_widget-atlas-accent-strong);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1 {
        margin: var(--_widget-atlas-space-sm) 0 var(--_widget-atlas-space-sm);
        font-family: var(
          --_widget-atlas-font-display,
          'Fraunces',
          'DM Serif Display',
          Georgia,
          serif
        );
        font-size: clamp(2.2rem, 4vw, 3.4rem);
        line-height: 0.98;
        letter-spacing: -0.04em;
      }

      .subtitle {
        max-width: 38rem;
        margin: 0;
        color: var(--_widget-atlas-text-muted);
        font-size: 1.05rem;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--_widget-atlas-space-sm);
      }

      .stat-card {
        padding: var(--_widget-atlas-space-md);
        border-radius: var(--_widget-atlas-radius-md);
        border: 1px solid var(--_widget-atlas-border);
        background: var(--_widget-atlas-surface);
        box-shadow: var(--_widget-atlas-shadow-sm);
      }

      .stat-label {
        display: block;
        margin-bottom: var(--_widget-atlas-space-xs);
        color: var(--_widget-atlas-text-soft);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .stat-value {
        font-size: clamp(1.4rem, 2vw, 2rem);
        font-weight: 800;
        line-height: 1;
      }

      .stat-value--stable {
        color: var(--_widget-atlas-success);
      }

      .stat-value--beta {
        color: var(--_widget-atlas-accent-strong);
      }

      .stat-value--new {
        color: var(--_widget-atlas-info);
      }

      .search-section {
        margin-bottom: var(--_widget-atlas-space-2xl);
      }

      .results-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--_widget-atlas-space-sm);
        margin-bottom: var(--_widget-atlas-space-lg);
      }

      .results-header h2,
      .empty-state h2 {
        margin: 0;
        font-size: 1.35rem;
      }

      .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
        gap: var(--_widget-atlas-space-lg);
      }

      .empty-state {
        padding: var(--_widget-atlas-space-2xl);
        text-align: center;
        border: 1px dashed var(--_widget-atlas-border-strong);
        border-radius: var(--_widget-atlas-radius-md);
        background: var(--_widget-atlas-surface);
      }

      .empty-state p {
        margin: var(--_widget-atlas-space-xs) auto 0;
        max-width: 28rem;
        color: var(--_widget-atlas-text-muted);
      }

      @media (max-width: 900px) {
        .hero {
          grid-template-columns: 1fr;
        }

        .stats-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 640px) {
        .catalogue-container {
          padding-inline: var(--_widget-atlas-space-md);
        }

        .stats-grid {
          grid-template-columns: 1fr;
        }
      }
    `];ce([x()],H.prototype,"searchQuery",void 0);ce([x()],H.prototype,"searchResults",void 0);ce([x()],H.prototype,"isSearching",void 0);H=ce([_("widget-catalogue-page")],H);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt=r=>r.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=(r,e)=>{var a;const t=r._$AN;if(t===void 0)return!1;for(const s of t)(a=s._$AO)==null||a.call(s,e,!1),G(s,e);return!0},le=r=>{let e,t;do{if((e=r._$AM)===void 0)break;t=e._$AN,t.delete(r),r=e}while((t==null?void 0:t.size)===0)},et=r=>{for(let e;e=r._$AM;r=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(r))break;t.add(r),zt(e)}};function Wt(r){this._$AN!==void 0?(le(this),this._$AM=r,et(this)):this._$AM=r}function Dt(r,e=!1,t=0){const a=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(a))for(let i=t;i<a.length;i++)G(a[i],!1),le(a[i]);else a!=null&&(G(a,!1),le(a));else G(this,r)}const zt=r=>{r.type==xe.CHILD&&(r._$AP??(r._$AP=Dt),r._$AQ??(r._$AQ=Wt))};class jt extends Se{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,a){super._$AT(e,t,a),et(this),this.isConnected=e._$AU}_$AO(e,t=!0){var a,s;e!==this.isConnected&&(this.isConnected=e,e?(a=this.reconnected)==null||a.call(this):(s=this.disconnected)==null||s.call(this)),t&&(G(this,e),le(this))}setValue(e){if(Mt(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const fe=new WeakMap,Bt=Ce(class extends jt{render(r){return d}update(r,[e]){var a;const t=e!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=e,this.ht=(a=r.options)==null?void 0:a.host,this.rt(this.ct=r.element)),d}rt(r){if(this.isConnected||(r=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let t=fe.get(e);t===void 0&&(t=new WeakMap,fe.set(e,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,r),r!==void 0&&this.G.call(this.ht,r)}else this.G.value=r}get lt(){var r,e;return typeof this.G=="function"?(r=fe.get(this.ht??globalThis))==null?void 0:r.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var X=function(r,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(r,e,t,a);else for(var n=r.length-1;n>=0;n--)(o=r[n])&&(i=(s<3?o(i):s>3?o(e,t,i):o(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};let z=class extends f{constructor(){super(...arguments),this.tag="",this.catalogueHref="/widgets/",this.meta=null,this.activeSectionId="",this.sectionObserver=null}connectedCallback(){super.connectedCallback(),this.loadMeta()}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.sectionObserver)==null||e.disconnect(),this.sectionObserver=null}updated(e){e.has("tag")&&this.loadMeta(),this.meta&&e.has("tag")&&queueMicrotask(()=>this.setupScrollSpy())}loadMeta(){var e,t;this.meta=this.tag&&P.get(this.tag)||null,this.activeSectionId=((t=(e=this.meta)==null?void 0:e.examples[0])==null?void 0:t.id)??""}setupScrollSpy(){var e;(e=this.sectionObserver)==null||e.disconnect(),this.sectionObserver=null,"IntersectionObserver"in window&&(this.sectionObserver=new IntersectionObserver(t=>{var s;const a=t.filter(i=>i.isIntersecting).sort((i,o)=>o.intersectionRatio-i.intersectionRatio);(s=a[0])!=null&&s.target.id&&(this.activeSectionId=a[0].target.id)},{rootMargin:"-30% 0px -55% 0px",threshold:[.2,.6]}),this.renderRoot.querySelectorAll(".demo-section[id], .example-section[id]").forEach(t=>{var a;(a=this.sectionObserver)==null||a.observe(t)}))}mountPropPreview(e,t,a){if(!(e instanceof HTMLElement))return;const s=document.createElement(t);Object.entries(a).forEach(([i,o])=>{s[i]=o}),e.replaceChildren(s)}renderPreview(e){return e.props&&this.meta?l`
        <widget-preview
          class="example-preview"
          ?full-width=${!!e.fullWidth}
          ?show-device-selector=${!0}
          ?show-width-control=${!e.fullWidth}
          use-slot
        >
          <div ${Bt(t=>this.mountPropPreview(t,this.meta.tag,e.props))}></div>
        </widget-preview>
      `:l`
      <widget-preview
        class="example-preview"
        .code=${e.code}
        ?full-width=${!!e.fullWidth}
        ?show-device-selector=${!0}
        ?show-width-control=${!e.fullWidth}
      ></widget-preview>
    `}renderExample(e){const t=e.showPreview??!0,a=e.showCode??!0;return l`
      <article class="example-section" id=${e.id}>
        <span class="section-kicker">Example</span>
        <h3>${e.title}</h3>
        ${e.description?l`<p class="example-description">${e.description}</p>`:d}
        ${t?this.renderPreview(e):d}
        ${a?l`<widget-code-block .code=${e.code} language="html"></widget-code-block>`:d}
      </article>
    `}renderUsageGuidelines(){var t,a;const e=(t=this.meta)==null?void 0:t.usageGuidelines;return e?l`
      <div class="guidelines-grid">
        ${e.do.length?l`
              <div class="guideline-card guideline-card--do">
                <div class="guideline-card__header">
                  <span class="guideline-card__icon">✓</span>
                  <strong>Do</strong>
                </div>
                <ul>
                  ${e.do.map(s=>l`<li>${s}</li>`)}
                </ul>
              </div>
            `:d}
        ${e.dont.length?l`
              <div class="guideline-card guideline-card--dont">
                <div class="guideline-card__header">
                  <span class="guideline-card__icon">×</span>
                  <strong>Don't</strong>
                </div>
                <ul>
                  ${e.dont.map(s=>l`<li>${s}</li>`)}
                </ul>
              </div>
            `:d}
        ${(a=e.notes)!=null&&a.length?l`
              <div class="guideline-card guideline-card--notes">
                <div class="guideline-card__header">
                  <span class="guideline-card__icon">i</span>
                  <strong>Notes</strong>
                </div>
                <ul>
                  ${e.notes.map(s=>l`<li>${s}</li>`)}
                </ul>
              </div>
            `:d}
      </div>
    `:d}renderApiReference(){return this.meta?l`
      ${this.meta.properties.length?l`
            <div class="api-section">
              <h3>Properties</h3>
              <widget-props-table .properties=${this.meta.properties}></widget-props-table>
            </div>
          `:d}
      ${this.meta.events.length?l`
            <div class="api-section">
              <h3>Events</h3>
              <widget-events-table .events=${this.meta.events}></widget-events-table>
            </div>
          `:d}
      ${this.meta.slots.length?l`
            <div class="api-section">
              <h3>Slots</h3>
              <widget-slots-table .slots=${this.meta.slots}></widget-slots-table>
            </div>
          `:d}
      ${this.meta.cssProperties.length?l`
            <div class="api-section">
              <h3>CSS Custom Properties</h3>
              <widget-css-props-table .cssProperties=${this.meta.cssProperties}></widget-css-props-table>
            </div>
          `:d}
    `:d}renderRelated(){var e,t;return(t=(e=this.meta)==null?void 0:e.relatedComponents)!=null&&t.length?l`
      <div class="related-components">
        ${this.meta.relatedComponents.map(a=>{const s=P.get(a);return s?l`
            <a
              class="related-link"
              href=${me({category:s.category,tag:s.tag})}
            >
              <span>
                <span class="related-name">${s.name}</span>
                <span class="related-tag">&lt;${s.tag}&gt;</span>
              </span>
              <span class="related-arrow" aria-hidden="true">→</span>
            </a>
          `:d})}
      </div>
    `:d}renderSection(e,t,a,s){return l`
      <section class="demo-section" id=${e}>
        <span class="section-kicker">Section</span>
        <h2 class="section-heading">${t}</h2>
        <p class="section-description">${a}</p>
        ${s}
      </section>
    `}buildTocSections(){var t;if(!this.meta)return[];const e=this.meta.examples.map(a=>({id:a.id,label:a.title}));return this.meta.usageGuidelines&&e.push({id:"usage",label:"Usage Guidelines"}),e.push({id:"api",label:"API Reference"}),(t=this.meta.relatedComponents)!=null&&t.length&&e.push({id:"related",label:"Related Components"}),e}renderSidebar(){const e=this.buildTocSections();return e.length?l`
      <aside class="sidebar">
        <div class="sidebar__label">On this page</div>
        <nav>
          <ul class="sidebar__nav">
            ${e.map(t=>l`
                <li>
                  <button
                    class="sidebar__link ${this.activeSectionId===t.id?"sidebar__link--active":""}"
                    @click=${()=>{var a;return(a=this.renderRoot.querySelector(`#${t.id}`))==null?void 0:a.scrollIntoView({behavior:"smooth",block:"start"})}}
                    type="button"
                  >
                    ${t.label}
                  </button>
                </li>
              `)}
          </ul>
        </nav>
      </aside>
    `:d}renderHeader(){return this.meta?l`
      <header class="demo-header">
        <a class="back-link" href=${this.catalogueHref}>← Back to Catalogue</a>
        <div class="header-title-row">
          <h1>${this.meta.name}</h1>
          ${this.meta.status?l`<span class="status-chip status-chip--${Ve(this.meta.status)}">
                ${this.meta.status}
              </span>`:d}
        </div>
        <p class="demo-subtitle">${this.meta.description}</p>
        <div class="header-meta">
          <span class="meta-chip">Tag <code>&lt;${this.meta.tag}&gt;</code></span>
          <span class="meta-chip">Category <code>${ve(this.meta.category)}</code></span>
          <span class="meta-chip">Level <code>${ve(this.meta.level)}</code></span>
          ${this.meta.version?l`<span class="meta-chip">Version <code>${this.meta.version}</code></span>`:d}
        </div>
      </header>
    `:d}render(){var e;return this.meta?l`
      ${this.renderSidebar()}
      <main class="demo-main">
        ${this.renderHeader()}
        ${this.meta.examples.map(t=>this.renderExample(t))}
        ${this.meta.usageGuidelines?this.renderSection("usage","Usage Guidelines","Practical guidance for choosing and composing this component well.",this.renderUsageGuidelines()):d}
        ${this.renderSection("api","API Reference","Inspect the public surface area exposed by this widget.",this.renderApiReference())}
        ${(e=this.meta.relatedComponents)!=null&&e.length?this.renderSection("related","Related Components","Other widgets that pair naturally with this one.",this.renderRelated()):d}
      </main>
    `:l`
        <div class="demo-main">
          <div class="error">
            <strong>Widget not found</strong>
            <p>No metadata found for "${this.tag}".</p>
          </div>
        </div>
      `}};z.styles=[y,K,w`
      :host {
        display: grid;
        grid-template-columns: 15rem minmax(0, 1fr);
        min-height: 100vh;
        background:
          radial-gradient(circle at top right, rgb(29 122 82 / 0.07), transparent 30%),
          linear-gradient(180deg, var(--_widget-atlas-surface-muted), #f7faf5 18rem);
      }

      .sidebar {
        position: sticky;
        top: 0;
        align-self: start;
        height: 100vh;
        padding: var(--_widget-atlas-space-2xl) 0;
        border-right: 1px solid var(--_widget-atlas-border);
        background: rgb(255 255 255 / 0.74);
        backdrop-filter: blur(14px);
      }

      .sidebar__label {
        padding: 0 var(--_widget-atlas-space-lg);
        margin-bottom: var(--_widget-atlas-space-md);
        color: var(--_widget-atlas-text-soft);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .sidebar__nav {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .sidebar__link {
        display: block;
        width: 100%;
        padding: 0.65rem var(--_widget-atlas-space-lg);
        border: none;
        border-left: 3px solid transparent;
        background: transparent;
        color: var(--_widget-atlas-text-muted);
        text-align: left;
        cursor: pointer;
      }

      .sidebar__link:hover {
        background: rgb(23 34 24 / 0.04);
        color: var(--_widget-atlas-text);
      }

      .sidebar__link--active {
        color: var(--_widget-atlas-accent-strong);
        border-left-color: var(--_widget-atlas-accent);
        background: color-mix(in srgb, var(--_widget-atlas-accent) 9%, white);
      }

      .demo-main {
        max-width: calc(var(--_widget-atlas-layout-max) - 8rem);
        width: 100%;
        padding: var(--_widget-atlas-space-2xl);
        box-sizing: border-box;
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: var(--_widget-atlas-space-lg);
        color: var(--_widget-atlas-accent-strong);
        text-decoration: none;
        font-weight: 600;
      }

      .back-link:hover {
        color: var(--_widget-atlas-accent);
      }

      .demo-header {
        margin-bottom: var(--_widget-atlas-space-2xl);
        padding-bottom: var(--_widget-atlas-space-xl);
        border-bottom: 1px solid var(--_widget-atlas-border);
      }

      .header-title-row {
        display: flex;
        align-items: center;
        gap: var(--_widget-atlas-space-sm);
        flex-wrap: wrap;
        margin-bottom: var(--_widget-atlas-space-sm);
      }

      h1 {
        margin: 0;
        font-family: var(
          --_widget-atlas-font-display,
          'Fraunces',
          'DM Serif Display',
          Georgia,
          serif
        );
        font-size: clamp(2rem, 4vw, 3rem);
        line-height: 0.98;
        letter-spacing: -0.04em;
      }

      .status-chip,
      .meta-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        min-height: 2rem;
        padding: 0 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .status-chip::before {
        content: '';
        width: 0.46rem;
        height: 0.46rem;
        border-radius: 50%;
        background: currentColor;
      }

      .status-chip--success {
        background: var(--_widget-atlas-success-soft);
        color: var(--_widget-atlas-success);
      }

      .status-chip--brand {
        background: var(--_widget-atlas-accent-soft);
        color: var(--_widget-atlas-accent-strong);
      }

      .status-chip--accent {
        background: var(--_widget-atlas-info-soft);
        color: var(--_widget-atlas-info);
      }

      .status-chip--warning {
        background: var(--_widget-atlas-warning-soft);
        color: var(--_widget-atlas-warning);
      }

      .status-chip--danger {
        background: var(--_widget-atlas-danger-soft);
        color: var(--_widget-atlas-danger);
      }

      .status-chip--muted {
        background: var(--_widget-atlas-surface-strong);
        color: var(--_widget-atlas-text-muted);
      }

      .demo-subtitle {
        max-width: 40rem;
        margin: 0 0 var(--_widget-atlas-space-md);
        color: var(--_widget-atlas-text-muted);
        font-size: 1.02rem;
      }

      .header-meta {
        display: flex;
        flex-wrap: wrap;
        gap: var(--_widget-atlas-space-xs);
      }

      .meta-chip {
        border: 1px solid var(--_widget-atlas-border);
        background: var(--_widget-atlas-surface);
        color: var(--_widget-atlas-text-soft);
        text-transform: none;
        font-weight: 600;
      }

      .meta-chip code {
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.8rem;
        color: var(--_widget-atlas-text);
      }

      .demo-section,
      .example-section {
        margin-bottom: var(--_widget-atlas-space-2xl);
      }

      .section-kicker {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        margin-bottom: var(--_widget-atlas-space-xs);
        color: var(--_widget-atlas-text-soft);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .section-kicker::before {
        content: '';
        width: 1.4rem;
        height: 1px;
        background: var(--_widget-atlas-border-strong);
      }

      .section-heading {
        margin: 0;
        font-size: 1.6rem;
      }

      .section-description,
      .example-description {
        margin: var(--_widget-atlas-space-xs) 0 var(--_widget-atlas-space-lg);
        color: var(--_widget-atlas-text-muted);
      }

      .example-section h3 {
        margin: 0;
        font-size: 1.25rem;
      }

      .example-preview {
        margin-bottom: var(--_widget-atlas-space-md);
      }

      .guidelines-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--_widget-atlas-space-lg);
      }

      .guideline-card {
        padding: var(--_widget-atlas-space-lg);
        border-radius: var(--_widget-atlas-radius-md);
        border: 1px solid var(--_widget-atlas-border);
      }

      .guideline-card--do {
        background: var(--_widget-atlas-success-soft);
        border-color: color-mix(in srgb, var(--_widget-atlas-success) 35%, white);
      }

      .guideline-card--dont {
        background: var(--_widget-atlas-danger-soft);
        border-color: color-mix(in srgb, var(--_widget-atlas-danger) 35%, white);
      }

      .guideline-card--notes {
        grid-column: 1 / -1;
        background: var(--_widget-atlas-info-soft);
        border-color: color-mix(in srgb, var(--_widget-atlas-info) 35%, white);
      }

      .guideline-card__header {
        display: flex;
        align-items: center;
        gap: var(--_widget-atlas-space-xs);
        margin-bottom: var(--_widget-atlas-space-sm);
      }

      .guideline-card__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        font-weight: 700;
      }

      .guideline-card--do .guideline-card__icon {
        background: var(--_widget-atlas-success);
        color: white;
      }

      .guideline-card--dont .guideline-card__icon {
        background: var(--_widget-atlas-danger);
        color: white;
      }

      .guideline-card--notes .guideline-card__icon {
        background: var(--_widget-atlas-info);
        color: white;
      }

      .guideline-card ul {
        margin: 0;
        padding-left: 1.15rem;
      }

      .guideline-card li + li {
        margin-top: 0.45rem;
      }

      .api-section + .api-section {
        margin-top: var(--_widget-atlas-space-lg);
      }

      .api-section h3 {
        margin: 0 0 var(--_widget-atlas-space-sm);
        font-size: 1.1rem;
      }

      .related-components {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: var(--_widget-atlas-space-md);
      }

      .related-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--_widget-atlas-space-sm);
        padding: var(--_widget-atlas-space-md);
        border-radius: var(--_widget-atlas-radius-md);
        border: 1px solid var(--_widget-atlas-border);
        background: var(--_widget-atlas-surface);
        color: inherit;
        text-decoration: none;
        box-shadow: var(--_widget-atlas-shadow-sm);
      }

      .related-link:hover {
        border-color: var(--_widget-atlas-border-strong);
        box-shadow: var(--_widget-atlas-shadow-md);
      }

      .related-name {
        display: block;
        font-weight: 700;
      }

      .related-tag {
        display: block;
        margin-top: var(--_widget-atlas-space-2xs);
        color: var(--_widget-atlas-text-soft);
        font-family: var(
          --_widget-atlas-font-mono,
          'JetBrains Mono',
          'SFMono-Regular',
          ui-monospace,
          monospace
        );
        font-size: 0.78rem;
      }

      .related-arrow {
        color: var(--_widget-atlas-accent);
        font-size: 1.1rem;
      }

      .error {
        margin: var(--_widget-atlas-space-2xl) auto;
        max-width: 40rem;
        padding: var(--_widget-atlas-space-xl);
        border-radius: var(--_widget-atlas-radius-md);
        border: 1px solid color-mix(in srgb, var(--_widget-atlas-danger) 34%, white);
        background: var(--_widget-atlas-danger-soft);
        color: var(--_widget-atlas-danger);
      }

      @media (max-width: 960px) {
        :host {
          grid-template-columns: 1fr;
        }

        .sidebar {
          position: static;
          height: auto;
          padding: var(--_widget-atlas-space-md) var(--_widget-atlas-space-md) 0;
          border-right: none;
          border-bottom: 1px solid var(--_widget-atlas-border);
          background: transparent;
        }

        .sidebar__nav {
          display: flex;
          gap: var(--_widget-atlas-space-xs);
          overflow: auto;
          padding-bottom: var(--_widget-atlas-space-sm);
        }

        .sidebar__link {
          width: auto;
          border-left: none;
          border-bottom: 2px solid transparent;
          border-radius: 999px;
          white-space: nowrap;
        }

        .sidebar__link--active {
          border-bottom-color: var(--_widget-atlas-accent);
        }

        .demo-main {
          max-width: none;
          padding: var(--_widget-atlas-space-lg);
        }

        .guidelines-grid {
          grid-template-columns: 1fr;
        }

        .guideline-card--notes {
          grid-column: auto;
        }
      }
    `];X([h({type:String})],z.prototype,"tag",void 0);X([h({type:String,attribute:"catalogue-href"})],z.prototype,"catalogueHref",void 0);X([x()],z.prototype,"meta",void 0);X([x()],z.prototype,"activeSectionId",void 0);z=X([_("widget-demo-page")],z);function Nt(r){({...r})}const Lt=[{tag:"scratch-button",name:"Scratch Button",description:"Smoke-test widget registered from an external consumer.",category:"atoms",useCase:"buttons",level:"atom",status:"stable",properties:[],events:[],slots:[],cssProperties:[],parts:[],examples:[{id:"default",title:"Default",code:"<scratch-button>Click</scratch-button>"}]}];at(Lt,{duplicatePolicy:"overwrite"});st(({tag:r})=>`#/${r}`);Nt({"scratch-button":["scratch-consumer/index.html"]});
