// ESPHome RGBWW Controller Konfigurator - app.js

const TOTAL_STEPS = 7;
let currentStep = 1;

const config = {
  type: '',
  platform: '',
  deviceName: 'led-controller',
  pwmFreq: 1200,
  pins: {},
  useSecrets: true,
  wifiSsid: '',
  wifiPass: '',
  apiKey: '',
  otaPass: '',
  captivePortal: true,
  webServer: false,
  gamma: 2.8,
  transition: 800,
  restoreMode: 'RESTORE_DEFAULT_OFF',
  colorInterlock: true,
  constantBrightness: true,
  warmTemp: 2700,
  coldTemp: 6000,
  presets: [],
  effects: []
};

// --- Controller-Typ Definitionen ---

const TYPES = {
  rgb: {
    label: 'RGB', platform: 'rgb', lightId: 'rgb_light', lightName: 'RGB Strip',
    channels: ['red', 'green', 'blue'],
    hasRgb: true, hasWhite: false, hasCct: false
  },
  rgbw: {
    label: 'RGBW', platform: 'rgbw', lightId: 'rgbw_light', lightName: 'RGBW Strip',
    channels: ['red', 'green', 'blue', 'white'],
    hasRgb: true, hasWhite: true, hasCct: false
  },
  rgbww: {
    label: 'RGBWW', platform: 'rgbww', lightId: 'rgbww_light', lightName: 'RGBWW Strip',
    channels: ['red', 'green', 'blue', 'warm_white', 'cold_white'],
    hasRgb: true, hasWhite: true, hasCct: true
  },
  'dual-white': {
    label: 'Dual White', platform: 'cwww', lightId: 'cct_light', lightName: 'CCT Strip',
    channels: ['warm_white', 'cold_white'],
    hasRgb: false, hasWhite: true, hasCct: true
  },
  'single-white': {
    label: 'Single White', platform: 'monochromatic', lightId: 'white_dimmer', lightName: 'White Dimmer',
    channels: ['white'],
    hasRgb: false, hasWhite: true, hasCct: false
  }
};

const CHANNEL_LABELS = {
  red: 'Red', green: 'Green', blue: 'Blue',
  white: 'White', warm_white: 'Warm White', cold_white: 'Cold White'
};

const DEFAULT_PINS_8266 = {
  red: 'GPIO13', green: 'GPIO12', blue: 'GPIO14',
  white: 'GPIO5', warm_white: 'GPIO5', cold_white: 'GPIO4'
};

const DEFAULT_PINS_32 = {
  red: 'GPIO16', green: 'GPIO17', blue: 'GPIO18',
  white: 'GPIO19', warm_white: 'GPIO19', cold_white: 'GPIO21'
};

const GPIO_OPTIONS_8266 = [
  'GPIO0','GPIO1','GPIO2','GPIO3','GPIO4','GPIO5',
  'GPIO12','GPIO13','GPIO14','GPIO15','GPIO16'
];

const GPIO_OPTIONS_32 = [
  'GPIO2','GPIO4','GPIO5','GPIO12','GPIO13','GPIO14','GPIO15',
  'GPIO16','GPIO17','GPIO18','GPIO19','GPIO21','GPIO22','GPIO23',
  'GPIO25','GPIO26','GPIO27','GPIO32','GPIO33'
];

// --- Presets pro Typ ---

function getAvailablePresets(type) {
  const t = TYPES[type];
  const presets = [];

  if (t.hasRgb) {
    presets.push(
      { id: 'red', name: 'Red', icon: 'mdi:palette', checked: true },
      { id: 'green', name: 'Green', icon: 'mdi:palette', checked: true },
      { id: 'blue', name: 'Blue', icon: 'mdi:palette', checked: true },
      { id: 'yellow', name: 'Yellow', icon: 'mdi:palette', checked: true },
      { id: 'cyan', name: 'Cyan', icon: 'mdi:palette', checked: true },
      { id: 'purple', name: 'Purple', icon: 'mdi:palette', checked: true }
    );
  }

  if (type === 'rgb') {
    presets.push(
      { id: 'white_rgb', name: 'White (RGB)', icon: 'mdi:lightbulb', checked: true },
      { id: 'warm_white_rgb', name: 'Warm White (RGB)', icon: 'mdi:white-balance-sunny', checked: true },
      { id: 'cool_white_rgb', name: 'Cool White (RGB)', icon: 'mdi:snowflake', checked: true }
    );
  }

  if (type === 'rgbw') {
    presets.push(
      { id: 'pure_white', name: 'Pure White', icon: 'mdi:lightbulb-on', checked: true },
      { id: 'pure_white_50', name: 'Pure White 50%', icon: 'mdi:lightbulb-on-outline', checked: false }
    );
  }

  if (t.hasCct) {
    presets.push(
      { id: 'warm_2700k', name: 'Warm 2700K', icon: 'mdi:white-balance-sunny', checked: true },
      { id: 'neutral_4000k', name: 'Neutral 4000K', icon: 'mdi:lightbulb-variant', checked: true },
      { id: 'cool_6000k', name: 'Cool 6000K', icon: 'mdi:snowflake', checked: true }
    );
    if (type === 'dual-white') {
      presets.push(
        { id: 'warm_3000k', name: 'Warm 3000K', icon: 'mdi:white-balance-sunny', checked: false },
        { id: 'cool_5000k', name: 'Cool 5000K', icon: 'mdi:snowflake-variant', checked: false }
      );
    }
  }

  if (type === 'single-white') {
    presets.push(
      { id: 'bright_100', name: '100%', icon: 'mdi:lightbulb-on', checked: true },
      { id: 'bright_75', name: '75%', icon: 'mdi:lightbulb-on-outline', checked: true },
      { id: 'bright_50', name: '50%', icon: 'mdi:lightbulb-on-outline', checked: true },
      { id: 'bright_25', name: '25%', icon: 'mdi:lightbulb-outline', checked: true }
    );
  }

  // Szenen
  if (t.hasCct || type === 'rgbw') {
    presets.push({ id: 'reading', name: 'Reading', icon: 'mdi:book-open-page-variant', checked: true });
  }
  if (type === 'single-white') {
    presets.push({ id: 'reading_sw', name: 'Reading', icon: 'mdi:book-open-page-variant', checked: true });
  }
  if (t.hasCct) {
    presets.push({ id: 'office', name: 'Office', icon: 'mdi:briefcase', checked: true });
  }
  if (type === 'dual-white') {
    presets.push({ id: 'morning', name: 'Morning', icon: 'mdi:weather-sunset-up', checked: true });
  }

  presets.push({ id: 'relax', name: 'Relax', icon: 'mdi:sofa', checked: true });
  presets.push({ id: 'night_light', name: 'Night Light', icon: 'mdi:weather-night', checked: true });

  if (t.hasRgb || type === 'dual-white' || type === 'single-white') {
    presets.push({ id: 'candle', name: 'Candle', icon: 'mdi:candle', checked: true });
  }

  if (type === 'single-white') {
    presets.push({ id: 'wake_up', name: 'Wake Up', icon: 'mdi:weather-sunset-up', checked: true });
  }

  return presets;
}

function getAvailableEffects(type) {
  const t = TYPES[type];
  const effects = [
    { id: 'soft_pulse', name: 'Soft Pulse', checked: true }
  ];
  if (t.hasRgb) {
    effects.push({ id: 'random_colors', name: 'Random Colors', checked: true });
  }
  effects.push({ id: 'candle_effect', name: 'Candle (Flicker)', checked: true });
  return effects;
}

// --- UI Initialisierung ---

function initProgressBar() {
  const bar = document.getElementById('progressBar');
  bar.innerHTML = '';
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const div = document.createElement('div');
    div.className = 'progress-step' + (i === 1 ? ' active' : '');
    div.id = 'prog-' + i;
    bar.appendChild(div);
  }
}

function updateProgress() {
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const el = document.getElementById('prog-' + i);
    el.className = 'progress-step';
    if (i < currentStep) el.classList.add('done');
    else if (i === currentStep) el.classList.add('active');
  }
}

function showStep(n) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  const target = n > TOTAL_STEPS ? 'step-output' : 'step-' + n;
  document.getElementById(target).classList.add('active');
  currentStep = n;
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
  collectStepData(currentStep);
  if (currentStep === 2) buildPinGrid();
  if (currentStep === 3) initStep4();
  if (currentStep === 4) buildLightOptions();
  if (currentStep === 5) buildPresetGrid();
  if (currentStep === 6) buildEffectGrid();
  showStep(currentStep + 1);
}

function prevStep() {
  showStep(currentStep - 1);
}

function backToEdit() {
  showStep(TOTAL_STEPS);
}

function resetAll() {
  config.type = '';
  config.platform = '';
  document.querySelectorAll('.card-option').forEach(c => c.classList.remove('selected'));
  document.getElementById('btn-next-1').disabled = true;
  document.getElementById('btn-next-2').disabled = true;
  showStep(1);
}

// --- Card Selection ---

function setupCardSelection(containerId, configKey, btnId) {
  const container = document.getElementById(containerId);
  container.querySelectorAll('.card-option').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.card-option').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      config[configKey] = card.dataset.value;
      if (btnId) document.getElementById(btnId).disabled = false;
    });
  });
}

// --- Step 3: Pin Grid ---

function buildPinGrid() {
  const t = TYPES[config.type];
  const grid = document.getElementById('pinGrid');
  grid.innerHTML = '';
  const defaults = config.platform === 'esp8266' ? DEFAULT_PINS_8266 : DEFAULT_PINS_32;
  const options = config.platform === 'esp8266' ? GPIO_OPTIONS_8266 : GPIO_OPTIONS_32;

  t.channels.forEach(ch => {
    config.pins[ch] = config.pins[ch] || defaults[ch] || options[0];
    const div = document.createElement('div');
    div.className = 'pin-group';
    div.innerHTML = `<label>${CHANNEL_LABELS[ch]}</label>
      <select data-channel="${ch}">${options.map(p =>
        `<option value="${p}" ${p === config.pins[ch] ? 'selected' : ''}>${p}</option>`
      ).join('')}</select>`;
    grid.appendChild(div);
  });

  grid.querySelectorAll('select').forEach(sel => {
    sel.addEventListener('change', () => {
      config.pins[sel.dataset.channel] = sel.value;
    });
  });
}

// --- Step 4: Netzwerk ---

function initStep4() {
  const useSecretsEl = document.getElementById('useSecrets');
  const toggle = () => {
    const use = useSecretsEl.checked;
    config.useSecrets = use;
    document.getElementById('secretsFields').style.display = use ? 'block' : 'none';
    document.getElementById('directFields').style.display = use ? 'none' : 'block';
  };
  useSecretsEl.addEventListener('change', toggle);
  toggle();

  const wsCheckbox = document.getElementById('webServer');
  wsCheckbox.addEventListener('change', () => {
    config.webServer = wsCheckbox.checked;
    const warn = document.getElementById('webServerWarning');
    warn.style.display = (wsCheckbox.checked && config.platform === 'esp8266') ? 'block' : 'none';
  });
}

// --- Step 5: Light Options ---

function buildLightOptions() {
  const t = TYPES[config.type];
  const container = document.getElementById('lightOptionsContainer');
  container.innerHTML = '';

  if (t.hasRgb && t.hasWhite) {
    container.innerHTML += `
      <div class="toggle-group">
        <div class="toggle-label">Color Interlock<span class="toggle-hint">Entweder RGB oder Weiss aktiv (nicht gleichzeitig)</span></div>
        <label class="toggle-switch"><input type="checkbox" id="colorInterlock" checked><span class="toggle-slider"></span></label>
      </div>`;
  }

  if (t.hasCct) {
    container.innerHTML += `
      <div class="toggle-group">
        <div class="toggle-label">Constant Brightness<span class="toggle-hint">Gleichmaessige Helligkeit ueber alle Farbtemperaturen</span></div>
        <label class="toggle-switch"><input type="checkbox" id="constBright" checked><span class="toggle-slider"></span></label>
      </div>
      <div class="form-row" style="margin-top:1rem">
        <div class="form-group">
          <label for="warmTemp">Warm White Temperatur (K)</label>
          <input type="number" id="warmTemp" value="${config.warmTemp}" min="1800" max="4000">
        </div>
        <div class="form-group">
          <label for="coldTemp">Cold White Temperatur (K)</label>
          <input type="number" id="coldTemp" value="${config.coldTemp}" min="4000" max="10000">
        </div>
      </div>`;
  }
}

// --- Step 6: Presets ---

function buildPresetGrid() {
  const grid = document.getElementById('presetGrid');
  grid.innerHTML = '';
  const presets = getAvailablePresets(config.type);
  presets.forEach(p => {
    const item = document.createElement('label');
    item.className = 'preset-item';
    item.innerHTML = `<input type="checkbox" data-preset="${p.id}" ${p.checked ? 'checked' : ''}><span class="preset-name">${p.name}</span>`;
    grid.appendChild(item);
  });
}

// --- Step 7: Effects ---

function buildEffectGrid() {
  const grid = document.getElementById('effectGrid');
  grid.innerHTML = '';
  const effects = getAvailableEffects(config.type);
  effects.forEach(e => {
    const item = document.createElement('label');
    item.className = 'preset-item';
    item.innerHTML = `<input type="checkbox" data-effect="${e.id}" ${e.checked ? 'checked' : ''}><span class="preset-name">${e.name}</span>`;
    grid.appendChild(item);
  });
}

// --- Daten sammeln ---

function collectStepData(step) {
  if (step === 3) {
    config.deviceName = document.getElementById('deviceName').value.replace(/[^a-z0-9-]/g, '').toLowerCase() || 'led-controller';
    config.pwmFreq = parseInt(document.getElementById('pwmFreq').value) || 1200;
  }
  if (step === 4) {
    config.useSecrets = document.getElementById('useSecrets').checked;
    config.captivePortal = document.getElementById('captivePortal').checked;
    config.webServer = document.getElementById('webServer').checked;
    if (!config.useSecrets) {
      config.wifiSsid = document.getElementById('wifiSsid').value;
      config.wifiPass = document.getElementById('wifiPass').value;
      config.apiKey = document.getElementById('apiKey').value;
      config.otaPass = document.getElementById('otaPass').value;
    }
  }
  if (step === 5) {
    config.gamma = parseFloat(document.getElementById('gamma').value);
    config.transition = parseInt(document.getElementById('transition').value) || 800;
    config.restoreMode = document.getElementById('restoreMode').value;
    const ciEl = document.getElementById('colorInterlock');
    if (ciEl) config.colorInterlock = ciEl.checked;
    const cbEl = document.getElementById('constBright');
    if (cbEl) config.constantBrightness = cbEl.checked;
    const wtEl = document.getElementById('warmTemp');
    if (wtEl) config.warmTemp = parseInt(wtEl.value) || 2700;
    const ctEl = document.getElementById('coldTemp');
    if (ctEl) config.coldTemp = parseInt(ctEl.value) || 6000;
  }
  if (step === 6) {
    config.presets = [];
    document.querySelectorAll('#presetGrid input[type="checkbox"]:checked').forEach(cb => {
      config.presets.push(cb.dataset.preset);
    });
  }
  if (step === 7) {
    config.effects = [];
    document.querySelectorAll('#effectGrid input[type="checkbox"]:checked').forEach(cb => {
      config.effects.push(cb.dataset.effect);
    });
  }
}

// --- YAML Generierung ---

function generate() {
  collectStepData(currentStep);
  const controller = generateControllerYaml();
  const dashboard = generateDashboardYaml();
  const secrets = generateSecretsYaml();

  document.getElementById('controllerYaml').textContent = controller;
  document.getElementById('dashboardYaml').textContent = dashboard;
  document.getElementById('secretsYaml').textContent = secrets;
  showStep(TOTAL_STEPS + 1);
}

function generateControllerYaml() {
  const t = TYPES[config.type];
  const lines = [];

  // Header
  const chLabel = t.channels.map(c => CHANNEL_LABELS[c]).join(', ');
  lines.push(`# ${t.label} Controller (${chLabel})`);
  lines.push(`# ESPHome RGBWW Controller - ${t.label} Variant`);
  lines.push(`# Version: 2.1`);
  lines.push('');

  // ESPHome
  lines.push('esphome:');
  lines.push(`  name: ${config.deviceName}`);
  lines.push(`  comment: "${t.label} LED Controller"`);
  lines.push('  project:');
  lines.push('    name: vr6syncro.esphome-rgbww-controller');
  lines.push('    version: "2.1"');
  lines.push('');

  // Preferences
  lines.push('preferences:');
  lines.push('  flash_write_interval: 30s');
  lines.push('');

  // Platform
  if (config.platform === 'esp8266') {
    lines.push('esp8266:');
    lines.push('  board: esp12e');
    lines.push('  restore_from_flash: true');
  } else {
    lines.push('esp32:');
    lines.push('  board: esp32dev');
    lines.push('  framework:');
    lines.push('    type: arduino');
  }
  lines.push('');

  // Logger
  lines.push('logger:');
  lines.push('  level: INFO');
  lines.push('');

  // API
  lines.push('api:');
  lines.push('  encryption:');
  lines.push(`    key: ${config.useSecrets ? '!secret api_encryption_key' : '"' + config.apiKey + '"'}`);
  lines.push('  reboot_timeout: 0s');
  lines.push('');

  // OTA
  lines.push('ota:');
  lines.push('  platform: esphome');
  lines.push(`  password: ${config.useSecrets ? '!secret ota_password' : '"' + config.otaPass + '"'}`);
  lines.push('');

  // WiFi
  lines.push('wifi:');
  lines.push(`  ssid: ${config.useSecrets ? '!secret wifi_ssid' : '"' + config.wifiSsid + '"'}`);
  lines.push(`  password: ${config.useSecrets ? '!secret wifi_password' : '"' + config.wifiPass + '"'}`);
  lines.push('  power_save_mode: none');
  lines.push('');

  // Captive Portal
  if (config.captivePortal) {
    lines.push('captive_portal:');
    lines.push('');
  }

  // Web Server
  if (config.webServer) {
    lines.push('web_server:');
    lines.push('  port: 80');
    lines.push('');
  }

  // Status LED
  lines.push('status_led:');
  lines.push('  pin: GPIO2');
  lines.push('');

  // Outputs
  lines.push('output:');
  const pwmPlatform = config.platform === 'esp8266' ? 'esp8266_pwm' : 'ledc';
  t.channels.forEach(ch => {
    const outputId = 'out_' + ch;
    lines.push(`  - platform: ${pwmPlatform}`);
    lines.push(`    id: ${outputId}`);
    lines.push(`    pin: ${config.pins[ch]}`);
    lines.push(`    frequency: ${config.pwmFreq} Hz`);
  });
  lines.push('');

  // Light
  lines.push('light:');
  lines.push(`  - platform: ${t.platform}`);
  lines.push(`    name: "${t.lightName}"`);
  lines.push(`    id: ${t.lightId}`);

  if (config.type === 'single-white') {
    lines.push('    output: out_white');
  } else {
    t.channels.forEach(ch => {
      lines.push(`    ${ch}: out_${ch}`);
    });
  }

  if (t.hasCct) {
    lines.push(`    cold_white_color_temperature: ${config.coldTemp} K`);
    lines.push(`    warm_white_color_temperature: ${config.warmTemp} K`);
  }

  lines.push(`    gamma_correct: ${config.gamma}`);
  lines.push(`    default_transition_length: ${config.transition}ms`);

  if (t.hasCct) {
    lines.push(`    constant_brightness: ${config.constantBrightness}`);
  }
  if (t.hasRgb && t.hasWhite) {
    lines.push(`    color_interlock: ${config.colorInterlock}`);
  }

  lines.push(`    restore_mode: ${config.restoreMode}`);

  // Effects
  if (config.effects.length > 0) {
    lines.push('    effects:');
    if (config.effects.includes('soft_pulse')) {
      const dur = (config.type === 'rgb' || config.type === 'rgbw') ? '1.5s' : '2s';
      lines.push('      - pulse:');
      lines.push('          name: "Soft Pulse"');
      lines.push(`          transition_length: ${dur}`);
    }
    if (config.effects.includes('random_colors')) {
      lines.push('      - random:');
      lines.push('          name: "Random Colors"');
      lines.push('          transition_length: 2s');
    }
    if (config.effects.includes('candle_effect')) {
      lines.push('      - flicker:');
      lines.push('          name: "Candle"');
      lines.push('          alpha: 95%');
      lines.push('          intensity: 1.5%');
    }
  }
  lines.push('');

  // Presets
  lines.push('button:');
  const lid = t.lightId;

  config.presets.forEach(pid => {
    const preset = generatePreset(pid, config.type, lid);
    if (preset) lines.push(preset);
  });

  // System Buttons
  lines.push('  # --- System ---');
  lines.push('  - platform: safe_mode');
  lines.push('    name: "Safe Mode"');
  lines.push('');
  lines.push('  - platform: factory_reset');
  lines.push('    name: "Factory Reset"');
  lines.push('');
  lines.push('  - platform: restart');
  lines.push('    name: "Restart Controller"');
  lines.push('');

  // Sensors
  lines.push('sensor:');
  lines.push('  - platform: wifi_signal');
  lines.push('    name: "WiFi Signal"');
  lines.push('    update_interval: 60s');
  lines.push('  - platform: uptime');
  lines.push('    name: "Uptime"');
  lines.push('');
  lines.push('binary_sensor:');
  lines.push('  - platform: status');
  lines.push('    name: "Online"');
  lines.push('');
  lines.push('text_sensor:');
  lines.push('  - platform: wifi_info');
  lines.push('    ip_address:');
  lines.push('      name: "IP Address"');
  lines.push('    ssid:');
  lines.push('      name: "SSID"');
  lines.push('    mac_address:');
  lines.push('      name: "MAC"');

  return lines.join('\n');
}

function generatePreset(pid, type, lid) {
  const t = TYPES[type];
  const lines = [];

  const rgbPreset = (id, name, r, g, b) => {
    lines.push(`  - platform: template`);
    lines.push(`    id: preset_${id}`);
    lines.push(`    name: "Preset: ${name}"`);
    lines.push(`    icon: mdi:palette`);
    lines.push(`    on_press:`);
    lines.push(`      - light.control:`);
    lines.push(`          id: ${lid}`);
    if (t.hasWhite) lines.push(`          color_mode: RGB`);
    lines.push(`          brightness: !lambda return id(${lid}).current_values.get_brightness();`);
    lines.push(`          red: ${r}%`);
    lines.push(`          green: ${g}%`);
    lines.push(`          blue: ${b}%`);
    lines.push('');
    return lines.join('\n');
  };

  const cctPreset = (id, name, temp, icon, brightness) => {
    lines.push(`  - platform: template`);
    lines.push(`    id: preset_${id}`);
    lines.push(`    name: "Preset: ${name}"`);
    lines.push(`    icon: ${icon}`);
    lines.push(`    on_press:`);
    lines.push(`      - light.control:`);
    lines.push(`          id: ${lid}`);
    lines.push(`          color_mode: COLD_WARM_WHITE`);
    lines.push(`          color_temperature: ${temp} K`);
    if (brightness) {
      lines.push(`          brightness: ${brightness}`);
    } else {
      lines.push(`          brightness: !lambda return id(${lid}).current_values.get_brightness();`);
    }
    lines.push('');
    return lines.join('\n');
  };

  switch (pid) {
    case 'red': return rgbPreset('red', 'Red', 100, 0, 0);
    case 'green': return rgbPreset('green', 'Green', 0, 100, 0);
    case 'blue': return rgbPreset('blue', 'Blue', 0, 0, 100);
    case 'yellow': return rgbPreset('yellow', 'Yellow', 100, 100, 0);
    case 'cyan': return rgbPreset('cyan', 'Cyan', 0, 100, 100);
    case 'purple': return rgbPreset('purple', 'Purple', 100, 0, 100);

    case 'white_rgb': return rgbPreset('white_rgb', 'White (RGB)', 100, 100, 100);
    case 'warm_white_rgb': {
      lines.push(`  - platform: template`);
      lines.push(`    id: preset_warm_white_rgb`);
      lines.push(`    name: "Preset: Warm White (RGB)"`);
      lines.push(`    icon: mdi:white-balance-sunny`);
      lines.push(`    on_press:`);
      lines.push(`      - light.control:`);
      lines.push(`          id: ${lid}`);
      lines.push(`          brightness: !lambda return id(${lid}).current_values.get_brightness();`);
      lines.push(`          red: 100%`);
      lines.push(`          green: 83%`);
      lines.push(`          blue: 66%`);
      lines.push('');
      return lines.join('\n');
    }
    case 'cool_white_rgb': {
      lines.push(`  - platform: template`);
      lines.push(`    id: preset_cool_white_rgb`);
      lines.push(`    name: "Preset: Cool White (RGB)"`);
      lines.push(`    icon: mdi:snowflake`);
      lines.push(`    on_press:`);
      lines.push(`      - light.control:`);
      lines.push(`          id: ${lid}`);
      lines.push(`          brightness: !lambda return id(${lid}).current_values.get_brightness();`);
      lines.push(`          red: 95%`);
      lines.push(`          green: 100%`);
      lines.push(`          blue: 100%`);
      lines.push('');
      return lines.join('\n');
    }

    case 'pure_white': {
      lines.push(`  - platform: template`);
      lines.push(`    id: preset_pure_white`);
      lines.push(`    name: "Preset: Pure White"`);
      lines.push(`    icon: mdi:lightbulb-on`);
      lines.push(`    on_press:`);
      lines.push(`      - light.control:`);
      lines.push(`          id: ${lid}`);
      lines.push(`          color_mode: WHITE`);
      lines.push(`          white: 100%`);
      lines.push(`          brightness: !lambda return id(${lid}).current_values.get_brightness();`);
      lines.push('');
      return lines.join('\n');
    }
    case 'pure_white_50': {
      lines.push(`  - platform: template`);
      lines.push(`    id: preset_pure_white_50`);
      lines.push(`    name: "Preset: Pure White 50%"`);
      lines.push(`    icon: mdi:lightbulb-on-outline`);
      lines.push(`    on_press:`);
      lines.push(`      - light.control:`);
      lines.push(`          id: ${lid}`);
      lines.push(`          color_mode: WHITE`);
      lines.push(`          white: 100%`);
      lines.push(`          brightness: 50%`);
      lines.push('');
      return lines.join('\n');
    }

    case 'warm_2700k': return cctPreset('warm_2700k', 'Warm 2700K', 2700, 'mdi:white-balance-sunny');
    case 'warm_3000k': return cctPreset('warm_3000k', 'Warm 3000K', 3000, 'mdi:white-balance-sunny');
    case 'neutral_4000k': return cctPreset('neutral_4000k', 'Neutral 4000K', 4000, 'mdi:lightbulb-variant');
    case 'cool_5000k': return cctPreset('cool_5000k', 'Cool 5000K', 5000, 'mdi:snowflake-variant');
    case 'cool_6000k': return cctPreset('cool_6000k', 'Cool 6000K', 6000, 'mdi:snowflake');

    case 'reading': {
      if (type === 'rgbww' || type === 'dual-white') {
        return cctPreset('reading', 'Reading', 4000, 'mdi:book-open-page-variant', '85%');
      }
      return null;
    }
    case 'reading_sw': {
      lines.push(`  - platform: template`);
      lines.push(`    id: preset_reading`);
      lines.push(`    name: "Preset: Reading"`);
      lines.push(`    icon: mdi:book-open-page-variant`);
      lines.push(`    on_press:`);
      lines.push(`      - light.control:`);
      lines.push(`          id: ${lid}`);
      lines.push(`          brightness: 85%`);
      lines.push('');
      return lines.join('\n');
    }
    case 'office': {
      return cctPreset('office', 'Office', 5500, 'mdi:briefcase', '90%');
    }
    case 'morning': {
      return cctPreset('morning', 'Morning', 3500, 'mdi:weather-sunset-up', '80%');
    }

    case 'relax': {
      lines.push(`  - platform: template`);
      lines.push(`    id: preset_relax`);
      lines.push(`    name: "Preset: Relax"`);
      lines.push(`    icon: mdi:sofa`);
      lines.push(`    on_press:`);
      lines.push(`      - light.control:`);
      lines.push(`          id: ${lid}`);
      if (t.hasCct) {
        lines.push(`          color_mode: COLD_WARM_WHITE`);
        lines.push(`          color_temperature: 3000 K`);
      } else if (type === 'rgbw') {
        lines.push(`          color_mode: WHITE`);
        lines.push(`          white: 100%`);
      }
      lines.push(`          brightness: 30%`);
      lines.push(`          transition_length: 3s`);
      lines.push('');
      return lines.join('\n');
    }

    case 'night_light': {
      lines.push(`  - platform: template`);
      lines.push(`    id: preset_night_light`);
      lines.push(`    name: "Preset: Night Light"`);
      lines.push(`    icon: mdi:weather-night`);
      lines.push(`    on_press:`);
      lines.push(`      - light.control:`);
      lines.push(`          id: ${lid}`);
      if (t.hasCct) {
        lines.push(`          color_mode: COLD_WARM_WHITE`);
        lines.push(`          color_temperature: 2700 K`);
      } else if (type === 'rgbw') {
        lines.push(`          color_mode: WHITE`);
        lines.push(`          white: 100%`);
      }
      lines.push(`          brightness: 5%`);
      lines.push('');
      return lines.join('\n');
    }

    case 'candle': {
      lines.push(`  - platform: template`);
      lines.push(`    id: preset_candle`);
      lines.push(`    name: "Preset: Candle"`);
      lines.push(`    icon: mdi:candle`);
      lines.push(`    on_press:`);
      lines.push(`      - light.control:`);
      lines.push(`          id: ${lid}`);
      if (t.hasRgb) {
        if (t.hasWhite) lines.push(`          color_mode: RGB`);
        lines.push(`          effect: Candle`);
        lines.push(`          brightness: !lambda return id(${lid}).current_values.get_brightness();`);
        lines.push(`          red: 100%`);
        lines.push(`          green: 60%`);
        lines.push(`          blue: 10%`);
      } else {
        lines.push(`          effect: Candle`);
        lines.push(`          brightness: !lambda return id(${lid}).current_values.get_brightness();`);
      }
      lines.push('');
      return lines.join('\n');
    }

    case 'bright_100':
    case 'bright_75':
    case 'bright_50':
    case 'bright_25': {
      const pct = pid.split('_')[1];
      const icons = { '100': 'mdi:lightbulb-on', '75': 'mdi:lightbulb-on-outline', '50': 'mdi:lightbulb-on-outline', '25': 'mdi:lightbulb-outline' };
      lines.push(`  - platform: template`);
      lines.push(`    id: preset_${pct}_percent`);
      lines.push(`    name: "Preset: ${pct}%"`);
      lines.push(`    icon: ${icons[pct]}`);
      lines.push(`    on_press:`);
      lines.push(`      - light.control:`);
      lines.push(`          id: ${lid}`);
      lines.push(`          brightness: ${pct}%`);
      lines.push('');
      return lines.join('\n');
    }

    case 'wake_up': {
      lines.push(`  - platform: template`);
      lines.push(`    id: preset_wake_up`);
      lines.push(`    name: "Preset: Wake Up"`);
      lines.push(`    icon: mdi:weather-sunset-up`);
      lines.push(`    on_press:`);
      lines.push(`      - light.control:`);
      lines.push(`          id: ${lid}`);
      lines.push(`          brightness: 100%`);
      lines.push(`          transition_length: 30s`);
      lines.push('');
      return lines.join('\n');
    }

    default: return null;
  }
}

function generateDashboardYaml() {
  const t = TYPES[config.type];
  const name = config.deviceName;
  const lines = [];

  lines.push('type: entities');
  lines.push(`title: ${t.label} Controller`);
  lines.push('entities:');
  lines.push(`  - entity: light.${name.replace(/-/g, '_')}_${t.lightName.toLowerCase().replace(/\s+/g, '_')}`);
  lines.push('    name: Light');

  config.presets.forEach(pid => {
    const pName = getPresetDisplayName(pid);
    if (pName) {
      const btnId = getPresetButtonId(pid);
      lines.push(`  - entity: button.${name.replace(/-/g, '_')}_preset_${btnId}`);
      lines.push(`    name: "${pName}"`);
    }
  });

  lines.push('  - type: divider');
  lines.push(`  - entity: sensor.${name.replace(/-/g, '_')}_wifi_signal`);
  lines.push('    name: WiFi');
  lines.push(`  - entity: sensor.${name.replace(/-/g, '_')}_uptime`);
  lines.push('    name: Uptime');
  lines.push(`  - entity: binary_sensor.${name.replace(/-/g, '_')}_online`);
  lines.push('    name: Status');
  lines.push('  - type: divider');
  lines.push(`  - entity: button.${name.replace(/-/g, '_')}_restart_controller`);
  lines.push('    name: Restart');

  return lines.join('\n');
}

function getPresetDisplayName(pid) {
  const map = {
    red: 'Red', green: 'Green', blue: 'Blue', yellow: 'Yellow',
    cyan: 'Cyan', purple: 'Purple', white_rgb: 'White (RGB)',
    warm_white_rgb: 'Warm White (RGB)', cool_white_rgb: 'Cool White (RGB)',
    pure_white: 'Pure White', pure_white_50: 'Pure White 50%',
    warm_2700k: 'Warm 2700K', warm_3000k: 'Warm 3000K',
    neutral_4000k: 'Neutral 4000K', cool_5000k: 'Cool 5000K',
    cool_6000k: 'Cool 6000K', reading: 'Reading', reading_sw: 'Reading',
    office: 'Office', morning: 'Morning', relax: 'Relax',
    night_light: 'Night Light', candle: 'Candle',
    bright_100: '100%', bright_75: '75%', bright_50: '50%', bright_25: '25%',
    wake_up: 'Wake Up'
  };
  return map[pid] || pid;
}

function getPresetButtonId(pid) {
  const map = {
    red: 'red', green: 'green', blue: 'blue', yellow: 'yellow',
    cyan: 'cyan', purple: 'purple', white_rgb: 'white_rgb',
    warm_white_rgb: 'warm_white_rgb', cool_white_rgb: 'cool_white_rgb',
    pure_white: 'pure_white', pure_white_50: 'pure_white_50',
    warm_2700k: 'warm_2700k', warm_3000k: 'warm_3000k',
    neutral_4000k: 'neutral_4000k', cool_5000k: 'cool_5000k',
    cool_6000k: 'cool_6000k', reading: 'reading', reading_sw: 'reading',
    office: 'office', morning: 'morning', relax: 'relax',
    night_light: 'night_light', candle: 'candle',
    bright_100: '100_percent', bright_75: '75_percent',
    bright_50: '50_percent', bright_25: '25_percent',
    wake_up: 'wake_up'
  };
  return map[pid] || pid;
}

function generateSecretsYaml() {
  const lines = [];
  lines.push('# secrets.yaml -- Sensible Daten hier eintragen');
  lines.push('# Diese Datei NICHT ins Git einchecken!');
  lines.push('');
  lines.push('wifi_ssid: "DEIN_WLAN_NAME"');
  lines.push('wifi_password: "DEIN_WLAN_PASSWORT"');
  lines.push('api_encryption_key: "DEIN_BASE64_API_KEY"');
  lines.push('ota_password: "DEIN_OTA_PASSWORT"');
  return lines.join('\n');
}

// --- Utility ---

function generateApiKey() {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  const key = btoa(String.fromCharCode(...arr));
  document.getElementById('apiKey').value = key;
}

function copyText(elementId, btn) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.textContent = 'Kopiert!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.textContent = 'Kopieren';
    }, 2000);
  });
}

function downloadText(elementId, prefix) {
  const text = document.getElementById(elementId).textContent;
  const blob = new Blob([text], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${prefix}_${config.deviceName}.yaml`;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Gamma Slider ---

document.getElementById('gamma').addEventListener('input', function() {
  document.getElementById('gammaValue').textContent = this.value;
});

// --- Init ---

setupCardSelection('typeCards', 'type', 'btn-next-1');
setupCardSelection('platformCards', 'platform', 'btn-next-2');
initProgressBar();
