/* Metalúrgica Allende — scripts del sitio. Sin dependencias. */
(function () {
  'use strict';

  var CONFIG = {
    email: 'metalurgicaallende@gmail.com',
    whatsapp: '5493518017028' // formato internacional sin "+" ni espacios
  };

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  /* ---------- Menú mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-principal');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden').textContent = open ? 'Cerrar menú' : 'Abrir menú';
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Sombra del header al hacer scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Imágenes reemplazables (máquinas) ----------
     Si el archivo existe se muestra; si no, queda el placeholder gráfico. */
  function watchImage(img) {
    var fig = img.closest('.media');
    if (!fig) return;
    function ok() { fig.classList.add('is-loaded'); }
    function missing() { fig.classList.add('is-missing'); }
    if (img.complete) {
      if (img.naturalWidth > 0) ok(); else if (img.getAttribute('src')) missing();
    }
    img.addEventListener('load', ok);
    img.addEventListener('error', missing);
  }
  document.querySelectorAll('.media img[src]').forEach(watchImage);

  /* ---------- Galería de piezas ----------
     La sección está oculta. Se prueba cada foto y se muestra la sección
     (y su link en el menú) solo si existe al menos una. */
  var trabajos = document.getElementById('trabajos');
  var navTrabajos = document.querySelector('[data-nav-trabajos]');
  if (trabajos) {
    trabajos.querySelectorAll('img[data-src]').forEach(function (img) {
      var fig = img.closest('figure');
      var probe = new Image();
      probe.onload = function () {
        img.src = img.getAttribute('data-src');
        fig.classList.add('is-loaded');
        trabajos.hidden = false;
        if (navTrabajos) navTrabajos.hidden = false;
      };
      probe.onerror = function () { fig.remove(); };
      probe.src = img.getAttribute('data-src');
    });
  }

  /* ---------- Formulario de contacto ---------- */
  var form = document.getElementById('form-contacto');
  if (form) {
    var status = form.querySelector('.form-status');
    var fields = {
      nombre: form.elements.nombre,
      email: form.elements.email,
      mensaje: form.elements.mensaje
    };

    var setStatus = function (text, type) {
      status.textContent = text;
      status.className = 'form-status' + (type ? ' is-' + type : '');
    };

    var validate = function (requireEmail) {
      var firstInvalid = null;
      Object.keys(fields).forEach(function (k) {
        var el = fields[k];
        var skip = k === 'email' && !requireEmail && !el.value.trim();
        var valid = skip || (el.value.trim() !== '' && el.checkValidity());
        el.setAttribute('aria-invalid', valid ? 'false' : 'true');
        if (!valid && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        setStatus('Revisá los campos marcados: nombre, email válido y mensaje son obligatorios.', 'error');
        firstInvalid.focus();
        return false;
      }
      return true;
    };

    var buildText = function () {
      var t = 'Nombre: ' + fields.nombre.value.trim();
      if (fields.email.value.trim()) t += '\nEmail: ' + fields.email.value.trim();
      t += '\n\n' + fields.mensaje.value.trim();
      return t;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements._gotcha && form.elements._gotcha.value) return; // bot
      if (!validate(true)) return;

      var endpoint = (form.getAttribute('data-endpoint') || '').trim();

      if (endpoint) {
        // Envío a servicio de formularios (Formspree o similar)
        var btn = form.querySelector('[type="submit"]');
        btn.disabled = true;
        setStatus('Enviando…');
        fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        }).then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          setStatus('¡Gracias! Recibimos tu consulta y te respondemos a la brevedad.', 'ok');
        }).catch(function () {
          setStatus('No se pudo enviar. Escribinos por WhatsApp o a ' + CONFIG.email + '.', 'error');
        }).finally(function () { btn.disabled = false; });
        return;
      }

      // Sin servicio configurado: abrir el cliente de correo con el mensaje armado
      var subject = 'Consulta web — ' + fields.nombre.value.trim();
      window.location.href = 'mailto:' + CONFIG.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(buildText());
      setStatus('Se abrió tu aplicación de correo con el mensaje listo para enviar. Si no se abrió, escribinos a ' + CONFIG.email + ' o por WhatsApp.');
    });

    var waBtn = form.querySelector('[data-send-whatsapp]');
    if (waBtn) {
      waBtn.addEventListener('click', function () {
        if (!validate(false)) return;
        var url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(buildText());
        window.open(url, '_blank', 'noopener');
      });
    }
  }

  /* ---------- Año del footer ---------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
