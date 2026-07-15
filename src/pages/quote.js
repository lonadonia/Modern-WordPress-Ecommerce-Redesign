import { contact, quoteSteps } from '../data.js';
import { icon } from '../icons.js';
import { clearQuote, createReference, getQuote, setQuote, track } from '../store.js';

const visualRadio = (name, value, title, text, iconName = '') => `<label class="visual-choice"><input type="radio" name="${name}" value="${value}" />${iconName ? icon(iconName) : ''}<span><strong>${title}</strong><small>${text}</small></span>${icon('check')}</label>`;

export const quotePage = () => `
  <main id="main-content" class="quote-page">
    <section class="quote-hero">
      <div class="container quote-hero__grid">
        <div><span class="eyebrow eyebrow--light">Free 3D kitchen design</span><h1>Start with your room. Leave the cabinet puzzle to us.</h1><p>Share a few project basics and whatever you have—photos, a sketch or approximate dimensions. A designer can use it to guide the next step.</p><div class="quote-proof"><span>${icon('check')} No design fee stated in source FAQ</span><span>${icon('check')} Files and photos are optional</span><span>${icon('check')} No showroom visit required</span></div><div class="quote-contact"><span>Prefer to talk?</span><a href="${contact.phoneHref}">${icon('phone')} ${contact.phoneDisplay}</a></div></div>
        <figure><img src="/assets/hero-kitchen.jpg" width="1920" height="1080" alt="Completed white Shaker kitchen used as a design reference" /><figcaption><span>${icon('pencil')}</span><div><small>What you receive</small><strong>A room direction, cabinet selection help and a clearer quote path</strong></div></figcaption></figure>
      </div>
    </section>

    <section class="quote-form-section" id="quote-form">
      <div class="container quote-layout">
        <aside class="quote-aside"><span class="eyebrow">Designed around real life</span><h2>No perfect measurements? No problem.</h2><p>Start with what you have. The final plan still needs customer verification before purchase, but you do not need a complete drawing to open the conversation.</p><ol>${quoteSteps.map((step) => `<li data-progress-step="${step.number}"><span>${step.number}</span><div><strong>${step.label}</strong><small>${step.number === 1 ? 'Tell us where you are starting' : step.number === 2 ? 'Show the room direction' : step.number === 3 ? 'Set practical expectations' : 'Choose how we follow up'}</small></div>${icon('check')}</li>`).join('')}</ol><div class="privacy-card">${icon('shield')}<div><strong>Your files stay out of analytics.</strong><p>This prototype stores form answers locally and never logs personal values in event data.</p></div></div></aside>

        <div class="quote-form-card">
          <div class="quote-progress"><div><span data-step-label>Step 1 of 4</span><strong data-step-name>Project basics</strong></div><span data-progress-percent>25%</span><div class="progress-track"><i data-progress-bar style="width:25%"></i></div></div>
          <div class="error-summary" data-error-summary tabindex="-1" hidden><h2>${icon('alert')} Please check this step</h2><ul></ul></div>
          <form data-quote-form novalidate>
            <section class="quote-step" data-step="1" aria-labelledby="step-1-title">
              <div class="form-heading"><span>01</span><div><h2 id="step-1-title">Tell us about the project.</h2><p>Four quick answers help route your request.</p></div></div>
              <div class="field"><label for="quote-zip">Project ZIP code <span aria-hidden="true">*</span></label><div class="input-with-icon">${icon('location')}<input id="quote-zip" name="zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" required placeholder="5-digit ZIP" /></div><small>Used only to understand service and delivery context.</small></div>
              <fieldset class="field"><legend>What are you planning? <span aria-hidden="true">*</span></legend><div class="visual-choice-grid visual-choice-grid--two">${visualRadio('projectType', 'full-kitchen', 'Full kitchen', 'A complete cabinet plan', 'box')}${visualRadio('projectType', 'kitchen-update', 'Kitchen update', 'Part of the existing room', 'edit')}${visualRadio('projectType', 'bathroom', 'Bathroom or vanity', 'Storage for another room', 'ruler')}${visualRadio('projectType', 'other', 'Something else', 'Tell us in your notes', 'plus')}</div></fieldset>
              <div class="field-grid"><div class="field"><label for="project-stage">Where are you now? <span aria-hidden="true">*</span></label><select id="project-stage" name="stage" required><option value="">Select a stage</option><option value="exploring">Exploring ideas</option><option value="measuring">Measuring the room</option><option value="have-plan">I already have a plan</option><option value="ready">Ready to choose cabinets</option></select></div><div class="field"><label for="desired-service">What would help most? <span aria-hidden="true">*</span></label><select id="desired-service" name="service" required><option value="">Select a service</option><option value="3d-design">3D kitchen design</option><option value="cabinet-list">Cabinet selection and quote</option><option value="review">Review an existing plan</option><option value="not-sure">I’m not sure yet</option></select></div></div>
              <div class="qualification-message" data-qualification hidden></div>
            </section>

            <section class="quote-step" data-step="2" aria-labelledby="step-2-title" hidden>
              <div class="form-heading"><span>02</span><div><h2 id="step-2-title">Help us picture the space.</h2><p>Approximate information is useful. You can add files later.</p></div></div>
              <fieldset class="field"><legend>Which layout is closest? <span aria-hidden="true">*</span></legend><div class="layout-choice-grid">${[['single-wall','Single wall'],['l-shape','L-shape'],['u-shape','U-shape'],['galley','Galley'],['island','Island or open plan'],['unknown','Not sure']].map(([value,label]) => `<label class="layout-choice"><input type="radio" name="layout" value="${value}" /><span class="layout-icon layout-icon--${value}"><i></i><i></i><i></i></span><strong>${label}</strong>${icon('check')}</label>`).join('')}</div></fieldset>
              <div class="field"><label>Approximate room dimensions <span class="optional">Optional</span></label><div class="dimension-inputs"><label><span>Longest wall</span><div><input name="wallLength" type="number" min="1" inputmode="decimal" placeholder="e.g. 144" /><b>in.</b></div></label><label><span>Ceiling height</span><div><input name="ceilingHeight" type="number" min="1" inputmode="decimal" placeholder="e.g. 96" /><b>in.</b></div></label></div><small>Rough numbers are enough for this first step.</small></div>
              <fieldset class="field"><legend>Door style direction <span aria-hidden="true">*</span></legend><div class="style-choice-grid"><label class="style-choice"><input type="radio" name="doorStyle" value="white-shaker" /><img src="/assets/white-shaker-door.webp" width="180" height="180" alt="White Shaker cabinet door rendering" /><span><strong>White Shaker</strong><small>Source collection</small></span>${icon('check')}</label><label class="style-choice"><input type="radio" name="doorStyle" value="open" /><div class="style-placeholder">${icon('plus')}</div><span><strong>Open to ideas</strong><small>Let the room guide it</small></span>${icon('check')}</label></div></fieldset>
              <div class="field"><label for="color-notes">Color or finish preferences <span class="optional">Optional</span></label><input id="color-notes" name="colorPreference" placeholder="White, warm wood, light and airy…" /></div>
            </section>

            <section class="quote-step" data-step="3" aria-labelledby="step-3-title" hidden>
              <div class="form-heading"><span>03</span><div><h2 id="step-3-title">Set the project context.</h2><p>Ranges are fine. No exact budget or date is needed today.</p></div></div>
              <fieldset class="field"><legend>Cabinet budget range <span aria-hidden="true">*</span></legend><div class="choice-grid choice-grid--three">${['Under $5,000','$5,000–$10,000','$10,000–$20,000','$20,000–$30,000','$30,000+','Not sure'].map((label, index) => `<label class="choice-radio"><input type="radio" name="budget" value="${['under-5','5-10','10-20','20-30','30-plus','unknown'][index]}" /><span>${label}</span>${icon('check')}</label>`).join('')}</div></fieldset>
              <fieldset class="field"><legend>When are you hoping to purchase? <span aria-hidden="true">*</span></legend><div class="choice-grid choice-grid--three">${[['asap','As soon as practical'],['1-2','1–2 months'],['3-6','3–6 months'],['6-plus','6+ months'],['planning','Just planning']].map(([value,label]) => `<label class="choice-radio"><input type="radio" name="timing" value="${value}" /><span>${label}</span>${icon('check')}</label>`).join('')}</div></fieldset>
              <fieldset class="field"><legend>Installation plans <span aria-hidden="true">*</span></legend><div class="visual-choice-grid visual-choice-grid--three">${visualRadio('installation', 'contractor', 'Using a contractor', 'I have installation covered', 'box')}${visualRadio('installation', 'diy', 'Planning DIY', 'I need assembly guidance', 'ruler')}${visualRadio('installation', 'help', 'I need options', 'Tell me what may be available', 'phone')}</div></fieldset>
              <div class="field conditional-field" data-install-followup hidden><label for="installation-notes">What kind of installation help do you need? <span class="optional">Optional</span></label><textarea id="installation-notes" name="installationNotes" rows="3" placeholder="Tell us what is already arranged"></textarea></div>
              <fieldset class="field"><legend>Delivery preference <span aria-hidden="true">*</span></legend><div class="choice-grid choice-grid--three">${[['delivery','Delivery to project'],['pickup-info','I want pickup information'],['unknown','Not sure yet']].map(([value,label]) => `<label class="choice-radio"><input type="radio" name="fulfillment" value="${value}" /><span>${label}</span>${icon('check')}</label>`).join('')}</div><small>Pickup availability is not confirmed in the supplied source and will be clarified by the team.</small></fieldset>
            </section>

            <section class="quote-step" data-step="4" aria-labelledby="step-4-title" hidden>
              <div class="form-heading"><span>04</span><div><h2 id="step-4-title">Where should we send the next step?</h2><p>Add files if they help. Nothing needs to be presentation-ready.</p></div></div>
              <div class="field-grid"><div class="field"><label for="full-name">Full name <span aria-hidden="true">*</span></label><input id="full-name" name="fullName" autocomplete="name" required /></div><div class="field"><label for="email">Email <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required /></div></div>
              <div class="field-grid"><div class="field"><label for="phone">Phone <span aria-hidden="true">*</span></label><input id="phone" name="phone" type="tel" autocomplete="tel" required /></div><div class="field"><label for="contact-method">Preferred contact <span aria-hidden="true">*</span></label><select id="contact-method" name="contactMethod" required><option value="">Select a method</option><option value="email">Email</option><option value="phone">Phone</option><option value="text">Text message</option></select></div></div>
              <div class="field"><span class="field-label">Photos and plans <span class="optional">Optional</span></span><div class="upload-zone" data-upload-zone tabindex="0" role="button" aria-describedby="upload-guidance"><input id="quote-files" name="files" type="file" accept=".jpg,.jpeg,.png,.pdf" multiple hidden /><div>${icon('upload')}<strong>Drop files here or choose from your device</strong><span>Kitchen photos, sketches, floor plans or blueprints</span><button type="button" class="button button--secondary" data-select-files>Choose files</button></div></div><div class="camera-upload"><label for="quote-camera">${icon('camera')} Take a kitchen photo</label><input id="quote-camera" type="file" accept="image/*" capture="environment" /></div><p id="upload-guidance" class="upload-guidance">JPG, PNG or PDF · up to 10 MB each · files remain local in this prototype</p><div class="upload-previews" data-upload-previews aria-live="polite"></div></div>
              <div class="field"><label for="project-notes">Anything else we should know? <span class="optional">Optional</span></label><textarea id="project-notes" name="notes" rows="4" placeholder="Appliances, accessibility needs, existing plans or questions"></textarea></div>
              <label class="consent-row"><input type="checkbox" name="consent" required /><span>I agree that Temima may contact me about this design request. <a href="/#policies" data-link>Privacy information</a>.</span></label>
              <div class="submission-note">${icon('shield')} <p>This sends a realistic prototype submission only. It does not contact a CRM, upload files or send an email.</p></div>
            </section>

            <div class="quote-actions"><button class="button button--secondary" type="button" data-quote-back hidden>${icon('arrow')} Back</button><span data-save-status>${icon('check')} Progress saved on this device</span><button class="button button--primary button--large" type="button" data-quote-next>Continue ${icon('arrow')}</button><button class="button button--primary button--large" type="submit" data-quote-submit hidden>Send my design request ${icon('arrow')}</button></div>
          </form>
        </div>
      </div>
    </section>
  </main>`;

const requiredGroups = {
  1: ['zip', 'projectType', 'stage', 'service'],
  2: ['layout', 'doorStyle'],
  3: ['budget', 'timing', 'installation', 'fulfillment'],
  4: ['fullName', 'email', 'phone', 'contactMethod', 'consent']
};

export const initQuotePage = () => {
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;
  const stored = getQuote();
  let step = Math.min(4, Math.max(1, stored.step || 1));
  let files = [];
  let submitting = false;

  Object.entries(stored.values || {}).forEach(([name, value]) => {
    const fields = form.elements[name];
    if (!fields) return;
    if (fields instanceof RadioNodeList) [...fields].forEach((field) => { field.checked = field.value === value; });
    else if (fields.type === 'checkbox') fields.checked = Boolean(value);
    else fields.value = value;
  });

  const values = () => {
    const data = new FormData(form);
    const result = {};
    for (const [key, value] of data.entries()) if (key !== 'files') result[key] = value;
    return result;
  };

  const save = () => {
    setQuote({ step, values: values() });
    const status = document.querySelector('[data-save-status]');
    status.innerHTML = `${icon('check')} Progress saved on this device`;
  };

  const renderStep = (focus = false) => {
    document.querySelectorAll('[data-step]').forEach((panel) => { panel.hidden = Number(panel.dataset.step) !== step; });
    document.querySelectorAll('[data-progress-step]').forEach((item) => {
      item.classList.toggle('is-active', Number(item.dataset.progressStep) === step);
      item.classList.toggle('is-complete', Number(item.dataset.progressStep) < step);
    });
    const current = quoteSteps[step - 1];
    document.querySelector('[data-step-label]').textContent = `Step ${step} of 4`;
    document.querySelector('[data-step-name]').textContent = current.label;
    document.querySelector('[data-progress-percent]').textContent = `${step * 25}%`;
    document.querySelector('[data-progress-bar]').style.width = `${step * 25}%`;
    document.querySelector('[data-quote-back]').hidden = step === 1;
    document.querySelector('[data-quote-next]').hidden = step === 4;
    document.querySelector('[data-quote-submit]').hidden = step !== 4;
    document.querySelector('[data-error-summary]').hidden = true;
    if (focus) document.querySelector(`[data-step="${step}"] h2`)?.focus?.();
    save();
  };

  const fieldValue = (name) => {
    const field = form.elements[name];
    if (!field) return '';
    if (field instanceof RadioNodeList) return field.value;
    if (field.type === 'checkbox') return field.checked ? 'yes' : '';
    return field.value.trim();
  };

  const validate = () => {
    form.querySelectorAll('.has-error').forEach((field) => field.classList.remove('has-error'));
    form.querySelectorAll('[data-field-error]').forEach((message) => message.remove());
    const errors = [];
    requiredGroups[step].forEach((name) => {
      const value = fieldValue(name);
      const field = form.elements[name];
      const invalidEmail = name === 'email' && value && !/^\S+@\S+\.\S+$/.test(value);
      const invalidZip = name === 'zip' && value && !/^\d{5}$/.test(value);
      if (!value || invalidEmail || invalidZip) {
        const label = name === 'projectType' ? 'project type' : name === 'doorStyle' ? 'door style' : name === 'contactMethod' ? 'preferred contact method' : name.replace(/([A-Z])/g, ' $1').toLowerCase();
        const message = invalidEmail ? 'Enter a valid email address.' : invalidZip ? 'Enter a valid 5-digit ZIP code.' : `Choose or enter ${label}.`;
        errors.push({ name, message });
        const target = field instanceof RadioNodeList ? [...field][0]?.closest('fieldset') : field.closest('.field') || field.closest('label');
        target?.classList.add('has-error');
        const error = document.createElement('p'); error.dataset.fieldError = ''; error.className = 'field-error'; error.id = `${name}-error`; error.textContent = message; target?.append(error);
        if (!(field instanceof RadioNodeList)) field.setAttribute('aria-describedby', error.id);
      }
    });
    if (errors.length) {
      const summary = document.querySelector('[data-error-summary]');
      summary.querySelector('ul').innerHTML = errors.map((error) => `<li><button type="button" data-error-field="${error.name}">${error.message}</button></li>`).join('');
      summary.hidden = false; summary.focus();
      track('quote_error', { step, error_count: errors.length });
      return false;
    }
    return true;
  };

  const renderFiles = () => {
    document.querySelector('[data-upload-previews]').innerHTML = files.map((file, index) => `<div class="upload-preview">${file.type.startsWith('image/') && file.preview ? `<img src="${file.preview}" alt="Preview of ${file.name}" />` : icon('file')}<span><strong>${file.name}</strong><small>${(file.size / 1024 / 1024).toFixed(2)} MB · ${file.status}</small></span><button type="button" data-remove-file="${index}" aria-label="Remove ${file.name}">${icon('trash')}</button></div>`).join('');
  };

  const addFiles = (fileList) => {
    [...fileList].forEach((file) => {
      const allowed = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
      if (!allowed || file.size > 10 * 1024 * 1024) {
        window.temimaToast?.(`${file.name} could not be added. Use JPG, PNG or PDF under 10 MB.`, 'error');
        track('quote_error', { step: 4, error_type: 'upload_validation' });
        return;
      }
      const entry = { name: file.name, size: file.size, type: file.type, status: 'Ready for prototype submission', preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '' };
      files.push(entry);
      track('quote_upload', { file_type: file.type, file_size_bucket: file.size < 1024 * 1024 ? 'under_1mb' : '1mb_to_10mb' });
    });
    renderFiles();
  };

  form.addEventListener('input', () => save(), { signal: window.pageAbort?.signal });
  form.addEventListener('change', (event) => {
    save();
    if (event.target.name === 'installation') document.querySelector('[data-install-followup]').hidden = event.target.value !== 'help';
    if (event.target.name === 'zip') {
      const message = document.querySelector('[data-qualification]');
      if (/^\d{5}$/.test(event.target.value)) { message.hidden = false; message.innerHTML = `${icon('info')} ZIP captured. Live service and freight qualification will be connected in WordPress.`; }
    }
  }, { signal: window.pageAbort?.signal });

  document.querySelector('[data-quote-next]').addEventListener('click', () => {
    if (!validate()) return;
    track('quote_step_complete', { step, service: step === 1 ? fieldValue('service') : undefined });
    step += 1; renderStep(true); document.querySelector('.quote-form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, { signal: window.pageAbort?.signal });
  document.querySelector('[data-quote-back]').addEventListener('click', () => { step -= 1; renderStep(true); }, { signal: window.pageAbort?.signal });

  document.querySelector('[data-select-files]').addEventListener('click', () => document.getElementById('quote-files').click(), { signal: window.pageAbort?.signal });
  document.getElementById('quote-files').addEventListener('change', (event) => addFiles(event.target.files), { signal: window.pageAbort?.signal });
  document.getElementById('quote-camera').addEventListener('change', (event) => addFiles(event.target.files), { signal: window.pageAbort?.signal });
  const zone = document.querySelector('[data-upload-zone]');
  zone.addEventListener('keydown', (event) => { if (['Enter', ' '].includes(event.key)) { event.preventDefault(); document.getElementById('quote-files').click(); } }, { signal: window.pageAbort?.signal });
  ['dragenter', 'dragover'].forEach((name) => zone.addEventListener(name, (event) => { event.preventDefault(); zone.classList.add('is-dragging'); }, { signal: window.pageAbort?.signal }));
  ['dragleave', 'drop'].forEach((name) => zone.addEventListener(name, (event) => { event.preventDefault(); zone.classList.remove('is-dragging'); if (name === 'drop') addFiles(event.dataTransfer.files); }, { signal: window.pageAbort?.signal }));

  document.addEventListener('click', (event) => {
    const remove = event.target.closest('[data-remove-file]');
    if (remove) { const [file] = files.splice(Number(remove.dataset.removeFile), 1); if (file.preview) URL.revokeObjectURL(file.preview); renderFiles(); }
    const errorLink = event.target.closest('[data-error-field]');
    if (errorLink) { event.preventDefault(); const field = form.elements[errorLink.dataset.errorField]; (field instanceof RadioNodeList ? [...field][0] : field)?.focus(); }
  }, { signal: window.pageAbort?.signal });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (submitting || !validate()) return;
    submitting = true;
    const button = document.querySelector('[data-quote-submit]');
    button.disabled = true; button.innerHTML = '<span class="spinner"></span> Sending prototype request…';
    track('quote_submit', { project_type: fieldValue('projectType'), service: fieldValue('service'), budget_range: fieldValue('budget'), timing: fieldValue('timing'), file_count: files.length });
    const reference = createReference('TC-DESIGN');
    sessionStorage.setItem('temima-quote-confirmation', JSON.stringify({ reference, projectType: fieldValue('projectType'), service: fieldValue('service'), layout: fieldValue('layout'), budget: fieldValue('budget'), timing: fieldValue('timing'), fileCount: files.length }));
    window.setTimeout(() => { clearQuote(); files.forEach((file) => file.preview && URL.revokeObjectURL(file.preview)); window.temimaNavigate('/quote-confirmation'); }, 1100);
  }, { signal: window.pageAbort?.signal });

  document.querySelector('[data-install-followup]').hidden = fieldValue('installation') !== 'help';
  renderStep();
  if (!stored.values || !Object.keys(stored.values).length) track('quote_start', { entry_step: 1 });
};
