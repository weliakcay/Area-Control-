export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: 'Uygunluk değerlendirme süreci ne kadar sürüyor?',
    answer:
      'Standarda ve işletme büyüklüğüne göre değişmekle birlikte, ön denetimden uygunluk değerlendirmesine tipik süreç 6-12 haftadır. Hazırlık düzeyiniz yüksekse daha hızlı tamamlanabilir; kapsamlı eksikler varsa düzeltme için ek süre gerekebilir.',
  },
  {
    question: 'Denetim ücretleri neye göre belirleniyor?',
    answer:
      'Fiyat; seçilen standart, kapsam, çalışan sayısı, lokasyon sayısı ve denetim süresine göre belirlenir. Teklif aşamasında net bütçe paylaşırız; sürpriz kalem çıkarmayız.',
  },
  {
    question: 'Belge aldıktan sonra süreç bitiyor mu?',
    answer:
      'Hayır. Belge geçerliliği 3 yıldır ve yıllık gözetim denetimleri ile sürekliliği doğrulanır. 3. yılın sonunda yenileme denetimi ile belge yenilenir.',
  },
  {
    question: 'Otel dışındaki sektörlere de hizmet veriyor musunuz?',
    answer:
      'Evet. Odak alanımız otel ve restoran olsa da, gıda üretim tesisleri, sağlık kuruluşları, üretim firmaları ve hizmet sektöründe yer alan işletmelere de uygunluk değerlendirme ve denetim hizmeti sunuyoruz.',
  },
  {
    question: 'Hijyen denetimi ne sıklıkta yapılmalı?',
    answer:
      'Operasyon yoğunluğuna göre değişir; genel öneri mutfak ve depo hijyen denetiminin aylık periyotlarda yapılmasıdır. Risk bazlı özel plan çıkartıyor, dijital panel üzerinden geçmiş denetimlerle gelişim ivmenizi takip edebiliyorsunuz.',
  },
  {
    question: 'Tedarikçi denetimi zorunlu mu?',
    answer:
      'Regülatif zorunluluk değildir, ancak ISO 22000 ve benzeri sistemlerde tedarikçi değerlendirmesi şarttır. Ayrıca misafir güvenliği açısından tedarikçi denetimi en yüksek kaldıraca sahip uygulamalardan biridir.',
  },
];
