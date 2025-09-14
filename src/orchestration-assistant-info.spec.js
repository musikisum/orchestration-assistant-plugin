// orchestration-assistant-info.test.js
import React from 'react';
import joi from 'joi';
import { describe, it, expect, beforeEach } from 'vitest';

import OrchestrationAssitantInfo from './orchestration-assistant-info.js';
import { PLUGIN_GROUP } from '@educandu/educandu/domain/constants.js';
import { couldAccessUrlFromRoom } from '@educandu/educandu/utils/source-utils.js';
import GithubFlavoredMarkdown from '@educandu/educandu/common/github-flavored-markdown.js';

describe('OrchestrationAssitantInfo', () => {
  let gfm;

  beforeEach(() => {
    gfm = new GithubFlavoredMarkdown();
  });

  it('getDisplayName provides name', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const t = key => key;
    expect(info.getDisplayName(t)).toBe(
      'musikisum/educandu-plugin-orchestration-assistant:name'
    );
  });

  it('getIcon provides an icon', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const el = info.getIcon();
    expect(React.isValidElement(el)).toBe(true);
  });

  it('getGroups provides PLUGIN_GROUP.other', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    expect(info.getGroups()).toEqual([PLUGIN_GROUP.other]);
  });

  it('getDefaultContent provides default values', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    expect(info.getDefaultContent()).toEqual(expect.objectContaining({
      _v: expect.stringMatching(/^\d+\.\d+\.\d+$/),
      width: 100,
      from: 1,
      to: 50,
      instrumentsSelection: [],
      customInstrumentsCache: []
    }));
  });

  it('validateContent with valid content', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const validContent = {
      width: 80,
      from: 5,
      to: 10,
      instrumentsSelection: [
        {
          id: 'oap-default-violin',
          name: 'Violine',
          begin: 1,
          end: 10,
          before: false,
          after: false,
          color: '#612500',
          de: 'Siehe cdn://ok/file-a',
          en: 'See cdn://ok/file-b'
        }
      ],
      customInstrumentsCache: []
    };
    expect(() => info.validateContent(validContent)).not.toThrow();
  });

  it('validateContent with invalid content', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const invalidContent = {
      width: 101, // ungültig > 100
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
      instrumentsSelection: [{ id: 'x', name: 'A', de: 'foo', en: 'bar' }],
      customInstrumentsCache: []
    };
    const copy = info.cloneContent(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    copy.instrumentsSelection[0].name = 'B';
    expect(original.instrumentsSelection[0].name).toBe('A');
  });

  it('redactContent removes inaccessible URLs in de/en', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const targetRoomId = 'room-123';

    const content = {
      width: 100,
      from: 1,
      to: 50,
      instrumentsSelection: [
        {
          id: 'i1',
          name: 'Vl',
          de: 'allow cdn://ok/a block cdn://nope/x',
          en: 'also cdn://ok/b and cdn://nope/y'
        }
      ],
      customInstrumentsCache: [
        {
          id: 'c1',
          name: 'Vla',
          de: 'mix cdn://nope/z and cdn://ok/c',
          en: null
        }
      ]
    };

    const redacted = info.redactContent(content, targetRoomId);
    expect(redacted).not.toBe(content);
    const expectedDeI1 = gfm.redactCdnResources(
      content.instrumentsSelection[0].de,
      url => couldAccessUrlFromRoom(url, targetRoomId)
    );
    const expectedEnI1 = gfm.redactCdnResources(
      content.instrumentsSelection[0].en,
      url => couldAccessUrlFromRoom(url, targetRoomId)
    );
    const expectedDeC1 = gfm.redactCdnResources(
      content.customInstrumentsCache[0].de,
      url => couldAccessUrlFromRoom(url, targetRoomId)
    );

    expect(redacted.instrumentsSelection[0].de).toBe(expectedDeI1);
    expect(redacted.instrumentsSelection[0].en).toBe(expectedEnI1);
    expect(redacted.customInstrumentsCache[0].de).toBe(expectedDeC1);

    expect(redacted.width).toBe(100);
    expect(redacted.from).toBe(1);
    expect(redacted.to).toBe(50);
  });

  it('getCdnResources collects and deduplicates resources', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const content = {
      instrumentsSelection: [
        { id: 'i1', de: 'x ![a](cdn://a) y ![b](cdn://b)', en: 'z [b](cdn://b)' },
        { id: 'i2', de: null, en: '[c](cdn://c)' }
      ],
      customInstrumentsCache: [
        { id: 'c1', de: '![a](cdn://a) <img src="cdn://d">', en: '' },
        { id: 'c2', de: 42 }
      ]
    };

    const resources = info.getCdnResources(content);
    const extract = val => typeof val === 'string' ? gfm.extractCdnResources(val) : [];
    const seq = [
      ...extract(content.instrumentsSelection[0].de),
      ...extract(content.instrumentsSelection[0].en),
      ...extract(content.instrumentsSelection[1].de),
      ...extract(content.instrumentsSelection[1].en),
      ...extract(content.customInstrumentsCache[0].de),
      ...extract(content.customInstrumentsCache[0].en),
      ...extract(content.customInstrumentsCache[1].de),
      ...extract(content.customInstrumentsCache[1].en)
    ];
    const expected = [...new Set(seq)];

    expect(resources).toEqual(expected);
    expect(new Set(resources).size).toBe(resources.length);
  });

  it('getCdnResources returns an empty array if no fields are present', () => {
    const info = new OrchestrationAssitantInfo(gfm);
    const content = {
      instrumentsSelection: [],
      customInstrumentsCache: []
    };
    expect(info.getCdnResources(content)).toEqual([]);
  });

  it('couldAccessUrlFromRoom works with real function', () => {
    expect(typeof couldAccessUrlFromRoom).toBe('function');
  });
});
