import fs from 'fs';

let code = fs.readFileSync('src/components/ApostilaExtraVideosSection.tsx', 'utf8');
code = code.replace(/\r\n/g, '\n');

// 1. Add imports
if (!code.includes("from '../i18n/LanguageContext.js'")) {
  code = code.replace(
    `import { resolveApostilaExtraVideos } from '../data/canonicalExtraVideos.js';`,
    `import { resolveApostilaExtraVideos } from '../data/canonicalExtraVideos.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import { EXTRA_VIDEOS_UI_TRANSLATIONS, getTranslatedExtraVideo } from '../i18n/extraVideosTranslations.js';`
  );
}

// 2. Add language hook at start of component
code = code.replace(
  `export const ApostilaExtraVideosSection: React.FC<ApostilaExtraVideosSectionProps> = ({
  apostila,
  isAdmin = false,
  onApostilaUpdated,
  titlePrefix,
}) => {`,
  `export const ApostilaExtraVideosSection: React.FC<ApostilaExtraVideosSectionProps> = ({
  apostila,
  isAdmin = false,
  onApostilaUpdated,
  titlePrefix,
}) => {
  const { language } = useLanguage();
  const tUi = EXTRA_VIDEOS_UI_TRANSLATIONS[language] || EXTRA_VIDEOS_UI_TRANSLATIONS.pt;
  const modNumber = (apostila as any)?.moduleId || (apostila as any)?.number || 1;`
);

// 3. Wrap extraVideos with translated items
code = code.replace(
  `  const extraVideos = [slot1, slot2];`,
  `  const translatedSlot1 = getTranslatedExtraVideo(slot1, language, modNumber, 1);
  const translatedSlot2 = getTranslatedExtraVideo(slot2, language, modNumber, 2);
  const extraVideos = [translatedSlot1, translatedSlot2];`
);

// 4. Header title & badges
code = code.replace(
  `<h2 className="text-sm sm:text-base font-bold text-white font-display">
                Vídeos Extras para Estudo
              </h2>`,
  `<h2 className="text-sm sm:text-base font-bold text-white font-display">
                {tUi.sectionTitle}
              </h2>`
);

code = code.replace(
  `<span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                2 LOCAIS OFICIAIS
              </span>`,
  `<span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {tUi.sectionBadge}
              </span>`
);

// 5. Card badges
code = code.replace(
  `<span>LOCAL 0{slot} • VÍDEO EXTRA DE ESTUDO</span>`,
  `<span>{slot === 1 ? tUi.slot1Badge : tUi.slot2Badge}</span>`
);

// 6. Empty slot title & desc
code = code.replace(
  `<h4 className="text-xs sm:text-sm font-bold text-white">
                        Local 0{slot} reservado para Vídeo Extra
                      </h4>`,
  `<h4 className="text-xs sm:text-sm font-bold text-white">
                        {tUi.emptySlotTitle(slot)}
                      </h4>`
);

code = code.replace(
  `{isAdmin
                          ? 'Escolha se deseja subir um arquivo de vídeo do seu computador (MP4) ou vincular diretamente pelo YouTube.'
                          : 'Este vídeo de estudo extra está sendo preparado pela equipe pedagógica do CINELAB.'}`,
  `{isAdmin ? tUi.emptySlotAdminDesc : tUi.emptySlotStudentDesc}`
);

// 7. Admin buttons in empty slot
code = code.replace(
  `<span>Subir Arquivo (MP4)</span>`,
  `<span>{tUi.uploadFileBtn}</span>`
);

code = code.replace(
  `<span>Subir pelo YouTube</span>`,
  `<span>{tUi.uploadYoutubeBtn}</span>`
);

// 8. Professor notes title in card
code = code.replace(
  `Orientação do Professor &amp; Orientação ao Aluno:`,
  `{tUi.professorNotesTitle}`
);
code = code.replace(
  `Orientação do Professor & Orientação ao Aluno:`,
  `{tUi.professorNotesTitle}`
);

// 9. Notes edit modal
code = code.replace(
  `Escrever Orientação do Professor & Orientação ao Aluno:`,
  `{tUi.editNotesTitle}`
);

code = code.replace(
  `placeholder="Escreva aqui a orientação personalizada do Professor Tony de Luc para este vídeo (ex: dicas de decupagem, o que prestar atenção, exercícios práticos)..."`,
  `placeholder={tUi.notesPlaceholder}`
);

code = code.replace(
  `Este texto aparecerá com destaque dourado para todos os alunos que assistirem a este vídeo.`,
  `{tUi.notesHelpText}`
);

code = code.replace(
  `<button
                        type="button"
                        onClick={() => setEditingNotesSlot(null)}
                        disabled={isSavingNotes}
                        className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>`,
  `<button
                        type="button"
                        onClick={() => setEditingNotesSlot(null)}
                        disabled={isSavingNotes}
                        className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        {tUi.cancelBtn}
                      </button>`
);

code = code.replace(
  `<span>Salvar Orientação</span>`,
  `<span>{tUi.saveNotesBtn}</span>`
);

code = code.replace(
  `<span>Salvando...</span>`,
  `<span>{tUi.savingBtn}</span>`
);

// 10. Quick edit button
code = code.replace(
  `<span>Trocar / Escrever</span>`,
  `<span>{tUi.quickEditBtn}</span>`
);

// 11. Edit details button
code = code.replace(
  `<span>Editar Detalhes</span>`,
  `<span>{tUi.editDetailsBtn}</span>`
);

fs.writeFileSync('src/components/ApostilaExtraVideosSection.tsx', code, 'utf8');
console.log('✓ ApostilaExtraVideosSection.tsx updated with i18n successfully!');
