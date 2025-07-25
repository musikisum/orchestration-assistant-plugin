import { nanoid } from 'nanoid';

const instrument = {
  id: nanoid(10),
  name: '',
  color: 'maroon',
  props: {
    Header: 'Die Bassklarinette ist ein Längsblasinstrument aus Holz mit einfachem Rohrblatt in B-Stimmung:',
    Tonumfang: 'notiert von e-e\'\'\', klingend von D-d\'\'',
    Notation: 'transponierend, eine große None höher als klingend',
    Klangfarbe: 'Zur Klangfarbe und Spielweise vgl. Klarinette in B',
    Kombinationen: 'Gute Klangverbindung mit der Klarinette in der Unteroktave und dem Kontrafagott in der Oberoktave. Darüber hinaus ergeben sich auch gute Klangkombinationen mit den übrigen Bassinstrumenten der Holzbläser (Fagott, Englischhorn) und Streicher (Celli, Kontrabässe). Mit den Blechbläsern eignet sich am besten die Koppelung mit dem Horn (hoher Verschmelzungsgrad).',
    Literaturbeispiele: 'R. Strauss, Salome, Ziffer 320'
  }
};

export default instrument;