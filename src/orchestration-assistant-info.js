import joi from 'joi';
import React from 'react';
import PluginIcon from './orchestration-assistant-icon.js'; 
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
    return <PluginIcon />;
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
      width: 100,
      from: 1,
      to: 50,
      instrumentsSelection: [],
    };
  }

  validateContent(content) {
    const schema = joi.object({
      width: joi.number().min(0).max(100).required(),
      from: joi.number().integer().min(1).max(50).required(),
      to: joi.number().integer().min(1).max(50).required(),
      instrumentsSelection: joi.array().items(joi.object({
        id: joi.string().required(),
        name: joi.string().allow(null, ''),
        section: joi.string().allow(null, ''),
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

    redactedContent.text = this.gfm.redactCdnResources(
      redactedContent.text,
      url => couldAccessUrlFromRoom(url, targetRoomId) ? url : ''
    );

    return redactedContent;
  }

  getCdnResources(content) {
    return this.gfm.extractCdnResources(content.text);
  }
}

export default OrchestrationAssitantInfo;
