/* ── LOADER ── */
window.addEventListener('load', function () {
  setTimeout(function () {
    var l = document.getElementById('loader');
    l.classList.add('hide');
    setTimeout(function () { l.style.display = 'none'; }, 520);
    revealAll();
    startCounters();
  }, 2200);
});

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', function () {
  var nb = document.getElementById('navbar');
  nb.classList.toggle('scrolled', window.scrollY > 20);
  revealAll();
});

/* ── PAGE NAVIGATION ── */
function goPage(id) {
  document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
  var target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // short delay so DOM is visible before reveal
  setTimeout(function () { revealAll(); startCounters(); }, 120);
  return false;
}

/* ── MOBILE MENU ── */
function toggleMob() {
  document.getElementById('mobMenu').classList.toggle('open');
}

/* ── SCROLL REVEAL ── */
function revealAll() {
  document.querySelectorAll('.reveal').forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.93) el.classList.add('show');
  });
}
window.addEventListener('scroll', revealAll);

/* ── COUNTER ANIMATION ── */
var countersStarted = false;
function startCounters() {
  if (countersStarted) return;

  // hero hnum counters (always animate)
  document.querySelectorAll('.hnum').forEach(function (el) {
    animateNum(el, parseInt(el.getAttribute('data-n')), 1800);
  });

  // stats band counters
  var band = document.querySelector('.stats-band');
  if (!band) return;
  var obs = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.counter').forEach(function (el) {
        animateNum(el, parseInt(el.getAttribute('data-n')), 2000);
      });
      obs.disconnect();
      countersStarted = true;
    }
  });
  obs.observe(band);
}

function animateNum(el, target, dur) {
  var start = 0;
  var step = target / dur * 16;
  var timer = setInterval(function () {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start);
  }, 16);
}

/* ── PRODUCT FILTER ── */
function filterProd(btn, cat) {
  document.querySelectorAll('.fbtn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.pcard').forEach(function (c) {
    c.style.display = (cat === 'all' || c.getAttribute('data-cat') === cat) ? '' : 'none';
  });
}

/* ── FAQ ── */
function faqToggle(el) {
  var icon = el.querySelector('.fi');
  var ans  = el.nextElementSibling;
  var open = ans.classList.contains('open');
  // close all
  document.querySelectorAll('.fa').forEach(function (a) { a.classList.remove('open'); });
  document.querySelectorAll('.fi').forEach(function (i) { i.classList.remove('open'); });
  if (!open) { ans.classList.add('open'); icon.classList.add('open'); }
}

/* ── CONTACT FORM ── */
function submitForm() {
  var msg = document.getElementById('formMsg');
  msg.textContent = '✅ Enquiry sent! We\'ll be in touch within 24 hours.';
  msg.style.color = '#4ade80';
  setTimeout(function () { msg.textContent = ''; }, 5000);
}

/* ── FOOTER / NAV LINKS prevent default ── */
document.addEventListener('click', function (e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
    e.preventDefault();
  }
});

/* run once on DOMContentLoaded for initial reveals */
document.addEventListener('DOMContentLoaded', function () {
  revealAll();
});
