function Map(){var keys=[];var values=[];this.put=function(key,value){var i;for(i=0;i<keys.length;i++){if(isEqual(keys[i],key)){var oldValue=values[i];values[i]=value;return oldValue;}}
keys.push(key);values.push(value);return null;}
this.get=function(key){var i;for(i=0;i<keys.length;i++){if(isEqual(keys[i],key))
return values[i];}
return null;}
this.clear=function(){while(keys.length>0)
keys.pop();while(values.length>0)
values.pop();}}