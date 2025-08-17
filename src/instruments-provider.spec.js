import { describe, it, expect } from 'vitest';
import instrumentsProvider from './instruments-provider.js';

describe('load imnstruments with valid properties', () => {
  it('load instruments from tutti', () => {
    const all = instrumentsProvider.loadInstrumentsFromNames(['tutti']);
    expect(all.length).toBeGreaterThan(0);

    all.forEach(instr => {
      expect(typeof instr.id).toBe('string');
      expect(instr.id.startsWith('oap-default-')).toBe(true);
      expect(typeof instr.name).toBe('string');
      expect(typeof instr.begin).toBe('number');
      expect(typeof instr.end).toBe('number');
      expect(typeof instr.color).toBe('string');
      expect(typeof instr.de).toBe('string');
      expect(typeof instr.en).toBe('string');
    });
  });
});
