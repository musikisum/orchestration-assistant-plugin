import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';

export default function Three({ toneName }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const de = `***Das ${toneName[0]}''' liegt in der dreigestrichenen Oktave (${toneName[0]}³).***

# Die dreigestrichene Oktave

Töne in der dreigestrichenen Oktave können im Orchester gespielt werden von:

- den Violinen  
- der Flöte  
- Piccoloflöte  

Für die **Violinen** ist die dreigestrichene Oktave ein höheres Register, das auf der E-Saite das Lagenspiel erfordert (3.–8. Lage).  
Der Ausdruck hoher Violinlagen reicht vom hellen, durchsichtigen *piano* bis zum intensiven, dramatischen *forte*, dann oftmals in der Unteroktave von den 2. Violinen gedoppelt (vgl. R. Schumann, *2. Sinfonie*, 3. Satz, T. 48f.; J. Brahms, *1. Sinfonie*, 1. Satz, Einleitung; G. Verdi, *La Traviata*, 1. Akt, Anfang).

Der Klang der **Flöte** ist in der dreigestrichenen Oktave tragfähig und wird solistisch im *piano* (vgl. R. Schumann, *1. Sinfonie*, 1. Satz, Einleitung, T. 15f.), zur Oktavierung von Streichermelodien (vgl. R. Schumann, *1. Sinfonie*, 3. Satz, T. 9–16) und für Tuttistellen verwendet.

**Oboe** und **Klarinette** haben in der dreigestrichenen Oktave ihre höchsten Töne.  
Oboen werden oft bis zum c³ und selten darüber hinaus geführt, für die Klarinetten ist die dreigestrichene Oktave ungewöhnlich.

Für das **Sopransaxophon** liegen Töne der dreigestrichenen Oktave im höchsten Register.  
Im Orchester werden Sopranino- und Sopransaxophon (Ausnahme: M. Ravel, *Bolero*) seltener als das Altsaxophon (in Es) gefordert.

---

Für die folgenden Instrumente sind die Töne der dreigestrichenen Oktave nicht spielbar bzw. im Orchester nur für bestimmte Effekte geeignet:

- Fagott  
- Kontrafagott  
- Englischhorn  
- Trompete  
- Horn  
- Posaune  
- Tuba  
- Basssaxofon  
- Viola  
- Cello  
- Kontrabass
`;

  const en = `***The note ${toneName[0].toUpperCase()}6 is placed in the 6th octave.***

# The sixth Octave

Notes in the sixth octave can be played in the orchestra by:

- Violins  
- Flute  
- Piccolo  

For the **violin**, the 6th octave is a higher register that requires position playing on the E string (3rd–8th position).  
The expressive range of high violin positions extends from bright, transparent *piano* to intense, dramatic *forte*, often doubled an octave below by the second violins (cf. R. Schumann, *Symphony No. 2*, 3rd movement, mm. 48ff.; J. Brahms, *Symphony No. 1*, 1st movement, introduction; G. Verdi, *La Traviata*, Act I, opening).

The sound of the **flute** in the 6th octave is strong and carrying, used for solo passages in *piano* (cf. R. Schumann, *Symphony No. 1*, 1st movement, introduction, mm. 15ff.), for doubling string melodies at the octave (cf. R. Schumann, *Symphony No. 1*, 3rd movement, mm. 9–16), and in tutti sections.

**Oboe** and **clarinet** reach their highest notes in the 6th octave.  
Oboes are often taken up to C6 and only rarely higher; for clarinets the 6th octave is unusual.

For the **soprano saxophone**, notes in the 6th octave lie in its highest register.  
In the orchestra, sopranino and soprano saxophones are rarely used compared to the alto saxophone in E♭ (exception: M. Ravel, *Boléro*).

---

For the following instruments, notes in the 6th octave are unplayable or used in the orchestra only for special effects:

- Bassoon  
- Contrabassoon  
- English horn  
- Trumpet  
- Horn  
- Trombone  
- Tuba  
- Bass saxophone  
- Viola  
- Cello  
- Double bass
`;

  return (
    <Markdown className='instrumentDescription' renderAnchors>{t('octLang') === 'de' ? de : en}</Markdown>
  );
};

Three.propTypes = {
  toneName: PropTypes.string
};

Three.defaultProps = {
  toneName: ''
};