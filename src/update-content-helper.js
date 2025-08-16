import cloneDeep from '@educandu/educandu/utils/clone-deep.js';

const isCustom = item => item.id.startsWith('custom');

function syncCustomsIntoCache(nextSelection) {
  return nextSelection
    .filter(isCustom)
    .map(cloneDeep);
}

const updateContent = (content, newContentValues, onContentChanged, deleteFromCache) => {
  console.log('newContentValues:', newContentValues)
  const hasInstrumentsToUpdate = Object.hasOwn(newContentValues, 'instrumentsSelection');
  if (hasInstrumentsToUpdate && deleteFromCache) {
    let syncedCache = content.customInstrumentsCache;
    syncedCache = syncCustomsIntoCache(newContentValues.instrumentsSelection);
    const base = {
      ...content,
      ...newContentValues,
      customInstrumentsCache: syncedCache,
    };
    onContentChanged(base);
  } else {
    onContentChanged({ ...content, ...newContentValues });
  }
};

const updateContentHelper = {
  updateContent
};

export default updateContentHelper;