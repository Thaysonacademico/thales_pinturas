/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { SITE_CONFIG, getWhatsAppLink } from '../siteConfig';
import { WhatsAppIcon } from './SocialIcons';
import CobaltoAvatar from './CobaltoAvatar';
import {
  Send,
  X,
  ArrowUpRight,
  Shield,
  User,
  Loader2,
  ChevronRight,
  HelpCircle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Check,
  Paintbrush,
  Upload,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  whatsappMessage?: string;
}

// Preset simulation surfaces
const SIMULATION_SURFACES = [
  {
    id: 'fachada-externa',
    name: 'Fachada Residencial',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'sala-interna',
    name: 'Interior & Sala',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'pedras-muro',
    name: 'Muro & Pedras Naturais',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'predial',
    name: 'Fachada Predial',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=800&auto=format&fit=crop',
  },
];

// Preset finish tones
const FINISH_OPTIONS = [
  {
    name: 'Branco Acetinado',
    colorHex: '#F6F5F0',
    blendColor: 'rgba(246, 245, 240, 0.42)',
    description: 'Toque aveludado, recortes perfeitos e alta lavabilidade.',
  },
  {
    name: 'Cinza Granito',
    colorHex: '#A3A6A8',
    blendColor: 'rgba(120, 126, 130, 0.45)',
    description: 'Visual arquitetônico contemporâneo que disfarça imperfeições.',
  },
  {
    name: 'Areia Litorânea',
    colorHex: '#DBC5A6',
    blendColor: 'rgba(219, 197, 166, 0.45)',
    description: 'Harmoniza com a luz natural de Itajaí e resiste ao sol.',
  },
  {
    name: 'Pedra Moledo Nobre',
    colorHex: '#7C6F5E',
    blendColor: 'rgba(110, 95, 80, 0.52)',
    description: 'Revestimento rústico com resina hidrofugante contra limo.',
  },
  {
    name: 'Emborrachada Anti-Maresia',
    colorHex: '#526E65',
    blendColor: 'rgba(65, 95, 85, 0.48)',
    description: 'Película elástica vedante que combate fissuras e umidade litorânea.',
  },
];

export const triggerCobaltoWithQuestion = (queryText?: string) => {
  window.dispatchEvent(new CustomEvent('open-cobalto', { detail: { query: queryText || '' } }));
};

export const LateralAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'simulador'>('chat');

  // Simulation state
  const [selectedSurface, setSelectedSurface] = useState(SIMULATION_SURFACES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [selectedFinish, setSelectedFinish] = useState(FINISH_OPTIONS[0]);

  // Audio Speech state
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Olá! Sou o Cobalto, consultor técnico especialista da Thales Pinturas. O Thales foi eleito Top 3 do Brasil pela ABRAPP/MBPM. Como posso te orientar tecnicamente sobre seu imóvel hoje?',
      timestamp: 'Agora',
      whatsappMessage: 'Olá, Thales! Gostaria de um orçamento para os serviços da Thales Pinturas',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<ChatMessage[]>(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Check speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'pt-BR';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
          // auto-send
          setTimeout(() => {
            handleSendMessage(transcript);
          }, 200);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Listen to image viewer state to cleanly hide floating lateral access during zoom
  useEffect(() => {
    const handleImageViewer = (e: any) => {
      setIsImageViewerOpen(Boolean(e.detail?.active));
    };
    window.addEventListener('image-viewer-active', handleImageViewer);
    return () => window.removeEventListener('image-viewer-active', handleImageViewer);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

  // Listener to open Cobalto from search bar or other components
  useEffect(() => {
    const handleOpenCobalto = (e: any) => {
      setIsOpen(true);
      setIsCollapsed(false);
      setActiveTab('chat');
      const query = e.detail?.query;
      if (query && typeof query === 'string') {
        setTimeout(() => {
          handleSendMessage(query);
        }, 300);
      }
    };

    window.addEventListener('open-cobalto', handleOpenCobalto);
    return () => window.removeEventListener('open-cobalto', handleOpenCobalto);
  }, []);

  // Escape key closes modal
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          stopSpeech();
        }
      };
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Text-To-Speech reader
  const speakMessage = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;

    // Pick a Portuguese voice if available
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.startsWith('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Toggle voice recording
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Error starting recognition:', e);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    setInput('');

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messagesRef.current, userMessage];
    setMessages(newHistory);
    messagesRef.current = newHistory;
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      let botReply = '';
      let suggestedWhatsApp = 'Olá, Thales! Gostaria de um orçamento para o meu imóvel';

      if (response.ok) {
        const data = await response.json();
        botReply = data.reply || '';
        if (data.suggestedWhatsAppMessage) {
          suggestedWhatsApp = data.suggestedWhatsAppMessage;
        }
      }

      if (!botReply) {
        botReply = 'Como consultor técnico da Thales Pinturas, prezo pela excelência: nosso acabamento é cirúrgico e com obra limpa. Para orçamentos e prazos precisos, fale agora diretamente com o Thales no WhatsApp para contratar com quem é Top 3 do Brasil!';
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        whatsappMessage: suggestedWhatsApp,
      };

      setMessages((prev) => {
        const updated = [...prev, assistantMessage];
        messagesRef.current = updated;
        return updated;
      });

      if (autoSpeak) {
        speakMessage(botReply);
      }
    } catch (err) {
      console.error('Falha ao comunicar com o assistente:', err);
      const fallbackReply = 'Como consultor técnico da Thales Pinturas, prezo pela excelência: nosso acabamento é cirúrgico e com obra limpa. Para orçamentos e prazos precisos, fale agora diretamente com o Thales no WhatsApp para contratar com quem é Top 3 do Brasil!';
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        whatsappMessage: 'Olá, Thales! Gostaria de um orçamento com a Thales Pinturas',
      };
      setMessages((prev) => {
        const updated = [...prev, fallbackMessage];
        messagesRef.current = updated;
        return updated;
      });
      if (autoSpeak) {
        speakMessage(fallbackReply);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Custom photo upload for simulator
  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // If user is interacting with an image viewer, hide floating dock completely
  if (isImageViewerOpen) {
    return null;
  }

  const currentDisplayImage = customImage || selectedSurface.image;

  return (
    <>
      {/* 1. Lateral Quick-Access Floating Dock (Right edge) */}
      {!isOpen && (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none flex flex-col items-end gap-2.5 pr-0.5">
          {/* A. Cobalto Trigger */}
          {isCollapsed ? (
            /* Minimized discrete tab */
            <button
              onClick={() => setIsCollapsed(false)}
              className="bg-[#1D2F29] hover:bg-[#253D35] text-[#FAF8F5] p-1.5 border-l-2 border-y border-[#BD6B3B] shadow-2xl transition-all cursor-pointer flex flex-col items-center gap-1 group rounded-l"
              title="Expandir Cobalto IA"
              aria-label="Expandir Cobalto IA"
            >
              <div className="w-5 h-5 rounded-full bg-[#FAF8F5] p-0.5 flex items-center justify-center border border-[#BD6B3B]">
                <CobaltoAvatar size={16} />
              </div>
              <span className="text-[8px] font-bold text-[#BD6B3B] uppercase [writing-mode:vertical-rl] py-0.5">
                Cobalto
              </span>
            </button>
          ) : (
            /* Compact active badge with collapse toggle */
            <div className="flex items-center bg-[#1D2F29] border-l-2 border-y border-[#BD6B3B] shadow-2xl rounded-l overflow-hidden transition-all">
              <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-1.5 py-1.5 px-2 hover:bg-[#253D35] transition-colors cursor-pointer text-left"
                aria-label="Abrir Cobalto Agente de IA"
                title="Cobalto - Agente de IA da Thales Pinturas"
              >
                <div className="w-6 h-6 rounded-full bg-[#FAF8F5] p-0.5 flex items-center justify-center border border-[#BD6B3B] shrink-0">
                  <CobaltoAvatar size={20} />
                </div>
                <div className="flex flex-col pr-0.5">
                  <span className="text-[9px] font-bold tracking-wider uppercase text-[#BD6B3B] leading-none">
                    Cobalto
                  </span>
                  <span className="text-[8px] font-medium text-[#DCD3C5] leading-tight">
                    Agente IA
                  </span>
                </div>
                <ChevronRight size={11} className="text-[#DCD3C5] group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Collapse button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollapsed(true);
                }}
                className="py-2 px-1 text-[#A2B8AC] hover:text-[#FAF8F5] hover:bg-[#FAF8F5]/10 border-l border-[#3E5C50] transition-colors cursor-pointer"
                title="Recolher Cobalto"
                aria-label="Recolher Cobalto"
              >
                <X size={11} />
              </button>
            </div>
          )}

          {/* B. WhatsApp Button EXACTLY BELOW Cobalto as required */}
          <a
            href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar no WhatsApp com Thales Pinturas"
            className="w-10 h-10 sm:w-11 sm:h-11 bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl transition-all border-2 border-white hover:scale-105 cursor-pointer relative mr-1"
            title="Solicitar Orçamento no WhatsApp"
          >
            <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#25D366] rounded-full animate-ping" />
            <WhatsAppIcon size={22} />
          </a>
        </div>
      )}

      {/* 2. Lateral Modal / Drawer */}
      {isOpen && (
        <aside
          aria-label="Cobalto - Agente de IA Especialista"
          className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] md:w-[450px] bg-[#FAF8F5] border-l-2 border-[#1D2F29] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        >
          {/* Header */}
          <div className="bg-[#1D2F29] text-[#FAF8F5] p-3.5 border-b border-[#3E5C50] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] p-0.5 flex items-center justify-center border-2 border-[#BD6B3B] shadow-sm relative shrink-0">
                <CobaltoAvatar size={34} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#1D2F29]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-base font-semibold text-[#FAF8F5] leading-tight">
                    Cobalto
                  </h3>
                  <span className="text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 bg-[#BD6B3B] text-white">
                    Especialista Oficial
                  </span>
                </div>
                <p className="text-[10px] text-[#DCD3C5] font-medium">
                  Tire dúvidas técnicas ou simule cores e pedras
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Auto voice reading toggle */}
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) {
                    stopSpeech();
                  }
                  setAutoSpeak(!autoSpeak);
                }}
                className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 transition-colors cursor-pointer ${
                  autoSpeak
                    ? 'bg-[#BD6B3B] text-white border-[#BD6B3B]'
                    : 'bg-[#2A443B] text-[#DCD3C5] border-[#3E5C50] hover:text-[#FAF8F5]'
                }`}
                title={autoSpeak ? 'Leitura por voz ativada (toque para desativar)' : 'Ativar leitura por voz das respostas'}
              >
                {autoSpeak ? <Volume2 size={12} /> : <VolumeX size={12} />}
                <span>{autoSpeak ? 'Voz Ativa' : 'Áudio'}</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  stopSpeech();
                }}
                className="p-1.5 text-[#DCD3C5] hover:text-[#FAF8F5] hover:bg-[#2A443B] transition-colors cursor-pointer"
                aria-label="Fechar Cobalto"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs: Chat vs Simulador Visual */}
          <div className="grid grid-cols-2 bg-[#F4EFEA] border-b border-[#E2DDD5] text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab('chat');
                stopSpeech();
              }}
              className={`py-2 px-3 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-[#FAF8F5] text-[#1D2F29] border-b-2 border-[#BD6B3B] font-bold shadow-xs'
                  : 'text-[#6B6358] hover:text-[#1D2F29]'
              }`}
            >
              <Sparkles size={13} className="text-[#BD6B3B]" />
              <span>Dúvidas Técnicas</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('simulador');
                stopSpeech();
              }}
              className={`py-2 px-3 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'simulador'
                  ? 'bg-[#FAF8F5] text-[#1D2F29] border-b-2 border-[#BD6B3B] font-bold shadow-xs'
                  : 'text-[#6B6358] hover:text-[#1D2F29]'
              }`}
            >
              <Paintbrush size={13} className="text-[#BD6B3B]" />
              <span>Simulador de Imagens</span>
            </button>
          </div>

          {/* TAB 1: DÚVIDAS TÉCNICAS (CHAT COM VOZ) */}
          {activeTab === 'chat' && (
            <>
              {/* Conversation Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 shrink-0 rounded-full bg-[#FAF8F5] p-0.5 flex items-center justify-center border border-[#BD6B3B] shadow-xs">
                        <CobaltoAvatar size={22} />
                      </div>
                    )}

                    <div
                      className={`p-3 max-w-[88%] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#1D2F29] text-[#FAF8F5]'
                          : 'bg-[#FFFFFF] text-[#2E3531] border border-[#E2DDD5] shadow-xs'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>

                      {/* Direct WhatsApp Call-To-Action Button for Assistant Messages */}
                      {msg.role === 'assistant' && (
                        <div className="mt-2.5 pt-2 border-t border-[#EAE4DB]/80 flex flex-wrap items-center gap-2">
                          <a
                            href={getWhatsAppLink(msg.whatsappMessage || 'Olá, Thales! Gostaria de um orçamento')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                          >
                            <WhatsAppIcon size={13} />
                            <span>Contratar no WhatsApp →</span>
                          </a>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#EAE4DB]/60 text-[9px]">
                        <span className={msg.role === 'user' ? 'text-[#DCD3C5]' : 'text-[#8D7F71]'}>
                          {msg.timestamp}
                        </span>

                        {msg.role === 'assistant' && (
                          <button
                            type="button"
                            onClick={() => speakMessage(msg.content)}
                            className="inline-flex items-center gap-1 text-[#BD6B3B] hover:text-[#9E552A] font-bold cursor-pointer"
                            title="Ouvir resposta em áudio"
                          >
                            <Volume2 size={12} />
                            <span>Ouvir</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-6 h-6 shrink-0 bg-[#BD6B3B] text-[#FAF8F5] flex items-center justify-center text-xs font-bold">
                        <User size={13} />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2.5 justify-start items-center">
                    <div className="w-7 h-7 shrink-0 rounded-full bg-[#FAF8F5] p-0.5 flex items-center justify-center border border-[#BD6B3B]">
                      <CobaltoAvatar size={22} />
                    </div>
                    <div className="bg-[#FFFFFF] p-2.5 border border-[#E2DDD5] text-xs text-[#6B6358] flex items-center gap-2 shadow-xs">
                      <Loader2 size={13} className="animate-spin text-[#BD6B3B]" />
                      <span>Cobalto está formulando sua resposta técnica...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Chips */}
              <div className="px-3 pt-2 pb-1 bg-[#FAF8F5] border-t border-[#EAE4DB] overflow-x-auto flex items-center gap-1.5 no-scrollbar">
                {[
                  { label: '📋 Orçamento', text: 'Gostaria de um orçamento com o Thales para o meu imóvel' },
                  { label: '🏠 Pintura Residencial & Predial', text: 'Quais técnicas o Thales utiliza na pintura residencial e predial?' },
                  { label: '🌊 Revitalização & Maresia', text: 'Como vocês tratam trincas e protegem contra a maresia?' },
                  { label: '✨ Limpeza pós Obra', text: 'Como funciona a limpeza pós-obra especializada?' },
                  { label: '🪨 Pedras Naturais', text: 'Como é feita a aplicação de pedras naturais nas fachadas?' },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => handleSendMessage(chip.text)}
                    disabled={isLoading}
                    className="shrink-0 px-2.5 py-1 bg-white hover:bg-[#F4EFEA] border border-[#DCD3C5] hover:border-[#1D2F29] text-[10px] font-semibold text-[#14201C] transition-colors cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar with Audio Mic and Text */}
              <div className="p-3 bg-[#FFFFFF] border-t border-[#E2DDD5]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-1.5"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pergunte sobre tintas, pedras, pós-obra..."
                    className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DCD3C5] focus:border-[#1D2F29] focus:outline-hidden text-[#14201C] placeholder:text-[#8D7F71]"
                    disabled={isLoading || isListening}
                  />

                  {/* Audio Microphone Button */}
                  {speechSupported && (
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`p-2 transition-colors cursor-pointer shrink-0 border ${
                        isListening
                          ? 'bg-red-600 text-white border-red-700 animate-pulse'
                          : 'bg-[#FAF8F5] text-[#14201C] border-[#DCD3C5] hover:bg-[#F2ECE4]'
                      }`}
                      title={isListening ? 'Gravando... toque para parar' : 'Falar por áudio'}
                    >
                      {isListening ? <MicOff size={15} /> : <Mic size={15} />}
                    </button>
                  )}

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2 bg-[#1D2F29] hover:bg-[#BD6B3B] disabled:opacity-40 text-[#FAF8F5] transition-colors cursor-pointer shrink-0"
                    aria-label="Enviar pergunta"
                  >
                    <Send size={15} />
                  </button>
                </form>

                {isListening && (
                  <p className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                    Ouvindo sua voz... fale sua dúvida.
                  </p>
                )}

                {/* Direct CTA to WhatsApp with Thales */}
                <div className="mt-2 flex items-center justify-between text-[10px] text-[#7A7165]">
                  <span>Prazos e valores sob consulta com o profissional</span>
                  <a
                    href={getWhatsAppLink('Olá, Thales! Gostaria de um orçamento')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#1D2F29] hover:text-[#25D366] uppercase flex items-center gap-1"
                  >
                    <WhatsAppIcon size={12} />
                    <span>WhatsApp Direto →</span>
                  </a>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: SIMULADOR VISUAL DE PINTURAS E SERVIÇOS POR IMAGEM */}
          {activeTab === 'simulador' && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#BD6B3B]">
                    Simulação Visual com IA
                  </span>
                  <label className="text-[10px] font-bold text-[#1D2F29] hover:text-[#BD6B3B] flex items-center gap-1 cursor-pointer">
                    <Upload size={11} />
                    <span>Enviar foto do seu imóvel</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preview Frame with applied finish overlay */}
                <div className="relative border-2 border-[#1D2F29] bg-black aspect-[16/10] overflow-hidden shadow-md mb-3">
                  <img
                    src={currentDisplayImage}
                    alt="Ambiente em simulação"
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                  {/* Color blend simulation layer */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-colors duration-300 mix-blend-multiply"
                    style={{ backgroundColor: selectedFinish.blendColor }}
                  />

                  {/* Micro badge of chosen finish */}
                  <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 bg-[#14201C]/90 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
                    Acabamento: {selectedFinish.name}
                  </div>
                </div>

                {/* Sample Surfaces Selector */}
                {!customImage && (
                  <div className="mb-3">
                    <span className="text-[10px] font-semibold text-[#665D52] block mb-1">
                      Escolha um ambiente para testar:
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {SIMULATION_SURFACES.map((surf) => (
                        <button
                          key={surf.id}
                          onClick={() => setSelectedSurface(surf)}
                          className={`p-1 border text-center transition-all cursor-pointer ${
                            selectedSurface.id === surf.id
                              ? 'border-[#BD6B3B] bg-[#FAF8F5] shadow-xs'
                              : 'border-[#DDD5C8] opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={surf.image}
                            alt={surf.name}
                            className="w-full h-10 object-cover mb-0.5"
                          />
                          <span className="text-[8px] font-bold text-[#14201C] block truncate">
                            {surf.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {customImage && (
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      ✓ Foto personalizada carregada
                    </span>
                    <button
                      onClick={() => setCustomImage(null)}
                      className="text-[10px] text-red-600 hover:underline"
                    >
                      Remover foto
                    </button>
                  </div>
                )}

                {/* Tone / Finish options */}
                <div className="mb-3">
                  <span className="text-[10px] font-semibold text-[#665D52] block mb-1">
                    Selecione a tinta ou pedra:
                  </span>
                  <div className="space-y-1.5">
                    {FINISH_OPTIONS.map((finish) => (
                      <button
                        key={finish.name}
                        onClick={() => setSelectedFinish(finish)}
                        className={`w-full p-2 border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedFinish.name === finish.name
                            ? 'border-[#1D2F29] bg-[#FAF8F5] shadow-xs'
                            : 'border-[#DDD5C8] bg-white hover:bg-[#F9F6F2]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                            style={{ backgroundColor: finish.colorHex }}
                          />
                          <div>
                            <span className="text-xs font-bold text-[#14201C] block leading-tight">
                              {finish.name}
                            </span>
                            <span className="text-[9px] text-[#7A7165] block leading-tight">
                              {finish.description}
                            </span>
                          </div>
                        </div>
                        {selectedFinish.name === finish.name && (
                          <Check size={14} className="text-[#BD6B3B] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cobalto Expert Evaluation */}
                <div className="p-2.5 bg-[#FAF8F5] border border-[#BD6B3B]/60 text-xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#BD6B3B] mb-1">
                    <CobaltoAvatar size={14} />
                    <span>Parecer do Especialista Cobalto:</span>
                  </div>
                  <p className="text-[11px] text-[#4E473D] leading-relaxed">
                    A opção <strong>{selectedFinish.name}</strong> combina excelente retenção de cor e durabilidade contra o mofo do litoral. O Thales executa com lixamento aspirado e vedação premium.
                  </p>
                </div>
              </div>

              {/* Action Button: Hire Thales */}
              <div className="pt-3 border-t border-[#E2DDD5] mt-3">
                <a
                  href={getWhatsAppLink(`Olá, Thales! Gostaria de um orçamento para aplicar o acabamento "${selectedFinish.name}" no meu imóvel.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <WhatsAppIcon size={16} />
                  <span>Contratar este acabamento com o Thales</span>
                </a>
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
};

export default LateralAIAssistant;
