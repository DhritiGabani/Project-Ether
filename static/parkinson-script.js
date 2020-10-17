function handleClickEvent() {
  document.getElementById("image-selector").click();
}

$(document).on("change", "#image-selector", function () {
  let reader = new FileReader();

  reader.onload = function () {
    let dataURL = reader.result;
    $("#selected-image").attr("src", dataURL);
  };

  let file = $("#image-selector").prop("files")[0];
  reader.readAsDataURL(file);

  image = document.getElementById("selected-image");
  console.log("Image selected.");
  prediction(image);
});

let model;
(async function () {
  model = await tf.loadLayersModel(
    "http://localhost:8888/tfjs-models/Parkinsons-detection-model/model.json"
  );
  $(".spinner-border").hide();
})();

async function prediction(image) {
  let tensor = tf.browser
    .fromPixels(image)
    .resizeNearestNeighbor([200, 200])
    .toFloat()
    .div(tf.scalar(255.0))
    .expandDims();

  console.log("Shape : (" + tensor.shape + ")");
  console.log("Image Resized Succesfully.");
  let predictions = await model.predict(tensor).data();

  document.getElementById("results").style.display = "block";

  console.log("Predictions : " + predictions.toString());
  healthyProb = Math.floor(predictions[0] * 100);
  parkinsonsProb = Math.floor(predictions[1] * 100);

  $("#parkinson").text(parkinsonsProb + "%");
  $("#healthy").text(healthyProb + "%");
}
