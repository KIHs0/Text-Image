const userInput = document.getElementById("userinput");
const btn = document.getElementById("btn");
console.log(btn.disabled);
const apiKey = "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";

function randomnumberfunction(min, max) {
  return Math.floor(Math.random() * max + min);
}
function togglethestateOfBtn(state) {
  btn.disabled = state;
  console.log(btn.disabled);
}
const maxImg = 4;

async function textImage(inputs) {
  togglethestateOfBtn(true);
  for (let i = 0; i < maxImg; i++) {
    let randomnumber = randomnumberfunction(1, 500);
    console.log(randomnumber);
    let prompts = ` ${inputs} ${randomnumber}`;
    console.log(prompts);
    const respose = await fetch(
      "https://router.huggingface.co/hf-inference/models/ZB-Tech/Text-to-Image",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(prompts),
      }
    );

    let count = 1;
    if (respose.ok) {
      console.log(`${respose.status}`);
      console.log(respose.headers.get("Content-Type"));
      // console.log("Response data:", JSON.stringify(data, null, 2));
      const data = await respose.blob();
      const urlformat = URL.createObjectURL(data);

      const img = document.createElement("img");
      img.src = urlformat;
      img.alt = `image${count}`;
      img.onclick = () => {
        downloadimg(urlformat);
      };
      //DOM
      const result = document.getElementById("result");
      result.appendChild(img);
    } else {
      console.error("Response URL:", respose.url);
      console.log(`request failed with status : ${respose.status}`);
      const errdata = await respose.blob();
      console.log(errdata);
      // console.error("Error Details:", JSON.stringify(errorData, null, 2));
    }
    count++;
  }
  togglethestateOfBtn(false);
}

// togglethestateOfBtn(false);

userInput.addEventListener("change", () => {
  const prompt = userInput.value;
  console.log({ 6: prompt });
  btn.addEventListener("click", () => {
    textImage(prompt);
  });
});

//   btn.addEventListener("click", () => {
//     textImage(prompt);
//   });

function downloadimg(x) {
  const link = document.createElement("a");
  link.href = x;
  link.download = "image.jpg";
  link.click();
}
