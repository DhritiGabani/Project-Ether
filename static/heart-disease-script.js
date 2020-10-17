let flag = 0;

function handleForm() {
  document.getElementById("spinner").style.display = "block";
  data = {};
  data.age = parseInt(document.getElementById("age").value);

  document.getElementsByName("sex").forEach((btn) => {
    if (btn.checked) {
      data.sex = parseInt(btn.value);
    }
  });

  data.cp = parseInt(
    document.getElementById("cp").options[
      document.getElementById("cp").selectedIndex
    ].value
  );

  data.trestbps = parseInt(document.getElementById("trestbps").value);

  data.chol = parseInt(document.getElementById("chol").value);

  document.getElementsByName("fbs").forEach((btn) => {
    if (btn.checked) {
      data.fbs = parseInt(btn.value);
    }
  });

  data.restecg = parseInt(
    document.getElementById("restecg").options[
      document.getElementById("restecg").selectedIndex
    ].value
  );

  data.thalach = parseInt(document.getElementById("thalach").value);

  document.getElementsByName("exang").forEach((btn) => {
    if (btn.checked) {
      data.exang = parseInt(btn.value);
    }
  });

  data.oldpeak = parseInt(document.getElementById("oldpeak").value);

  data.slope = parseInt(
    document.getElementById("slope").options[
      document.getElementById("slope").selectedIndex
    ].value
  );

  data.ca = parseInt(
    document.getElementById("ca").options[
      document.getElementById("ca").selectedIndex
    ].value
  );

  data.thal = parseInt(
    document.getElementById("thal").options[
      document.getElementById("thal").selectedIndex
    ].value
  );

  console.log(JSON.stringify(data));

  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "text",
    url: "http://localhost:8888/HeartDisease-success",
    success: function (data) {
      flag = 1;
      changeLayout(data.toString());
    },
  });
}

function changeLayout(prediction) {
  if (flag == 1) {
    document.getElementById("spinner").style.display = "block";
    document.getElementById("form").style.display = "none";
    document.getElementById("results").style.display = "block";
    $(".resultHighCat").html(prediction);
  }
}
