window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
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
    if(e.which == 13) {
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

function apply_results_to_view(data) {
  var total_results = data.exact_match_package_count + data.package_count
  var html = '';

  //html = '<h3>Results: '+ data.exact_match_package_count +'</h3>';

  if (data.exact_match_package_count > 0){
    for(var i=0; i < data.exact_match_package_count; i++){
      package = data.exact_match_packages[i];
      name = package.name;
      hex_url = "https://hex.pm" + package.hex_url;
      github_url = package.github_url;
      docs_url = package.docs_url;
      downloads = package.downloads;
      description = package.description;
      config = format_config(package.config);
      github_url_visibility = github_url == null? 'none': 'inherit';
      docs_url_visibility = docs_url == null? 'none': 'inherit';
      latest_version = package.latest_version;

      name_html = '<div title="'+ package.description +'"><h4><u>'+ name +'</u> ('+ latest_version +')</h4></div>';
      downloads_html = '<div>Downloads '+ downloads +'</div>';
      github_url_html = '<div style="display: '+ github_url_visibility +'"><a href="'+ github_url +'">Github</a></div>';
      docs_url_html = '<div style="display: '+ docs_url_visibility +'"><a href="'+ docs_url +'">Docs</a></div>';
      exact_package_html = name_html + downloads_html + github_url_html + docs_url_html + config ;
      html = html + exact_package_html;
    }
  }
  $("#search_results").html(html);
}

function format_config(configs){
  var html = '<div><b>Config</b></div>'
  for(var i = 0; i < configs.length; i++){
    var config = format_config_result(configs[i]);
    html = html + config;
  }

  return html;
}

function format_config_result(config){
  var html = '<div>' + config.language + '</div>';
  html = html + '<div class="row"><div class="col-lg-6"><div class="input-group">';

  html = html + '<div><input readonly class="form-control col-md-4" value="' + config.package.toString().replace(/"/g, '&quot;') + '"/></div>';
  html = html + '<span class="input-group-btn">';
  //html = html + '<button class="btn btn-secondary" type="button">Copy</button>'
  html = html + '</span></div></div></div></div></div>';

  return html;
}
