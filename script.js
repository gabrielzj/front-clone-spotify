const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");

const url = "http://localhost:3000/artists";
fetch(url)
  // converte a response para json
  .then((response) => response.json())
  .then((data) => {
    const artists = data;

    // EVENTO INPUT
    searchInput.addEventListener("input", function () {
      resultPlaylist.classList.add("hidden");
      resultArtist.classList.remove("hidden");
      const searchTerm = searchInput.value.toLowerCase();

      const matchArtist = artists.filter((artist) => {
        return artist.name.toLowerCase().includes(searchTerm);
      });

      if (matchArtist.length > 0) {
        const artimg = document.querySelector("#artist-img");
        const artName = document.querySelector("#artist-name");

        matchArtist.forEach((artist) => {
          artimg.src = artist.urlImg;
          artName.innerHTML = artist.name;
        });
      } else {
        const containerPlaylist = document.querySelector("#result-playlists");
        containerPlaylist.innerHTML = "";
        const contentContainer = document.createElement("div");
        const paragraph = document.createElement("p");
        paragraph.innerHTML = "<p>Sem resultados</p>";
        contentContainer.appendChild(paragraph);
      }

      if (searchTerm === "") {
        resultPlaylist.classList.remove("hidden");
        resultArtist.classList.add("hidden");
        return;
      }
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
