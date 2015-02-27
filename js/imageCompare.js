function ImageDetect(container, beforeCover) {
  //we declare the params here
  this.container = container;
  this.beforeCover = typeof beforeCover != 'undefined' ? beforeCover : 2;

  var oldPos, show, handle, fragment, images;
  var box, imageOneSrc, imageTwoSrc;
  var holder, containerW, containerH;
  var handleW, handleH, unusedElements;

  //dimenions for handle
  handleW = 50;
  handleH = 50;

  images = document.querySelectorAll(container + ' > img');

  //the init function which starts the plugin
  this.init = function() {
    this.toggleElem('none');
    this.createElements();
    this.moveSlide();
  }

  //we create all the elements that we need
  this.createElements = function() {
    holder = document.querySelector(container);
    containerW = holder.offsetWidth;
    containerH = holder.offsetHeight;

    imageOneSrc = images[0].getAttribute('src');
    imageTwoSrc = images[1].getAttribute('src');

    fragment = document.createDocumentFragment();

    if (this.beforeCover === 4) {
      this.beforeCover = containerW;
    } 

    handle = document.createElement('div');
    handle.setAttribute('class', 'handle');
    handle.style.width = handleW + 'px';
    handle.style.height = handleH + 'px';
    handle.style.left = (containerW / this.beforeCover) - (parseInt(handle.style.width, 10) / 2) - 1 + 'px';
    handle.style.top = (containerH / 2) - (parseInt(handle.style.height, 10) / 2)  + 'px';
    handle.style.zIndex = 2;
    handle.style.position = 'absolute';
    fragment.appendChild(handle);

    box = document.createElement('div');
    box.setAttribute('class', 'after-image');
    box.style.background = 'url(' + imageOneSrc + ') no-repeat';
    box.style.width = (containerW / this.beforeCover) + 'px';
    box.style.height = containerH + 'px';
    box.style.zIndex = 1;
    box.style.position = 'absolute';
    fragment.appendChild(box);

    holder.style.background = 'url(' + imageTwoSrc + ') no-repeat';

    holder.appendChild(fragment);
  }

  this.toggleElem = function(toggle) {
    [].forEach.call(images, function(img) {
      img.style.display = toggle;
    });
  }

  this.moveSlide = function() {
    oldPos = 0;
    show = false;

    handle.onmousedown = function() {
      show = true;
    }

    holder.onmouseup = function() {
      show = false;
    }

    holder.onmousemove = function(e) {
      if (show === false) return false;

      if (e.pageX - holder.getBoundingClientRect().left > (holder.offsetWidth - (handleW / 2))) { 
        box.style.width = holder.offsetWidth - handleW / 2 + 'px';
        handle.style.left = holder.offsetHeight - handleW + 'px';
      } else if (e.pageX - holder.getBoundingClientRect().left < (handleW / 2)) {
        box.style.width = handleW / 2 + 'px';
        handle.style.left = 0;
      } else {
        box.style.width = (e.pageX - holder.getBoundingClientRect().left) + 'px';
        handle.style.left = (e.pageX - holder.getBoundingClientRect().left) - (handleW / 2) + 'px';
      }

      oldPos = e.pageX;
    }
  }

  this.destroy = function() {
    holder.style.background = '';
    box.remove();
    handle.remove();

    this.toggleElem('block');
  }
}

