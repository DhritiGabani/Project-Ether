let classes = {
  0: "Bronchiectasis",
  1: "Bronchiolitis",
  2: "COPD",
  3: "Healthy",
  4: "Pneumonia",
  5: "URTI",
};

function handleClickEvent() {
  document.getElementById("audio-selector").click();
}

function uploadAudio(files) {
  var fileReader = new FileReader();
  fileReader.readAsArrayBuffer(files[0]);
  let data = {
    fileName: files[0].name,
  };
  console.log(files[0].name);
  document.getElementById("spinner").style.display = "block";
  passParams(data);
}

function passParams(data) {
  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    url: "http://localhost:8888/resp-success",
    success: function (data) {
      document.getElementById("spinner").style.display = "none";
      data = data.toString().replace("[", "").replace("]", "").split(",");
      console.log(data);

      document.getElementById("results").style.display = "block";
      for (let i = 0; i < 6; i++) {
        className = `cat${i}`;
        probName = `cat${i}prob`;
        document.getElementById(className).innerHTML = classes[i];
        document.getElementById(probName).innerHTML = data[i] + " %";
      }
    },
  });
}
