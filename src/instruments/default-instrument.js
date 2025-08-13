export default function defaultInstrument(
  id = null,
  name = 'neues Instrument',
  section = '',
  begin = 1,
  end = 51,
  before = false,
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
    before,
    after,
    color,
    de,
    en
  };  
  return template;
}