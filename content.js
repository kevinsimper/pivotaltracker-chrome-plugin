$('body *').each(function(){
  var text = $(this).text().trim();
  var combinations = ['[#', '[Finishes #']


  for(var i = 0; i < combinations.length; i++ ) {
    var key = combinations[i];

    if(text.indexOf(key) !== -1 && $(this).children().length === 0){
      var storyId = text.split(key)[1].split(']')[0]
      var storyIdWithBrackets = key + storyId + ']';
      var link = '<a href="https://www.pivotaltracker.com/story/show/' + storyId + '">' + storyIdWithBrackets + '</a>'
      var textWithoutId = text.replace(key + storyId + ']', '');
      $(this).html(link + textWithoutId);
    }
  }
})