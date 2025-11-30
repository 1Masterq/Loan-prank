(function(){
  const form = document.getElementById('loanForm');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const page = document.getElementById('page');
  const modal = document.getElementById('modal');
  const modalMsg = document.getElementById('modalMsg');
  const closeModal = document.getElementById('closeModal');
  const resultBanner = document.getElementById('resultBanner');
  const resultText = document.getElementById('resultText');
  const tryAgain = document.getElementById('tryAgain');

  // ----------------- SOFT BEEP -----------------
  function softBeep(){
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = 440; // A4
      o.type = 'sine';
      g.gain.value = 0.08; // very soft
      o.connect(g); g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.22); // 220ms
      setTimeout(()=>{ if(ctx.close) ctx.close(); },300);
    } catch(e){console.warn(e);}
  }

  // ------------- REALISTIC PHONE SHAKE ----------------
  function shakeElement(el, duration=1000){
    const start = performance.now();
    function frame(now){
      const elapsed = now - start;
      if(elapsed < duration){
        const x = (Math.random()*10 -5); // -5 to +5 px
        const y = (Math.random()*10 -5);
        el.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(frame);
      } else {
        el.style.transform = '';
      }
    }
    requestAnimationFrame(frame);

    // mobile vibration (if supported)
    if(navigator.vibrate){
      navigator.vibrate([50,30,50,30,50]);
    }
  }

  function showModal(message){
    modalMsg.textContent = message;
    modal.classList.add('show');
  }
  function hideModal(){
    modal.classList.remove('show');
  }

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    submitBtn.disabled=true; submitBtn.textContent='Processing...';

    const name = document.getElementById('name').value || 'Applicant';

    showModal('Checking your eligibility...');
    softBeep();

    setTimeout(()=>{
      hideModal();

      // shake effect + soft beep
      shakeElement(page);
      softBeep();

      // show modal result
      showModal(`${name}, your application result is ready!`);

      // show big red banner
      resultText.textContent="Omoo — I no da on fund now oo. Come back later 😂🤏🏽";
      resultBanner.classList.add('show');

      form.classList.add('visually-hidden');
      submitBtn.disabled=false; submitBtn.textContent='Submitted';
    }, 600);
  });

  closeModal.addEventListener('click', hideModal);
  resetBtn.addEventListener('click', ()=>{
    form.reset();
    form.classList.remove('visually-hidden');
    resultBanner.classList.remove('show');
    page.style.transform='';
    hideModal();
    submitBtn.disabled=false; submitBtn.textContent='Submit Application';
  });
  tryAgain.addEventListener('click', ()=>resetBtn.click());
})();
