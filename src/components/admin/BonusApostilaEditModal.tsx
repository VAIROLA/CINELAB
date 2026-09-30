import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api.js';
import {
  BookOpen,
  X,
  AlertCircle,
  Upload,
  CheckCircle2,
  Loader2,
  FileText,
  ExternalLink,
  Award,
} from 'lucide-react';
import { BonusApostila } from '../../types/index.js';
import { saveApostilaToVault, updateVaultMetadata } from '../../utils/apostilaVault.js';
import { useLanguage } from '../../i18n/LanguageContext.js';
import { ApostilaExtraVideosSection } from '../ApostilaExtraVideosSection.js';

interface BonusApostilaEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  bonusApostila: BonusApostila | any | null;
}

export const BonusApostilaEditModal: React.FC<BonusApostilaEditModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  bonusApostila,
}) => {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pagesCount, setPagesCount] = useState<number>(30);
  const [fileSizeMb, setFileSizeMb] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  // Apostila PDF upload state
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  const [uploadedPdfFileName, setUploadedPdfFileName] = useState('');
  const [isPdfDragOver, setIsPdfDragOver] = useState(false);
  const pdfFileInputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (bonusApostila) {
      setTitle(bonusApostila.title || '');
      setSubtitle(bonusApostila.subtitle || '');
      setDescription(bonusApostila.description || bonusApostila.summary || '');
      setPdfUrl(bonusApostila.pdfUrl || '');
      const rawPages = bonusApostila.pagesCount || bonusApostila.totalPages;
      setPagesCount(rawPages && rawPages !== 96 && rawPages !== 104 ? rawPages : (bonusApostila.number === 1 ? 30 : 29));
      setFileSizeMb(bonusApostila.fileSizeMb);
      setUploadedPdfFileName('');
      setErrorMessage('');
    }
  }, [bonusApostila, isOpen]);

  if (!isOpen || !bonusApostila) return null;

  const bonusNum = bonusApostila.number || (bonusApostila.id === 'bonus-03' || bonusApostila.id === 'bonus-3' ? 3 : bonusApostila.id === 'bonus-02' || bonusApostila.id === 'bonus-2' ? 2 : 1);

  const handlePdfUpload = async (file: File) => {
    if (!file) return;
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      setErrorMessage('Formato inválido. Selecione um arquivo PDF (.pdf).');
      return;
    }

    try {
      setUploadingPdf(true);
      setPdfUploadProgress(0);
      setErrorMessage('');

      const res = await api.uploadApostilaPdfFile(file, {
        isBonus: true,
        bonusNumber: bonusNum,
        title: title || bonusApostila.title,
        description: description || bonusApostila.description,
        onProgress: (percent) => setPdfUploadProgress(percent),
      });

      setPdfUrl(res.fileUrl);
      setUploadedPdfFileName(file.name);
      if (res.fileSizeMb) setFileSizeMb(res.fileSizeMb);
      if (res.pagesCount) {
        setPagesCount(res.pagesCount);
      } else if (res.apostila?.pagesCount) {
        setPagesCount(res.apostila.pagesCount);
      }

      // Local vault backup
      try {
        await saveApostilaToVault(bonusNum, file, {
          isBonus: true,
          bonusNumber: bonusNum,
          fileName: file.name,
          title: title || bonusApostila.title,
          pagesCount: res.pagesCount || res.apostila?.pagesCount || pagesCount,
          fileSizeMb: res.fileSizeMb,
          pdfUrl: res.fileUrl,
        });
      } catch (vaultErr) {
        console.warn('Could not store bonus in local vault:', vaultErr);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Falha ao subir arquivo PDF da apostila bônus.');
    } finally {
      setUploadingPdf(false);
      setPdfUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await api.updateAdminApostila(bonusApostila.id, {
        title,
        subtitle,
        description,
        pdfUrl,
        pagesCount: Number(pagesCount),
      });

      // Update local persistent vault
      try {
        await updateVaultMetadata(bonusNum, {
          isBonus: true,
          bonusNumber: bonusNum,
          title,
          pagesCount: Number(pagesCount),
          pdfUrl,
          fileSizeMb,
        });
      } catch (e) {
        console.warn('Vault metadata update error:', e);
      }

      onSuccess(`Apostila Bônus 0${bonusNum} atualizada com sucesso! (${pagesCount} páginas)`);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao atualizar dados da apostila bônus.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 shadow-2xl text-left my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-display text-white">
                {t('bonusModal.titlePrefix')}{bonusNum}
              </h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                {t('bonusModal.tagline')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-neutral-400 mb-1">{t('bonusModal.fullTitleLabel')}</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">{t('bonusModal.subtitleLabel')}</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder={t('bonusModal.subtitlePlaceholder')}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">{t('bonusModal.descLabel')}</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Number of Pages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1 flex items-center justify-between">
                <span>{t('bonusModal.pagesLabel')}</span>
                <span className="text-[10px] text-amber-400 font-semibold">{t('bonusModal.pagesBadge')}</span>
              </label>
              <input
                type="number"
                min={1}
                required
                value={pagesCount}
                onChange={(e) => setPagesCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-neutral-400 mt-1 block">
                {t('bonusModal.pagesNotice')}
              </span>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">{t('bonusModal.fileSizeLabel')}</label>
              <input
                type="text"
                disabled
                value={fileSizeMb ? `${fileSizeMb} MB` : t('bonusModal.autoLabel')}
                className="w-full px-3.5 py-2.5 bg-neutral-950/60 border border-neutral-800 rounded-xl text-neutral-400 text-xs cursor-not-allowed"
              />
            </div>
          </div>

          {/* Upload PDF Section */}
          <div className="pt-2 border-t border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-amber-400 font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>{t('bonusModal.pdfFileLabel')}</span>
              </label>
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 underline text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <span>{t('bonusModal.openCurrentPdf')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsPdfDragOver(true);
              }}
              onDragLeave={() => setIsPdfDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsPdfDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handlePdfUpload(file);
              }}
              onClick={() => pdfFileInputRef.current?.click()}
              className={`p-4 rounded-xl border-2 border-dashed transition-all text-center cursor-pointer ${
                isPdfDragOver
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-neutral-700 hover:border-blue-500/60 bg-neutral-950/60'
              }`}
            >
              <input
                type="file"
                ref={pdfFileInputRef}
                accept="application/pdf,.pdf"
                disabled={uploadingPdf}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePdfUpload(file);
                }}
                className="hidden"
              />

              {uploadingPdf ? (
                <div className="space-y-2 py-2">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-400 mx-auto" />
                  <p className="text-xs text-blue-300 font-bold">
                    Enviando arquivo PDF ({pdfUploadProgress}%)...
                  </p>
                  <div className="w-full max-w-xs mx-auto h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${pdfUploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : uploadedPdfFileName ? (
                <div className="space-y-1 py-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="text-xs text-emerald-300 font-bold">PDF OK</p>
                  <p className="text-[11px] text-neutral-400 truncate max-w-sm mx-auto">
                    {uploadedPdfFileName} • {pagesCount} {t('studentArea.pagesCount')}
                  </p>
                </div>
              ) : (
                <div className="space-y-1 py-1">
                  <Upload className="w-5 h-5 text-blue-400 mx-auto" />
                  <p className="text-xs text-white font-medium">
                    {t('bonusModal.dragDropNotice')}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    {t('bonusModal.headerNotice')}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">
                {t('bonusModal.directUrlLabel')}
              </label>
              <input
                type="text"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="/materiais/cinelab-bonus-01-glossario-planos.pdf"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          {/* 2 Locais de Vídeos Extras para Estudo da Apostila Bônus */}
          <div className="pt-4 border-t border-neutral-800">
            <ApostilaExtraVideosSection
              apostila={bonusApostila}
              isAdmin={true}
              onApostilaUpdated={() => {
                onSuccess('Vídeos extras da apostila bônus atualizados com sucesso!');
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-sans transition-colors cursor-pointer"
            >
              {t('bonusModal.cancelBtn')}
            </button>
            <button
              type="submit"
              disabled={loading || uploadingPdf}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs font-sans transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('bonusModal.saving')}</span>
                </>
              ) : (
                <span>{t('bonusModal.saveBtn')}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
