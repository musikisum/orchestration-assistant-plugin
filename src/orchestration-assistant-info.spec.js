import PluginIcon from './orchestration-assistant-icon.js'; 
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PLUGIN_GROUP } from '@educandu/educandu/domain/constants.js';
import OrchestrationAssitantInfo from './orchestration-assistant-info.js';

describe('OrchestrationAssitantInfo', () => {
  let sut;
  let mockGfm;

  beforeEach(() => {
    mockGfm = {
      redactCdnResources: vi.fn(text => `redacted:${text}`),
      extractCdnResources: vi.fn(() => ['cdn://res1', 'cdn://res2'])
    };
    sut = new OrchestrationAssitantInfo(mockGfm);
  });

  it('returns the correct display name key', () => {
    const t = vi.fn(key => `translated:${key}`);
    const result = sut.getDisplayName(t);
    expect(result).toBe('translated:musikisum/educandu-plugin-orchestration-assistant:name');
  });

  it('returns the correct icon component', () => {
    const icon = sut.getIcon();
    expect(icon.type).toBe(PluginIcon);
  });

  it('returns the correct plugin groups', () => {
    const groups = sut.getGroups();
    expect(groups).toEqual([PLUGIN_GROUP.other]);
  });

  it('returns the correct default content', () => {
    const content = sut.getDefaultContent();
    expect(content).toEqual({
      width: 100,
      from: 1,
      to: 50,
      instrumentSelection: ['violin'],
      noteNameBreakPoints: ['violin'],
      noteNamesAfterLastLine: false
    });
  });

  it('validates correct content without error', () => {
    const validContent = {
      width: 80,
      from: 1,
      to: 20,
      instrumentSelection: ['violin'],
      noteNameBreakPoints: ['violin'],
      noteNamesAfterLastLine: true
    };
    expect(() => sut.validateContent(validContent)).not.toThrow();
  });

  it('throws on invalid content (missing "from")', () => {
    const invalidContent = {
      width: 80,
      to: 20,
      instrumentSelection: ['violin'],
      noteNameBreakPoints: ['violin'],
      noteNamesAfterLastLine: true
    };
    expect(() => sut.validateContent(invalidContent)).toThrow();
  });

  it('clones content deeply', () => {
    const content = { text: 'foo', width: 50, from: 1, to: 50 };
    const result = sut.cloneContent(content);
    expect(result).toEqual(content);
    expect(result).not.toBe(content);
  });

  it('redacts content text using GFM redactCdnResources', () => {
    const content = { text: 'some-text' };
    const result = sut.redactContent(content, 'room123');

    expect(mockGfm.redactCdnResources).toHaveBeenCalledWith(
      'some-text',
      expect.any(Function)
    );
    expect(result.text).toBe('redacted:some-text');
  });

  it('extracts cdn resources using GFM', () => {
    const content = { text: 'some-cdn-text' };
    const result = sut.getCdnResources(content);

    expect(mockGfm.extractCdnResources).toHaveBeenCalledWith('some-cdn-text');
    expect(result).toEqual(['cdn://res1', 'cdn://res2']);
  });

  it('resolves display component dynamically', async () => {
    const component = await sut.resolveDisplayComponent();
    expect(component).toBeDefined();
    expect(typeof component).toBe('function');
  });

  it('resolves editor component dynamically', async () => {
    const component = await sut.resolveEditorComponent();
    expect(component).toBeDefined();
    expect(typeof component).toBe('function');
  });

});
