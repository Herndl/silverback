exports[!0]=function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/lib/",e(0)}([function(t,e,n){function i(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}i(n(1)),i(n(3)),i(n(7)),i(n(8)),i(n(11)),i(n(9)),i(n(5)),i(n(6)),i(n(10)),i(n(4))},function(t,e){var n=function(){function t(){this._keys=[],this._values=[]}return t.prototype.add=function(t,e){var n=this.getIndex(t);n>=0?this._values[n]=e:(this._keys.push(t),this._values.push(e))},t.prototype.remove=function(t){var e=this.getIndex(t);if(e>=0){var n=this._values[e];return this._keys.splice(e,1),this._values.splice(e,1),n}throw"Key does not exist"},t.prototype.getValue=function(t){var e=null,n=this.getIndex(t);return n>=0&&(e=this._values[n]),e},t.prototype.getIndex=function(t){for(var e,n=this._keys.length,i=0;n>i;++i)if(e=this._keys[i],e===t)return i;return-1},t.prototype.has=function(t){for(var e,n=this._keys.length,i=0;n>i;++i)if(e=this._keys[i],e===t)return!0;return!1},t.prototype.values=function(){for(var t,e,n=this._keys.length,i=[],o=0;n>o;++o)t=this._keys[o],e=this._values[o],i.push(e);return i},t.prototype.forEach=function(t){for(var e,n,i=this._keys.length,o=0;i>o;++o){e=this._keys[o],n=this._values[o];var s=t(e,n);if("return"===s)return!1}return!0},t}();e.Dictionary=n},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return t._head?(t._tail._next=e,e._prev=t._tail,t._tail=e):(t._head=e,t._tail=e),e._owner=t,e}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=function(){function t(e,i,o){void 0===i&&(i=!1),n(this,t),this._fn=e,this._once=i,this._thisArg=o,this._next=this._prev=this._owner=null}return o(t,[{key:"detach",value:function(){return null===this._owner?!1:(this._owner.detach(this),!0)}}]),t}(),r=function(){function t(){n(this,t),this._head=this._tail=void 0}return o(t,[{key:"handlers",value:function(){var t=arguments.length<=0||void 0===arguments[0]?!1:arguments[0],e=this._head;if(t)return!!e;for(var n=[];e;)n.push(e),e=e._next;return n}},{key:"has",value:function(t){if(!(t instanceof s))throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");return t._owner===this}},{key:"dispatch",value:function(){var t=this._head;if(!t)return!1;for(;t;)t._fn.apply(t._thisArg,arguments),t._once&&this.detach(t),t=t._next;return!0}},{key:"add",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?null:arguments[1];if("function"!=typeof t)throw new Error("MiniSignal#add(): First arg must be a Function.");return i(this,new s(t,!1,e))}},{key:"once",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?null:arguments[1];if("function"!=typeof t)throw new Error("MiniSignal#once(): First arg must be a Function.");return i(this,new s(t,!0,e))}},{key:"detach",value:function(t){if(!(t instanceof s))throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");return t._owner!==this?this:(t._prev&&(t._prev._next=t._next),t._next&&(t._next._prev=t._prev),t===this._head?(this._head=t._next,null===t._next&&(this._tail=null)):t===this._tail&&(this._tail=t._prev,this._tail._next=null),t._owner=null,this)}},{key:"detachAll",value:function(){var t=this._head;if(!t)return this;for(this._head=this._tail=null;t;)t._owner=null,t=t._next;return this}}]),t}();r.MiniSignalBinding=s,e["default"]=r,t.exports=e["default"]},function(t,e){var n=function(){function t(){this._head=null,this._tail=null,this._length=0}return t.prototype.add=function(t){var e={data:t,next:null,prev:null};0===this._length?(this._head=e,this._tail=e):(this._tail.next=e,e.prev=this._tail,this._tail=e),this._length++},t.prototype.item=function(t){if(t>-1&&t<this._length){for(var e=this._head,n=0;n++<t;)e=e.next;return e.data}return null},t.prototype.remove=function(t){if(t>-1&&t<this._length){var e=this._head,n=0;if(0===t)this._head=e.next,this._head?this._head.prev=null:this._tail=null;else if(t===this._length-1)e=this._tail,this._tail=e.prev,this._tail.next=null;else{for(;n++<t;)e=e.next;e.prev.next=e.next,e.next.prev=e.prev}return this._length--,e.data}return null},t.prototype.size=function(){return this._length},t.prototype.toArray=function(){for(var t=[],e=this._head;e;)t.push(e.data),e=e.next;return t},t.prototype.toString=function(){return this.toArray().toString()},t.prototype.get=function(t){var e=this._head;if("function"==typeof e.data.is)for(;e;){if(e.data.is(t))return e.data;e=e.next}else console.log("This type <"+t+"> does not support this method.");return null},t}();e.LinkedList=n},function(t,e,n){var i=n(6),o=n(5),s=n(1),r=function(){function t(t,e){this._nodeClass=t,this._engine=e,this._nodes=new o.NodeList,this._entities=new s.Dictionary,this._components=new s.Dictionary;var n=this._nodeClass.prototype;for(var r in n)if(n.hasOwnProperty(r)&&"types"!==r&&"next"!==r&&"previous"!==r&&"constructor"!==r&&"super"!==r&&"extend"!==r&&"entity"!==r){var a=n.types[r];this._components.add(a,r)}this._nodePool=new i.NodePool(this._nodeClass,this._components),this._nodePool.dispose(this._nodePool.get())}return Object.defineProperty(t.prototype,"nodeList",{get:function(){return this._nodes},enumerable:!0,configurable:!0}),t.prototype.newEntity=function(t){this.addIfMatch(t)},t.prototype.componentAddedToEntity=function(t,e){this.addIfMatch(t)},t.prototype.componentRemovedFromEntity=function(t,e){this._components.has(e)&&this.removeIfMatch(t)},t.prototype.removeEntity=function(t){this.removeIfMatch(t)},t.prototype.addIfMatch=function(t){if(!this._entities.has(t)){this._components.forEach(function(e){!t.has(e)});var e=this._nodePool.get();e.entity=t,this._components.forEach(function(n,i){e[i]=t.get(n)}),this._entities.add(t,e),this._nodes.add(e)}},t.prototype.removeIfMatch=function(t){if(this._entities.getValue(t)){var e=this._entities.getValue(t);this._entities.remove(t),this._nodes.remove(e),this._engine.updating?(this._nodePool.cache(e),this._engine.updateComplete.add(this._releaseNodePoolCache,this)):this._nodePool.dispose(e)}},t.prototype._releaseNodePoolCache=function(){this._engine.updateComplete.detachAll(),this._nodePool.releaseCache()},t.prototype.cleanUp=function(){for(var t=this._nodes.head;t;t=t.next)this._entities.remove(t.entity);this._nodes.removeAll()},t}();e.ComponentsFamily=r},function(t,e,n){var i=n(2),o=function(){function t(){this.head=null,this.tail=null,this.nodeAdded=new i,this.nodeRemoved=new i}return t.prototype.add=function(t){this.head?(this.tail.next=t,t.previous=this.tail,t.next=null,this.tail=t):(this.head=this.tail=t,t.next=t.previous=null),this.nodeAdded.dispatch(t)},t.prototype.remove=function(t){this.head===t&&(this.head=this.head.next),this.tail===t&&(this.tail=this.tail.previous),t.previous&&(t.previous.next=t.next),t.next&&(t.next.previous=t.previous),this.nodeRemoved.dispatch(t)},t.prototype.removeAll=function(){for(;this.head;){var t=this.head;this.head=t.next,t.previous=null,t.next=null,this.nodeRemoved.dispatch(t)}this.tail=null},t.prototype.empty=function(){return null===this.head},t.prototype.swap=function(t,e){if(t.previous===e)t.previous=e.previous,e.previous=t,e.next=t.next,t.next=e;else if(e.previous===t)e.previous=t.previous,t.previous=e,t.next=e.next,e.next=t;else{var n=t.previous;t.previous=e.previous,e.previous=n,n=t.next,t.next=e.next,e.next=n}this.head===t?this.head=e:this.head===e&&(this.head=t),this.tail===t?this.tail=e:this.tail===e&&(this.tail=t),t.previous&&(t.previous.next=t),e.previous&&(e.previous.next=e),t.next&&(t.next.previous=t),e.next&&(e.next.previous=e)},t.prototype.insertionSort=function(t){if(this.head!==this.tail)for(var e=this.head.next,n=e;n;n=e){e=n.next;for(var i=n.previous;i;i=i.previous)if(t(n,i)>=0){n!==i.next&&(this.tail===n&&(this.tail=n.previous),n.previous.next=n.next,n.next&&(n.next.previous=n.previous),n.next=i.next,n.previous=i,n.next.previous=n,i.next=n);break}i||(this.tail===n&&(this.tail=n.previous),n.previous.next=n.next,n.next&&(n.next.previous=n.previous),n.next=this.head,this.head.previous=n,n.previous=null,this.head=n)}},t.prototype.mergeSort=function(t){if(this.head!==this.tail){for(var e,n,i=this.head;i;){for(n=i;n.next&&t(n,n.next)<=0;)n=n.next;var o=n.next;i.previous=n.next=null,e.push(i),i=o}for(;e.length>1;);for(this.tail=this.head=e[0];this.tail.next;)this.tail=this.tail.next}},t.prototype._merge=function(t,e,n){var i,o;for(n(t,e)<=0?(o=i=t,t=t.next):(o=i=e,e=e.next);t&&e;)n(t,e)<=0?(i.next=t,t.previous=i,i=t,t=t.next):(i.next=e,e.previous=i,i=e,e=e.next);return t?(i.next=t,t.previous=i):(i.next=e,e.previous=i),o},t}();e.NodeList=o},function(t,e){var n=function(){function t(t,e){this._nodeClass=t,this._components=e}return t.prototype.get=function(){if(this._tail){var t=this._tail;return this._tail=this._tail.previous,t.previous=null,t}var e=new this._nodeClass;return e},t.prototype.dispose=function(t){this._components.forEach(function(e,n){t[n]=null}),t.entity=null,t.next=null,t.previous=this._tail,this._tail=t},t.prototype.cache=function(t){t.previous=this._cacheTail,this._cacheTail=t},t.prototype.releaseCache=function(){for(;this._cacheTail;){var t=this._cacheTail;this._cacheTail=t.previous,t.next=null,t.previous=this._tail,this._tail=t}},t}();e.NodePool=n},function(t,e,n){var i=n(1),o=n(3),s=n(4),r=n(2),a=function(){function t(){this._systemList=new o.LinkedList,this._entityList=new o.LinkedList,this._sceneList=new o.LinkedList,this._entityNames=new i.Dictionary,this._sceneNames=new i.Dictionary,this._families=new i.Dictionary,this.updateComplete=new r,this.familyClass=s.ComponentsFamily}return Object.defineProperty(t.prototype,"entities",{get:function(){return this._entityList.toArray()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"scenes",{get:function(){return this._sceneList.toArray()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"systems",{get:function(){return this._systemList.toArray()},enumerable:!0,configurable:!0}),t.prototype.addEntity=function(t){if(this._entityNames.has(t.name))throw new Error("The entity name "+t.name+" is already in use by another entity.");this._entityList.add(t),this._entityNames.add(t.name,t),t.componentAdded.add(this._componentAdded,this),t.componentRemoved.add(this._componentRemoved,this),t.nameChanged.add(this._entityNameChanged,this),this._families.forEach(function(e,n){n.newEntity(t)})},t.prototype.removeEntity=function(t,e){t.componentAdded.detachAll(),t.componentRemoved.detachAll(),t.nameChanged.detachAll(),this._families.forEach(function(e,n){n.removeEntity(t)}),this._entityNames.remove(t.name),this._entityList.remove(e)},t.prototype.getEntityByName=function(t){return this._entityNames.has(t)?this._entityNames.getValue(t):null},t.prototype.removeAllEntities=function(){for(var t=this._entityList.size()-1,e=t;e>=0;e--)this.removeEntity(this._entityList.item(e),e)},t.prototype.addScene=function(t){this._sceneList.add(t),this._sceneNames.add(t.name,t),t.nameChanged.add(this._sceneNameChanged,this)},t.prototype.removeScene=function(t,e){if("undefined"==typeof e)for(var n=0;n<this._sceneList.size();n++)this._sceneList.item(n)===t&&this._sceneList.remove(n);else this._sceneList.remove(e);this._sceneNames.remove(t.name),t.nameChanged.detachAll()},t.prototype.removeAllScenes=function(){for(var t=this._sceneList.size()-1,e=t;e>=0;e--)this.removeScene(this._sceneList.item(e),e)},t.prototype.getSceneByName=function(t){return this._sceneNames.has(t)?this._sceneNames.getValue(t):null},t.prototype.getScene=function(t){return this._sceneList.get(t)},t.prototype.getNodeList=function(t){if(this._families.has(t))return this._families.getValue(t)._nodes;var e=new this.familyClass(t,this);this._families.add(t,e);for(var n=0;n<this._entityList.size();n++)e.newEntity(this._entityList.item(n));return e.nodeList},t.prototype.releaseNodeList=function(t){if(!this._families.has(t))throw new Error("The given nodeClass was not found and can not be released.");this._families.getValue(t).cleanUp(),this._families.remove(t)},t.prototype.addSystem=function(t,e){t.priority=e,t.addToEngine(this),this._systemList.add(t)},t.prototype.getSystem=function(t){return this._systemList.get(t)},t.prototype.removeSystem=function(t,e){if("undefined"==typeof e)for(var n=0;n<this._systemList.size();n++)this._systemList.item(n)===t&&this._systemList.remove(n);else this._systemList.remove(e);t.removeFromEngine(this)},t.prototype.removeAllSystems=function(){for(var t=this._systemList.size()-1,e=t;e>=0;e--)this.removeSystem(this._systemList.item(e),e)},t.prototype.update=function(t){this.updating=!0;for(var e=this._systemList.size(),n=0;e>n;n++)this._systemList.item(n).update(t);this.updating=!1,this.updateComplete.dispatch()},t.prototype._entityNameChanged=function(t,e){if(!this._entityNames.has(e))throw new Error("The given name was not found in the entity list.");this._entityNames.remove(e),this._entityNames.add(t.name,t)},t.prototype._sceneNameChanged=function(t,e){if(!this._sceneNames.has(e))throw new Error("The given name was not found in the scene list.");this._sceneNames.remove(e),this._sceneNames.add(t.name,t)},t.prototype._componentAdded=function(t,e){this._families.forEach(function(n,i){i.componentAddedToEntity(t,e)})},t.prototype._componentRemoved=function(t,e){this._families.forEach(function(n,i){i.componentRemovedFromEntity(t,e)})},t}();e.Engine=a},function(t,e,n){var i=n(1),o=n(2),s=function(){function t(e){void 0===e&&(e=""),this._components=new i.Dictionary,this.componentAdded=new o,this.componentRemoved=new o,this.nameChanged=new o,e.length>0?this._name=e:this._name="_entity"+ ++t.nameCount}return Object.defineProperty(t.prototype,"name",{get:function(){return this._name},set:function(t){if(this._name!==t){var e=this._name;this._name=t,this.nameChanged.dispatch(this,e)}},enumerable:!0,configurable:!0}),t.prototype.add=function(t,e){return"undefined"==typeof e&&(e=t.constructor),this._components.has(e)&&this.remove(e),this._components.add(e,t),this.componentAdded.dispatch(this,e),this},t.prototype.remove=function(t){var e=this._components.getValue(t);return e?(this._components.remove(t),this.componentRemoved.dispatch(this,t),e):null},t.prototype.get=function(t){return this._components.getValue(t)},t.prototype.getAll=function(){var t=[];return this._components.forEach(function(e,n){t.push(n)}),t},t.prototype.has=function(t){return this._components.has(t)},Object.defineProperty(t.prototype,"scene",{set:function(t){this._addedToScene=t},enumerable:!0,configurable:!0}),t.nameCount=0,t}();e.Entity=s},function(t,e){var n=function(){function t(){this.entity=null,this.previous=null,this.next=null}return t}();e.Node=n},function(t,e,n){var i=n(3),o=n(1),s=n(2),r=function(){function t(e){void 0===e&&(e=""),this._entities=new o.Dictionary,this.entityAdded=new s,this.entityRemoved=new s,this._entityList=new i.LinkedList,this.nameChanged=new s,e?this._name=e:this._name="_scene"+ ++t.nameCount}return Object.defineProperty(t.prototype,"name",{get:function(){return this._name},set:function(t){if(this._name!==t){var e=this._name;this._name=t,this.nameChanged.dispatch(this,e)}},enumerable:!0,configurable:!0}),t.prototype.addEntity=function(t,e){return"undefined"==typeof e&&(e=t.constructor),this._entityList.add(t),this.entityAdded.dispatch(this,e),t.scene=this,this},t.prototype.removeEntity=function(t){this._entityList.remove(t)},t.prototype.getEntityWithName=function(t){for(var e=0;e<this._entityList.size();e++)if(this._entityList.item(e).name===t)return this._entityList.item(e)},t.prototype.getEntityWithComponent=function(t,e){for(var n=0;n<this._entityList.size();n++)if(this._entityList.item(n).has(e)&&this._entityList.item(n).get(e).displayObject===t)return this._entityList.item(n);return null},t.prototype.getAllEntity=function(){var t=[];return this._entities.forEach(function(e,n){t.push(n)}),t},t.prototype.hasEntity=function(t){return this._entities.has(t)},t.prototype.is=function(t){return t.prototype.isPrototypeOf(this)},t.nameCount=0,t}();e.Scene=r},function(t,e){var n=function(){function t(){this.previous=null,this.next=null,this.priority=0}return t.prototype.addToEngine=function(t){throw new Error("Don't call the abstract class directly, this method must be overridden.")},t.prototype.removeFromEngine=function(t){throw new Error("Don't call the abstract class directly, this method must be overridden.")},t.prototype.update=function(t){throw new Error("Don't call the abstract class directly, this method must be overridden.")},t.prototype.is=function(t){return t.prototype.isPrototypeOf(this)},t}();e.System=n,n.prototype.previous=null,n.prototype.next=null,n.prototype.priority=0}]);
//# sourceMappingURL=silverback.js.map