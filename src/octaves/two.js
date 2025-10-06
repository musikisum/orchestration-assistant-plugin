import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';

export default function Two({ toneName }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const de = `***Das ${toneName[0]}'' liegt in der zweigestrichenen Oktave (${toneName[0]}²).***

# Die zweigestrichene Oktave

Töne in der zweigestrichenen Oktave können im Orchester gespielt werden von:

- den oberen Streichern  
- Flöte (auch Piccolo- und Blockflöte)  
- Oboe  
- Klarinette  
- Sopransaxofon  
- Trompete  

Für die **Violine** ist die zweigestrichene Oktave ein mittleres Register, das auf der A- und E-Saite gegriffen unauffällig klingt (vgl. Mozart, *Eine kleine Nachtmusik*, KV 525, 2. Satz). Für die **Viola** liegen Töne in der zweigestrichenen Oktave in einer hohen, für das Cello in einer sehr hohen (solistischen) Lage (vgl. G. Puccini, *Tosca*, 3. Akt, Ziffer 10).

Die zweigestrichene Oktave ist ein gutes Register für das solistische Spiel der **Flöte**.  

In der Harmoniemusik bzw. im Tutti muss die zweigestrichene Oktave dagegen als noch tieferes Register bezeichnet werden, das leicht von den Streichern überdeckt werden kann (vgl. J. S. Bach, *Matthäus-Passion* BWV 244, Nr. 49, Sopranarie *Aus Liebe will mein Heiland sterben*; J. Brahms, *4. Sinfonie, 4. Satz*, nach Buchstabe D, T. 97f.; W. A. Mozart, *Zauberflöte*, Arie des Tamino *Wie stark ist nicht dein Zauberton*).

Die **Oboe** hat in der zweigestrichenen Oktave einen tragfähigen Klang und eignet sich in dieser Lage gut zum solistischen Spiel (vgl. L. v. Beethoven, *Violinkonzert*, 1. Satz, Anfang; J. Brahms, *Violinkonzert in D-Dur*, 2. Satz, Anfang; G. Rossini, *Ouvertüre zu Die diebische Elster*, Buchstabe B; L. v. Beethoven, *Fidelio*, Arie des Florestan, *Poco Allegro*; M. Ravel, *Ma Mère l’Oye*, 2. Satz, Anfang).

Auch für die **Klarinette** ist die zweigestrichene Oktave eine gute solistische Lage (vgl. L. v. Beethoven, *8. Sinfonie, 3. Satz*, Trio; G. Puccini, *Tosca*, 3. Akt, Arie des Cavaradossi, Ziffer 11).

Das **Englischhorn** hat in der zweigestrichenen Lage sein höchstes Register.

Für das **Horn** liegen bereits die unteren Töne der zweigestrichenen Oktave (c²–f²) äußerst hoch und werden im Orchester selten gefordert.

---

Für die folgenden Instrumente sind die Töne der zweigestrichenen Oktave nicht spielbar bzw. im Orchester nur für bestimmte Effekte geeignet:

- Posaune  
- Basssaxofon  
- Tuba  
- Kontrafagott  
- Kontrabass
`;

  const en = `***The note ${toneName[0].toUpperCase()}5 is placed in the 5th octave.***

# The fifth Octave

Notes in the fifth octave can be played in the orchestra by:

- Upper strings  
- Flute (also piccolo and recorder)  
- Oboe  
- Clarinet  
- Soprano saxophone  
- Trumpet  

For the **violin**, the 5th octave is a middle register, unobtrusive when played on the A and E strings (cf. Mozart, *Eine kleine Nachtmusik*, K. 525, 2nd movement). For the **viola**, notes in the 5th octave lie in a high register, and for the cello in a very high, soloistic register (cf. G. Puccini, *Tosca*, Act III, rehearsal number 10).

The 5th octave is a good register for **flute** solo playing.  

In wind-band music or tutti passages, however, the 5th octave must be regarded as a lower register, which can easily be covered by the strings (cf. J. S. Bach, *St. Matthew Passion* BWV 244, No. 49, soprano aria *Aus Liebe will mein Heiland sterben*; J. Brahms, *Symphony No. 4, 4th movement*, after letter D, mm. 97ff.; W. A. Mozart, *The Magic Flute*, aria of Tamino *Wie stark ist nicht dein Zauberton*).

The **oboe** has a strong, projecting tone in the 5th octave and is well suited for solo playing in this register (cf. L. v. Beethoven, *Violin Concerto*, 1st movement, beginning; J. Brahms, *Violin Concerto in D major*, 2nd movement, beginning; G. Rossini, *Overture to La gazza ladra*, letter B; L. v. Beethoven, *Fidelio*, Florestan’s aria, *Poco Allegro*; M. Ravel, *Ma Mère l’Oye*, 2nd movement, beginning).

For the **clarinet**, the 5th octave is also a good soloistic register (cf. L. v. Beethoven, *Symphony No. 8, 3rd movement*, Trio; G. Puccini, *Tosca*, Act III, Cavaradossi’s aria, rehearsal number 11).

The **English horn** reaches its highest register in the 5th octave.  

For the **horn**, even the lowest tones of the 5th octave (C5–F5) are extremely high and rarely required in the orchestra.

---

For the following instruments, notes in the 5th octave are either unplayable or suitable only for special effects in the orchestra:

- Trombone  
- Bass saxophone  
- Tuba  
- Contrabassoon  
- Double bass
`;

  return (
    <Markdown className='instrumentDescription' renderAnchors>{t('language') === 'de' ? de : en}</Markdown>
  );
};

Two.propTypes = {
  toneName: PropTypes.string
};

Two.defaultProps = {
  toneName: ''
};