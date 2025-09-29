import version from './version.js';
import updateValidation from './update-validation.js';
import { describe, it, expect, beforeEach } from 'vitest';
import OrchestrationAssistantInfo from './orchestration-assistant-info.js';
import GithubFlavoredMarkdown from '@educandu/educandu/common/github-flavored-markdown.js';

const CURRENT_VERSION = version.toString();

describe('updateValidation.checkContentAfterUpdate', () => {
  let baseInstrument;
  let gfm;
  let REAL_DEFAULTS;

  beforeEach(() => {
    baseInstrument = {
      id: 'oap-default-1',
      name: 'Violin',
      begin: 1,
      end: 3,
      before: false,
      after: false,
      color: '#612500',
      de: 'Violine',
      en: 'Violin',
    };
    gfm = new GithubFlavoredMarkdown();
    REAL_DEFAULTS = new OrchestrationAssistantInfo(gfm).getDefaultContent();
  });

  it('return content if version is matching', () => {
    const db = {
      _v: CURRENT_VERSION,
      width: 80,
      from: 5,
      to: 8,
      before: true,
      after: false,
      instrumentsSelection: [baseInstrument],
      customInstrumentsCache: [],
      unknownKey: 'should-stay-because-no-update',
    };
    const res = updateValidation.checkContentAfterUpdate(db);
    expect(res).toBe(db);
    expect(res.unknownKey).toBe('should-stay-because-no-update');
  });

  it('sanitize content if version is missing', () => {
    const db = {
      width: 80,
      to: 10,
      before: true,
      after: false,
      instrumentsSelection: [baseInstrument, null],
      customInstrumentsCache: [null, baseInstrument],
      unknownKey: 'remove-me',
    };
    const res = updateValidation.checkContentAfterUpdate(db);
    expect(res._v).toBe(CURRENT_VERSION);
    expect(res.from).toBe(REAL_DEFAULTS.from);
    expect(res.width).toBe(80);
    expect(res.to).toBe(10);
    expect('unknownKey' in res).toBe(false);
    expect(Array.isArray(res.instrumentsSelection)).toBe(true);
    expect(res.instrumentsSelection.length).toBe(1);
    expect(res.instrumentsSelection[0].id).toBe(baseInstrument.id);
    expect(Array.isArray(res.customInstrumentsCache)).toBe(true);
    expect(res.customInstrumentsCache.length).toBe(1);
    expect(res.customInstrumentsCache[0].id).toBe(baseInstrument.id);
  });

  it('sanitize content if MAJOR is not equal and patch without third segment', () => {
    const db = {
      _v: '0.9',
      ...REAL_DEFAULTS,
      instrumentsSelection: [],
      customInstrumentsCache: [],
    };
    const res = updateValidation.checkContentAfterUpdate(db);
    expect(res._v).toBe(CURRENT_VERSION);
  });

  it('sanitize content if MINOR is not equal', () => {
    const db = {
      _v: '0.8.5',
      ...REAL_DEFAULTS,
      instrumentsSelection: [baseInstrument],
      customInstrumentsCache: [],
    };

    const res = updateValidation.checkContentAfterUpdate(db);
    expect(res._v).toBe(CURRENT_VERSION);
  });

  it('sanitize content if version is not parsable', () => {
    const db = {
      _v: 'abc',
      ...REAL_DEFAULTS,
      instrumentsSelection: [],
      customInstrumentsCache: [],
    };

    const res = updateValidation.checkContentAfterUpdate(db);
    expect(res._v).toBe(CURRENT_VERSION);
  });

  it('sanitize content and keys but not values', () => {
    const db = {
      _v: '0.0.0',
      width: 60,
      to: 7,
      before: true,
      after: false,
      instrumentsSelection: [],
      customInstrumentsCache: [],
    };

    const res = updateValidation.checkContentAfterUpdate(db);
    expect(res.width).toBe(60);
    expect(res.from).toBe(REAL_DEFAULTS.from);
  });

  it('sanitize instruments', () => {
    const db = {
      ...REAL_DEFAULTS,
      _v: '0.0.0',
      instrumentsSelection: [{
        ...baseInstrument,
        extra: 'will-be-dropped-implicitly-by-sanitizeInstrumentItem',
      }],
      customInstrumentsCache: [],
    };

    const res = updateValidation.checkContentAfterUpdate(db);
    const item = res.instrumentsSelection[0];
    expect(item.id).toBe(baseInstrument.id);
    expect(item.extra).toBeUndefined();
  });
});
