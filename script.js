const player = document.getElementById('player')
const station = document.getElementById('station')
const clock = $('#clock')
const play = $('#play')
const prev = $('#prev')
const next = $('#next')

var stations = []
var playing = false
var stationNum = 0
var fullscreen = false

window.setInterval(updateTime, 1000);

function updateTime(){
    var date = new Date()
    var min = date.getMinutes()
    var txt = date.getHours() + ':'
    if(min < 10){
        txt += '0'+min
    }else{
        txt += min
    }
    clock.html(txt)

    if(playing){
        play.attr('src', 'pause.png')
    }else{
        play.attr('src', 'play.png')
    }
}

$.getJSON("stations.json", function(json){
    stations = json.stations
    setStation()
})

function setStation(){
    station.innerHTML = stations[stationNum].name
    if(playing){
        player.src = stations[stationNum].url
        player.play()
    }else{
        player.pause()
    }
}

play.click(function(){
    if(playing){
        playing = false 
        player.pause()
        player.src = ''
    }else{
        playing = true
        player.src = stations[stationNum].url
        player.play()
    }
    updateTime()
})

prev.click(function(){
    stationNum = (stationNum - 1) % stations.length 
    setStation()
})

next.click(function(){
    stationNum = (stationNum + 1) % stations.length 
    setStation()
})
/*
clock.click(function(){
    if(! fullscreen){
        var el = document.documentElement,
        rfs = el.requestFullscreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullscreen 

        rfs.call(el);
        fullscreen = true
    }
})
*/