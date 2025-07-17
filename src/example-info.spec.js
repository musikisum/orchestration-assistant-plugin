import { ClockCircleOutlined } from '@ant-design/icons';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PLUGIN_GROUP } from '@educandu/educandu/domain/constants.js';
import OrchestrationAssitantInfo from './orchestration-assistant-info.js';
import GithubFlavoredMarkdown from '@educandu/educandu/common/github-flavored-markdown.js';

describe('OrchestrationAssitantInfo', () => {
  let sut;

  beforeEach(() => {
    sut = new OrchestrationAssitantInfo(new GithubFlavoredMarkdown());
  });

  it('returns the correct display name key', () => {
    const t = vi.fn(key => `translated:${key}`);
    const result = sut.getDisplayName(t);
    expect(result).toBe('translated:musikisum/educandu-plugin-orchestration-assistant:name');
  });

  it('returns the correct icon component', () => {
    const icon = sut.getIcon();
    expect(icon.type).toBe(ClockCircleOutlined);
  });

  it('returns the correct plugin groups', () => {
    const groups = sut.getGroups();
    expect(groups).toEqual([PLUGIN_GROUP.mostUsed, PLUGIN_GROUP.other]);
  });

  it('returns the correct default content', () => {
    const result = sut.getDefaultContent();
    expect(result).toEqual({
      text: 'Hallo Welt!',
      width: 100,
      fromFirstNoteIndex: 1,
      toLastNoteIndex: 50
    });
  });

  it('validates correct content successfully', () => {
    const validContent = {
      text: 'Test',
      width: 50,
      fromFirstNoteIndex: 1,
      toLastNoteIndex: 50
    };
    expect(() => sut.validateContent(validContent)).not.toThrow();
  });

  it('throws on invalid content (e.g., width out of range)', () => {
    const invalidContent = {
      text: 'Test',
      width: 150,
      fromFirstNoteIndex: 1,
      toLastNoteIndex: 50
    };
    expect(() => sut.validateContent(invalidContent)).toThrow();
  });

  it('clones content deeply', () => {
    const content = { text: 'foo', width: 50, fromFirstNoteIndex: 1, toLastNoteIndex: 50 };
    const result = sut.cloneContent(content);
    expect(result).toEqual(content);
    expect(result).not.toBe(content); // deep clone: not the same reference
  });

  it('redacts content as a deep clone (noop behavior)', () => {
    const content = { text: 'bar', width: 80, fromFirstNoteIndex: 1, toLastNoteIndex: 50 };
    const result = sut.redactContent(content);
    expect(result).toEqual(content);
    expect(result).not.toBe(content); // also deep clone
  });

  it('returns empty array from getCdnResources()', () => {
    const result = sut.getCdnResources({ text: 'abc' });
    expect(result).toEqual([]);
  });

  it('resolves display component dynamically', async () => {
    const result = await sut.resolveDisplayComponent();
    expect(result).toBeDefined();
  });

  it('resolves editor component dynamically', async () => {
    const result = await sut.resolveEditorComponent();
    expect(result).toBeDefined();
  });
});
