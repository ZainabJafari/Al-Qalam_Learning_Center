import type { TranslationKey } from '../i18n/translations';

export type CourseCategory = {
  readonly id: string;
  readonly number: string;
  readonly titleKey: TranslationKey;
  readonly labelKey: TranslationKey;
  readonly introKey: TranslationKey;
  readonly imageSrc: string;
  readonly imageAltKey: TranslationKey;
  readonly courses: readonly TranslationKey[];
};

export const courseCategories: readonly CourseCategory[] = [
  {
    id: 'academic-subjects',
    number: '1',
    titleKey: 'courses.academic.title',
    labelKey: 'courses.academic.label',
    introKey: 'courses.academic.intro',
    imageSrc: '/images/girl-studying.png',
    imageAltKey: 'courses.academic.imageAlt',
    courses: [
      'courses.academic.dari',
      'courses.academic.social',
      'courses.academic.religious',
      'courses.academic.literature'
    ]
  },
  {
    id: 'islamic-studies',
    number: '2',
    titleKey: 'courses.islamic.title',
    labelKey: 'courses.islamic.label',
    introKey: 'courses.islamic.intro',
    imageSrc: '/images/IslamicStudies.jpg',
    imageAltKey: 'courses.islamic.imageAlt',
    courses: [
      'courses.islamic.fiqh',
      'courses.islamic.tafsir',
      'courses.islamic.tajwid',
      'courses.islamic.qiraat',
      'courses.islamic.arabic',
      'courses.islamic.hifz'
    ]
  },
  {
    id: 'arts-creativity',
    number: '3',
    titleKey: 'courses.arts.title',
    labelKey: 'courses.arts.label',
    introKey: 'courses.arts.intro',
    imageSrc: '/images/swing.JPG',
    imageAltKey: 'courses.arts.imageAlt',
    courses: [
      'courses.arts.painting',
      'courses.arts.drawing',
      'courses.arts.calligraphy',
      'courses.arts.sewing'
    ]
  },
  {
    id: 'life-skills',
    number: '4',
    titleKey: 'courses.life.title',
    labelKey: 'courses.life.label',
    introKey: 'courses.life.intro',
    imageSrc: '/images/firstAid.jpg',
    imageAltKey: 'courses.life.imageAlt',
    courses: [
      'courses.life.leadership',
      'courses.life.writing',
      'courses.life.speaking',
      'courses.life.firstAid',
      'courses.life.literacy'
    ]
  },
  {
    id: 'english-language-programs',
    number: '5',
    titleKey: 'courses.english.title',
    labelKey: 'courses.english.label',
    introKey: 'courses.english.intro',
    imageSrc: '/images/Englishprograms.jpg',
    imageAltKey: 'courses.english.imageAlt',
    courses: [
      'courses.english.certificate',
      'courses.english.diploma'
    ]
  },
  {
    id: 'information-technology-programs',
    number: '6',
    titleKey: 'courses.it.title',
    labelKey: 'courses.it.label',
    introKey: 'courses.it.intro',
    imageSrc: '/images/echnologyPrograms.jpg',
    imageAltKey: 'courses.it.imageAlt',
    courses: [
      'courses.it.certificate',
      'courses.it.diploma'
    ]
  }
];
