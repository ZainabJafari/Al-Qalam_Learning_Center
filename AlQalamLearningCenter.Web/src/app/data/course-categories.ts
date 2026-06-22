export type CourseCategory = {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly label: string;
  readonly intro: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly courses: readonly string[];
};

export const courseCategories: readonly CourseCategory[] = [
  {
    id: 'academic-subjects',
    number: '1',
    title: 'Academic Subjects',
    label: 'Core Learning',
    intro: 'Structured school subjects that strengthen reading, language, social understanding, and classroom confidence.',
    imageSrc: '/images/girl-studying.png',
    imageAlt: 'Girl studying with books in a classroom',
    courses: [
      'Dari / Persian Language',
      'Social Studies',
      'Religious Studies',
      'Language & Literature'
    ]
  },
  {
    id: 'islamic-studies',
    number: '2',
    title: 'Islamic Studies',
    label: 'Faith & Understanding',
    intro: 'Careful religious education that supports Quran reading, memorization, Arabic learning, and deeper Islamic knowledge.',
    imageSrc: '/images/IslamicStudies.jpg',
    imageAlt: 'Student reading Islamic studies material',
    courses: [
      'Fiqh (Islamic Jurisprudence)',
      'Tafsir (Quranic Exegesis)',
      'Tajwid (Quran Recitation Rules)',
      "Quran Reading (Qira'at)",
      'Arabic Language',
      'Hifz (Quran Memorization)'
    ]
  },
  {
    id: 'arts-creativity',
    number: '3',
    title: 'Arts & Creativity',
    label: 'Creative Expression',
    intro: 'Hands-on creative classes where students build patience, imagination, practical making skills, and pride in their work.',
    imageSrc: '/images/skills-learning.jpg',
    imageAlt: 'Student learning practical and creative skills',
    courses: [
      'Painting',
      'Drawing',
      'Calligraphy',
      'Sewing & Tailoring'
    ]
  },
  {
    id: 'life-skills',
    number: '4',
    title: 'Life Skills',
    label: 'Confidence & Voice',
    intro: 'Practical personal development courses that help students communicate clearly, lead with care, and respond to real-life needs.',
    imageSrc: '/images/firstAid.jpg',
    imageAlt: 'First aid learning session',
    courses: [
      'Leadership',
      'Creative Writing',
      'Public Speaking',
      'First Aid',
      'Literacy Skills'
    ]
  },
  {
    id: 'english-language-programs',
    number: '5',
    title: 'English Language Programs',
    label: 'Language Programs',
    intro: 'Step-by-step English programs designed for communication, vocabulary, reading, writing, and future study opportunities.',
    imageSrc: '/images/Englishprograms.jpg',
    imageAlt: 'Student studying language notes with a laptop',
    courses: [
      'Certificate in English Language (CEL)',
      'Diploma in English Language (DEL)'
    ]
  },
  {
    id: 'information-technology-programs',
    number: '6',
    title: 'Information Technology Programs',
    label: 'Digital Skills',
    intro: 'Technology programs that introduce students to computer knowledge, digital confidence, and useful skills for modern learning.',
    imageSrc: '/images/echnologyPrograms.jpg',
    imageAlt: 'Student using a laptop for digital learning',
    courses: [
      'Certificate in Information Technology (CIT)',
      'Diploma in Information Technology (DIT)'
    ]
  }
];

