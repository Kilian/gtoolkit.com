function registerBehaviour(isHomePage) {
  window.scrollTo(0,0);
  buildFeed(isHomePage);
  handleMenuSelection();
  addVersionNumbers();
  detectOS();
  addPreview();
  buildCarousels();
}

function addVersionNumbers() {
  var version = '';
  $.get('https://dl.feenk.com/gt/GToolkitWin64-release', (data) => {
    $("#win64").attr("href", "https://dl.feenk.com/gt/" + data);
    version = data.replace('GToolkitWin64-', '').replace('.zip', '');
    $("#win64 span").text('GToolkit alpha for Windows ' + version);
  }); 
  $.get('https://dl.feenk.com/gt/GToolkitOSX64-release', (data) => {
        $("#osx64").attr("href", "https://dl.feenk.com/gt/" + data);
        version = data.replace('GToolkitOSX64-', '').replace('.zip', '');
        $("#osx64 span").text('GToolkit alpha for Mac' + version);
  });
  $.get('https://dl.feenk.com/gt/GToolkitLinux64-release', (data) => {
        $("#linux64").attr("href", "https://dl.feenk.com/gt/" + data);
        version = data.replace('GToolkitLinux64-', '').replace('.zip', '');
        $("#linux64 span").text('GToolkit alpha for Linux ' + version);
  }); 
}

function buildFeed(isHomePage) {
  if (!isHomePage) return;
  window.twttr = (function(id) {
    var js, fjs = document.getElementsByTagName("script")[0],
      twitter = window.twttr || {};
    js = document.createElement("script");
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    twitter._e = [];
    twitter.ready = function(f) {
      twitter._e.push(f);
    };

    return twitter;
  }("twitter-timeline"));
}

function detectOS() {
  var userPlatform = this.platform.os.family;
  var platforms = $('.download-button');
  for (var i=0; i < platforms.length; i++) {
    var platform = platforms[i].getAttribute('data-switcher-content');
    if (platform.toLowerCase().startsWith(userPlatform.toLowerCase())) {
      $(platforms[i]).addClass('btn-default download-active');
    }
    else {
     $(platforms[i]).addClass('download-inactive'); 
    }
  }
}


function buildCarousels() {
  $('.carousel').each(function() {
    var carousel = $(this);
    if (carousel.find('ol').length == 0) {
      var ol = document.createElement('ol');
      ol.className = 'carousel-indicators';

      for (var i=0; i < $(this).find('.item').length; i++) {
        var li = document.createElement('li');
        if (i == 0)
          li.className = 'active';
        li.setAttribute('data-target', '#'+carousel.attr('id'));
        li.setAttribute('data-slide-to', i);
        ol.append(li);
      }
      carousel.prepend(ol);

      carousel.append(createControl('left', 'prev', carousel.attr('id')));
      carousel.append(createControl('right', 'next', carousel.attr('id')));
    }
  });
}

function createControl(position, slideTo, carouselId) {
  var a = document.createElement('a');
  a.className = position + ' carousel-control';
  a.setAttribute('data-target', '#' + carouselId);
  a.setAttribute('role', 'button');
  a.setAttribute('data-slide', slideTo);
  var spanIcon = document.createElement('span');
  spanIcon.className = "glyphicon glyphicon-chevron-"+position;
  spanIcon.setAttribute('aria-hidden', true);
  a.append(spanIcon);
  return a;
}


function addPreview() {
  $('.thumbnail a, .carousel img, .carousel video').click(function(e) { 
    e.preventDefault();
    $("#expandedModal .modal-body").html($(e.target).clone());
    $("#expandedModal .modal-footer p").text(e.target.nextElementSibling.innerText.trim());
    $("#expandedModal").modal('show');
  });
}

function handleMenuSelection() {
  $('.nav li a').removeClass('active');

  route = window.location.hash.substr(1).trim();
  if (route == '') route = '/';

  $('.nav li a[href="'+route+'"]').addClass('active');

  $('.nav li a').on('click', function(){
    $('.nav li').removeClass('active');
    $(this).addClass('active');
  });
}
