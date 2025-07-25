import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import OrchestrationAssitantInfo from './orchestration-assistant-info.js';

// Validate content after updates
const validateContentAfterUpdates = dbContent => {
  const updatedContent = new OrchestrationAssitantInfo().getDefaultContent();
  const dbClonedContent  = cloneDeep(dbContent);
  for (const key in updatedContent) {
    if (!Object.hasOwn(dbClonedContent, key)) {
      dbClonedContent[key] = updatedContent[key];
    }
  }
  for (const key in dbClonedContent) {
    if (!Object.hasOwn(updatedContent, key)) {
      delete dbClonedContent[key];
    }
  }
  return dbClonedContent;
};

const UpdateValidator = { 
  validateContentAfterUpdates
};

export default UpdateValidator;
