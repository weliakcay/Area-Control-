export type ServiceSlug = 'sistem-belgelendirme' | 'tedarikci-denetimi' | 'hijyen-denetimi';

export type ScopeBlock = {
  title: string;
  intro?: string;
  items: string[];
};

export type Service = {
  slug: ServiceSlug;
  number: '01' | '02' | '03';
  title: string;
  tagline: string;
  teaserBenefit: string;
  summary: string;
  heroIntro: string;
  scope: string[];
  scopeBlocks?: ScopeBlock[];
  benefits: string[];
  pullQuote: string;
  relatedStandards: string[];
};

export const services: Service[] = [
  {
    slug: 'sistem-belgelendirme',
    number: '01',
    title: 'Sistem Uygunluk Değerlendirmesi',
    tagline: 'İşinizi uluslararası standartlarla değerlendirin.',
    teaserBenefit: 'ISO 9001\'den 22000\'e 8 farklı yönetim sistemi standardında uygunluk değerlendirmesi.',
    summary:
      'ISO 9001\'den 22000\'e, uluslararası geçerliliği olan sistem uygunluk değerlendirmesi; süreçlerinizin kalitesini ve yönetim disiplininizi resmi onayla taçlandırıyoruz.',
    heroIntro:
      'Uygunluk değerlendirmesi, sadece bir sertifika sahibi olmak değil; işletmenizin yönetim biçimini ve operasyonel kalitesini uluslararası geçerliliği olan bir dille dünyaya anlatmasıdır. Karmaşık süreçleri rehberliğimizle sadeleştiriyor, başarılarınızı resmi bir onaya dönüştürüyoruz.',
    scope: [
      'Ön analiz: mevcut sisteminizin standart gerekliliklerine uyum düzeyinin tespiti',
      'Stratejik planlama: iş akışınızı aksatmayacak saha denetim takvimi',
      'Saha denetimi: uzman denetçilerle süreçlerin yerinde incelenmesi ve raporlanması',
      'Uygunluk değerlendirme raporu ve sonuç belgesinin teslimi',
      'Yıllık gözetim denetimleri ve 3 yıllık yenileme döngüsü',
      'ISO 20400 Rehberliğinde Sürdürülebilir Satın Alma Değerlendirmesi',
      'Adil Ticaret ve Etik Tedarik Değerlendirmesi',
    ],
    benefits: [
      'Pazara giriş ve prestij: ihracat ve büyük ihalelerde küresel öncelik',
      'Sürdürülebilir güven: müşterilerinize "süreçlerim kontrol altında ve kalitem süreklidir" mesajı',
      'Maliyet ve risk yönetimi: hatalar minimize, verimlilik artar, operasyonel maliyet düşer',
      'Yasal uyumluluk: güncel regülasyonlara ve sektörel şartlara tam uyum',
    ],
    pullQuote:
      'Sertifikasyon bir yük değil, daha verimli ve karlı bir işletme olmanın yol haritasıdır. Geleceğinizi bugünden değerlendirin.',
    relatedStandards: ['9001', '14001', '22000', '45001', '50001', '46001', '10002', '26000'],
  },
  {
    slug: 'tedarikci-denetimi',
    number: '02',
    title: 'Tedarikçi Denetimi',
    tagline: 'Tedarikçiniz, sizin dışarıdaki imzanızdır.',
    teaserBenefit: 'Evrak değil sahada inceleme: teknik, etik ve çevresel uyumun yerinde belgelenmesi.',
    summary:
      'Tedarik zincirinizin her halkasını sahada denetler; iş ortaklarınızın sizin standartlarınıza, etik değerlerinize ve sürdürülebilirlik beklentilerinize uyumunu belgeleriz.',
    heroIntro:
      'Günümüzün karmaşık ticaret ağında başarınız, sadece kendi performansınıza değil; tedarikçilerinizin standartlarına ve yarınlara ne bıraktığına bağlıdır. Tedarik zincirinizin her halkasını titizlikle analiz ediyor; iş ortaklarınızın beklentilerinize, etik değerlerinize ve dünya standartlarına uyumunu sahada belgeliyoruz.',
    scope: [
      'Planlama: hedeflerinize, kalite kriterlerinize ve gelecek vizyonunuza uygun denetim takvimi',
      'Saha denetimi: tedarikçi tesislerinde teknik, etik ve çevresel yerinde inceleme',
      'Raporlama: bulgular, iyileştirme alanları ve gelişim fırsatlarının şeffaf analiz raporu',
      'Takip: düzeltici faaliyetlerin ve gelişim sürecinin izlenmesi',
      'Yıllık periyodik tedarikçi değerlendirmesi',
    ],
    benefits: [
      'Güçlü risk yönetimi: finansal, operasyonel ve hukuki riskleri oluşmadan tespit',
      'Kesintisiz ve kalıcı üretim: süreklilik ve ürün kalitesinin standart uyumu garanti altında',
      'Doğaya ve insana saygı: çevre, etik çalışma koşulları ve iş güvenliği denetimiyle marka koruması',
      'Geleceğe hazırlık: kaynakları verimli kullanan, sorumluluk alan tedarik zinciri',
      'Maliyet optimizasyonu: hatalı üretimi azaltıp süreç verimliliğini artırarak gizli maliyetleri kaldırır',
    ],
    pullQuote:
      'Tedarikçiniz, sizin dışarıdaki imzanızdır. Bu imzanın hem kusursuz hem de kalıcı olduğundan emin olun.',
    relatedStandards: ['9001', '14001', '28000', '45001', '26000', '31000'],
  },
  {
    slug: 'hijyen-denetimi',
    number: '03',
    title: 'Hijyen ve Saha Denetimi',
    tagline: 'Akıllı raporlama ile maksimum güven.',
    teaserBenefit: 'Görsel kanıtlı, puanlı raporlama ve dijital panel üzerinden anlık erişim.',
    summary:
      'Mutfak, depo ve üretim alanları — tarafsız bir uzman bakışıyla hijyen ve operasyonel risklerinizi sizden önce tespit eder, akıllı raporlamayla markanızı güvence altına alırız.',
    heroIntro:
      'İşletmenizde yüksek standartları belirlemek bir başlangıçtır; bu standartları her gün aynı titizlikle korumak gerçek bir uzmanlık işidir. Tarafsız bir uzman bakışıyla sahadaki riske odaklanarak "işletme körlüğünü" ortadan kaldırıyor; geleneksel denetim anlayışını dijital altyapı ve akıllı raporlama ile birleştiriyoruz.',
    scope: [
      'Hijyen ve gıda güvenliği: hammadde girişinden sunum aşamasına kadar mutfak, depo ve üretim alanlarının yerinde incelenmesi',
      'Operasyonel risk analizi: personel hijyeni, çapraz kontaminasyon riskleri ve soğuk zincir takibi',
      'Kurumsal standart kontrolü: firmaya özel operasyonel kuralların sahadaki karşılığının ölçülmesi ve genel bakım durumunun raporlanması',
      'Önleyici yaklaşım: müşteri şikayetlerini ve resmi denetim uygunsuzluklarını oluşmadan engelleyen proaktif çözümler',
      'Görsel kanıtlı ve puanlı raporlama: her bulgunun fotoğrafla belgelenmesi, performansın net puanla ölçülmesi',
      'Tekrar eden uygunsuzluk analizi: kronikleşen hataların otomatik tespiti',
      'Trend ve kıyaslama (benchmarking): aylık periyotlarda şubeler arası performans karşılaştırması',
      'Anlık erişim: dijital panel üzerinden geçmiş denetimlerle gelişim ivmesinin grafiklerle takibi',
    ],
    scopeBlocks: [
      {
        title: 'Profesyonel Denetim ve Hijyen Odaklı Çözümler',
        intro:
          'Denetimlerimizde sadece evrak takibi yapmıyor, doğrudan sahadaki riske odaklanarak "işletme körlüğünü" ortadan kaldırıyoruz.',
        items: [
          'Hijyen ve Gıda Güvenliği: hammadde girişinden sunum aşamasına kadar mutfak, depo ve üretim alanlarının profesyonel ekiplerce yerinde incelenmesi',
          'Operasyonel Risk Analizi: personel hijyeni, çapraz kontaminasyon riskleri ve soğuk zincir takibi gibi kritik noktaların titizlikle denetlenmesi',
          'Kurumsal Standart Kontrolü: firmanıza özel operasyonel kuralların sahada ne kadar karşılık bulduğunun ölçülmesi ve tesisin genel bakım durumunun raporlanması',
          'Önleyici Yaklaşım: müşteri şikayetlerini ve resmi denetim uygunsuzluklarını henüz oluşmadan engelleyen proaktif çözümler',
        ],
      },
      {
        title: 'Dijital Altyapı ve Akıllı Raporlama Sistemi',
        intro:
          'Geleneksel denetim anlayışını, operasyonel performansınızı şeffaf ve ölçülebilir kılan modern yazılım çözümlerimizle birleştiriyoruz.',
        items: [
          'Görsel Kanıtlı ve Puanlı Raporlama: tespit edilen her bulguyu fotoğraflarla belgeliyor, işletme performansını net puanlarla ölçüyoruz',
          'Tekrar Eden Uygunsuzluk Analizi: hangi hataların kronikleştiğini sistemimiz otomatik analiz eder; gelişim alanlarını rakamlarla görürsünüz',
          'Trend ve Kıyaslama (Benchmarking): aylık periyotlarda hangi birimlerin gelişim gösterdiğini takip eder, şubeler arası kıyaslama yaparsınız',
          'Anlık Erişim: raporlarınıza dijital panel üzerinden dilediğiniz an ulaşır, geçmiş denetimlerle gelişim ivmesini grafiklerle izlersiniz',
        ],
      },
    ],
    benefits: [
      'Sahadaki risklerin "işletme körlüğüne" girmeden erken tespiti',
      'Operasyonel performansın şeffaf ve ölçülebilir kılınması',
      'Müşteri şikayetlerinde belgeye dayalı savunma',
      'Şubeler arası kıyaslama ile sürdürülebilir gelişim ivmesi',
      'Resmi denetim uygunsuzluklarına karşı proaktif hazırlık',
    ],
    pullQuote:
      'Ölçemediğiniz süreci yönetemezsiniz. Dijital altyapımızla hijyen standartlarınızı veriye dayalı bir başarı hikâyesine dönüştürüyoruz.',
    relatedStandards: ['22000', '9001', '45001', 'GMP'],
  },
];
