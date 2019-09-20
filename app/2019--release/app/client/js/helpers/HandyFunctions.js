window.addMultipleListener = function (element, eventNames, listenerFunction, useCapture = false) {
  const events = eventNames.split(' ');
  for (let event of events) {
    element.addEventListener(event, listenerFunction, useCapture);
  }
}


document.onkeypress = (e) => {
  // Disable Enter key on forms & search bar
  if(!!e) {
    const node  = (e.target) ? e.target : ((e.srcElement) ? e.srcElement : null);
    const inputText = node.type == 'text' || node.type == 'search';
    const isMobile = (!!app && !!app.device) ? (app.device.device == 'mobile' ? true : false) : false;

    if ((e.keyCode == 13) && inputText && node.classList.contains('blur-on-mobile-enter') && isMobile) {
      // console.log('Do something');
      if(!!app && !!app.components.inputSearch) {
        app.components.inputSearch.blur(node);
      }
      return false;
    } else if ((e.keyCode == 13) && inputText && !node.classList.contains('allow-enter')) {
      return false;
    }
  }
}


window.getRandomNumberBetween = function(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}


window.getRandomNumberDivisibleBy = function(min, max, divisibleBy = 10) {
  return getRandomNumberBetween(min, max) * divisibleBy;
}


window.removeAllChild = function(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

window.location.replaceQueryParam = function (name, path, value) {
  // Find the param with regex
  // Grab the first character in the returned path (should be ? or &)
  // Replace our path with our new value, passing on the name and delimiter
  var re = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var matches = re.exec(path);
  var newUrl;

  if (matches === null) {
      // if there are no params, append the parameter
      newUrl = path + '?' + name + '=' + value;
  } else {
      var delimiter = matches[0].charAt(0);
      newUrl = path.replace(re, delimiter + name + "=" + value);
  }

  window.location.href = newUrl;
}
