const form = document.querySelector('#video-form');
const videoDiv = document.querySelector('#video-player');
const videoScreen = document.querySelector('#video-screen');

const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));

fetch('http://localhost:8080/video/all')
    .then(result => result.json())
    .then(result => {

        const myVids = document.querySelector('#your-videos');
        if(result.length > 0){
            for(let vid of result){
                const li = document.createElement('LI');
                const link = document.createElement('A');
                link.innerText = vid;
                link.href = window.location.origin + window.location.pathname + '?video=' + vid;
                li.appendChild(link);
                myVids.appendChild(li);
            }
        }else{
            myVids.innerHTML = 'No videos found';
        }

    });

if(queryParams.video){

    videoScreen.src = `http://localhost:8080/video/${queryParams.video}`;
    videoDiv.style.display = 'block';
    document.querySelector('#now-playing')
        .innerText = 'Now playing ' + queryParams.video;

}

form.addEventListener('submit', ev => {
    ev.preventDefault();
    let data = new FormData(form);
    fetch('http://localhost:8080/video', {
        method: 'POST',
        body: data
    }).then(result => result.text()).then(_ => {
        window.location.reload();
    });


});

const initApp = async () => {
    const url = 'http://localhost:8080/play/media/v02/';
    const btn_play = document.querySelector('#btn_play');

    if (btn_play) {
        btn_play.addEventListener('click', async () => {
            videoScreen.src = url;
            videoDiv.style.display = 'block';
        });
    }
};

$(document).keydown(function(event){
    if(event.keyCode==123){
        return false;
    }
    else if (event.ctrlKey && event.shiftKey && event.keyCode==73){        
             return false;
    }
});

$(document).on("contextmenu",function(e){        
   e.preventDefault();
});


document.addEventListener('DOMContentLoaded', initApp());

