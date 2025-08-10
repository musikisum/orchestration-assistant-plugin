import { nanoid } from 'nanoid';

export default function defaultInstrument(
  id = nanoid(10),
  name = 'neues Instrument',
  section = '',
  begin = 1,
  end = 51,
  befor = false,
  after = false,
  color = '#6D8BB1',
  de = '',
  en = ''
) {
  const template = {
    id,
    name,
    section,
    begin, 
    end,
    befor,
    after,
    color,
    de,
    en
  };  
  return template;
}