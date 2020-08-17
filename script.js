///////get lyrics when user write on search button ////////

const searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener('click', function() {
const searchLyrics = document.getElementById("searchData").value
const result = document.getElementById("result");
result.innerHTML = "";
fetch(`https://api.lyrics.ovh/suggest/${searchLyrics}`)
.then(res => res.json())
.then(songs => {

///// showing lyrics result formate //////

    for (let i = 0; i < 10; i++) {
        result.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                <div class="col-md-9">
                                    <h3 class="lyrics-name">${songs.data[i].title}</h3>
                                    <p class="author lead">Album by <span><strong>${songs.data[i].artist.name}</strong></span></p>
                                </div>
                                 <div class="col-md-3 text-md-right text-center">
                                    <button id="${i}" class="btn btn-success">Get Lyrics</button>
                                </div>                          
                                </div>
                                    <div class="aa">
                                </div>`
            }

//// show full lyrics when user click on get lyrics button///////

            let getFullLyrics
            if (getFullLyrics == undefined) {
                getFullLyrics = 0;
            }
            for (let i = 0; i < 10; i++) {
                const getLyricsBtn = document.getElementById(i)
                getLyricsBtn.addEventListener("click", function() {
                    const artist = songs.data[i].artist.name;
                    const title = songs.data[i].title;
                    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
                        .then(res => res.json())
                        .then(data => {
                            document.getElementsByClassName("aa")[getFullLyrics].innerText = "";
                            document.getElementsByClassName("aa")[i].innerHTML = `<div class="single-lyrics text-center">
                                                                                        <button class="btn go-back">&lsaquo;</button>
                                                                                        <h2 class="text-success mb-4">${title} - ${artist}</h2>
                                                                                        <pre class="lyric text-white">
                                                                                        ${data.lyrics}
                                                                                        </pre>
                                                                                    </div>`
                            getFullLyrics = i;
                            console.log(data.lyrics);
                        })
                })
            }
        })
})


