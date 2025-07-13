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
    return [PLUGIN_GROUP.mostUsed, PLUGIN_GROUP.other];
  }

  async resolveDisplayComponent() {
    return (await import('./orchestration-assistant-display.js')).default;
  }

  async resolveEditorComponent() {
    return (await import('./orchestration-assistant-editor.js')).default;
  }

  getDefaultContent() {
    return {
      text: '',
      width: 100,
      fromMidi: 24,
      toMidi: 108
    };
  }

  validateContent(content) {
    const schema = joi.object({
      text: joi.string().allow('').required(),
      width: joi.number().min(0).max(100).required(),
      fromMidi: joi.number().integer().min(24).max(108).required(),
      toMidi: joi.number().integer().min(24).max(108).required()
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
