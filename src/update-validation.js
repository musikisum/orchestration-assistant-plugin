import version from './version.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import OrchestrationAssistantInfo from './orchestration-assistant-info.js';

// ---------- Helpers ----------
const MAJOR = version.MAJOR;
const MINOR = version.MINOR;
const PATCH = version.PATCH;
const isNum  = v => typeof v === 'number' && Number.isFinite(v);

function sanitizeInstrumentItem(instrument) {
  // At this point, properties can be added or deleted during major or minor updates
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
  const sanitizedColl = [];
  for (let index = 0; index < dbCollection.length; index += 1) {
    const instrument = dbCollection[index];
    if (instrument) {
      sanitizedColl.push(sanitizeInstrumentItem(instrument));      
    }
  }
  return sanitizedColl;
}

function validateContentAfterUpdates(dbContent, p) {
  const updatedContent = new OrchestrationAssistantInfo().getDefaultContent();
  const dbClonedContent  = cloneDeep(dbContent);
  for (const key of Object.keys(updatedContent)) {
    if (key !== 'instrumentsSelection' && key !== 'customInstrumentsCache') {
      // Add missing keys 
      if (!Object.hasOwn(dbClonedContent, key)) {
        dbClonedContent[key] = updatedContent[key];
      }
    } else { 
      // sanitize instrument collections
      dbClonedContent[key] = sanitizeInstrumentCollection(dbClonedContent[key]);
    }  
  }
  for (const key in dbClonedContent) {
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
  if (typeof v !== 'string') {
    return validateContentAfterUpdates(dbContent, PATCH);
  }
  const [majStr, minStr] = v.split('.');
  const major = Number.parseInt(majStr, 10);
  const minor = Number.parseInt(minStr, 10);
  if (!isNum(major) || !isNum(minor) || major !== MAJOR || minor !== MINOR) {
    return validateContentAfterUpdates(dbContent, PATCH);
  }
  return dbContent;
}

const updateValidation = { 
  checkContentAfterUpdate 
};
export default updateValidation;
