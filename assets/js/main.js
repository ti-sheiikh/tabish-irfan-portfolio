(() => {
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.primary-nav');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
  }

  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.12});
    reveals.forEach(el=>io.observe(el));
  } else reveals.forEach(el=>el.classList.add('visible'));

  const lightbox=document.querySelector('.lightbox');
  if(lightbox){
    const img=lightbox.querySelector('img');
    const close=()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');img.src='';};
    document.querySelectorAll('[data-lightbox]').forEach(btn=>btn.addEventListener('click',()=>{img.src=btn.dataset.lightbox;img.alt=btn.querySelector('img')?.alt||'Portfolio preview';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');lightbox.querySelector('button').focus();}));
    lightbox.querySelector('button').addEventListener('click',close);
    lightbox.addEventListener('click',e=>{if(e.target===lightbox)close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lightbox.classList.contains('open'))close();});
  }

  const filters=[...document.querySelectorAll('[data-filter]')];
  const portfolioSearch=document.getElementById('portfolio-search');
  const filterable=[...document.querySelectorAll('.case-card[data-category], .archive-item[data-category]')];
  let activeCategory='all';
  const updatePortfolio=()=>{
    const q=(portfolioSearch?.value||'').trim().toLowerCase();
    filterable.forEach(card=>{
      const categoryMatch=activeCategory==='all'||card.dataset.category===activeCategory;
      const textMatch=!q||card.textContent.toLowerCase().includes(q);
      card.classList.toggle('is-hidden',!(categoryMatch&&textMatch));
    });
  };
  filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));btn.classList.add('active');activeCategory=btn.dataset.filter;updatePortfolio();}));
  portfolioSearch?.addEventListener('input',updatePortfolio);

  const form=document.getElementById('project-form');
  if(form){
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const status=form.querySelector('.form-status');
      const button=form.querySelector('button[type="submit"]');
      const fd=new FormData(form);
      fd.append('_subject',`New Revorix project inquiry — ${fd.get('service')}`);
      fd.append('_template','table');
      status.textContent='Sending your project inquiry…';
      button.disabled=true;
      button.setAttribute('aria-busy','true');
      try{
        const response=await fetch('https://formsubmit.co/ajax/ti.sheiikh@gmail.com',{
          method:'POST',
          headers:{Accept:'application/json'},
          body:fd
        });
        const result=await response.json().catch(()=>({}));
        if(!response.ok||result.success===false) throw new Error('Submission failed');
        status.textContent='Thank you — your project inquiry has been submitted. We’ll reply to the email address you provided.';
        form.reset();
      }catch(error){
        status.textContent='We could not send the form automatically. Please email ti.sheiikh@gmail.com or message us on Fiverr.';
      }finally{
        button.disabled=false;
        button.removeAttribute('aria-busy');
      }
    });
  }
})();
