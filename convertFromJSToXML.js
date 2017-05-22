function createLabel(key, jsonResponse){
  var res=[];
  var str='';
  if((jsonResponse===null && typeof key ==='object')|| typeof jsonResponse[key] === 'object'){
    str += '\n<'+key+'>';
    res.push(str);
    var end = str.slice(0,2)+'/'+str.slice(2);
    res.push(end);
  } else {
    res.push('\n<'+key+'>'+jsonResponse[key]+'</'+key+'>');
  }
  return res;
}

var xmlResponse = function (jsonResponse, prev){
  var result = '';
  if(jsonResponse instanceof Array){
    for(var item in jsonResponse){
      result += '\n<'+prev+'>';
      result += xmlResponse(jsonResponse[item], jsonResponse);
      result += '\n</'+prev+'>';
    }
  } else if(jsonResponse instanceof Object){
    for(var key in jsonResponse){
        if(jsonResponse[key] instanceof Array){
          result += xmlResponse(jsonResponse[key], key);
          continue;
        }
        var labels = createLabel(key, jsonResponse);
        if(labels.length === 2){
          result += labels[0];
          result += xmlResponse(jsonResponse[key], key);
          result += labels[1];
        } else {
          result += labels[0];
        }
    }
  } else {
    result += jsonResponse;
  }
  return result;
};
