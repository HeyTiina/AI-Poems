function displayPoem(response) {
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 2,
    cursor: "",
  });
}

async function generatePoem(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "2a830c1f5845c71a9b8c68a49820t94o";
  let context = `
    You are a funny Poem expert and love to write short poems. Your mission is to generate a 4 line poem in basic HTML and separate each line with a <br />.
    Make sure to follow the user instructions. Do not include a title to the poem. Sign the poem with 'Tina AI' inside a <strong> element at the end of the poem and NOT at the beginning.
  `;
  let prompt = `User instructions: Generate a funny poem about ${instructionsInput.value}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `<div class="generating">⏳ Generating a funny poem about ${instructionsInput.value}</div>`;

  try {
    let response = await axios.get(apiURL);
    displayPoem(response);
  } catch (error) {
    poemElement.innerHTML = `<div class="error">❌ Error generating poem. Please try again later.</div>`;
    console.error("Error generating poem:", error);
  }
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem, { once: true });
