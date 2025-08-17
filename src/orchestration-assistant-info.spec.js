// orchestration-assistant-info.test.js
import React from 'react';
import joi from 'joi';
import { describe, it, expect, beforeEach } from 'vitest';

// reale Module importieren
import OrchestrationAssitantInfo from './orchestration-assistant-info.js';
import { PLUGIN_GROUP } from '@educandu/educandu/domain/constants.js';

describe('OrchestrationAssitantInfo', () => {
  let gfm;

  beforeEach(() => {
    gfm = {
      redactCdnResources: (text, allowFn) =>
        text.replace(/cdn:\/\/\S+/g, url => allowFn(url) ? url : ''),
      extractCdnResources: text => text.match(/cdn:\/\/\S+/g) || []
    };
  });

  it('getDisplayName provide name', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const t = key => key;
    expect(info.getDisplayName(t)).toBe(
      'musikisum/educandu-plugin-orchestration-assistant:name'
    );
  });

  it('getIcon provide an icon', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const el = info.getIcon();
    expect(React.isValidElement(el)).toBe(true);
  });

  it('getGroups provide PLUGIN_GROUP.other', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    expect(info.getGroups()).toEqual([PLUGIN_GROUP.other]);
  });

  it('getDefaultContent provide default values', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    expect(info.getDefaultContent()).toEqual({
      width: 100,
      from: 1,
      to: 50,
      instrumentsSelection: [],
      customInstrumentsCache: []
    });
  });

  it('validateContent with valid content', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const validContent = {
      width: 80,
      from: 5,
      to: 10,
      instrumentsSelection: [
        {
          id: 'id-1',
          name: 'Violine',
          begin: 1,
          end: 10,
          before: false,
          after: false,
          color: '#ff0000',
          de: 'DE',
          en: 'EN'
        }
      ]
    };
    expect(() => info.validateContent(validContent)).not.toThrow();
  });

  it('validateContent with invalid content', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const invalidContent = {
      width: 101,
      from: 1,
      to: 50,
      instrumentsSelection: []
    };
    expect(() => info.validateContent(invalidContent)).toThrow(joi.ValidationError);
  });

  it('cloneContent erstellt eine tiefe Kopie', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const original = {
      width: 50,
      from: 1,
      to: 10,
      instrumentsSelection: [{ id: 'x', name: 'A' }]
    };
    const copy = info.cloneContent(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    copy.instrumentsSelection[0].name = 'B';
    expect(original.instrumentsSelection[0].name).toBe('A');
  });

  it('redactContent terminate urls from private rooms', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const content = {
      width: 100,
      from: 1,
      to: 50,
      instrumentsSelection: [],
      text: 'allowed cdn://ok and blocked cdn://nope'
    };

    const allowFn = url => url.includes('ok');
    gfm.redactCdnResources = text =>
      text.replace(/cdn:\/\/\S+/g, url => allowFn(url) ? url : '');

    const redacted = info.redactContent(content, 'room-123');
    expect(redacted).not.toBe(content);
    expect(redacted.text).toBe('allowed cdn://ok and blocked ');
  });

  it('getCdnResources provide cdn resources', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const content = { text: 'cdn://a cdn://b' };
    const resources = info.getCdnResources(content);
    expect(resources).toEqual(['cdn://a', 'cdn://b']);
  });
});
