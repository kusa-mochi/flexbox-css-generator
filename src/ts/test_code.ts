/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/bootstrap/index.d.ts" />

$(document).ready(() => {
  $('[data-toggle="offcanvas"]').click(() => {
    $('.row-offcanvas').toggleClass('active');
  });
});
