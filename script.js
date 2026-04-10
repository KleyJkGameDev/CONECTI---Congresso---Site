/*<!-- ══════════════════════════════════════════
     JAVASCRIPT — ZERO dependências externas
════════════════════════════════════════════ -->*/

'use strict';

/* ── NAV scroll shadow ── */
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
});

/* ── Mobile Menu ── */
function toggleMenu() {
    const nav = document.getElementById('mobileNav');
    const btn = document.getElementById('hamburger');
    const open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
}
function closeMenu() {
    document.getElementById('mobileNav').classList.remove('open');
    const btn = document.getElementById('hamburger');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
}
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ── COUNTDOWN ── */
(function countdown() {
    const target = new Date('2025-08-14T08:00:00');
    function tick() {
    const diff = target - Date.now();
    const pad = n => String(Math.max(0, Math.floor(n))).padStart(2, '0');
    if (diff <= 0) {
        ['d', 'h', 'm', 's'].forEach(id => document.getElementById('cd-' + id).textContent = '00');
        return;
    }
    document.getElementById('cd-d').textContent = pad(diff / 864e5);
    document.getElementById('cd-h').textContent = pad((diff % 864e5) / 36e5);
    document.getElementById('cd-m').textContent = pad((diff % 36e5) / 6e4);
    document.getElementById('cd-s').textContent = pad((diff % 6e4) / 1e3);
    }
    tick(); setInterval(tick, 1000);
})();

/* ── SCHEDULE TABS ── */
function switchDay(id, btn) {
    document.querySelectorAll('.sched-day').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    // trigger animation on newly visible items
    document.querySelectorAll('#' + id + ' .sched-item').forEach((el, i) => {
    el.classList.remove('visible');
    setTimeout(() => el.classList.add('visible'), i * 70);
    });
}

/* ── Scroll animation observer ── */
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.sched-item, .speaker-card, .about-card, .sub-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .45s ease, transform .45s ease';
    obs.observe(el);
});
// add visible class via IntersectionObserver (overrides inline styles)
const obs2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
    }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.sched-item,.speaker-card,.about-card,.sub-card').forEach(el => obs2.observe(el));

// init first day items visible after a tick
setTimeout(() => {
    document.querySelectorAll('#day1 .sched-item').forEach((el, i) => {
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 80);
    });
}, 100);

/* ── FAQ ── */
function toggleFaq(btn) {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    }
}

/* ── TICKET SELECTION ── */
function selectTicket(card) {
    document.querySelectorAll('.ticket-card').forEach(c => {
    c.classList.remove('selected');
    c.setAttribute('aria-checked', 'false');
    });
    card.classList.add('selected');
    card.setAttribute('aria-checked', 'true');
    // sync category dropdown
    const catMap = {
    'Estudante IFMA / UFMA': 'Estudante IFMA / UFMA',
    'Estudante Outras IES': 'Estudante de Outras IES',
    'Profissional': 'Profissional',
    'Pesquisador / Professor': 'Pesquisador / Professor'
    };
    const name = card.querySelector('.ticket-name').textContent.trim();
    const sel = document.getElementById('r-cat');
    for (let o of sel.options) {
    if (o.value === catMap[name] || o.text === catMap[name]) { sel.value = o.value; break; }
    }
}

/* ── MASKS ── */
function maskCPF(el) {
    let v = el.value.replace(/\D/g, '').substring(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    el.value = v;
}
function maskTel(el) {
    let v = el.value.replace(/\D/g, '').substring(0, 11);
    if (v.length <= 10)
    v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else
    v = v.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2 $3-$4');
    el.value = v;
}

/* ── VALIDATION ── */
function required(id, errId) {
    const el = document.getElementById(id);
    const ok = el.value.trim() !== '';
    el.classList.toggle('error', !ok);
    document.getElementById(errId).classList.toggle('show', !ok);
    return ok;
}
function validEmail(id) {
    const el = document.getElementById(id);
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
    el.classList.toggle('error', !ok);
    document.getElementById('err-email').classList.toggle('show', !ok);
    return ok;
}
function validCPF(id) {
    const el = document.getElementById(id);
    const v = el.value.replace(/\D/g, '');
    const ok = v.length === 11 && !/^(\d)\1+$/.test(v);
    el.classList.toggle('error', !ok);
    document.getElementById('err-cpf').classList.toggle('show', !ok);
    return ok;
}

/* ── REGISTRATION SUBMIT ── */
function submitReg() {
    const checks = [
    required('r-nome', 'err-nome'),
    required('r-sobrenome', 'err-sobrenome'),
    validEmail('r-email'),
    validCPF('r-cpf'),
    required('r-inst', 'err-inst'),
    ];
    const termsEl = document.getElementById('r-terms');
    const termsOk = termsEl.checked;
    document.getElementById('err-terms').classList.toggle('show', !termsOk);
    if (!checks.every(Boolean) || !termsOk) {
    showToast('⚠️', 'Atenção', 'Corrija os campos destacados para continuar.');
    return;
    }

    /* ─ PONTO DE INTEGRAÇÃO COM BANCO ─
        Substitua o bloco abaixo por um fetch() para a sua API:

        const payload = {
        nome:       document.getElementById('r-nome').value.trim() + ' ' +
                    document.getElementById('r-sobrenome').value.trim(),
        email:      document.getElementById('r-email').value.trim(),
        cpf:        document.getElementById('r-cpf').value,
        telefone:   document.getElementById('r-tel').value,
        instituicao:document.getElementById('r-inst').value.trim(),
        categoria:  document.getElementById('r-cat').value,
        area:       document.getElementById('r-area').value,
        timestamp:  new Date().toISOString()
        };

        fetch('/api/inscricoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
        })
        .then(r => r.json())
        .then(data => { if(data.ok) openModal('reg'); else showToast('❌','Erro',data.message); })
        .catch(() => showToast('❌','Erro','Falha na conexão. Tente novamente.'));
    ─ FIM DO PONTO DE INTEGRAÇÃO ─ */

    // Simulação local (remover quando conectar ao backend)
    saveLocal('inscricoes', buildRegPayload());
    openModal('reg');
}

function buildRegPayload() {
    return {
    id: 'INS-' + Date.now(),
    nome: document.getElementById('r-nome').value.trim() + ' ' + document.getElementById('r-sobrenome').value.trim(),
    email: document.getElementById('r-email').value.trim(),
    cpf: document.getElementById('r-cpf').value,
    telefone: document.getElementById('r-tel').value,
    instituicao: document.getElementById('r-inst').value.trim(),
    categoria: document.getElementById('r-cat').value,
    area: document.getElementById('r-area').value,
    timestamp: new Date().toISOString()
    };
}

/* ── SUBMISSION ── */
let subType = '';
function openSubForm(type) {
    subType = type;
    document.getElementById('sub-form-title').textContent = 'Submissão de ' + type;
    const panel = document.getElementById('sub-form-panel');
    panel.classList.add('open');
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}
function closeSubForm() {
    document.getElementById('sub-form-panel').classList.remove('open');
}
function submitWork() {
    const titulo = document.getElementById('sub-titulo').value.trim();
    const email = document.getElementById('sub-email').value.trim();
    const area = document.getElementById('sub-area').value;
    if (!titulo || !email || !area) {
    showToast('⚠️', 'Campos obrigatórios', 'Preencha título, área e e-mail do autor principal.');
    return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('⚠️', 'E-mail inválido', 'Informe um e-mail válido.');
    return;
    }

    /* ─ PONTO DE INTEGRAÇÃO COM BANCO ─
        const payload = {
        tipo:      subType,
        titulo:    titulo,
        area:      area,
        autores:   document.getElementById('sub-nomes').value,
        email:     email,
        inst:      document.getElementById('sub-inst').value,
        resumo:    document.getElementById('sub-resumo').value,
        timestamp: new Date().toISOString()
        };
        fetch('/api/submissoes', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
        .then(r=>r.json()).then(d=>{ if(d.ok) { closeSubForm(); openModal('sub'); } });
    ─ FIM ─ */

    saveLocal('submissoes', {
    id: 'SUB-' + Date.now(), tipo: subType, titulo, area, email,
    timestamp: new Date().toISOString()
    });
    closeSubForm();
    openModal('sub');
}

/* ── LOCAL STORAGE (fallback sem backend) ── */
function saveLocal(key, data) {
    try {
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push(data);
    localStorage.setItem(key, JSON.stringify(arr));
    } catch (e) { /* localStorage pode não estar disponível */ }
}

/* ── MODAL ── */
const modalCfg = {
    reg: {
    icon: '🎉',
    title: 'Inscrição Registrada!',
    body: 'Sua inscrição no CONECT 2025 foi registrada com sucesso. Um e-mail de confirmação será enviado em breve para o endereço informado.'
    },
    sub: {
    icon: '📬',
    title: 'Trabalho Enviado!',
    body: 'Sua submissão foi recebida com sucesso. A comissão científica avaliará o seu trabalho e você receberá o resultado por e-mail em até 48h úteis.'
    }
};
function openModal(type = 'reg') {
    const cfg = modalCfg[type];
    document.getElementById('modal-icon').textContent = cfg.icon;
    document.getElementById('modal-heading').textContent = cfg.title;
    document.getElementById('modal-body').textContent = cfg.body;
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
}
// fechar modal clicando no overlay
document.getElementById('modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
});
// fechar com Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeMenu(); }
});

/* ── TOAST ── */
let toastTimer;
function showToast(icon, title, msg) {
    document.getElementById('toast-icon').textContent = icon;
    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-msg').textContent = msg;
    const t = document.getElementById('toast');
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 4200);
}
