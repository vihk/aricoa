async function getPrediction() {
  const text = document.getElementById("text-input").value;
  let results = "";
  if (text == "") {
    results = "You cannot classify an empty string.";
  } else {
    // Send the text to the server
    console.log("sent!");
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });
    // Get the response from the server
    console.log(response);
    const json = await response.json();
    //console.log(json.result[0]);
    // Use the response

    AIGenerated = Math.round(json.result[0] * 100);
    HumanGenerated = Math.round(json.result[1] * 100);
    results =
      "Predicted AI: " +
      AIGenerated +
      "%\n" +
      "Predicted Human: " +
      HumanGenerated +
      "%";
  }

  document.getElementById("text").textContent = results;
}
