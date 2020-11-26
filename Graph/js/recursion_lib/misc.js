function isEqual(obj1,obj2){if(obj1 instanceof Array){if(!(obj2 instanceof Array))
return false;var i;if(obj1.length!=obj2.length)
return false;for(i=0;i<obj1.length;i++)
if(!isEqual(obj1[i],obj2[i]))
return false;return true;}
else if(obj1 instanceof Object){for(keys in obj1){if(!(keys in obj2))
return false;if(!isEqual(obj1[keys],obj2[keys]))
return false;}
for(keys in obj2){if(!keys in obj1)
return false;if(!isEqual(obj1[keys],obj2[keys]))
return false;}
return true;}
else
return obj1===obj2;}
function argToString(argumentArray){var i;var res="";for(i=0;i<argumentArray.length;i++){if(i>0)
res+=","
if(argumentArray[i]instanceof String){res+=argumentArray[i];}
else if(argumentArray[i]instanceof Number){res+=argumentArray[i].toString();}
else
res+=JSON.stringify(argumentArray[i]);}
return res;}