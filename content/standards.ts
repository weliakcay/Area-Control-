export type StandardCategory =
  | 'quality' | 'environment' | 'food' | 'safety'
  | 'info' | 'energy' | 'supply' | 'medical' | 'other';

export type Standard = {
  code: string;
  shortCode: string;
  name: string;
  description: string;
  category: StandardCategory;
};

export const standards: Standard[] = [
  {
    code: 'ISO 9001:2015',
    shortCode: '9001',
    name: 'Kalite Yönetim Sistemi',
    description: 'Ürün ve hizmet kalitesinin sistematik yönetimi; süreçlerin iyileştirilmesi ve müşteri memnuniyetinin artırılması.',
    category: 'quality',
  },
  {
    code: 'ISO 14001:2015',
    shortCode: '14001',
    name: 'Çevre Yönetim Sistemi',
    description: 'Çevresel etkilerin sistemli kontrolü ve sürdürülebilirlik yükümlülüklerinin yerine getirilmesi.',
    category: 'environment',
  },
  {
    code: 'ISO 22000:2018',
    shortCode: '22000',
    name: 'Gıda Güvenliği Yönetim Sistemi',
    description: 'Gıda zincirinin her aşamasında güvenliğin sistematik denetimi; otel ve restoran operasyonlarının merkezinde.',
    category: 'food',
  },
  {
    code: 'ISO 45001:2018',
    shortCode: '45001',
    name: 'İş Sağlığı ve Güvenliği',
    description: 'Çalışma ortamında risklerin belirlenmesi, önleyici kontrollerin kurulması ve sürdürülmesi.',
    category: 'safety',
  },
  {
    code: 'ISO 50001:2018',
    shortCode: '50001',
    name: 'Enerji Yönetim Sistemi',
    description: 'Enerji performansının izlenmesi, verimliliğin artırılması ve maliyet kontrolü.',
    category: 'energy',
  },
  {
    code: 'ISO/IEC 27001:2022',
    shortCode: '27001',
    name: 'Bilgi Güvenliği Yönetim Sistemi',
    description: 'Bilgi varlıklarının gizlilik, bütünlük ve erişilebilirlik kontrol altında tutulması.',
    category: 'info',
  },
  {
    code: 'ISO 10002:2018',
    shortCode: '10002',
    name: 'Müşteri Memnuniyeti Yönetim Sistemi',
    description: 'Şikayet yönetimi, geri bildirim süreçleri ve müşteri deneyiminin sistemli iyileştirilmesi.',
    category: 'quality',
  },
  {
    code: 'ISO 13485:2016',
    shortCode: '13485',
    name: 'Tıbbi Cihaz Kalite Yönetim Sistemi',
    description: 'Tıbbi cihaz üretiminin ve tedarikinin regülatif uyumla yönetilmesi.',
    category: 'medical',
  },
  {
    code: 'ISO/IEC 20000-1:2011',
    shortCode: '20000-1',
    name: 'Bilgi Teknolojileri Hizmet Yönetim Sistemi',
    description: 'IT hizmetlerinin sistemli yönetimi, hizmet seviyelerinin sürekliliği.',
    category: 'info',
  },
  {
    code: 'ISO 22301:2019',
    shortCode: '22301',
    name: 'İş Sürekliliği Yönetim Sistemi',
    description: 'Olağandışı durumlarda operasyonel sürekliliğin güvence altına alınması.',
    category: 'safety',
  },
  {
    code: 'ISO 31000:2018',
    shortCode: '31000',
    name: 'Risk Yönetim Sistemi',
    description: 'Kurumsal risklerin sistematik tanımlanması, değerlendirilmesi ve kontrolü.',
    category: 'safety',
  },
  {
    code: 'ISO 28000:2007',
    shortCode: '28000',
    name: 'Tedarik Zinciri Güvenlik Sistemi',
    description: 'Tedarik zinciri boyunca güvenlik risklerinin yönetilmesi ve izlenmesi.',
    category: 'supply',
  },
  {
    code: 'ISO/IEC 27701:2019',
    shortCode: '27701',
    name: 'Kişisel Veri Gizliliği Yönetim Sistemi',
    description: 'KVKK/GDPR uyumu için kişisel veri işleme süreçlerinin sistematik yönetimi.',
    category: 'info',
  },
  {
    code: 'ISO 14064-1',
    shortCode: '14064',
    name: 'Karbon Ayak İzi Doğrulama',
    description: 'Sera gazı emisyonlarının ölçümü, raporlanması ve azaltım hedeflerinin doğrulanması.',
    category: 'environment',
  },
  {
    code: 'GMP',
    shortCode: 'GMP',
    name: 'İyi Üretim Uygulamaları',
    description: 'Üretim proseslerinin hijyen ve kalite standartlarına uygun yürütülmesi.',
    category: 'food',
  },
  {
    code: 'Helal Belgelendirme',
    shortCode: 'Helal',
    name: 'Helal Gıda Belgelendirme',
    description: 'Helal gereklilikler doğrultusunda gıda ve hizmet süreçlerinin belgelendirilmesi.',
    category: 'food',
  },
];
