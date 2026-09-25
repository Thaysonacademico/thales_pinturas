/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Loader2, ArrowRight, X, Paintbrush } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import { getWhatsAppLink } from '../siteConfig';
import CobaltoAvatar from './CobaltoAvatar';
import { triggerCobaltoWithQuestion } from './LateralAIAssistant';

interface SearchResult {
  interpretedQuery: string;
  matchedServiceId: string;
  serviceTitle: string;
  badge: string;
  explanation: string;
  relatedServices?: string[];
  suggestedWhatsAppMessage?: string;
}

interface AIServiceSearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
  className?: string;
}

export const AIServiceSearchBar: React.FC<AIServiceSearchBarProps> = ({
  onClose,
  autoFocus = false,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const quickChips = [
    'Pintura residencial e predial',
    'Revitalização',
    'Limpeza pós Obra',
    'Aplicação de pedras naturais',
    'Serviço Personalizado',
  ];

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  const handleSearch = async (searchTerm?: string) => {
    const textToSearch = (searchTerm || query).trim();
    if (!textToSearch) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/search-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSearch }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível realizar a consulta.');
      }

      const data: SearchResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Não conseguimos carregar a resposta no momento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleChipClick = (chip: string) => {
    setQuery(chip);
    handleSearch(chip);
  };

  const clearResult = () => {
    setResult(null);
    setErrorMessage('');
  };

  const handleAskCobalto = () => {
    const term = result?.serviceTitle || query || 'serviços';
    const question = `Olá, Cobalto! Gostaria de uma orientação técnica sobre ${term} para o meu imóvel. O que o Thales recomenda?`;
    triggerCobaltoWithQuestion(question);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`w-full max-w-xl ${className}`}>
      {/* Search Input Bar */}
      <div className="relative flex items-center bg-[#FAF8F5] border-2 border-[#1D2F29] focus-within:border-[#BD6B3B] shadow-sm transition-all">
        <div className="pl-3 pr-1 text-[#78887F] shrink-0">
          <Search size={17} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="O que você precisa para o seu imóvel? (ex: pintura externa, pedras, pós-obra...)"
          className="w-full py-2.5 px-2 text-xs sm:text-sm text-[#14201C] bg-transparent focus:outline-hidden placeholder:text-[#8C8479]"
        />

        {query && !isLoading && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              clearResult();
            }}
            className="p-1.5 text-[#8C8479] hover:text-[#14201C] mr-1 cursor-pointer"
            title="Limpar pesquisa"
          >
            <X size={14} />
          </button>
        )}

        <button
          type="button"
          onClick={() => handleSearch()}
          disabled={isLoading || !query.trim()}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#1D2F29] hover:bg-[#2A443B] disabled:opacity-60 text-[#FAF8F5] text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          {isLoading ? (
            <>
              <Paintbrush size={13} className="animate-spin text-[#BD6B3B]" />
              <span className="hidden xs:inline">Pintando...</span>
            </>
          ) : (
            <>
              <Sparkles size={12} className="text-[#BD6B3B]" />
              <span>Buscar</span>
            </>
          )}
        </button>
      </div>

      {/* Loading state message as requested by user: "Pintando com a resposta..." */}
      {isLoading && (
        <div className="mt-2.5 px-3 py-2 bg-[#F4EFEA] border border-[#BD6B3B]/40 text-[#1D2F29] text-xs font-medium flex items-center gap-2 animate-pulse">
          <Paintbrush size={14} className="text-[#BD6B3B]" />
          <span>Pintando com a resposta...</span>
        </div>
      )}

      {/* Fast tap chips */}
      <div className="flex items-center gap-1.5 mt-2.5 flex-wrap text-[10px] text-[#5C5346]">
        <span className="text-[#8C8479] font-medium hidden sm:inline">Serviços:</span>
        {quickChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleChipClick(chip)}
            className="px-2 py-0.5 bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#DDD5C8] text-[#3D352B] transition-colors cursor-pointer active:scale-95"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-700 text-xs">
          {errorMessage}
        </div>
      )}

      {/* AI Search Result Card */}
      {result && (
        <div className="mt-3.5 p-4 bg-[#FAF8F5] border-2 border-[#BD6B3B] shadow-xl relative animate-in fade-in slide-in-from-top-2 duration-200 text-left">
          <button
            type="button"
            onClick={clearResult}
            className="absolute top-2.5 right-2.5 text-[#8C8479] hover:text-[#14201C] p-1 cursor-pointer"
            title="Fechar resultado"
          >
            <X size={15} />
          </button>

          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1D2F29] text-[#FAF8F5] text-[9px] font-bold uppercase tracking-wider">
              <Sparkles size={10} className="text-[#BD6B3B]" />
              {result.badge || 'Correspondência Direta'}
            </span>
            {result.interpretedQuery && result.interpretedQuery.toLowerCase() !== query.toLowerCase() && (
              <span className="text-[10px] text-[#7A7165]">
                Interpretado como: <strong>{result.interpretedQuery}</strong>
              </span>
            )}
          </div>

          <h4 className="font-serif text-base font-bold text-[#14201C] leading-snug">
            {result.serviceTitle}
          </h4>

          <p className="text-xs text-[#4E473D] mt-1.5 leading-relaxed">
            {result.explanation}
          </p>

          {/* Action buttons: WhatsApp + Cobalto + Site */}
          <div className="mt-3 pt-2.5 border-t border-[#EAE3D9] flex flex-wrap items-center gap-2">
            {/* Contratar Serviços (WhatsApp) */}
            <a
              href={getWhatsAppLink(`Olá, Thales! Gostaria de um orçamento para ${result.serviceTitle}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider shadow-xs transition-colors"
            >
              <WhatsAppIcon size={14} />
              <span>Contratar Serviços (WhatsApp)</span>
            </a>

            {/* Cobalto IA */}
            <button
              type="button"
              onClick={handleAskCobalto}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1D2F29] hover:bg-[#253D35] text-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs border border-[#BD6B3B]"
              title="Tirar dúvidas com o Cobalto"
            >
              <div className="w-4 h-4 rounded-full bg-[#FAF8F5] p-0.5 flex items-center justify-center shrink-0">
                <CobaltoAvatar size={14} />
              </div>
              <span>Tirar Dúvidas com o Cobalto</span>
            </button>

            {/* Ver no Catálogo */}
            <a
              href="#servicos"
              onClick={() => {
                clearResult();
                if (onClose) onClose();
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#BD6B3B] text-[#14201C] text-[11px] font-semibold tracking-wider transition-colors"
            >
              <span>Ver no Catálogo</span>
              <ArrowRight size={12} className="text-[#BD6B3B]" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIServiceSearchBar;
