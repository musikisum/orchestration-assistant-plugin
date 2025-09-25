import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';

export default function Small({ toneName }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const de = `***Das kleine ${toneName[0]} liegt in der kleinen Oktave (${toneName[0]}).***

# Die kleine Oktave

Töne in der kleinen Oktave können im Orchester gespielt werden von:

- Streichern  
- Klarinetten (inklusive Bassklarinette)  
- Fagott  
- Saxofon  
- Horn  
- Posaune  
- Tuba  

Für die **Violinen** ist die kleine Oktave nur eingeschränkt spielbar (tiefster Ton = leere G-Saite bzw. das kleine g). Für die **Viola** ist die kleine Oktave eine tiefe Lage (tiefster Ton = leere C-Saite bzw. das kleine c), für das **Cello** eine Mittellage und für den **Kontrabass** im Orchester eine hohe Lage (die in der Notation oft in der kleinen Oktave vorgeschriebenen Noten erklingen tatsächlich eine Oktave tiefer in der großen Oktave!).

Die **Klarinette** spielt in der kleinen Oktave in ihrem tiefen *Chalumeau-Register*. In diesem Register können Töne unglaublich leise – quasi aus der Stille bzw. »sotto voce« oder »niente attack« – entwickelt werden, ein Effekt, der in dieser Form nur von der Klarinette spielbar ist und im 20. Jahrhundert von Komponisten gerne eingesetzt wurde.

Das **Englischhorn** erklingt in der kleinen Oktave in seinem tiefsten Register (tiefster Ton = e).  

Die kleine Oktave ist für das **Fagott** eine Mittellage (vgl. J. Haydn, *Sinfonie Nr. 101 in D-Dur*, 2. Satz; L. v. Beethoven, *4. Sinfonie in B-Dur*, 1. Satz, Überleitung T. 65 und Seitensatz T. 107).

Für das **Tenorsaxofon** ist die kleine Oktave eine Mittellage, für das **Altsaxofon** eine tiefe Lage (tiefster Ton = das kleine des).

Das **Horn** klingt in der kleinen Oktave voll, mit dunklerer Färbung.  

In der kleinen Oktave kann die **Posaune** kraftvoll und mit großer Klangentfaltung spielen (vgl. G. Rossini, *Ouvertüre zu Wilhelm Tell*, T. 92, Buchstabe C; F. Schubert, *Sinfonie Nr. 8 in C-Dur*, 1. Satz, T. 304, Durchführung).  

Für die **Bassklarinette** ist die kleine Oktave eine Mittellage.

Für die **Tuba** zählt die untere Hälfte der kleinen Oktave zum Hauptklangbereich, in der oberen Hälfte ist ein Spiel mit zunehmender Klangstärke möglich. 

Die **Trompete** wird in der kleinen Oktave im klassischen Repertoire in lauten Passagen mit Liegetönen zur Erzeugung von größerer Klangfülle eingesetzt.

---

Für die folgenden Instrumente sind die Töne der kleinen Oktave nicht oder überwiegend nicht spielbar:

- Piccoloflöte (und Sopranblockflöte)  
- Flöte  
- Oboe  
- Sopransaxofon
`;

  const en = `***The note ${toneName[0].toUpperCase()}3 is placed in the 3rd octave.***

# The third Octave

Notes in the third octave can be played in the orchestra by:

- Strings  
- Clarinets (including bass clarinet)  
- Bassoon  
- Saxophone  
- Horn  
- Trombone  
- Tuba  

For the **violins**, the 3rd octave is only playable to a limited extent (lowest note = open G string, i.e., small g). For the **viola**, the 3rd octave is a low register (lowest note = open C string, i.e., small c); for the **cello**, it is a middle register; and for the **double bass**, it is a high register (since notes notated in the 3rd octave usually sound an octave lower, in the great octave!).

The **clarinet** plays in the 3rd octave in its low *chalumeau register*. In this register, tones can be produced extremely softly – virtually from silence (»sotto voce« or »niente attack«) – an effect unique to the clarinet, much favored by 20th-century composers.

The **English horn** sounds in its lowest register in the 3rd octave (lowest note = e).  

For the **bassoon**, the 3rd octave is a middle register (cf. J. Haydn, *Symphony No. 101 in D major*, 2nd movement; L. v. Beethoven, *Symphony No. 4 in B-flat major*, 1st movement, transition mm. 65 and 2nd theme mm. 107).

For the **tenor saxophone**, the 3rd octave is a middle register; for the **alto saxophone**, it is a low register (lowest note = small D-flat).  

The **horn** in the 3rd octave has a full sound with a darker timbre. 

The **trombone** can play in the 3rd octave with power and great sonority (cf. G. Rossini, *Overture to William Tell*, mm. 92, letter C; F. Schubert, *Symphony No. 8 in C major*, 1st movement, mm. 304, development).

For the **bass clarinet**, the 3rd octave is a middle register; for the **tuba**, the lower half of the 3rd octave belongs to its main range, while the upper half can be played with increasing power.

The **trumpet** in the 3rd octave is used in classical repertoire for sustained tones in loud passages to add greater fullness.

---

For the following instruments, notes in the 3rd octave are not or only rarely playable:

- Piccolo (and soprano recorder)  
- Flute  
- Oboe  
- Soprano saxophone
`;

  return (
    <Markdown className='instrumentDescription' renderAnchors>{t('octLang') === 'de' ? de : en}</Markdown>
  );
};

Small.propTypes = {
  toneName: PropTypes.string
};

Small.defaultProps = {
  toneName: ''
};