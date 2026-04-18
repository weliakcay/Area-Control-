export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: 'Belgelendirme süreci ne kadar sürüyor?',
    answer:
      'Standarda ve işletme büyüklüğüne göre değişmekle birlikte, ön denetimden belgelendirmeye tipik süreç 6-12 haftadır. Hazırlık düzeyiniz yüksekse daha hızlı tamamlanabilir; kapsamlı eksikler varsa düzeltme için ek süre gerekebilir.',
  },
  {
    question: 'Hangi akreditasyon kurumu üzerinden belgelendirme yapıyorsunuz?',
    answer:
      'Sistem belgelendirme hizmetlerimizi SigmaCert ortaklığı üzerinden TÜRKAK akreditasyonu ile sunuyoruz. Helal belgelendirmede HAK akreditasyonu kullanılmaktadır.',
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
      'Evet. Odak alanımız otel ve restoran olsa da, gıda üretim tesisleri, sağlık kuruluşları, üretim firmaları ve hizmet sektöründe yer alan işletmelere de belgelendirme ve denetim hizmeti sunuyoruz.',
  },
  {
    question: 'Hijyen analizi ne sıklıkta yapılmalı?',
    answer:
      'Operasyon yoğunluğuna göre değişir; genel öneri mutfak ve büfe hijyen denetiminin aylık, su analizlerinin en az üç aylık, Legionella kontrolünün yıllık periyotlarda yapılmasıdır. Risk bazlı özel plan çıkartıyoruz.',
  },
  {
    question: 'Tedarikçi denetimi zorunlu mu?',
    answer:
      'Regülatif zorunluluk değildir, ancak ISO 22000 ve benzeri sistemlerde tedarikçi değerlendirmesi şarttır. Ayrıca misafir güvenliği açısından tedarikçi denetimi en yüksek kaldıraca sahip uygulamalardan biridir.',
  },
];
