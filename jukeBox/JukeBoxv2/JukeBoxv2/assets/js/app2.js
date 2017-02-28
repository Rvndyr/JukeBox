(function(){
	const button = document.querySelector('.js-search');
	const input = document.querySelector('.js-music-input');
	const results = document.querySelector('.js-results')
	const playlist = document.querySelector('.js-playlist');

		// Validate User inpout
	function validateSearch() {
		const searchTerm = input.value;
		input.value = "";

		if (searchTerm.trim() === "") {
			alert('Please input a value!')
			return;
		}
		input.setAttribute('disabled', 'disabled');
		button.setAttribute('disabled', 'disabled');
		getArtist(searchTerm).then((artist) => {
			//get artist top songs
			const artistId = artist.artists.items[0].id
			return getArtistTopSongs(artistId)
		}).then((songs) => {
			renderSong(songs)

		})
	}// Validate Search Closing


	//Return Artist info
	function getArtist(artistName){
		return new Promise((resolve, reject) => {
			let url = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`
			const http = new XMLHttpRequest()
			http.open('GET', url);
			http.onreadystatechange = () => {
				const isReqReady = http.readyState === XMLHttpRequest.DONE;
				const isReqDone = http.status === 200;

				if (isReqReady && isReqDone) {
	      			resolve(JSON.parse(http.responseText))
	      		} // if request is complete, show the goodz
			}
			 http.send();

		})//End of Promise
	} // getArtist Closing

	//get artists top songs
	function getArtistTopSongs(artistId){
		return new Promise((resolve, reject) => {
			const url =`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=SE`
			console.log(url)
			const http = new XMLHttpRequest()
			http.open('GET', url);
			http.onreadystatechange = () => {
				const isReqReady = http.readyState === XMLHttpRequest.DONE;
				const isReqDone = http.status === 200;

				if (isReqReady && isReqDone) {
					resolve(JSON.parse(http.responseText))
				}
			}


			http.send();

		})
	}


    function renderSong(songs){
		
		const tracks = songs.tracks
		for(let i = 0; i < tracks.length; i++){
			addTrackToHTML(tracks[i])
		}

	}//Main Render function Closing



		const addTrackToHTML = (track) => {
			// console.log(track)
			const {name, preview_url, id, album} = track;
			const imageUrl = album.images[1].url;



				 // add the generate HTML contents to the search results div
			 const div = document.createElement('div');
			 div.classList.add('ui','card');
			 div.innerHTML = getCardMarkup(name, preview_url, id, album, imageUrl);
			 results.appendChild(div);

					 div.addEventListener('click',() => {
							 PlaylistManager.addTrack(track);
							 const currentIndex = PlaylistManager.tracks.length - 1;
							 console.log(currentIndex);

							 const playlistTrack = document.createElement('div');
							 playlistTrack.classList.add('ui', 'card', 'trackid-' + id);
							 playlistTrack.innerHTML = `
								<div class="item playlist-track trackid-${id}">
									 <a href="#" class="playlist-close js-playlist-close">
											 <i class="icon remove"></i>
									 </a>
									 <div class="ui tiny image">
										 <img src="${imageUrl}">
									 </div>
									 <div class="middle aligned content playlist-content">
										 ${name}
									 </div>
								</div>
											 <audio controls style="width: 100%;">
													 <source src="${preview_url}">
											 </audio>
													 `
							 playlist.appendChild(playlistTrack)

							 // get the AUDIO tag
							 const audio = playlistTrack.querySelector('audio');

							 audio.addEventListener('play', () => {
									 PlaylistManager.currentSong = currentIndex;
							 })

							 audio.addEventListener('ended', () => {
									 console.log('done!')
									 const nextTrackId = PlaylistManager.getNextSong();

									 setTimeout(() => {
											 document.querySelector(`.trackid-${nextTrackId} audio`).play();
									 }, 1000);

							 })
					})

		}//End of Addtracks to HTML

		const getCardMarkup = (name, preview_url, id, album, imageUrl) => {
		       let html = `
		           <div class="image">
		               <img src="${imageUrl}">
		           </div>
		           <div class="content">
		               <a class="header">${name}</a>
		               <div class="meta">${album.name}</div>
		               <div class="description">
		                   <audio controls class="${id}" style="width: 100%;">
		                       <source src="${preview_url}">
		                   </audio>
		               </div>
		           </div>
		       `;

		       return html;
		}




//#################### Submit #################
	button.addEventListener('click',()=>{validateSearch()})
	input.addEventListener('keydown',(e)=>{
		if(e.keyCode === 13){
			validateSearch()
		}
	})

})();


