// add_wizard.js - Adds step wizard navigation to the restored backup file
const fs = require('fs');
const path = 'plm_scene_designer.html';

let html = fs.readFileSync(path, 'utf8');

// 1. Add step wizard CSS before </style>
const stepWizardCSS = `
  /* ── Step Wizard Bar ── */
  .wizard-bar { background: #fff; border-bottom: 1px solid #d3d1c7; padding: 12px 24px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .wizard-step { display: flex; align-items: center; cursor: pointer; padding: 6px 12px; border-radius: 20px; border: 1px solid #d3d1c7; font-size: 12px; transition: all 0.2s; }
  .wizard-step.active { background: #185fa5; color: #fff; border-color: #185fa5; }
  .wizard-step.completed { background: #97c459; color: #fff; border-color: #97c459; }
  .wizard-step:hover:not(.active) { background: #f0f0f0; }
  .wizard-connector { width: 24px; height: 2px; background: #d3d1c7; }
  .wizard-nav-buttons { margin-left: auto; display: flex; gap: 8px; }
  .wizard-btn { padding: 6px 14px; border-radius: 6px; font-size: 12px; cursor: pointer; border: none; }
  .wizard-btn-prev { background: #f5f4f0; color: #444; border: 1px solid #d3d1c7; }
  .wizard-btn-next { background: #185fa5; color: #fff; }
  .wizard-btn-skip { background: #fff; color: #888; border: 1px solid #d3d1c7; }
`;

html = html.replace('</style>', stepWizardCSS + '</style>');

// 2. Add wizard bar HTML after </header>
const wizardHTML = '\n<div class="wizard-bar" id="wizardBar">' +
  '<div class="wizard-step active" data-step="1" onclick="goWizardStep(1)">1. 场景定义</div>' +
  '<div class="wizard-connector"></div>' +
  '<div class="wizard-step" data-step="2" onclick="goWizardStep(2)">2. 业务流程</div>' +
  '<div class="wizard-connector"></div>' +
  '<div class="wizard-step" data-step="3" onclick="goWizardStep(3)">3. Agent设计</div>' +
  '<div class="wizard-connector"></div>' +
  '<div class="wizard-step" data-step="4" onclick="goWizardStep(4)">4. 示例数据</div>' +
  '<div class="wizard-connector"></div>' +
  '<div class="wizard-step" data-step="5" onclick="goWizardStep(5)">5. 交互逻辑</div>' +
  '<div class="wizard-connector"></div>' +
  '<div class="wizard-step" data-step="6" onclick="goWizardStep(6)">6. 原型界面</div>' +
  '<div class="wizard-connector"></div>' +
  '<div class="wizard-step" data-step="7" onclick="goWizardStep(7)">7. 生成交付</div>' +
  '<div class="wizard-nav-buttons">' +
  '  <button class="wizard-btn wizard-btn-prev" onclick="wizardPrev()">上一步</button>' +
  '  <button class="wizard-btn wizard-btn-skip" onclick="wizardSkip()">跳过</button>' +
  '  <button class="wizard-btn wizard-btn-next" onclick="wizardNext()">下一步</button>' +
  '</div>' +
  '</div>\n';

html = html.replace('</header>\n\n<!-- ── Body ── -->', '</header>\n' + wizardHTML + '<!-- ── Body ── -->');

// 3. Add wizard JavaScript before </script>
const wizardJS = `
// ── Step Wizard Logic ──
let wizardCurrentStep = 1;
const WIZARD_TAB_MAP = { 1:'overview', 2:'workflow', 3:'reasoning', 4:'data', 5:'interaction', 6:'prototype', 7:'toolchain' };

function goWizardStep(n) {
  wizardCurrentStep = n;
  updateWizardUI();
  if (WIZARD_TAB_MAP[n]) switchTab(WIZARD_TAB_MAP[n]);
}

function wizardNext() { if (wizardCurrentStep < 7) goWizardStep(wizardCurrentStep + 1); }
function wizardPrev() { if (wizardCurrentStep > 1) goWizardStep(wizardCurrentStep - 1); }
function wizardSkip() { markWizardStepCompleted(wizardCurrentStep); wizardNext(); }

function markWizardStepCompleted(n) {
  const el = document.querySelector('.wizard-step[data-step="' + n + '"]');
  if (el) el.classList.add('completed');
}

function updateWizardUI() {
  document.querySelectorAll('.wizard-step').forEach(el => {
    const s = parseInt(el.getAttribute('data-step'));
    el.classList.remove('active', 'completed');
    if (s === wizardCurrentStep) el.classList.add('active');
    else if (s < wizardCurrentStep) el.classList.add('completed');
  });
}
`;

// Find the closing </script> and add wizard JS before it
const scriptEnd = html.lastIndexOf('</script>');
if (scriptEnd > 0) {
  html = html.substring(0, scriptEnd) + wizardJS + '\n' + html.substring(scriptEnd);
}

fs.writeFileSync(path, html, 'utf8');
console.log('Wizard navigation added successfully!');
console.log('File size:', html.length, 'bytes');
