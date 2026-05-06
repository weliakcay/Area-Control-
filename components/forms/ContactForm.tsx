'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/content/site';
import tr from '@/messages/tr.json';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch(site.web3forms.endpoint, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="Area Control — Yeni teklif talebi" />
      <input type="hidden" name="from_name" value="Area Control Web" />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid md:grid-cols-2 gap-5">
        <Field name="name" label={tr.cta.form.name} required />
        <Field name="company" label={tr.cta.form.company} />
        <Field name="phone" label={tr.cta.form.phone} type="tel" required />
        <Field name="email" label={tr.cta.form.email} type="email" required />
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[0.72rem] tracking-[0.25em] uppercase text-cream/50 font-mono">
          {tr.cta.form.service}
        </span>
        <select
          name="service"
          required
          defaultValue=""
          className="bg-transparent border border-white/10 px-4 py-3 text-cream focus:border-crimson focus:outline-none"
        >
          <option value="" disabled>{tr.cta.form.servicePlaceholder}</option>
          <option value="sistem-belgelendirme">Sistem Belgelendirme</option>
          <option value="tedarikci-denetimi">Tedarikçi Denetimi</option>
          <option value="hijyen-denetimi">Hijyen ve Saha Denetimi</option>
          <option value="diger">{tr.cta.form.serviceOther}</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[0.72rem] tracking-[0.25em] uppercase text-cream/50 font-mono">
          {tr.cta.form.message}
        </span>
        <textarea
          name="message"
          rows={5}
          required
          className="bg-transparent border border-white/10 px-4 py-3 text-cream focus:border-crimson focus:outline-none resize-none"
        />
      </label>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-cream text-[0.75rem] uppercase tracking-[0.25em] font-medium hover:bg-blood transition-colors disabled:opacity-60"
        >
          {status === 'sending' ? '...' : tr.cta.form.submit}
          <span aria-hidden>&rarr;</span>
        </button>
        {status === 'success' && (
          <p className="text-green-400 text-[0.85rem]">{tr.cta.form.success}</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-[0.85rem]">
            Gönderim başarısız oldu. Lütfen telefon veya WhatsApp üzerinden ulaşın.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ name, label, type = 'text', required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.72rem] tracking-[0.25em] uppercase text-cream/50 font-mono">
        {label}{required && ' *'}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="bg-transparent border border-white/10 px-4 py-3 text-cream focus:border-crimson focus:outline-none"
      />
    </label>
  );
}
