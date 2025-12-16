const wishText = document.getElementById('wishText');
const toneSelect = document.getElementById('tone');
const generateBtn = document.getElementById('generate');
const surpriseBtn = document.getElementById('surprise');
const copyBtn = document.getElementById('copy');
const shareBtn = document.getElementById('share');
const confettiRoot = document.getElementById('confetti');

// Signature to append to every wish (English signature as requested)
const signature = " — your friend Rownak 😊";

const wishes = {
  short: [
    "শুভ জন্মদিন, আবিদ! আশা করি তোমার আজকের দিনটি হাসি আর আনন্দে ভরা থাকবে।",
    "শুভ জন্মদিন, আবিদ! এক দারুণ দিন ও সফল বছরের শুভেচ্ছা।"
  ],
  funny: [
    "শুভ বার্থডে, আবিদ! কেকটা বড় হোক, সমস্যা ছোট।",
    "আবিদ, তুমি এক বছর বড়লেও ও এখনও বয়সের মতো আচরণ করো না — শুভ জন্মদিন!"
  ],
  heartfelt: [
    "আবিদ, জন্মদিনের অনেক শুভেচ্ছা। তোমার বন্ধুত্বের জন্য কৃতজ্ঞ — আরও অনেক মধুর স্মৃতি হোক।",
    "তোমার এই বিশেষ দিনে তোমার জন্য অনেক ভালোবাসা ও শুভকামনা রইল।"
  ],
  bestfriend: [
    "ভাই, শুভ জন্মদিন আবিদ! সবসময় পাশে থাকার জন্য ধন্যবাদ — আজ মজা করবো।",
    "আমার সঙ্গী আবিদ — আরও একটি বছর, আরও মজা। শুভ জন্মদিন!"
  ],
  social: [
    "চিয়ার্স আবিদ — আরেকটা বছর, আরও অভিজ্ঞতা, আরও অসাধারণতা। শুভ জন্মদিন! 🎉",
    "আবিদকে শুভ জন্মদিন — আজ তুমি উজ্জ্বল। খুশিতে ভরে উঠুক দিনটি।"
  ],
  poetic: [
    "শুভ জন্মদিন, আবিদ। প্রতিটি ভোর তোমায় আশা দিক; প্রতিটি সূর্যাস্ত তোমায় শান্তি দিক।",
    "তোমার দিনে আকাশের মতো স্বপ্ন হোক, মাটির মতো স্থিরতা। শুভ জন্মদিন।"
  ],
  formal: [
    "শুভ জন্মদিন, আবিদ। আপনাকে সুস্বাস্থ্য ও সফলতা কামনা করছি।",
    "জন্মদিনের শুভেচ্ছা। আগামী বছরগুলো আপনার জন্য সুফল বয়ে আনুক।"
  ],
  warm: [
    "শুভ জন্মদিন, আবিদ। আল্লাহ তোমায় সুস্বাস্থ্য, সুখ ও অনেক বরকত দান করুন। আমিন।",
    "রবে তুমি শান্তি ও কল্যাণ পাও — শুভ জন্মদিন, আবিদ।"
  ]
};

function randomItem(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function formatWithSignature(text){
  // Ensure signature isn't duplicated
  if(text.endsWith(signature)) return text;
  return text + signature;
}

function setWish(tone){
  const list = wishes[tone] || [].concat(...Object.values(wishes));
  const text = randomItem(list);
  wishText.textContent = formatWithSignature(text);
}

function launchConfetti(amount = 60){
  const colors = ['#ff6b6b','#ffd166','#f5c7ff','#7ee8fa','#ffd6a5','#9be7a6','#b28dff'];
  for(let i=0;i<amount;i++){
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.left = (Math.random()*100) + 'vw';
    el.style.width = (6 + Math.random()*12) + 'px';
    el.style.height = (8 + Math.random()*18) + 'px';
    const duration = 1500 + Math.random()*2200;
    el.style.animationDuration = `${duration}ms, ${duration + 400}ms`;
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    confettiRoot.appendChild(el);
    setTimeout(()=> el.remove(), duration + 800);
  }
}

generateBtn.addEventListener('click', ()=>{
  setWish(toneSelect.value);
});

surpriseBtn.addEventListener('click', ()=>{
  const tones = Object.keys(wishes);
  const tone = tones[Math.floor(Math.random()*tones.length)];
  toneSelect.value = tone;
  setWish(tone);
  launchConfetti(80);
});

copyBtn.addEventListener('click', async ()=>{
  try{
    const textToCopy = wishText.textContent;
    await navigator.clipboard.writeText(textToCopy);
    const prev = copyBtn.textContent;
    copyBtn.textContent = 'কপি হয়েছে!';
    setTimeout(()=> copyBtn.textContent = prev, 1400);
  }catch(e){
    copyBtn.textContent = 'কপি ব্যর্থ';
    setTimeout(()=> copyBtn.textContent = 'কপি', 1400);
  }
});

shareBtn.addEventListener('click', async ()=>{
  const text = wishText.textContent;
  if(navigator.share){
    try{
      await navigator.share({title: `শুভ জন্মদিন, আবিদ!`, text});
    }catch(e){
      // canceled or failed
    }
  }else{
    try{
      await navigator.clipboard.writeText(text);
      const prev = shareBtn.textContent;
      shareBtn.textContent = 'কপি হয়েছে!';
      setTimeout(()=> shareBtn.textContent = prev, 1400);
    }catch(e){
      shareBtn.textContent = 'শেয়ার';
    }
  }
});

// initialize default
setWish('short');
