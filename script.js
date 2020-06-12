function pembukaan(){
	$('#jago-ketik').append('<div id="frame-pembukaan">');

	let framePembukaan = $('#frame-pembukaan');
	framePembukaan.append('<h1 class="title">Jadi Jagoan Ngetik</h1>')
				  .append('<button id="play">PLAY</button>');

	let tinggiFrame = framePembukaan.height();
	let y = (tinggiBrowser - tinggiFrame) / 2; //vertikal letakan di tengah

	framePembukaan.css({ 'marginTop':y, 'text-align':'center' });
}

function play(){
	$('#play').click(function(){
		$(this).fadeOut('fast', function(){
			$('#frame-pembukaan').append('<div id="text-score">Score <span id="score">0</span></div>');
			randomCharacter(); //mulai keluarkan karakter
			ketik();
		});
	});
}

function randomCharacter(){
	let karakter = Math.random().toString(36).slice(-1);
	$('#jago-ketik').append('<span class="alfabet '+ hitungKarakter +'" id="'+ karakter +'">'+ karakter +'<span>');

	let batasHilangDibawah = tinggiBrowser + 100;
	let posisiX = Math.floor(Math.random() * (lebarBrowser - $('.alfabet').outerWidth())) + 1;

	$('.'+hitungKarakter).css({'left':posisiX});
	$('.alfabet').animate({
					top: '+=' + batasHilangDibawah
				 }, kecepatan, function(){
					$(this).remove(); //kalau udah sampai bawah langsung delete
				 });
	hitungKarakter++;

	//keluarkan karakter baru setiap 1500 milisecond
	setTimeout(function(){ randomCharacter(); }, 1500);
}

function ketik(){
	$('body').on('keyup', function(e) {
		let tombolDiKlik = '#'+e.key;
		let scoreSaatIni = parseInt($('#score').text());

		if ($('.alfabet').is(tombolDiKlik) ) {		
		    $(tombolDiKlik).addClass('benar').removeAttr('id');
		    $('#score').text(scoreSaatIni + 1);
		}
	});
}
function init(){
	pembukaan();
	play();
}

let hitungKarakter = 1;
let kecepatan = 5000;
let lebarBrowser = $(window).width();
let tinggiBrowser = $(window).height();

$(document).ready(function(){
	init();
});