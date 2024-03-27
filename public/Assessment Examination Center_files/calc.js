$(document).ready(function () {
  $("#ec_calculator_instance").hide();
  $("#ec_calculator").on("click", function () {
    $("#ec_calculator_instance").show();
  });
  $("#closeButton").on("click", function () {
    $("#ec_calculator_instance").hide();
  });
  $("#ec_calculator_instance").draggable({ containment: $("#page-content") });
  $("select").css("cursor", 'url("/resources/images/BLACK.cur")');
  console.log("working...");
});
