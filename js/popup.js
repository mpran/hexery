window.addEventListener('click',function(e){
  if(e.target.href !== undefined){
    chrome.tabs.create({url:e.target.href})
  }
});

$(function(){

  $("#search_button").click(function(){
    search_hex_pm();
  });

  chrome.storage.sync.get('state', function(data){ apply_results_to_view(data.state); });

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

  var url = "http://li1034-58.members.linode.com:8080/api/hex_search?search=";

  $.getJSON(url + search_text,
    function(data){
      if (data.exact_match_package_count > 0){
        apply_results_to_view(data);
        chrome.storage.sync.set({'state': data});
      }
      else{
        $("#error_msg").html("0 results found");
      }

    });
}
