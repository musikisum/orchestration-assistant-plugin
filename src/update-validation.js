import cloneDeep from 'lodash/cloneDeep';
import OrchestrationAssitantInfo from './orchestration-assistant-info.js';

const isObj = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const sameType = (a, b) => {
  if (a === null || b === null) {
    return a === b;
  }
  return typeof a === typeof b;
};

function deepSanitizeByTemplate(template, data, normalizers = {}, path = '') {
  // 1) Arrays
  if (Array.isArray(template)) {
    const itemTemplate = template.length > 0 ? template[0] : null;
    const normalizer = normalizers[path];

    if (!Array.isArray(data)) {
      return [];
    }

    if (typeof normalizer === 'function') {
      const cleaned = [];
      for (const item of data) {
        const res = normalizer(item, itemTemplate);
        if (res !== null) {
          cleaned.push(res);
        }
      }
      return cleaned;
    }

    if (itemTemplate !== null) {
      return data
        .map(item => deepSanitizeByTemplate(itemTemplate, item, normalizers, `${path}[]`))
        .filter(x => x !== null);
    }

    return cloneDeep(data);
  }

  // 2) Objekte
  if (isObj(template)) {
    const result = {};
    const src = isObj(data) ? data : {};

    for (const key of Object.keys(template)) {
      const childPath = path ? `${path}.${key}` : key;
      result[key] = deepSanitizeByTemplate(template[key], src[key], normalizers, childPath);
    }
    return result;
  }

  // 3) Primitive oder null
  if (data === null) {
    return cloneDeep(template);
  }

  if (template === null) {
    return null;
  }

  if (sameType(template, data)) {
    return cloneDeep(data);
  }

  return cloneDeep(template);
}

// --- Spezifische Item-Sanitizer für Arrays ---

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
const isNum = v => typeof v === 'number' && Number.isFinite(v);
const isBool = v => typeof v === 'boolean';
const isStr = v => typeof v === 'string';

function sanitizeInstrumentItem(raw) {
  if (!isObj(raw)) {
    return null;
  }

  if (!isStr(raw.id) || raw.id.trim() === '') {
    return null;
  }

  const out = {
    id: raw.id,
    name: raw.name === '' || raw.name === null || isStr(raw.name) ? raw.name ?? null : null,
    begin: isNum(raw.begin) ? clamp(raw.begin, 1, 49) : null,
    end: isNum(raw.end) ? clamp(raw.end, 2, 51) : null,
    before: isBool(raw.before) ? raw.before : false,
    after: isBool(raw.after) ? raw.after : false,
    color: raw.color === '' || raw.color === null || isStr(raw.color) ? raw.color ?? null : null,
    de: raw.de === '' || raw.de === null || isStr(raw.de) ? raw.de ?? null : null,
    en: raw.en === '' || raw.en === null || isStr(raw.en) ? raw.en ?? null : null
  };

  if (isNum(out.begin) && isNum(out.end) && out.end <= out.begin) {
    const fixed = clamp(out.begin + 1, 2, 51);
    if (fixed > out.begin) {
      out.end = fixed;
    } else {
      out.end = null;
    }
  }

  return out;
}

const ARRAY_NORMALIZERS = {
  instrumentsSelection: sanitizeInstrumentItem,
  customInstrumentsCache: sanitizeInstrumentItem
};

// --- API ---

function sanitizeContent(dbContent) {
  const template = new OrchestrationAssitantInfo().getDefaultContent();
  const safe = deepSanitizeByTemplate(template, dbContent, ARRAY_NORMALIZERS);

  if (
    typeof safe?.from === 'number'
    && typeof safe?.to === 'number'
    && safe.to < safe.from
  ) {
    safe.to = safe.from;
  }

  return safe;
}

const Updater = { sanitizeContent };
export default Updater;
