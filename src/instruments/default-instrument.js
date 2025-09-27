import { nanoid } from 'nanoid';

export default function defaultInstrument(
  id = null,
  name = 'neues Instrument',
  begin = 1,
  end = 51,
  before = false,
  after = false,
  color = '#6D8BB1',
  de = '',
  en = ''
) {
  const finalId = id ?? `custom-${nanoid(10)}`;
  return {
    id: finalId,
    name,
    begin,
    end,
    before,
    after,
    color,
    de,
    en
  };
}