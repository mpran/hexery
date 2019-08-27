'use strict';

import { ExactSearchView } from './views/index.js';

window.addEventListener('click', (e) => {
  if (e.target.href !== undefined) {
    chrome.tabs.create({ url: e.target.href })
  }
});

$(() => {

  $("#search_button").click(() => {
    searchHexPm();
  });

  chrome.storage.local.get('state', (data) => { data && ExactSearchView.applyResultsToView(data.state); });
});

$(document).keypress((e) => {
  if (e.which === 13) {
    searchHexPm();
  }
});

const searchHexPm = () => {
  $("#error_msg").html("");
  const search_text = $("#search_text").val();

  if (search_text === "") {
    $("#error_msg").html("Enter search text");
    return;
  }

  $("#search_text").val("");

  const url = `https://hex.pm/api/packages?search=${search_text}&sort=recent_downloads`;

  $.getJSON(url,
    (data) => {
      if (data && data.length > 0) {
        ExactSearchView.applyResultsToView(data);
        chrome.storage.local.set({ 'state': data });
      }
      else {
        $("#error_msg").html("0 results found");
      }
    });
}
