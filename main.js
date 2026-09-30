(function(){
  var year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // menú móvil
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if(toggle && nav){
    var setMenu = function(open){
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function(){
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function(e){
      if(e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true'){
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function(e){
      if(!e.target.closest('header.site')) setMenu(false);
    });
  }

  // botones «Copiar»
  var status = document.getElementById('copy-status');
  function announce(msg){
    if(!status) return;
    status.textContent = '';
    setTimeout(function(){ status.textContent = msg; }, 50);
  }

  // respaldo para navegadores sin API del portapapeles o fuera de HTTPS
  function legacyCopy(text){
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.className = 'sr-only';
    document.body.appendChild(ta);
    ta.select();
    var done = false;
    try{ done = document.execCommand('copy'); }catch(e){ done = false; }
    document.body.removeChild(ta);
    return done;
  }

  function copyText(text){
    if(navigator.clipboard && window.isSecureContext){
      return navigator.clipboard.writeText(text).then(function(){ return true; }, function(){ return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  // último recurso: dejar seleccionado solo el dato, sin el texto del botón
  function selectValue(btn){
    var valueEl = btn.parentElement;
    var target = valueEl.querySelector('a') || valueEl.firstChild;
    var range = document.createRange();
    range.selectNodeContents(target);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.querySelectorAll('.copy-btn').forEach(function(btn){
    var original = btn.textContent;
    var timer;
    btn.addEventListener('click', function(){
      var text = btn.getAttribute('data-copy');
      clearTimeout(timer);
      copyText(text).then(function(done){
        if(done){
          btn.textContent = 'Copiado';
          announce(btn.getAttribute('data-done') + ' al portapapeles');
          return;
        }
        try{
          selectValue(btn);
          btn.textContent = 'Selecciona y copia';
          announce('No se pudo copiar automáticamente. El texto está seleccionado: cópialo con el menú o el teclado.');
        }catch(e){
          btn.textContent = 'No disponible';
          announce('No se pudo copiar. El dato es: ' + text);
        }
      }).then(function(){
        timer = setTimeout(function(){ btn.textContent = original; }, 1600);
      });
    });
  });
})();
