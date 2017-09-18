function apply_results_to_view(data) {
  var total_results = data.exact_match_package_count + data.package_count
  var html = '';

  //html = '<h3>Results: '+ data.exact_match_package_count +'</h3>';

  if (data.exact_match_package_count > 0) {
    for (var i = 0; i < data.exact_match_package_count; i++) {
      package = data.exact_match_packages[i];
      name = package.name;
      hex_url = "https://hex.pm" + package.hex_url;
      github_url = package.github_url;
      docs_url = package.docs_url;
      downloads = package.downloads;
      description = package.description;
      config = format_config(package.config);
      github_url_visibility = github_url == null ? 'none' : 'inherit';
      docs_url_visibility = docs_url == null ? 'none' : 'inherit';
      latest_version = package.latest_version;

      name_html = '<div title="' + package.description + '"><h4><u>' + name + '</u> (' + latest_version + ')</h4></div>';
      total_downloads_html = '<div>Total Downloads ' + downloads + '</div>';
      github_url_html = '<div style="display: ' + github_url_visibility + '"><a href="' + github_url + '">Github</a></div>';
      docs_url_html = '<div style="display: ' + docs_url_visibility + '"><a href="' + docs_url + '">Docs</a></div>';
      exact_package_html = name_html + total_downloads_html + github_url_html + docs_url_html + config;
      html = html + exact_package_html;
    }
  }
  
  $("#exact_search_results").html(html);
  $("#exact_search_results").show();
  $("#other_search_results").hide();
}

function format_config(configs) {
  var html = '<div><b>Config</b></div>'
  for (var i = 0; i < configs.length; i++) {
    var config = format_config_result(configs[i]);
    html = html + config;
  }

  return html;
}

function format_config_result(config) {
  var html = '<div>' + config.language + '</div>';
  html = html + '<div class="row"><div class="col-lg-6"><div class="input-group">';

  html = html + '<div><input readonly class="form-control col-md-4" value="' + config.package.toString().replace(/"/g, '&quot;') + '"/></div>';
  html = html + '<span class="input-group-btn">';
  //html = html + '<button class="btn btn-secondary" type="button">Copy</button>'
  html = html + '</span></div></div></div></div></div>';

  return html;
}
