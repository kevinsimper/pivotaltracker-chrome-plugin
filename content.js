(function(){
  var combinations = ['[#', '[Finishes #']
  var $selectorAll = $('body *')

  var transform = function(){
    var text = $(this).text().trim();


    for(var i = 0; i < combinations.length; i++ ) {
      var key = combinations[i];

      if(text.indexOf(key) !== -1 && $(this).children().length === 0 && $(this).attr('href').indexOf('pivotaltracker') === -1){
        var storyId = text.split(key)[1].split(']')[0]
        var storyIdWithBrackets = key + storyId + ']';

        var url = 'https://www.pivotaltracker.com/story/show/' + storyId
        var link = $('<a></a>')
          .attr('href', url)
          .text(storyIdWithBrackets)
          .click(function(){
            window.location = url
          })

        var textWithoutId = text.replace(key + storyId + ']', '');
        $(this).empty().append(link).append($('<span></span>').text(textWithoutId));
      }
    }
  };

  $selectorAll.each(transform)

})();
