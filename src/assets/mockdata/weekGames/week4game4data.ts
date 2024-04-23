export type Week4Game4Question1 = {
  title: string;
  information: string;
  question: string;
};

export type Week4Game4Question2 = {
  question: string;
  options: string[];
  correct: string;
};

export const questions: Week4Game4Question1[] = [
  {
    title: "ZİHİN OKUMA",
    information:
      "İnsanlar bazen başkalarının kendileri hakkında olumsuz düşündüklerini düşünürler. Bu olumsuz düşünceleri kişilerde duymasalar da ya da herhangi bir durum yaşamasalar da düşünebiliriz. Buna zihin okuma diyoruz.",

    question:
      "Örneğin, Ayşe arkadaşlarıyla konuşurken ortamın sessizleşmesinden sonra “Ne oldu, neden sessizleştiniz?” sorusuna “İyiyiz ya sorun yok” cevabını alsa da kendisiyle ilgili olumsuz bir şeyler düşündüklerini düşünür.",
  },
  {
    title: "FELAKETLEŞTİRME",
    information:
      "İnsanlar gelecekle ilgili olumsuz tahminlerde bulunabilir. Eğer bu tahminlerle ilgili elde yeterli kanıt yoksa buna felaketleştirme denir. ",

    question:
      "Örneğin, Ali bir dersten beklediğinden daha düşük puan alır. Sınavlarının kötü gideceğini hatta okul başarısıyla ilgili problemler yaşayacağına dair tahminlerde bulunmaya başlar. Ya da Gamze nişanlısından yeni ayrılmıştır. Gelecekte iyi bir ilişkisi olamayacağını ve doğru insanı bulmayacağını düşünür.",
  },
  {
    title: "HEP YA DA HİÇ TARZI DÜŞÜNME",
    information:
      "Bazen bir şeyleri değerlendirirken ve düşünürken “iyi ya da kötü” gibi “ya – ya da” şeklinde değerlendirebiliriz.",

    question:
      "Örneğin, “sınavlarda ya iyi not alırım ya kötü not alırım”. İyi defterimdesindir ya da değilsindir gibi siyah ya da beyaz şeklinde olaylara yaklaşabiliriz. Buna hep ya da hiç tarzı düşünme diyoruz.",
  },
  {
    title: "DUYGUDAN SONUÇ ÇIKARMA",
    information:
      "Bazen bazı şeyler bize öyle hissettiriyor diye onun doğru olduğunu düşünürüz. ",

    question:
      "Örneğin, sınavdan düşük not aldığım için yetersiz ve başarısız hissediyorum. “Yetersiz biriyim” düşüncesini gerçeklik olarak kabul eder ve buna inanır. Ya da arkadaşlarımın bana haber vermeden buluştuğunu öğrendiğimde reddedilmiş hissederim ve reddedildiğime inanırım. Bunu duygudan sonuç çıkarma diye adlandırırız.",
  },
  {
    title: "ETİKETLEME",
    information:
      "Bazen kendimizi ve başkalarını belirli şekilde etiketleyebiliriz. Özellikle bunlar olumsuz içeriklerden oluşuyorsa buna etiketleme deriz.",

    question:
      "Örneğin, sınıfta el kaldırıp yanlış cevap verdiğimde “aptal birisin, başarısızsın” diyerek kendimi etiketleyebilirim. Ya da dış görünüşümle ilgili kendime “çirkinsin, şişkosun” deyip yorumlarda bulunabilirim. Bunlara etiketleme diyoruz.",
  },
  {
    title: "ZİHİNSEL FİLTRELEME",
    information:
      "Bazen olayları düşünce filtremizden geçiririz. Olumlu ve olumsuz bilgiler olsa da bu filtreden sadece olumsuz olanları geçiririz.",

    question:
      "Örneğin, arkadaşlarınla keyifli geçirdiğin günün ardından otobüs kaçırıp eve geç kalmışsındır. “ne berbat bir gündü ama! Saat 9’da eve geldim, çok yoruldum” dediğimizde arkadaşlarımızla geçirdiğimiz keyifli vakti görmezden gelip sadece otobüsü kaçırmamıza odaklanabiliriz. Ya da Birçok sınavının iyi geçmesine rağmen hasta olup girdiğin sınavdan düşük aldıktan sonra “finallerim istediğim gibi gitmedi, son sınavım çok kötü geçti. Kötü bir final dönemiydi” diye düşünebiliriz. Ama burada sadece tek olumsuz geçen finalimize odaklanarak yanıtlamışızdır. Buna Zihinsel Filtreleme deriz.",
  },
  {
    title: "Aşırı Genelleme",
    information:
      "Bazen yaşadığımız durumları hayatımızın diğer alanlarına ya da başka zamanlara genelleyebiliriz.",

    question:
      "Örneğin, kötü geçen sınav sonrası” hep başarısız olacağım” ya da yaşadığım ayrılık sonrası “hep kötü insanlarla karşılaşacağım” gibi düşünceler zihnimizden geçebilir. Buna Genelleme diyoruz.",
  },
  {
    title: "KİŞİSELLEŞTİRME",
    information:
      "Bazen yaşadığımız olayları kendimizle ilişkilendirerek bizden kaynaklı olduğunu düşünürüz.",

    question:
      "Örneğin, arkadaşım telefonu açmadığında “kesin bir şey yaptım ve bana alındı” ya da patronumuz işte çıkan bir sorundan dolayı öfkeliyken “kesin ben bir şey yaptım ve benden dolayı böyle” gibi düşünebiliriz. Buna kişiselleştirme deriz.",
  },
  {
    title: "MELİ, MALI İFADELERİ",
    information:
      "Bazen hayatta kendimize belirlediğimiz ve olması gereken standartlarla bir şeyleri değerlendiririz. ",
    question:
      "Örneğin, “Kibar davranmalıyım, ödevlerimi her zaman zamanında yetiştirmeliyim, insanlar şu şekilde davranmalı, bu şekilde hareket edilmeli” gibi. Buna meli-malı ifadeleri ile düşünmek diyoruz.",
  },
  {
    title: "OLUMLUYU KÜÇÜLTME YA DA YOK SAYMA",
    information:
      "Bazen yaşadığımız olaylarda olan olumlu şeyleri görmezden geliriz ya da çok az değerlendirmeye alırız. Buna olumluyu küçültme ya da yok sayma diyoruz.",
    question:
      "Örneğin, bir şeyi başardığımızda “aslında bu şansa bağlıydı, ben pek bir şey yapmadım” diyebiliriz. Ya da arkadaşlarımızın iltifatlarını “sadece abartıyorlar” ya da “arkadaşım oldukları için böyle söylüyorlar” gibi yorumlar yapabiliriz.",
  },
];

export const questions2 = [
  {
    title:
      "Hangi düşünce örneği 'Her şey kötüye gidecek' 'Bu sınavı kazanamayacağım' 'İyi bir ilişkim olmayacak' gibi düşünceleri ifade eder?",
    options: [
      "Zihin okuma",
      "Etiketleme",
      "Meli-malı ifadeleri",
      "Felaketleştirme",
    ],
    correct: "d- Felaketleştirme",
  },
  {
    title:
      "'Çok tembelim' 'Başarısız ve yetersiz biriyim' 'Kendimi çok değersiz görüyorum' gibi düşünceler hangi düşünce özelliğine örnektir?",
    options: [
      "Zihin okuma",
      "Etiketleme",
      "Meli-malı ifadeleri",
      "Zihinsel filtreleme",
    ],
    correct: "b- Etiketleme",
  },
  {
    title:
      "'Aptal olduğumu düşünecekler' 'İnsanlar beni yargılayıp alay ediyorlar kesin' gibi düşünceler hangi düşünce özelliğine örnektir?",
    options: [
      "Zihin okuma",
      "Hep ya da Hiç",
      "Meli-malı ifadeleri",
      "Zihinsel filtreleme",
    ],
    correct: "a- Zihin okuma",
  },
  {
    title:
      "'Ya bu dersi bitiririm ya da bakmam' 'ya başarılı olurum ya hiç olmam' 'Hep bu şekilde oluyor, benim başıma geliyor' gibi düşünceler hangi düşünce özelliğine örnektir?",
    options: [
      "Zihin okuma",
      "Hep ya da Hiç Tarzı",
      "Olumluyu Küçültme ya da Yok sayma",
      "Felaketleştirme",
    ],
    correct: "b- Hep ya da Hiç Tarzı",
  },
  {
    title:
      "'Her şeyi mahvettim, her dersim bu şekilde kötüleşmeye devam edecek' 'Hayatımdaki her şey kötü zaten' gibi düşünceler hangi düşünce özelliğine örnektir?",
    options: [
      "Zihin okuma",
      "Aşırı Genelleme",
      "Meli malı İfadeleri",
      "Etiketleme",
    ],
    correct: "b- Aşırı Genelleme",
  },
];

export const questions3 = [
  "Ben başarısız biriyim",
  "Ondan daha çirkinim",
  "İhtiyacı olan bir arkadaşıma hayır dedim",
  "İhtiyacı olan bir arkadaşım bana hayır dedi",
  "Her şeyde berbatım",
  "Eşime bağırdım",
  "Hiçbir şeyi doğru yapamıyorum",
  "Bana incitici şeyler söyledi",
  "Beni incitmek umurunda değildi",
  "Bu tam bir felaket olacak",
  "Ben kötü bir insanım",
  "Pişman olduğum şeyler söyledim",
  "Ben ondan daha kısayım",
  "Ben sevilebilir biri değilim",
  "Bencil ve umursamazım",
  "Herkes benden çok daha iyi bir insan",
  "Hiç kimse beni sevemez",
  "Boyuma göre fazla kiloluyum",
  "Geceyi mahvettim",
  "Geceyi mahvettim",
  "Sınavımda başarısız oldum",
];
