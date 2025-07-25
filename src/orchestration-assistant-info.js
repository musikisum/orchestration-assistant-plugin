import joi from 'joi';
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { PLUGIN_GROUP } from '@educandu/educandu/domain/constants.js';
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
    return <ClockCircleOutlined />;
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
      customInstruments: []
    };
  }

  validateContent(content) {
    const schema = joi.object({
      width: joi.number().min(0).max(100).required(),
      from: joi.number().integer().min(1).max(50).required(),
      to: joi.number().integer().min(1).max(50).required(),
      customInstruments: joi.array().items(joi.object())
    });

    joi.attempt(content, schema, { abortEarly: false, convert: false, noDefaults: true });
  }

  cloneContent(content) {
    return cloneDeep(content);
  }

  redactContent(content) {
    return cloneDeep(content);
  }

  getCdnResources() {
    return [];
  }
}

export default OrchestrationAssitantInfo;
