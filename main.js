(function(){
  document.getElementById('year').textContent = new Date().getFullYear();

  // menú móvil
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setMenu(open){
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }
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

  var status = document.getElementById('copy-status');
  function announce(msg){
    if(!status) return;
    status.textContent = '';
    setTimeout(function(){ status.textContent = msg; }, 50);
  }

  document.querySelectorAll('.copy-btn').forEach(function(btn){
    btn.addEventListener('click', async function(){
      var text = btn.getAttribute('data-copy');
      var original = btn.textContent;
      try{
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copiado';
        announce(btn.getAttribute('data-done') + ' al portapapeles');
      }catch(e){
        try{
          var range = document.createRange();
          var valueEl = btn.parentElement;
          range.selectNodeContents(valueEl);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          btn.textContent = 'Selecciona y copia';
          announce('No se pudo copiar automáticamente. El texto está seleccionado: cópialo con el menú o el teclado.');
        }catch(e2){
          btn.textContent = 'No disponible';
          announce('No se pudo copiar. El dato es: ' + text);
        }
      }
      setTimeout(function(){ btn.textContent = original; }, 1600);
    });
  });
})();
