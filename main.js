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

  document.querySelectorAll('.copy-btn').forEach(function(btn){
    btn.addEventListener('click', async function(){
      var text = btn.getAttribute('data-copy');
      var original = btn.textContent;
      try{
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copiado';
      }catch(e){
        try{
          var range = document.createRange();
          var valueEl = btn.parentElement;
          range.selectNodeContents(valueEl);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          btn.textContent = 'Selecciona y copia';
        }catch(e2){
          btn.textContent = 'No disponible';
        }
      }
      setTimeout(function(){ btn.textContent = original; }, 1600);
    });
  });
})();
