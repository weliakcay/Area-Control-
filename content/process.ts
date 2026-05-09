export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Teklif ve Kapsam Tespiti',
    description: 'Operasyonunuzu birlikte inceleriz; hedeflenen standart, kapsam ve zaman çizelgesi belirlenir. Şeffaf teklif hazırlarız.',
  },
  {
    number: '02',
    title: 'Ön Denetim',
    description: 'Hazırlık düzeyinizi değerlendirir, boşluk analizini raporlarız. Uygunluk değerlendirmesine girmeden önce eksikler netleşir.',
  },
  {
    number: '03',
    title: 'Uygunluk Değerlendirme Denetimi',
    description: 'Bağımsız denetçi sahada kapsamlı kontrol gerçekleştirir; uyum kanıtlanır, belge düzenlenir.',
  },
  {
    number: '04',
    title: 'Yıllık Gözetim',
    description: 'Belge geçerliliği boyunca yıllık takip denetimleri ile sistemin sürekliliği doğrulanır.',
  },
];
