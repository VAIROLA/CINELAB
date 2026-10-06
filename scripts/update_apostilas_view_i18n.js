import fs from 'fs';

let code = fs.readFileSync('src/views/ApostilasView.tsx', 'utf8');
code = code.replace(/\r\n/g, '\n');

// 1. In pt
code = code.replace(
  `bonusSectionDesc: '2 Módulos Especiais',`,
  `bonusSectionDesc: '3 Módulos Especiais',
      extraVideosTab: 'Vídeos Extras de Estudo',
      extraVideosBtn: '2 Vídeos Extras',
      trainingEvalTab: 'Avaliação de Treinamento',
      trainingEvalBtn: 'Avaliação',
      extraVideosBannerTitle: '2 Vídeos Extras para Estudo',
      extraVideosBannerDesc: 'integrados a esta apostila (análises práticas & estudo de caso)!',
      viewExtraVideosBtn: 'Ver os 2 Vídeos',`
);

// 2. In en
code = code.replace(
  `bonusSectionDesc: '2 Special Modules',`,
  `bonusSectionDesc: '3 Special Modules',
      extraVideosTab: 'Extra Study Videos',
      extraVideosBtn: '2 Extra Videos',
      trainingEvalTab: 'Training Drill',
      trainingEvalBtn: 'Evaluation',
      extraVideosBannerTitle: '2 Extra Study Videos',
      extraVideosBannerDesc: 'integrated with this handout (practical breakdowns & case study)!',
      viewExtraVideosBtn: 'Watch Both Videos',`
);

// 3. In es
code = code.replace(
  `bonusSectionDesc: '2 Módulos Especiales',`,
  `bonusSectionDesc: '3 Módulos Especiales',
      extraVideosTab: 'Videos Extras de Estudio',
      extraVideosBtn: '2 Videos Extras',
      trainingEvalTab: 'Evaluación de Entrenamiento',
      trainingEvalBtn: 'Evaluación',
      extraVideosBannerTitle: '2 Videos Extras de Estudio',
      extraVideosBannerDesc: 'integrados con este manual (análisis prácticos y estudio de caso)!',
      viewExtraVideosBtn: 'Ver los 2 Videos',`
);

// 4. In fr
code = code.replace(
  `bonusSectionDesc: '2 Modules Spéciaux',`,
  `bonusSectionDesc: '3 Modules Spéciaux',
      extraVideosTab: "Vidéos Extras d'Étude",
      extraVideosBtn: '2 Vidéos Extras',
      trainingEvalTab: "Évaluation d'Entraînement",
      trainingEvalBtn: 'Évaluation',
      extraVideosBannerTitle: "2 Vidéos Extras d'Étude",
      extraVideosBannerDesc: 'intégrées à ce fascicule (analyses pratiques & étude de cas) !',
      viewExtraVideosBtn: 'Voir les 2 Vidéos',`
);

// 5. Replace the hardcoded button labels in the grid
code = code.replace(
  `<span className="truncate">{isLocked ? 'Bloqueado' : '2 Vídeos Extras'}</span>`,
  `<span className="truncate">{isLocked ? cur.locked : cur.extraVideosBtn}</span>`
);
code = code.replace(
  `<span className="truncate">{isLocked ? 'Bloqueada' : 'Avaliação'}</span>`,
  `<span className="truncate">{isLocked ? cur.locked : cur.trainingEvalBtn}</span>`
);

// 6. Replace the hardcoded tab in reader modal
code = code.replace(
  `<span>Vídeos Extras de Estudo</span>`,
  `<span>{cur.extraVideosTab}</span>`
);
code = code.replace(
  `<span>Avaliação de Treinamento</span>`,
  `<span>{cur.trainingEvalTab}</span>`
);

// 7. Replace the quick-access banner
code = code.replace(
  `<strong className="text-amber-300">2 Vídeos Extras para Estudo</strong> integrados a esta apostila (análises práticas &amp; estudo de caso)!`,
  `<strong className="text-amber-300">{cur.extraVideosBannerTitle}</strong> {cur.extraVideosBannerDesc}`
);
code = code.replace(
  `<span>Ver os 2 Vídeos</span>`,
  `<span>{cur.viewExtraVideosBtn}</span>`
);

fs.writeFileSync('src/views/ApostilasView.tsx', code, 'utf8');
console.log('✓ ApostilasView.tsx i18n updated successfully');
