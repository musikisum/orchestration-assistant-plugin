import { nanoid } from 'nanoid';

export default function defaultInstrument(
  id = nanoid(10),
  name = 'neues Instrument',
  begin = 1,
  end = 51,
  color = '#6D8BB1',
  de = '',
  en = ''
) {
  const template = {
    id,
    name,
    begin, 
    end,
    color,
    de,
    en
  };  
  return template;
}