export const site = {
  name: 'Area Control',
  legalName: 'Area Control Belgelendirme Gözetim ve Teknik Kontrol Hizmetleri A.Ş.',
  tagline: 'Güvenin kapsamı, denetimle başlar.',
  description:
    'Antalya merkezli, TÜRKAK akreditasyonu ile otel ve restoran işletmeleri için sistem belgelendirme, tedarikçi denetimi ve hijyen-gıda-su denetimi hizmetleri.',
  address: {
    line1: 'Zerdalilik Mah. 1380 Sok.',
    line2: 'Gülgün Apt. Sitesi No:8/6',
    city: 'Antalya',
    country: 'Türkiye',
  },
  phone: '+90 537 267 0972',
  phoneDisplay: '0537 267 0972',
  phoneE164: '+905372670972',
  whatsapp: '905372670972',
  whatsappMessage: 'Merhaba, Area Control hizmetleri hakkında bilgi almak istiyorum.',
  email: 'info@bixkurumsal.com',
  accreditations: [
    { code: 'TÜRKAK', note: 'SigmaCert ortaklığı üzerinden' },
    { code: 'HAK', note: 'Helal belgelendirme akreditasyonu' },
  ],
  metrics: [
    { value: '150+', label: 'Tamamlanan Denetim' },
    { value: '18', label: 'ISO Standardı' },
    { value: 'TÜRKAK', label: 'Akreditasyon' },
  ],
  url: 'https://areacontrol.com.tr',
  web3forms: {
    endpoint: 'https://api.web3forms.com/submit',
  },
};

export type Site = typeof site;
