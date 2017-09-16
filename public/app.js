$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<div class='panel panel-default'><div class='panel-heading'> <p data-id='" + data[i]._id + "'>" + data[i].title + "</p></div>" + "<div class='panel-body'><a target= _blank href='" + data[i].link + "'>Link to Article</p>");
    $("#articles").append("<button type='submit' id='savenote' class='btn btn-lg'><a href=''/scrape'>Add Note</a></button>")
  }
});

$(document).on("click", "p", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      $("#notes").append("<button data-id='" + data.note._id + "' id='deletenote'>Delete Note</button>");
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});




$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      console.log(data);
      $("#notes").empty();
    });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/delete/" + thisId
  }).done(function(data) {
    $("#notes").empty();
  });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
