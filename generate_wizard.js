// generate_wizard.js
// This script generates plm_scene_designer.html without any </script> in the JS code

const fs = require('fs');

let html = '';

// Helper: append to html
function a(s) { html += s + '\n'; }

// HTML head
a('<!DOCTYPE html>');
a('<html lang="zh-CN">');
a('<head>');
a('<meta charset="UTF-8"/>');
a('<title>PLM AI 场景设计向导</title>');
// Use <\/script> in CDN tags to avoid issues
a('<script src="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js"><\/script>');
a('<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>');

// CSS
a('<style>');
a('  body { font-family: -apple-system, sans-serif; font-size: 13px; color: #2c2c2a; background: #f5f4f0; min-height: 100vh; display: flex; flex-direction: column; margin: 0; }');
a('  .step-nav { background: #fff; border-bottom: 1px solid #d3d1c7; padding: 16px 24px; }');
a('  .step-nav-title { font-size: 15px; font-weight: 500; margin-bottom: 12px; }');
a('  .step-bar { display: flex; align-items: center; gap: 4px; }');
a('  .step-item { display: flex; align-items: center; cursor: pointer; }');
a('  .step-circle { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #d3d1c7; display: flex; align-items: center; justify-content: center; font-size: 12px; }');
a('  .step-label { font-size: 11px; margin-left: 6px; margin-right: 10px; white-space: nowrap; }');
a('  .step-connector { width: 28px; height: 2px; background: #d3d1c7; }');
a('  .step-item.active .step-circle { border-color: #185fa5; background: #185fa5; color: #fff; }');
a('  .step-item.active .step-label { color: #185fa5; font-weight: 500; }');
a('  .step-item.completed .step-circle { border-color: #97c459; background: #97c459; color: #fff; }');
a('  .step-item.completed .step-circle::after { content: "✓"; }');
a('  .main-body { display: flex; flex: 1; }');
a('  .step-form-panel { width: 370px; background: #fff; border-right: 1px solid #d3d1c7; padding: 16px; overflow-y: auto; }');
a('  .step-content { flex: 1; padding: 24px; overflow-y: auto; background: #fafaf7; }');
a('  .bottom-bar { background: #fff; border-top: 1px solid #d3d1c7; padding: 12px 24px; display: flex; gap: 10px; }');
a('  .btn { padding: 8px 16px; border-radius: 6px; cursor: pointer; border: none; font-size: 13px; }');
a('  .btn-prev { background: #f5f4f0; color: #444; border: 1px solid #d3d1c7; }');
a('  .btn-next { background: #185fa5; color: #fff; }');
a('  .btn-skip { background: #fff; color: #888; border: 1px solid #d3d1c7; }');
a('  .preview-card { background: #fff; border: 1px solid #d3d1c7; border-radius: 8px; padding: 20px; max-width: 800px; }');
a('  .preview-card h1 { font-size: 18px; font-weight: 500; margin-bottom: 12px; }');
a('  .preview-card h2 { font-size: 14px; font-weight: 500; margin: 16px 0 8px; }');
a('  .empty-state { text-align: center; padding: 60px; color: #888; }');
a('  .form-row { margin-bottom: 12px; }');
a('  .form-label { display: block; font-size: 12px; font-weight: 500; margin-bottom: 4px; }');
a('  input, textarea, select { width: 100%; padding: 7px 10px; border: 1px solid #d3d1c7; border-radius: 6px; font-size: 12px; font-family: inherit; }');
a('  .preset-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 12px; }');
a('  .preset-btn { padding: 8px 10px; border: 1px solid #d3d1c7; border-radius: 6px; background: #f8f8f5; cursor: pointer; text-align: left; font-size: 11px; }');
a('</style>');
a('</head>');
a('<body>');

// HTML body
a('<header class="step-nav">');
a('  <div class="step-nav-title">PLM AI 场景设计向导 <span style="font-size:12px;color:#888;">· 面向全栈开发工程师</span></div>');
a('  <div class="step-bar" id="stepBar"></div>');
a('</header>');
a('<div class="main-body">');
a('  <div class="step-form-panel" id="stepFormPanel"></div>');
a('  <div class="step-content" id="stepContent"></div>');
a('</div>');
a('<div class="bottom-bar">');
a('  <button class="btn btn-prev" onclick="prevStep()">« 上一步</button>');
a('  <button class="btn btn-skip" onclick="skipStep()">跳过此步</button>');
a('  <button class="btn btn-next" onclick="nextStep()">下一步 »</button>');
a('</div>');

// JavaScript - MUST NOT contain '</script>' literally
a('<script>');
a('// PLM AI Scene Design Wizard - Step by Step');
a('const STEPS = ["场景定义","业务流程","Agent设计","示例数据","交互逻辑","原型界面","生成交付"];');
a('let currentStep = 1;');
a('');
a('function renderStepBar() {');
a('  const bar = document.getElementById("stepBar");');
a('  let h = "";');
a('  for (let i = 0; i < STEPS.length; i++) {');
a('    const n = i + 1;');
a('    const cls = (n === currentStep) ? "step-item active" : "step-item";');
a('    h += \'<div class="\' + cls + \'" onclick="goToStep(\' + n + \')"><div class="step-circle">\' + n + \'</div><div class="step-label">\' + STEPS[i] + \'</div></div>\';');
a('    if (i < STEPS.length - 1) h += \'<div class="step-connector"></div>\';');
a('  }');
a('  bar.innerHTML = h;');
a('}');
a('');
a('function goToStep(n) {');
a('  if (n < 1 || n > 7) return;');
a('  currentStep = n;');
a('  renderStepBar();');
a('  renderStep();');
a('}');
a('');
a('function nextStep() { if (currentStep < 7) goToStep(currentStep + 1); }');
a('function prevStep() { if (currentStep > 1) goToStep(currentStep - 1); }');
a('function skipStep() { if (currentStep < 7) goToStep(currentStep + 1); }');
a('');
a('function renderStep() {');
a('  const panel = document.getElementById("stepFormPanel");');
a('  const content = document.getElementById("stepContent");');
a('  if (currentStep === 1) {');
a('    panel.innerHTML = getStep1Form();');
a('    content.innerHTML = getStep1Preview();');
a('  } else if (currentStep === 7) {');
a('    panel.innerHTML = "<div style=\'padding:20px;\'><h3>生成交付物</h3><p>选择格式并生成...</p></div>";');
a('    content.innerHTML = "<div class=\'preview-card\'><h1>生成交付物</h1><p>点击「生成」按钮</p></div>";');
a('  } else {');
a('    panel.innerHTML = "<div style=\'padding:20px;\'><h3>步骤 " + currentStep + "</h3><p>表单...</p></div>";');
a('    content.innerHTML = "<div class=\'empty-state\'><p>步骤 " + currentStep + " 预览</p></div>";');
a('  }');
a('}');
a('');
a('function getStep1Form() {');
a('  return \'<div><div style="font-size:11px;color:#888;margin-bottom:8px;">快速选择预设</div><div class="preset-grid"><button class="preset-btn" onclick="loadPreset(0)">变更影响分析</button><button class="preset-btn" onclick="loadPreset(1)">技术文档问答</button></div></div>\' +');
a('    \'<div style="margin-top:12px;"><div style="font-size:11px;color:#888;margin-bottom:8px;">场景信息</div>\' +');
a('    \'<div class="form-row"><label class="form-label">场景名称</label><input type="text" id="f_name" oninput="updatePreview()"/></div>\' +');
a('    \'<div class="form-row"><label class="form-label">所属域</label><select id="f_domain" onchange="updatePreview()"><option value="">请选择</option><option value="设计与建模">设计与建模</option><option value="制造与工艺">制造与工艺</option></select></div>\' +');
a('    \'<div class="form-row"><label class="form-label">业务痛点</label><textarea id="f_pain" rows="3" oninput="updatePreview()"></textarea></div>\' +');
a('    \'</div>\';');
a('}');
a('');
a('function getStep1Preview() {');
a('  const name = (document.getElementById("f_name")||{}).value || "未命名";');
a('  const domain = (document.getElementById("f_domain")||{}).value || "未分类";');
a('  const pain = (document.getElementById("f_pain")||{}).value || "待填写";');
a('  return \'<div class="preview-card"><h1>\' + name + \'</h1><p><strong>域：</strong>\' + domain + \'</p><p><strong>痛点：</strong>\' + pain + \'</p></div>\';');
a('}');
a('');
a('function updatePreview() {');
a('  if (currentStep === 1) {');
a('    document.getElementById("stepContent").innerHTML = getStep1Preview();');
a('  }');
a('}');
a('');
a('function loadPreset(i) {');
a('  const presets = [{name:"变更影响分析",domain:"设计与建模",pain:"影响评估耗时长"},{name:"技术文档问答",domain:"知识与文档",pain:"检索耗时长"}];');
a('  if (presets[i]) {');
a('    document.getElementById("f_name").value = presets[i].name;');
a('    document.getElementById("f_domain").value = presets[i].domain;');
a('    document.getElementById("f_pain").value = presets[i].pain;');
a('    updatePreview();');
a('  }');
a('}');
a('');
a('document.addEventListener("DOMContentLoaded", function() {');
a('  renderStepBar();');
a('  renderStep();');
a('});');
a('');

// IMPORTANT: close the script tag using string concatenation to avoid HTML parser seeing it
const ET = String.fromCharCode(60, 47, 115, 99, 114, 105, 112, 116, 62); // "</script>"
a(ET);
a('</body>');
a('</html>');

// Write file
fs.writeFileSync('plm_scene_designer.html', html, 'utf8');
console.log('File generated successfully! Size:', html.length, 'bytes');

// Verify no premature </script> in the file
const written = fs.readFileSync('plm_scene_designer.html', 'utf8');
const scriptStart = written.indexOf('<script>');
const scriptContent = written.substring(scriptStart + 8);
const prematureEnd = scriptContent.indexOf('</script>');
if (prematureEnd === -1) {
  console.log('ERROR: script block is not closed properly');
} else {
  console.log('Script block closes at position:', scriptStart + 8 + prematureEnd);
  // Check if this is the only </script> in the script block
  const afterClose = scriptContent.substring(prematureEnd + 9);
  const secondClose = afterClose.indexOf('</script>');
  if (secondClose === -1) {
    console.log('SUCCESS: No premature </script> found in JavaScript code');
  } else {
    console.log('WARNING: Found another </script> at offset', secondClose);
  }
}
