define([],function(){return Backbone.Model.extend({initialize:function(a){this.app=a},finalize:function(f){var a=this;this.map_dict={};if(!this.app.section){return{}}f=f||{};var e={};var d={};this._iterate(this.app.section.$el,d);function c(i,h,g){e[i]=g;a.map_dict[i]=h}function b(n,q){for(var l in q){var j=q[l];if(j.input){var s=j.input;var m=n;if(n!=""){m+="|"}m+=s.name;switch(s.type){case"repeat":var h="section-";var v=[];var p=null;for(var u in j){var o=u.indexOf(h);if(o!=-1){o+=h.length;v.push(parseInt(u.substr(o)));if(!p){p=u.substr(0,o)}}}v.sort(function(w,i){return w-i});var l=0;for(var k in v){b(m+"_"+l++,j[p+v[k]])}break;case"conditional":var t=a.app.field_list[s.id].value();if(f[s.test_param.type]){t=f[s.test_param.type](t)}c(m+"|"+s.test_param.name,s.id,t);var g=a.matchCase(s,t);if(g!=-1){b(m,q[s.id+"-section-"+g])}break;default:var r=a.app.field_list[s.id];var t=r.value();if(f[s.type]){t=f[s.type](t)}if(!r.skip){if(s.optional&&r.validate&&!r.validate()){t=null}c(m,s.id,t)}}}}}b("",d);return e},match:function(a){return this.map_dict&&this.map_dict[a]},matchCase:function(a,c){if(a.test_param.type=="boolean"){if(c=="true"){c=a.test_param.truevalue||"true"}else{c=a.test_param.falsevalue||"false"}}for(var b in a.cases){if(a.cases[b].value==c){return b}}return -1},matchModel:function(c,e){var a={};var b=this;function d(f,o){for(var l in o){var h=o[l];var m=h.name;if(f!=""){m=f+"|"+m}switch(h.type){case"repeat":for(var k in h.cache){d(m+"_"+k,h.cache[k])}break;case"conditional":var p=h.test_param&&h.test_param.value;var g=b.matchCase(h,p);if(g!=-1){d(m,h.cases[g].inputs)}break;default:var n=b.map_dict[m];if(n){e(n,h)}}}}d("",c.inputs);return a},matchResponse:function(c){var a={};var b=this;function d(k,h){if(typeof h==="string"){var f=b.map_dict[k];if(f){a[f]=h}}else{for(var g in h){var e=g;if(k!==""){var j="|";if(h instanceof Array){j="_"}e=k+j+e}d(e,h[g])}}}d("",c);return a},_iterate:function(c,d){var a=this;var b=$(c).children();b.each(function(){var g=this;var f=$(g).attr("id");if($(g).hasClass("section-row")){d[f]={};var e=a.app.input_list[f];if(e){d[f]={input:e}}a._iterate(g,d[f])}else{a._iterate(g,d)}})}})});