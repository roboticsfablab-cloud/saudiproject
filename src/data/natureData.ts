export type NatureCategory = {
  id: string;
  name: string;
  emoji: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  facts: string[];
  colorClass: string;
  gradientClass: string;
  iconColor: string;
};

export const natureCategories: NatureCategory[] = [
  {
    id: 'palm',
    name: 'النخيل',
    emoji: '🌴',
    image:
      'https://images.pexels.com/photos/11387356/pexels-photo-11387356.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    shortDescription:
      'تعد أشجار النخيل جزءًا مهمًا من البيئة والتراث الزراعي في المملكة العربية السعودية.',
    fullDescription:
      'تحتل النخيل مكانة بارزة في التراث السعودي والعربي، حيث تنتشر مزارع النخيل في مناطق متعددة من المملكة، خاصة في الأحساء والقصيم والمدينة المنورة. تتميز المملكة بإنتاج أصناف عالية الجودة من التمور مثل السكري والبرحي والمجدول.',
    facts: [
      'تضم الأحساء أكثر من 3 مليون نخلة',
      'تنتج المملكة أكثر من 1.5 مليون طن من التمور سنويًا',
      'يوجد أكثر من 400 صنف من النخيل في المملكة',
    ],
    colorClass: 'palm',
    gradientClass: 'from-palm-500 to-palm-700',
    iconColor: 'text-palm-600',
  },
  {
    id: 'desert',
    name: 'الصحراء',
    emoji: '🏜️',
    image:
      'https://images.pexels.com/photos/32398256/pexels-photo-32398256.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    shortDescription:
      'تتميز المملكة بمساحات واسعة من الصحاري والكثبان الرملية والمناظر الطبيعية الصحراوية.',
    fullDescription:
      'تشكل الصحراء جزءًا أساسيًا من هوية المملكة الجغرافية، حيث تمتد صحراء الربع الخالي على مساحة شاسعة في جنوب المملكة. تتميز الكثبان الرملية بأشكالها المتغيرة وتعد موطنًا للحياة البرية المتنوعة.',
    facts: [
      'الربع الخالي هو أكبر صحراء رملية متصلة في العالم',
      'تغطي الصحراء أكثر من 95% من مساحة المملكة',
      'تتغير أشكال الكثبان الرملية باستمرار بفعل الرياح',
    ],
    colorClass: 'sand',
    gradientClass: 'from-sand-400 to-sand-600',
    iconColor: 'text-sand-600',
  },
  {
    id: 'mountains',
    name: 'الجبال',
    emoji: '⛰️',
    image:
      'https://images.pexels.com/photos/10961006/pexels-photo-10961006.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    shortDescription:
      'تضم المملكة مناطق جبلية متنوعة، خاصة في الجنوب الغربي ومناطق أخرى من المملكة.',
    fullDescription:
      'تمتد سلسلة جبال السروات في الجزء الغربي والجنوبي الغربي من المملكة، وتضم أعلى القمم في الجزيرة العربية. تتميز هذه المناطق بمناخ معتدل وغطاء نباتي متنوع، وتعد مقصدًا سياحيًا في فصل الشتاء.',
    facts: [
      'جبل السودة يبلغ ارتفاعه حوالي 3,000 متر فوق سطح البحر',
      'تتميز منطقة عسير بتنوع بيولوجي فريد',
      'تتساقط الثلوج أحيانًا على قمم الجبال في الشتاء',
    ],
    colorClass: 'mountain',
    gradientClass: 'from-mountain-400 to-mountain-600',
    iconColor: 'text-mountain-600',
  },
  {
    id: 'sea',
    name: 'البحر',
    emoji: '🌊',
    image:
      'https://images.pexels.com/photos/10141407/pexels-photo-10141407.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    shortDescription:
      'تمتلك المملكة سواحل طويلة على البحر الأحمر والخليج العربي تتميز بتنوع بيئي كبير.',
    fullDescription:
      'تمتلك المملكة ساحلًا ممتدًا على البحر الأحمر يبلغ حوالي 1,800 كيلومتر، وساحلًا على الخليج العربي يمتد لحوالي 600 كيلومتر. تتميز مياه البحر الأحمر بشفافيتها العالية ووجود الشعاب المرجانية التي تعد من أجمل الشعاب في العالم.',
    facts: [
      'البحر الأحمر يحتوي على أكثر من 1,200 نوع من الأسماك',
      'تعد الشعاب المرجانية في البحر الأحمر من الأكثر تنوعًا عالميًا',
      'تضم جزر فرسان محمية بحرية تضم أبقار البحر',
    ],
    colorClass: 'sea',
    gradientClass: 'from-sea-400 to-sea-600',
    iconColor: 'text-sea-600',
  },
];

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      'أي من التالي يعد من أشهر الأشجار المرتبطة بالبيئة الزراعية في السعودية؟',
    options: ['النخلة', 'الصنوبر', 'القيقب', 'الزان'],
    correctIndex: 0,
    explanation:
      'النخلة هي الشجرة الأكثر ارتباطًا بالبيئة والتراث الزراعي في المملكة العربية السعودية، خاصة في الأحساء والقصيم.',
  },
  {
    id: 2,
    question: 'ما اسم أكبر صحراء رملية متصلة في العالم والتي تقع في جنوب المملكة؟',
    options: ['صحراء النفود الكبير', 'صحراء الربع الخالي', 'صحراء دهناء', 'صحراء الحرة'],
    correctIndex: 1,
    explanation:
      'الربع الخالي هو أكبر صحراء رملية متصلة في العالم، ويمتد على مساحة شاسعة في جنوب المملكة العربية السعودية.',
  },
  {
    id: 3,
    question: 'كم يبلغ طول ساحل المملكة على البحر الأحمر تقريبًا؟',
    options: ['حوالي 500 كم', 'حوالي 1,000 كم', 'حوالي 1,800 كم', 'حوالي 3,000 كم'],
    correctIndex: 2,
    explanation:
      'يمتد ساحل المملكة على البحر الأحمر بحوالي 1,800 كيلومتر، ويتميز بتنوع بيئي كبير ووجود الشعاب المرجانية.',
  },
];
