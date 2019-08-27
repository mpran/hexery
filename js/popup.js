'use strict';

import { ExactSearchView } from './views/index.js';

window.addEventListener('click',function(e){
  if(e.target.href !== undefined){
    chrome.tabs.create({url:e.target.href})
  }
});

$(function(){

  $("#search_button").click(function(){
    search_hex_pm();
  });

  chrome.storage.local.get('state', function (data) { data && ExactSearchView.applyResultsToView(data.state); });

});

$(document).keypress(function(e) {
  if(e.which === 13) {
      search_hex_pm();
  }
});

function search_hex_pm(){
  $("#error_msg").html("");
  var search_text = $("#search_text").val();

  if (search_text === "") {
    $("#error_msg").html("Enter search text");
    return;
  }

  $("#search_text").val("");

  var url = `https://hex.pm/api/packages?search=${search_text}&sort=recent_downloads`;

  $.getJSON(url,
    function(data){
      if (data && data.length > 0){
        ExactSearchView.applyResultsToView(data);
        chrome.storage.local.set({'state': data});
      }
      else{
        $("#error_msg").html("0 results found");
      }

    });
}
