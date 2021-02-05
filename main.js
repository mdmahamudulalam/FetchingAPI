const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.status.toLowerCase().includes(searchString)
    );
  });

  displayCharacters(filteredCharacters);
});

let hpCharacters = [];

const loadCharacters = async () => {
  try {
    const res = await fetch("http://api.tvmaze.com/shows?page=1");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (error) {
    console.error(error);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
        <li class = "character">
        <h4> ${character.name}</h>
        <p> ${character.status}</p>
        </li>
        `;
    })
    .join("");

  charactersList.innerHTML = htmlString;
};
loadCharacters();
