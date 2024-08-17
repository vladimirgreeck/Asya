"use strict";
document.addEventListener("DOMContentLoaded", function(event) {
  let mainText = document.querySelector('.mainText'),
    mainTextobj = ["тапатуськай", "я би міг бескінечно писати тут компліменти", "але у мене є для тебе дещо краще...", "міні гра ＼(￣▽￣)／", "знайди пару (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"],
    counter = 0,
    clicked = false,
    card= document.querySelectorAll(".card__inner"),
    card2= document.querySelectorAll(".card__inner-2"),
    cardCounter2 = 0;

  let counterCard = 0,
      cardSource = [{counter: 0, src:"bus.png"}, {counter: 0, src:"discord.png"}, {counter: 0, src:"pie.png"}, {counter: 0, src:"rust.png"}, {counter: 0, src:"telegram.png"}, {counter: 0, src:"heart.png"}],
      img = document.querySelectorAll('.img2');

  function randomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  img.forEach((cardImg) => {
    function random () {
      let num = randomInt(0,5);
      if (cardSource[num].counter > 1) return random()
      cardSource[num].counter++;
      return num;
    }
    cardImg.src = cardSource[random()].src;
  })

  let prevCard = "",
      counterTimer = 0;


  card2.forEach((el) => {
    el.addEventListener("click", function() {
      if (cardCounter2 == 1) {
        setTimeout(() => document.querySelector('.ques').classList.add("fadeIn"), 1000)
        setTimeout(function() {
          document.querySelector('.ques').classList.add("fadeOut");
          document.querySelectorAll('.card__inner-2').forEach((card) => {
            card.classList.add("fadeOut");
          })
        setTimeout(function () {
          document.querySelector('.ques').classList.add("display-none");
          document.querySelector('.deck-2').classList.add("display-none");
          document.querySelector('.heart').classList.add("heartOpacity");
          document.querySelector('.letter').classList.remove("display-none");
          document.querySelector('.letter').classList.add("fadeIn");
          setTimeout(()=>{
            document.body.addEventListener("click", function() {
            document.querySelector('.letter').classList.add("fadeOut");
            document.querySelector('.couple').classList.add("coupleAnim");
            document.querySelector('.heart').classList.remove("heartOpacity");
          })
          }, 10000)
        }, 2000)
        }, 3000)
      }
      el.classList.add("flipped");
      cardCounter2++;
    })
  })

  card.forEach((el) => {
    el.addEventListener("click", function() {
      let prevCardInside = prevCard;
      if (counterCard == 2 && !el.classList.contains("flipped")){
        card.forEach((el) => {
          if (el.classList.contains('flipped')) el.classList.remove('flipped')
        })
        counterCard = 0;
      }
      if (el.classList.contains("flipped")) return;
      el.classList.add("flipped");
      counterCard++;

      if (prevCardInside){
        if (el.querySelector('.img2').src == prevCardInside.querySelector('.img2').src){
          el.parentElement.classList.add("fadeOut");
          setTimeout(() => el.classList.add("display-none"), 2000)

          prevCardInside.parentElement.classList.add("fadeOut");
          setTimeout(() => prevCardInside.classList.add("display-none"), 2000)
          if (++counterTimer == 6){
            setTimeout(() => {
              document.querySelector(".deck").classList.add("display-none");
              document.querySelector('.deck-2').classList.remove("display-none");
              document.querySelector('.deck-2').classList.add("fadeIn");
            }, 2000)
          }
          return;
        }
      }
      prevCard = el;
    })
  })


  document.body.addEventListener("click", clickFunc);
  document.body.addEventListener("touch", clickFunc);

  function clickFunc() {
    if (!clicked) {
      clicked = true;

      if (counter < 5){
        setTimeout(() =>{
        mainText.classList.remove("fadeOut");
        mainText.classList.add("fadeIn");
        mainText.innerText = mainTextobj[counter];
        counter++;
      },3000);
      }

      if (counter == 5){
        document.body.removeEventListener("click", clickFunc);
        document.body.removeEventListener("touch", clickFunc);
        setTimeout(() => {
          mainText.classList.add("display-none");
          document.querySelector(".deck").classList.remove("display-none");
          document.querySelector(".deck").classList.add("fadeIn");
        }, 2000)
      }

      mainText.classList.remove("fadeIn");
      mainText.classList.add("fadeOut");

      setTimeout(()=> {
        clicked = false;
      }, 3000);
    }
  }

});

