export type ServiceSlug = 'sistem-belgelendirme' | 'tedarikci-denetimi' | 'hijyen-gida-su';

export type Service = {
  slug: ServiceSlug;
  number: '01' | '02' | '03';
  title: string;
  tagline: string;
  summary: string;
  heroIntro: string;
  scope: string[];
  benefits: string[];
  relatedStandards: string[];
};

export const services: Service[] = [
  {
    slug: 'sistem-belgelendirme',
    number: '01',
    title: 'Sistem Belgelendirme',
    tagline: 'Operasyonunuzun her katmanı için akredite belgelendirme.',
    summary: 'ISO 9001\'den 22000\'e, uluslararası standartlarda sistemlerinizi belgelendirir; sürdürülebilir uyum kazandırırız.',
    heroIntro:
      'Sistem belgelendirme, kurumunuzun süreçlerini uluslararası bir disipline bağlamaktır. Kalite, gıda güvenliği, çevre, iş sağlığı ve bilgi güvenliği başta olmak üzere 16 farklı yönetim sistemi standardında TÜRKAK akrediteli belgelendirme hizmeti sunuyoruz.',
    scope: [
      'Kapsam tespiti ve standart seçimi danışmanlığı',
      'Boşluk analizi ve ön denetim',
      'Belgelendirme denetimi (Evre 1 & Evre 2)',
      'Belge düzenleme ve yıllık gözetim denetimleri',
      'Yenileme denetimleri (3 yıllık döngü)',
    ],
    benefits: [
      'Uluslararası tanınırlık ve ihracat pazarında rekabet avantajı',
      'Operasyonel verimlilik ve risk yönetimi',
      'Müşteri ve tedarikçi nezdinde güven',
      'Regülatif uyumun belgelenmesi',
    ],
    relatedStandards: ['9001', '14001', '22000', '45001', '27001', '50001', '10002', '22301', '28000', '31000'],
  },
  {
    slug: 'tedarikci-denetimi',
    number: '02',
    title: 'Tedarikçi Denetimi',
    tagline: 'Mal girdiğiniz kapıdan başlayan denetim.',
    summary: 'Tedarikçilerinizi sahada denetler, risklerini görünür kılar; operasyon kalitesini kaynağında güvence altına alırız.',
    heroIntro:
      'Tedarikçi denetimi, mal ve hizmet aldığınız firmaların sizin standartlarınızla uyumunu doğrular. Otel ve restoran operasyonlarında girdi kalitesi, misafir deneyiminin sessiz garantörüdür.',
    scope: [
      'Tedarikçi risk sınıflandırması ve önceliklendirme',
      'Saha denetimi (GMP, hijyen, kalite)',
      'Dokümantasyon ve izlenebilirlik kontrolü',
      'Denetim raporu ve düzeltici faaliyet takibi',
      'Yıllık periyodik tedarikçi değerlendirmesi',
    ],
    benefits: [
      'Tedarik zincirinde öngörülebilirlik',
      'Girdi kaynaklı şikayetlerin azalması',
      'Regülasyon denetimlerinde hazır dokümantasyon',
      'Tedarikçi performansının ölçülebilirliği',
    ],
    relatedStandards: ['28000', '22000', 'GMP'],
  },
  {
    slug: 'hijyen-gida-su',
    number: '03',
    title: 'Hijyen, Gıda & Su Denetimi',
    tagline: 'Misafirinizin güvenli deneyimi için saha denetimi ve laboratuvar analizi.',
    summary: 'Mutfak, büfe, havuz, depo — operasyonun tüm temas noktalarında hijyen denetimi ve akredite laboratuvar analizi.',
    heroIntro:
      'Hijyen ve gıda güvenliği, otel ve restoran itibarının gözle görülmeyen ama her an fark edilen boyutudur. Sahada denetim ve laboratuvar analizini birleştirerek hem önlem hem belge üretiyoruz.',
    scope: [
      'Mutfak ve büfe hijyen denetimi (ATP, sürüntü testleri)',
      'Gıda mikrobiyolojik ve kimyasal analizi',
      'İçme suyu, kullanma suyu ve havuz suyu analizi',
      'Pestisit kalıntı analizi',
      'Helal gıda uygunluk kontrolü',
      'Legionella ve su sistemleri değerlendirmesi',
    ],
    benefits: [
      'Gıda kaynaklı risklerin erken tespiti',
      'Regülasyonlara (Tarım Bakanlığı, İl Sağlık) uyum',
      'Misafir şikayetlerinde belgeye dayalı savunma',
      'Operasyon ekibinin süreklilik kültürü',
    ],
    relatedStandards: ['22000', 'GMP', 'Helal'],
  },
];
