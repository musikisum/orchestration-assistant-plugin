import version from './version.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import OrchestrationAssistantInfo from './orchestration-assistant-info.js';
import GithubFlavoredMarkdown from '@educandu/educandu/common/github-flavored-markdown.js';

// ---------- Helpers ----------
const MAJOR = version.MAJOR;
const MINOR = version.MINOR;
const PATCH = version.PATCH;
const isNum = v => typeof v === 'number' && Number.isFinite(v);

function sanitizeInstrumentItem(instrument) {
  // These props have to match instruments props in instrumentselections of info file
  // Props can be added or deleted during major or minor updates here
  return {
    id: instrument.id,
    name: instrument.name,
    begin: instrument.begin,
    end: instrument.end,
    before: instrument.before,
    after: instrument.after,
    color: instrument.color,
    de: instrument.de,
    en: instrument.en
  };
}

// ---------- sanitize instruments ----------
function sanitizeInstrumentCollection(dbCollection) {
  if (!Array.isArray(dbCollection)) {
    return [];
  };
  const sanitizedColl = [];
  for (let index = 0; index < dbCollection.length; index += 1) {
    const instrument = dbCollection[index];
    if (instrument && typeof instrument === 'object') {
      sanitizedColl.push(sanitizeInstrumentItem(instrument));
    }
  }
  return sanitizedColl;
}

function validateContentAfterUpdates(dbContent, p) {
  const gfm = new GithubFlavoredMarkdown();
  const updatedContent = new OrchestrationAssistantInfo(gfm).getDefaultContent();

  const dbClonedContent = cloneDeep(dbContent);

  for (const key of Object.keys(updatedContent)) {
    if (key !== 'instrumentsSelection' && key !== 'customInstrumentsCache') {
      // add missing keys
      if (!Object.hasOwn(dbClonedContent, key)) {
        dbClonedContent[key] = updatedContent[key];
      }
    } else {
      // sanitize instrument collections
      dbClonedContent[key] = sanitizeInstrumentCollection(dbClonedContent[key]);
    }
  }

  // entferne unbekannte Keys
  for (const key of Object.keys(dbClonedContent)) {
    if (!Object.hasOwn(updatedContent, key)) {
      delete dbClonedContent[key];
    }
  }

  dbClonedContent._v = `${MAJOR}.${MINOR}.${p}`;
  return dbClonedContent;
}

// ---------- Public API ----------
function checkContentAfterUpdate(dbContent) {
  const v = dbContent?._v;

  if (typeof v === 'string') {
    const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(v);
    if (m) {
      const [ , majStr, minStr, patStr ] = m;
      const major = Number.parseInt(majStr, 10);
      const minor = Number.parseInt(minStr, 10);
      const patch = Number.parseInt(patStr, 10);
      if (isNum(major) && isNum(minor) && isNum(patch)
        && major === MAJOR && minor === MINOR && patch === PATCH) {
        return dbContent; // if version matching return
      }
    }
  }
  return validateContentAfterUpdates(dbContent, PATCH);
}

const updateValidation = {
  checkContentAfterUpdate
};
export default updateValidation;
