import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';

export default function One({ toneName }) {
  
  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const de = `***Das ${toneName[0]}' liegt in der eingestrichenen Oktave (${toneName[0]}¹).***

# Die eingestrichene Oktave

Töne in der eingestrichenen Oktave können im Orchester gespielt werden von:

- Streichern  
- Klarinette  
- Englischhorn  
- Fagott  
- Saxofon  
- Horn  
- Trompete (Schmetterlage)  

Für die **Violinen** ist die eingestrichene Oktave ein tieferes Register, das auf der D- und A-Saite unauffällig, auf der G-Saite dunkel und sehr intensiv klingt. Für **Cello** und **Viola** ist die eingestrichene Oktave eine gute solistische Lage (vgl. für das Cello: G. Rossini, *Ouvertüre zu Wilhelm Tell*, Anfang; J. Brahms, *Sinfonie Nr. 3, 3. Satz*, Anfang sowie für eine Melodie von Viola und Cello um das c1: L. v. Beethoven, *7. Sinfonie, 2. Satz*, Anfang).

Der Klang der **Klarinette** ist in der eingestrichenen Oktave gegenüber dem tieferen, sog. Chalumeau-Register und ihrem höheren Hauptklangbereich etwas schwächer und stumpfer (insbesondere zwischen f¹ und a¹).

Für das **Englischhorn** ist die eingestrichene Oktave eine gute solistische Lage (vgl. G. Rossini, *Ouvertüre zu Wilhelm Tell*, Andante in G, T. 176 ff. sowie G. Donizetti, *Liebestrank*, Romanze des Nemorino *Una furtiva lagrima* Nr. 19).

Für das **Horn** ist die eingestrichene Oktave eine gute, solistische Lage (Tenorlage) mit warmem Timbre (vgl. J. Brahms, *3. Sinfonie, 3. Satz*, Buchstabe F).  

Der Klang des **Fagotts** ist in dieser Lage dagegen intensiv und dünn (vgl. I. Stravinsky, *Le sacre du printemps*, Anfang).

Für **Altsaxofone** ist die eingestrichene Oktave eine klangvolle Mittellage (auch vom Sopran- und Tenorsaxofon spielbar).  

Für die **Posaune** ist die eingestrichene Oktave eine hohe, virtuose Lage.  

Für die **Oboe** ist die eingestrichene Oktave eine tiefe, jedoch noch brauchbare Lage mit einem etwas dicken (in tiefster Lage auch schwerfälligen) Klang (vgl. G. Mahler, *Kindertotenlieder* (Orchesterfassung), Nr. 1, *Nun will die Sonn’ so hell aufgeh’n!*).  

Für die **Bassklarinette** und **Tuba** liegen Töne der eingestrichenen Oktave im höchsten Register.

---

Für die folgenden Instrumente sind die Töne der eingestrichenen Oktave nicht spielbar bzw. im Orchester nur für bestimmte Effekte geeignet:

- Piccoloflöte (und Sopranblockflöte)  
- Flöte (klingt in dieser tiefen Lage zwar voll, jedoch leise und hauchig; kann zum Abdecken von Streichern und Klarinetten verwendet werden)  
- Tuba  
- Kontrafagott  
- Kontrabass
`;

  const en = `***The note ${toneName[0].toUpperCase()} is placed in the 4th octave.***

# The fourth Octave

Notes in the fourth octave can be played in the orchestra by:

- Strings  
- Clarinet  
- English horn  
- Bassoon  
- Saxophone  
- Horn  
- Trumpet (brilliant register)  

For the **violins**, the one-line octave is a lower register, unobtrusive on the D and A strings, but dark and very intense on the G string. For **cello** and **viola**, the one-line octave is a good soloistic register (cf. for the cello: G. Rossini, *Overture to William Tell*, beginning; J. Brahms, *Symphony No. 3, 3rd movement*, beginning; as well as for a melody around c1 in viola and cello: L. v. Beethoven, *Symphony No. 7, 2nd movement*, beginning).

The sound of the **clarinet** in the one-line octave is somewhat weaker and duller compared to its lower chalumeau register and its higher principal register (especially between f¹ and a¹).

For the **English horn**, the one-line octave is a good soloistic register (cf. G. Rossini, *Overture to William Tell*, Andante in G, mm. 176 ff.; and G. Donizetti, *L’elisir d’amore*, romance of Nemorino *Una furtiva lagrima* No. 19).

For the **horn**, the one-line octave is a good soloistic tenor register with a warm timbre (cf. J. Brahms, *Symphony No. 3, 3rd movement*, letter F).  
The sound of the **bassoon** in this register is intense but thin (cf. I. Stravinsky, *Le sacre du printemps*, opening).

For **alto saxophones**, the one-line octave is a resonant middle register (also playable on soprano and tenor saxophone).  

For the **trombone**, the one-line octave is a high, virtuosic register.  

For the **oboe**, the one-line octave is a low, yet still usable register with a somewhat thick sound (in the lowest notes also heavy) (cf. G. Mahler, *Kindertotenlieder* (orchestral version), No. 1, *Nun will die Sonn’ so hell aufgeh’n!*).  

For the **bass clarinet** and **tuba**, notes in the one-line octave lie in the highest register.

---

For the following instruments, notes in the one-line octave are either unplayable or in the orchestra only suitable for special effects:

- Piccolo (and soprano recorder)  
- Flute (in this low register the sound is full, but soft and breathy; can be used to cover strings and clarinets)  
- Tuba  
- Contrabassoon  
- Double bass
`;

  return (
    <Markdown className='instrumentDescription' renderAnchors>{t('language') === 'de' ? de : en}</Markdown>
  );
};

One.propTypes = {
  toneName: PropTypes.string
};

One.defaultProps = {
  toneName: ''
};