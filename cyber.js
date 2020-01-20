console.log("js added");

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};


var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    
    return (
        bounding.top <= (window.innerHeight-300) 
        
      
    );
};

var atbottom = function(elem){
  var bounding = elem.getBoundingClientRect();
  console.log(bounding.top);
  return (bounding.top < 1);
};

var normal = function(elem){
  var bounding = elem.getBoundingClientRect();
  console.log(bounding.top);
  return (bounding.bottom > (window.innerHeight));
};





window.addEventListener("scroll",()=>{
  // console.log(isInViewport(document.getElementsByClassName('main')[0]));
    if(isInViewport(document.getElementsByClassName('main1')[0])){
    document.getElementsByClassName('main1')[0].style.opacity = 1;
    document.getElementsByClassName('main2')[0].style.opacity = 0;
     document.getElementsByClassName('main')[0].style.backgroundColor = "white";
    }

    if(!isInViewport(document.getElementsByClassName('main1')[0])){
      document.getElementsByClassName('main1')[0].style.opacity = 0;
    }

    if(isInViewport(document.getElementsByClassName('main2')[0])){
    document.getElementsByClassName('main2')[0].style.opacity = 1;
     document.getElementsByClassName('main1')[0].style.opacity = 0;
    document.getElementsByClassName('main')[0].style.backgroundColor = "#D0D3D4";
    }

    console.log(atbottom(document.getElementsByClassName('nav2')[0]));

    if(atbottom(document.getElementsByClassName('nav2')[0])){
    document.getElementsByClassName('nav2')[0].style.position = "fixed";
    document.getElementsByClassName('nav2')[0].style.top = 0;
  }

  if(normal(document.getElementsByClassName('bg')[0])){
    document.getElementsByClassName('nav2')[0].style.position = "absolute";
    document.getElementsByClassName('nav2')[0].style.top = "auto";
  }

  
});

