!function(o,s,r){function e(e,t,r){this.options=o.extend(i,r),this.$element=e,this.last_colliders=[],this.last_colliders_coords=[],"string"==typeof t||t instanceof jQuery?this.$colliders=o(t,this.options.colliders_context).not(this.$element):this.colliders=o(t),this.init()}var i={colliders_context:r.body},t=e.prototype;t.init=function(){this.find_collisions()},t.overlaps=function(o,t){var e=!1,r=!1;return(t.x1>=o.x1&&o.x2>=t.x1||t.x2>=o.x1&&o.x2>=t.x2||o.x1>=t.x1&&t.x2>=o.x2)&&(e=!0),(t.y1>=o.y1&&o.y2>=t.y1||t.y2>=o.y1&&o.y2>=t.y2||o.y1>=t.y1&&t.y2>=o.y2)&&(r=!0),e&&r},t.detect_overlapping_region=function(o,t){var e="",r="";return o.y1>t.cy&&t.y2>o.y1&&(e="N"),o.y2>t.y1&&t.cy>o.y2&&(e="S"),o.x1>t.cx&&t.x2>o.x1&&(r="W"),o.x2>t.x1&&t.cx>o.x2&&(r="E"),e+r||"C"},t.calculate_overlapped_area_coords=function(t,e){var r=Math.max(t.x1,e.x1),i=Math.max(t.y1,e.y1),s=Math.min(t.x2,e.x2),n=Math.min(t.y2,e.y2);return o({left:r,top:i,width:s-r,height:n-i}).coords().get()},t.calculate_overlapped_area=function(o){return o.width*o.height},t.manage_colliders_start_stop=function(r,l,a){var t,s,e,n,i=this.last_colliders_coords;for(t=0,s=i.length;s>t;t++)-1===o.inArray(i[t],r)&&l.call(this,i[t]);for(e=0,n=r.length;n>e;e++)-1===o.inArray(r[e],i)&&a.call(this,r[e])},t.find_collisions=function(x){for(var e,n,r,y,a,s,h,l,t=this,c=[],p=[],d=this.colliders||this.$colliders,_=d.length,i=t.$element.coords().update(x||!1).get();_--;)e=t.$colliders?o(d[_]):d[_],n=e.isCoords?e:e.coords(),r=n.get(),y=t.overlaps(i,r),y&&(a=t.detect_overlapping_region(i,r),"C"===a&&(s=t.calculate_overlapped_area_coords(i,r),h=t.calculate_overlapped_area(s),l={area:h,area_coords:s,region:a,coords:r,player_coords:i,el:e},t.options.on_overlap&&t.options.on_overlap.call(this,l),c.push(n),p.push(l)));return(t.options.on_overlap_stop||t.options.on_overlap_start)&&this.manage_colliders_start_stop(c,t.options.on_overlap_start,t.options.on_overlap_stop),this.last_colliders_coords=c,p},t.get_closest_colliders=function(t){var o=this.find_collisions(t);return o.sort(function(o,t){return"C"===o.region&&"C"===t.region?t.coords.y1>o.coords.y1||t.coords.x1>o.coords.x1?-1:1:t.area>o.area?1:1}),o},o.fn.collision=function(o,t){return new e(this,o,t)}}(jQuery,window,document);