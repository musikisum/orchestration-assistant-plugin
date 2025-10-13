import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';

export default function Great({ toneName }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const de = `***Das große ${toneName[0].toUpperCase()} liegt in der großen Oktave (${toneName[0].toUpperCase()}).***

# Die große Oktave

Töne in der großen Oktave können im Orchester gespielt werden von:

- Cello  
- Kontrabass  
- Fagott  
- Posaune  
- Tuba  

Für die **Celli** liegt in der großen Oktave das tiefste Register (tiefster Ton = leere C-Saite). Für die **Kontrabässe** ist die große Oktave eine gebräuchliche Lage (notiert als kleine Oktave).  

Die große Oktave ist für das **Fagott** eine tiefe Lage, mit vollen, kräftigen und tragfähigen Tönen. Leise gespielt können Töne des Fagotts in dieser Lage dunkel und geheimnisvoll klingen (vgl. P. Tschaikowsky, *Sinfonie Nr. 6 in h-Moll*, 1. Satz, Anfang).  

Von den **Saxofonen** können alle Töne der großen Oktave nur noch das Bariton- und Basssaxofon spielen.  

Das moderne **Horn** hat in der großen Oktave sein tiefstes Register; Ventilhörner konnten in dieser Lage allerdings früher nur wenige Töne spielen (vgl. die Informationen zum Horn).  

Töne der großen Oktave sind für die **Posaune** (Tenorposaune) nur noch eingeschränkt spielbar (tiefster Ton = e, mit Ausnahme der schwer spielbaren tiefen »Pedaltöne«). In ihrem tiefsten Register klingt die Posaune dunkel und weniger stark.  

Die große Oktave ist ein typisches Bassregister für die **Bassklarinette** und die **Tuba**.

---

Für die folgenden Instrumente sind die Töne der großen Oktave nicht oder überwiegend nicht spielbar:

- Piccoloflöte (und Blockflöte)  
- Flöte  
- Oboe  
- Klarinette  
- Englischhorn  
- Sopran- und Altsaxofon  
- Trompete
`;

  const en = `***The note ${toneName[0].toUpperCase()}2 is placed in the 2nd octave.***

# The second Octave

Notes in the second octave can be played in the orchestra by:

- Cello  
- Double bass  
- Bassoon  
- Trombone  
- Tuba  

For the **cellos**, the 2nd octave is the lowest register (lowest note = open C string). For the **double basses**, the 2nd octave is a common register (written as the 3rd octave).  

For the **bassoon**, the 2nd octave is a low register with full, powerful, and resonant tones. Played softly, bassoon tones in this register can sound dark and mysterious (cf. P. Tchaikovsky, *Symphony No. 6 in B minor*, 1st movement, opening).  

Among the **saxophones**, only the baritone and bass saxophone can play all notes of the 2nd octave.  

The modern **horn** reaches its lowest register in the 2nd octave; earlier valve horns could play only a few notes in this range (cf. information on the horn).  

For the **trombone** (tenor trombone), notes in the 2nd octave are only partly playable (lowest note = E, except for the difficult pedal tones). In its lowest register, the trombone sounds dark and less powerful.  

The 2nd octave is a typical bass register for the **bass clarinet** and the **tuba**.

---

For the following instruments, notes in the 2nd octave are not or largely not playable:

- Piccolo (and recorder)  
- Flute  
- Oboe  
- Clarinet  
- English horn  
- Soprano and alto saxophone  
- Trumpet
`;

  return (
    <Markdown className='instrumentDescription' renderAnchors>{t('language') === 'de' ? de : en}</Markdown>
  );
};

Great.propTypes = {
  toneName: PropTypes.string
};

Great.defaultProps = {
  toneName: ''
};
