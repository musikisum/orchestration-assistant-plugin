import joi from 'joi';
import React from 'react';
import version from './version.js';
import IconComponent from './orchestration-assistant-icon.js'; 
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { PLUGIN_GROUP } from '@educandu/educandu/domain/constants.js';
import { couldAccessUrlFromRoom } from '@educandu/educandu/utils/source-utils.js';
import GithubFlavoredMarkdown from '@educandu/educandu/common/github-flavored-markdown.js';

class OrchestrationAssitantInfo {
  static dependencies = [GithubFlavoredMarkdown];

  static typeName = 'musikisum/educandu-plugin-orchestration-assistant';

  constructor(gfm) {
    this.gfm = gfm;
  }

  getDisplayName(t) {
    return t('musikisum/educandu-plugin-orchestration-assistant:name');
  }

  getIcon() {
    return <IconComponent />;
  }

  getGroups() {
    return [PLUGIN_GROUP.other];
  }

  async resolveDisplayComponent() {
    return (await import('./orchestration-assistant-display.js')).default;
  }

  async resolveEditorComponent() {
    return (await import('./orchestration-assistant-editor.js')).default;
  }

  getDefaultContent() {
    return {
      _v: version.toString(),
      width: 100,
      from: 1,
      to: 50,
      instrumentsSelection: [],
      customInstrumentsCache: []
    };
  }

  validateContent(content) {
    const schema = joi.object({
      _v: joi.string(),
      width: joi.number().min(0).max(100).required(),
      from: joi.number().integer().min(1).max(50).required(),
      to: joi.number().integer().min(1).max(50).required(),
      before: joi.bool(),
      after: joi.bool(),
      instrumentsSelection: joi.array().items(joi.object({
        id: joi.string().required(),
        name: joi.string().allow(null, ''),
        begin: joi.number().min(1).max(49),
        end: joi.number().min(2).max(51),
        before: joi.bool(),
        after: joi.bool(),
        color: joi.string().allow(null, ''),
        de: joi.string().allow(null, ''),
        en: joi.string().allow(null, '')
      })),
      customInstrumentsCache: joi.array().items(joi.object({
        id: joi.string().required(),
        name: joi.string().allow(null, ''),
        begin: joi.number().min(1).max(49),
        end: joi.number().min(2).max(51),
        before: joi.bool(),
        after: joi.bool(),
        color: joi.string().allow(null, ''),
        de: joi.string().allow(null, ''),
        en: joi.string().allow(null, '')
      })),
    });
    joi.attempt(content, schema, { abortEarly: false, convert: false, noDefaults: true });
  }

  cloneContent(content) {
    return cloneDeep(content);
  }

  redactContent(content, targetRoomId) {
    const redactedContent = cloneDeep(content);

    const redactField = str => {
      if (typeof str === 'string') {
        return this.gfm.redactCdnResources(str, url => { 
          return couldAccessUrlFromRoom(url, targetRoomId) ? url : '';
        });
      } 
      return str;      
    };

    const redactArray = arr => {
      if (Array.isArray(arr)) {
        return arr.map(item => {
          if (!item || typeof item !== 'object') {
            return item;
          }
          return {
            ...item,
            de: redactField(item.de),
            en: redactField(item.en)
          };
        });
      } 
      return arr;
      
    };

    redactedContent.instrumentsSelection = redactArray(redactedContent.instrumentsSelection);
    redactedContent.customInstrumentsCache = redactArray(redactedContent.customInstrumentsCache);
    return redactedContent;
  }

  getCdnResources(content) {
    const collectFromArray = arr => {
      if (Array.isArray(arr)) {
        return arr.flatMap(item => {
          if (!item || typeof item !== 'object') {
            return [];
          }
          const deRes = typeof item.de === 'string'
            ? this.gfm.extractCdnResources(item.de)
            : [];
          const enRes = typeof item.en === 'string'
            ? this.gfm.extractCdnResources(item.en)
            : [];
          return [...deRes, ...enRes];
        });
      } 
      return [];      
    };

    const resources = [
      ...collectFromArray(content.instrumentsSelection),
      ...collectFromArray(content.customInstrumentsCache)
    ];

    return [...new Set(resources)];
  }
}

export default OrchestrationAssitantInfo;
