document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== '') {
        showWarning('Carregando...');
        clearInfo();
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5c7fec2e4a7c3a8a72a3c3a7f3717567&units=metric&lang=pt_br`);
        
        let json = await results.json();
        if(json.cod === 200){
            showResults({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                descTemp: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,

            })
        }else {
            clearInfo();
            showWarning('Localização não encontrada!')
        }
    } else {
        clearInfo();
    }
});

function showResults(obj) {
    showWarning('');
    
    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
    document.querySelector('.tempInfo').innerHTML= `${obj.temp} <sup>ºC</sup>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
    document.querySelector('.temp .descTemp').innerHTML= `${obj.descTemp}`;
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`
    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = 'block';

}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
    
}