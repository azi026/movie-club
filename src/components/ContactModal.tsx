import React, { useState } from 'react';
import { Check, Mail, MapPin, MessageSquare, Phone, Send, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CURRENT_GATHERING } from '../data/movieClubData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', contact: '', message: '' });
      onClose();
    }, 2500);
  };

  return (
    <div
      id="contact-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="contact-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#1a1715] text-[#fdfbf7] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#221e1b]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#c27847]/20 text-[#e59b67] border border-[#c27847]/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#fdfbf7]">
                {lang === 'fa' ? 'تماس با ما' : 'Contact Us'}
              </h3>
              <p className="text-xs text-[#a39487]">
                {lang === 'fa' ? 'هر سوال یا پیشنهادی دارید در کنارتان هستیم' : "We'd love to hear from you"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-[#a39487] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-right">
          {/* Quick info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#231f1c] border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-[#e59b67] font-semibold">
                <MapPin className="w-4 h-4" />
                <span>{lang === 'fa' ? 'محل برگزاری' : 'Venue'}</span>
              </div>
              <p className="text-[#d9cebf]">
                {lang === 'fa' ? CURRENT_GATHERING.cafeNameFa : CURRENT_GATHERING.cafeNameEn}
              </p>
              <p className="text-[11px] text-[#8e7f72]">
                {lang === 'fa' ? CURRENT_GATHERING.locationFa : CURRENT_GATHERING.locationEn}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#231f1c] border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-[#e59b67] font-semibold">
                <Send className="w-4 h-4" />
                <span>{lang === 'fa' ? 'پشتیبانی تلگرام' : 'Telegram Support'}</span>
              </div>
              <p className="text-[#d9cebf] font-mono" dir="ltr">
                @movieclub_admin
              </p>
              <p className="text-[11px] text-[#8e7f72]">
                {lang === 'fa' ? 'پاسخگویی روزانه' : 'Fast response'}
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-center space-y-2 animate-fade-in">
              <Check className="w-8 h-8 mx-auto" />
              <h4 className="font-bold text-sm">
                {lang === 'fa' ? 'پیام شما دریافت شد!' : 'Message Sent Successfully!'}
              </h4>
              <p className="text-xs text-emerald-300/80">
                {lang === 'fa' ? 'به زودی با شما تماس می‌گیریم.' : 'We will get back to you shortly.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#d4c7ba] mb-1">
                  {lang === 'fa' ? 'نام' : 'Name'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === 'fa' ? 'نام شما' : 'Your name'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#241f1c] border border-white/10 text-xs text-white placeholder-[#786c61] focus:outline-none focus:border-[#c27847]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d4c7ba] mb-1">
                  {lang === 'fa' ? 'شماره تماس یا ایمیل' : 'Phone or Email'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder={lang === 'fa' ? 'ایمیل یا شماره شما' : 'Your contact'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#241f1c] border border-white/10 text-xs text-white placeholder-[#786c61] focus:outline-none focus:border-[#c27847]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d4c7ba] mb-1">
                  {lang === 'fa' ? 'پیام یا سوال شما' : 'Message'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'fa' ? 'پیام خود را بنویسید...' : 'Your message...'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#241f1c] border border-white/10 text-xs text-white placeholder-[#786c61] focus:outline-none focus:border-[#c27847] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#c27847] hover:bg-[#a86134] text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                {lang === 'fa' ? 'ارسال پیام' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
