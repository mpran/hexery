'use strict';

const applyResultsToView = (data) => {
  if (!data) return '';

  let html = '';

  if (data.length > 0) {
    data.forEach((result) => {
      html = html + `
      <div title="${result.meta.description}"><h4><u>${result.name}</u> (${result.releases[0].version})</h4></div>
      <div>Total Downloads ${result.downloads.all}</div>
      <div style="display: ${result.meta.links.GitHub == null ? 'none' : 'inherit'}"><a href="${result.meta.links.GitHub}">Github</a></div>
      <div style="display: ${result.meta.links.Docs == null ? 'none' : 'inherit'}"><a href="${result.meta.links.Docs}">Docs</a></div>
      <div><a href="${result.html_url}" target="_blank">Page</a></div>
      `
    });
  }

  $("#exact_search_results").html(html);
  $("#exact_search_results").show();
  $("#other_search_results").hide();
}

export default { applyResultsToView }
