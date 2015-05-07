var combinations = ['[#', '[Finishes #']

var transform = function(){
  var text = $(this).text().trim();


  for(var i = 0; i < combinations.length; i++ ) {
    var key = combinations[i];

    if(text.indexOf(key) !== -1 && $(this).children().length === 0){
      if($(this).attr('href') && $(this).attr('href').indexOf('pivotaltracker') !== -1 ) {
        return false;
      }
      var storyId = text.split(key)[1].split(']')[0]
      var storyIdWithBrackets = key + storyId + ']';

      var url = 'https://www.pivotaltracker.com/story/show/' + storyId
      var link = $('<a class="tooltipped tooltipped-s" aria-label="Go to PivotalTracker"></a>')
        .attr('href', url)
        .text(storyIdWithBrackets)
        .click(function(e){
          e.stopPropagation()
          window.location = url
        })

      var textWithoutId = text.replace(key + storyId + ']', '');
      $(this).empty().append(link).append($('<span></span>').text(textWithoutId));
    }
  }
};

var transformLinks = function() {
  var $selectorAll = $('body *')
  $selectorAll.each(transform)
}

window.onpopstate = function (event) {
  transformLinks()
}

window.onload = function (event) {
  transformLinks()
}


window.history.pushState = (function(nativePushState) {
    return function(a,b,c) {
        nativePushState.apply(this, arguments); //Continue by calling native history.pushState
        setTimeout(transformLinks, 500)
    };
})(window.history.pushState)