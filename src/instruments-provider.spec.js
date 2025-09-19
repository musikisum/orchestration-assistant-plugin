import { describe, it, expect } from 'vitest';
import instrumentsProvider from './instruments-provider.js';

const {
  getOrchestraSets,
  getChamberSets,
  getSets,
  uniqueById,
  includesAll,
  includesAny,
  getDefaultInstrument,
  hasTheSameInstruments,
  getModalSectionObjects,
  loadInstrumentsFromIds,
  loadInstrumentsFromNames
} = instrumentsProvider;

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

describe('instrumentsProvider constants', () => {
  it('getOrchestraSets provide presets with valid IDs', () => {
    expect(getOrchestraSets).toBeTypeOf('object');
    expect(getOrchestraSets.orch1760).toBeInstanceOf(Array);
    expect(getOrchestraSets.orch1810).toBeInstanceOf(Array);
    for (const id of [...getOrchestraSets.orch1760, ...getOrchestraSets.orch1810]) {
      expect(typeof id).toBe('string');
      expect(id.startsWith('oap-default-')).toBe(true);
    }
  });

  it('getChamberSets provides Presets with valid IDs', () => {
    expect(getChamberSets).toBeTypeOf('object');
    expect(getChamberSets.string3).toBeInstanceOf(Array);
    expect(getChamberSets.piano3).toBeInstanceOf(Array);

    for (const [, ids] of Object.entries(getChamberSets)) {
      expect(ids.length).toBeGreaterThan(0);
      ids.forEach(id => {
        expect(typeof id).toBe('string');
        expect(id.startsWith('oap-default-')).toBe(true);
      });
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('random sample for getSets (get orchestra- und chamber-Sets)', () => {
    expect(getSets).toBeTypeOf('object');
    expect(getSets.orch1760).toEqual(getOrchestraSets.orch1760);
    expect(getSets.string3).toEqual(getChamberSets.string3);
  });
});

describe('instrumentsProvider – helper functions', () => {
  it('uniqueById remove duplicates (first-wins) and observe order', () => {
    const input = [{ id: 'a', n: 1 }, { id: 'b', n: 2 }, { id: 'a', n: 3 }, { id: 'c', n: 4 }];
    const out = uniqueById(input);
    expect(out.map(o => o.id)).toEqual(['a', 'b', 'c']);
    // first-wins: die erste Variante von "a" bleibt
    expect(out.find(o => o.id === 'a')?.n).toBe(1);
  });

  it('includesAll check IDs', () => {
    const set = new Set(['x', 'y', 'z']);
    expect(includesAll(set, ['x', 'y'])).toBe(true);
    expect(includesAll(set, ['x', 'a'])).toBe(false);
    expect(includesAll(set, [])).toBe(true);
  });

  it('includesAny check one ID', () => {
    const set = new Set(['x', 'y', 'z']);
    expect(includesAny(set, ['a', 'y'])).toBe(true);
    expect(includesAny(set, ['a', 'b'])).toBe(false);
    expect(includesAny(set, [])).toBe(false);
  });

  it('hasTheSameInstruments compare two sets', () => {
    expect(hasTheSameInstruments(['a', 'b', 'c'], ['c', 'b', 'a'])).toBe(true);
    expect(hasTheSameInstruments(['a', 'b'], ['a', 'b', 'c'])).toBe(false);
    expect(hasTheSameInstruments(['a', 'b', 'b'], ['a', 'b'])).toBe(false); // unterschiedliche Längen
    expect(hasTheSameInstruments([], [])).toBe(true);
    expect(hasTheSameInstruments(['a'], null)).toBe(false);
  });
});

describe('instrumentsProvider – getDefaultInstrument', () => {
  it('provide new default instrument with custom-* ID', () => {
    const inst = getDefaultInstrument();
    expect(inst).toBeTypeOf('object');
    expect(typeof inst.id).toBe('string');
    expect(inst.id.startsWith('custom-')).toBe(true);
    const inst2 = getDefaultInstrument();
    expect(inst2.id).not.toBe(inst.id);
  });
});

describe('instrumentsProvider – getModalSectionObjects', () => {
  it('provide { id, name } object for a section with fallback', () => {
    const list = getModalSectionObjects('strings');
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
    list.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(typeof item.id).toBe('string');
      expect(typeof item.name).toBe('string');
    });
    const listAll = getModalSectionObjects('unknown-section');
    expect(listAll.length).toBeGreaterThan(list.length - 1);
  });

  it('adopt existing names from instrumentsSelection', () => {
    const base = getModalSectionObjects('strings');
    const first = base[0];
    const renamed = getModalSectionObjects('strings', [{ id: first.id, name: 'my name' }]);
    const overridden = renamed.find(x => x.id === first.id);
    expect(overridden?.name).toBe('my name');
  });
});

describe('instrumentsProvider – loadInstrumentsFromNames', () => {
  it('load "tutti" width valid properties', () => {
    const all = loadInstrumentsFromNames(['tutti']);
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
    expect(new Set(all.map(i => i.id)).size).toBe(all.length);
  });

  it('lädt Sektionen und entfernt Dubletten', () => {
    const strings = loadInstrumentsFromNames(['strings']);
    const winds = loadInstrumentsFromNames(['winds']);
    const mix = loadInstrumentsFromNames(['strings', 'strings', 'winds']);
    const idsStrings = new Set(strings.map(i => i.id));
    const idsWinds = new Set(winds.map(i => i.id));
    const idsMix = new Set(mix.map(i => i.id));
    // Mix sollte die Vereinigung ohne Dubletten sein
    for (const id of idsStrings) {
      expect(idsMix.has(id)).toBe(true);
    }
    for (const id of idsWinds) {
      expect(idsMix.has(id)).toBe(true);
    }
    expect(mix.length).toBe(idsMix.size);
  });

  it('lädt einzelne Instrumente per Name und dedupliziert', () => {
    const one = loadInstrumentsFromNames(['violin']);
    expect(one.length).toBe(1);
    expect(one[0].id).toBe('oap-default-violin');

    const dup = loadInstrumentsFromNames(['violin', 'violin']);
    expect(dup.length).toBe(1);
    expect(dup[0].id).toBe('oap-default-violin');
  });

  it('ignoriert unbekannte Namen still', () => {
    const res = loadInstrumentsFromNames(['nope', 'violin']);
    expect(res.map(r => r.id)).toContain('oap-default-violin');
  });
});

describe('instrumentsProvider – loadInstrumentsFromIds', () => {
  it('lädt anhand bekannter IDs aus Defaults (ohne contentList)', () => {
    const ids = getOrchestraSets.orch1760;
    const sel = loadInstrumentsFromIds(ids);
    expect(sel.length).toBe(ids.length);
    expect(new Set(sel.map(s => s.id)).size).toBe(ids.length);
  });

  it('bevorzugt contentList-Einträge gegenüber Defaults', () => {
    const ids = ['oap-default-violin', 'oap-default-violoncello'];
    const contentList = [
      { id: 'oap-default-violin', name: 'Geige (custom)' },
      { id: 'oap-default-violoncello', name: 'Cello (custom)' }
    ];
    const sel = loadInstrumentsFromIds(ids, contentList);
    expect(sel.find(i => i.id === 'oap-default-violin')?.name).toBe('Geige (custom)');
    expect(sel.find(i => i.id === 'oap-default-violoncello')?.name).toBe('Cello (custom)');
  });

  it('filtert unbekannte/leer IDs heraus und dedupliziert', () => {
    const ids = ['oap-default-violin', '', 'unknown', 'oap-default-violin'];
    const sel = loadInstrumentsFromIds(ids);
    expect(sel.length).toBe(1);
    expect(sel[0].id).toBe('oap-default-violin');
  });

  it('gibt [] zurück für ungültige Eingaben', () => {
    expect(loadInstrumentsFromIds()).toEqual([]);
    expect(loadInstrumentsFromIds(null)).toEqual([]);
    expect(loadInstrumentsFromIds([])).toEqual([]);
  });
});

describe('instrumentsProvider – Integrations-/Querprüfungen', () => {
  it('Set-IDs lassen sich zu Instrumenten auflösen', () => {
    const anySet = getSets.orch1810 ?? getSets.string3;
    const instruments = loadInstrumentsFromIds(anySet);
    expect(new Set(instruments.map(i => i.id)).size).toBe(anySet.length);
  });

  it('getModalSectionObjects liefert IDs, die auch von loadInstrumentsFromIds erkannt werden', () => {
    const list = getModalSectionObjects('winds');
    const ids = list.map(i => i.id);
    const resolved = loadInstrumentsFromIds(ids);
    expect(resolved.length).toBeGreaterThan(0);
    // es können in "winds" mehr Einträge existieren, aber alle gültigen IDs sollten auflösbar sein
    const resolvedIds = new Set(resolved.map(r => r.id));
    const intersectCount = ids.filter(id => resolvedIds.has(id)).length;
    expect(intersectCount).toBeGreaterThan(0);
  });
});
