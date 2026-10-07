import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = 'https://160218tt-sys.github.io/gau-ai-systems';
const facebook = 'https://www.facebook.com/profile.php?id=61594403747265';
const checked = '2026-10-07';

const routes = [
  { slug: 'en', hreflang: 'en', lang: 'en', locale: 'en_US', market: 'Global English',
    title: 'OpenClaw setup help — local-only, scoped and independent',
    description: 'Independent OpenClaw setup interest page: 500.000 VND per eligible machine, local-only Gateway, customer-held secrets, precheck required.',
    eyebrow: 'Independent remote setup · global English', h1: 'Set up OpenClaw. Keep control.',
    lead: 'A bounded core setup for one eligible machine: local-only Gateway, one customer-owned model account, one safe test task and a clear handoff.',
    readiness: 'Survey and interest only — no payment or confirmed scheduling',
    availability: 'Remote eligibility depends on operating system, administrator access, network conditions, time zone and a precheck. No local office or physical presence is claimed.',
    scopeTitle: 'What the 500.000 VND core scope is intended to include',
    scope: ['One eligible machine and one primary operator','Gateway bound locally by default','One AI model using the customer’s own account','One safe test task and a 15-minute handoff','Customer enters and retains passwords, OTPs, API keys and tokens'],
    exclusions: 'Model/API fees, cloud services, channel integrations, VPS, multi-user access, data migration, operating-system repair and custom automation are separate. Third-party costs are paid by the customer.',
    intentTitle: 'Common questions before assisted installation',
    intent: ['Can OpenClaw run locally on my computer?','What operating systems and administrator access are required?','How do I keep API keys and other secrets under my control?','What is included in a one-machine OpenClaw setup?'],
    faq: [['Is this service available now?','This page only accepts interest and survey requests. It does not confirm a booking, paid beta or delivery readiness.'],['Do I send credentials?','No. Never send passwords, OTPs, API keys, tokens or recovery codes. The customer enters and retains all secrets.'],['Is Gấu AI Systems part of OpenClaw?','No. Gấu AI Systems is an independent service provider and is not sponsored, certified or endorsed by OpenClaw.']]},
  { slug: 'in', hreflang: 'en-IN', lang: 'en-IN', locale: 'en_IN', market: 'India',
    title: 'OpenClaw installation help in India — eligibility first',
    description: 'India interest page for a scoped 500.000 VND OpenClaw core setup: one eligible computer, local-only Gateway, customer-held secrets and precheck.',
    eyebrow: 'Remote eligibility · India', h1: 'OpenClaw setup help for an eligible computer in India.',
    lead: 'A conservative, remote-first setup scope for one eligible machine. Availability depends on OS, admin access, network, time zone and a precheck.',
    readiness: 'Interest survey only — no payment, booking or paid-beta confirmation',
    availability: 'No Indian office, legal entity, tax registration, local phone support or onsite service is claimed. Currency, tax, invoice, cancellation and refund terms require review before any transaction.',
    scopeTitle: 'Proposed 500.000 VND core installation scope',
    scope: ['One eligible Windows, macOS or Linux machine after precheck','Local-only Gateway by default','One customer-owned model account','One safe test task and handoff notes','Customer enters every password, OTP, API key and token'],
    exclusions: 'Third-party model/API fees are separate. VPS, internet exposure, multi-user access, chat channels, sensitive data and custom automation require separate qualification.',
    intentTitle: 'India search-intent topics this page answers',
    intent: ['OpenClaw installation requirements','OpenClaw setup on Windows or a personal computer','Local AI assistant and local Gateway basics','Safe API-key handling and customer-controlled accounts'],
    faq: [['Can I book now?','No. This is a survey/interest page only; scheduling and payment remain blocked by readiness and policy gates.'],['Does local-only mean all data stays on the machine?','No. The Gateway is local by default, but data sent to a model or integration follows that provider’s data flow and policy.'],['Is support available in every Indian time zone?','Not confirmed. Time-zone fit and operator availability are checked during precheck.']]},
  { slug: 'sg', hreflang: 'en-SG', lang: 'en-SG', locale: 'en_SG', market: 'Singapore',
    title: 'OpenClaw setup help in Singapore — scoped and local-only',
    description: 'Singapore interest page for independent OpenClaw setup: 500.000 VND per eligible machine, local-only Gateway, client-held secrets and precheck.',
    eyebrow: 'Remote eligibility · Singapore', h1: 'A clear OpenClaw setup scope for Singapore.',
    lead: 'One eligible machine, a local-only Gateway, one customer-owned model account, one safe test task and a documented handoff.',
    readiness: 'Survey and interest only — no payment or confirmed scheduling',
    availability: 'No Singapore office, entity, GST registration, local address, phone support or onsite presence is claimed. Remote eligibility depends on OS, network, time zone and precheck.',
    scopeTitle: 'Proposed 500.000 VND core setup',
    scope: ['One eligible machine and one primary operator','Gateway kept local by default','One model account controlled by the customer','One safe test task and 15-minute handoff','Customer retains and enters all secrets'],
    exclusions: 'Model/API and other third-party fees are separate. Custom workflows, regulated data, VPS, exposed Gateway, multiple users and messaging channels require separate review.',
    intentTitle: 'Questions Singapore SMEs often need answered first',
    intent: ['What does an OpenClaw installation service include?','Can the Gateway stay local on one computer?','Who controls model accounts and API keys?','Which setups need a custom security review?'],
    faq: [['Is this a confirmed Singapore service launch?','No. It is an interest and eligibility page, not a paid-beta or delivery announcement.'],['Do you process enquiry data here?','No form or analytics is used on this page. The only external contact link is the verified Facebook Page.'],['Are business automations included?','No. The 500.000 VND scope covers core setup only; workflow or integration work requires separate qualification and pricing.']]},
  { slug: 'id', hreflang: 'id', lang: 'id', locale: 'id_ID', market: 'Indonesia',
    title: 'Bantuan instalasi OpenClaw — lokal, terbatas, dan independen',
    description: 'Halaman minat Indonesia untuk pemasangan inti OpenClaw 500.000 VND per komputer yang memenuhi syarat, Gateway lokal, rahasia tetap dipegang pelanggan.',
    eyebrow: 'Kelayakan jarak jauh · Indonesia', h1: 'Pasang OpenClaw. Kendali tetap di tangan Anda.',
    lead: 'Cakupan inti untuk satu komputer yang memenuhi syarat: Gateway lokal, satu akun model milik pelanggan, satu tugas uji yang aman, dan serah terima yang jelas.',
    readiness: 'Hanya survei minat — belum menerima pembayaran atau mengonfirmasi jadwal',
    availability: 'Kelayakan layanan jarak jauh bergantung pada sistem operasi, akses administrator, jaringan, zona waktu, dan precheck. Kami tidak mengklaim kantor, badan hukum, atau kehadiran fisik di Indonesia.',
    scopeTitle: 'Cakupan inti 500.000 VND yang direncanakan',
    scope: ['Satu komputer yang lolos precheck','Gateway berjalan lokal secara default','Satu akun model AI milik pelanggan','Satu tugas uji aman dan panduan 15 menit','Pelanggan memasukkan dan menyimpan kata sandi, OTP, API key, serta token sendiri'],
    exclusions: 'Biaya model/API dan pihak ketiga dibayar terpisah oleh pelanggan. VPS, akses internet, multi-pengguna, kanal pesan, migrasi data, dan otomatisasi khusus memerlukan penilaian terpisah.',
    intentTitle: 'Pertanyaan sebelum memakai bantuan instalasi',
    intent: ['Bagaimana cara memasang OpenClaw di komputer sendiri?','Apa syarat OS, akses admin, jaringan, dan akun model?','Bagaimana menjaga API key dan rahasia tetap aman?','Apa saja yang termasuk biaya instalasi OpenClaw?'],
    faq: [['Apakah saya dapat memesan sekarang?','Belum. Halaman ini hanya untuk survei minat; pembayaran, jadwal, dan kesiapan beta belum disetujui.'],['Apakah saya harus mengirim API key?','Tidak. Jangan kirim kata sandi, OTP, API key, token, recovery code, atau data pelanggan.'],['Apakah Gấu AI Systems mitra resmi OpenClaw?','Tidak. Gấu AI Systems adalah penyedia independen dan tidak disponsori, disertifikasi, atau didukung oleh OpenClaw.']]},
  { slug: 'ms', hreflang: 'ms', lang: 'ms', locale: 'ms_MY', market: 'Malaysia',
    title: 'Bantuan pemasangan OpenClaw — skop jelas dan setempat',
    description: 'Halaman minat Malaysia untuk pemasangan teras OpenClaw 500.000 VND bagi satu komputer layak, Gateway setempat dan rahsia kekal dengan pelanggan.',
    eyebrow: 'Kelayakan jarak jauh · Malaysia', h1: 'Pasang OpenClaw dengan skop yang jelas.',
    lead: 'Pemasangan teras untuk satu komputer yang layak: Gateway setempat, satu akaun model milik pelanggan, satu tugasan ujian selamat dan penyerahan yang jelas.',
    readiness: 'Tinjauan minat sahaja — belum menerima bayaran atau mengesahkan jadual',
    availability: 'Kelayakan jarak jauh bergantung pada sistem operasi, akses pentadbir, rangkaian, zon waktu dan precheck. Tiada pejabat, entiti, alamat atau kehadiran fizikal Malaysia didakwa.',
    scopeTitle: 'Skop teras 500.000 VND yang dicadangkan',
    scope: ['Satu komputer yang lulus precheck','Gateway setempat secara lalai','Satu akaun model AI milik pelanggan','Satu tugasan ujian selamat dan panduan 15 minit','Pelanggan memasukkan dan menyimpan kata laluan, OTP, API key dan token sendiri'],
    exclusions: 'Yuran model/API dan pihak ketiga dibayar berasingan. VPS, akses Internet, berbilang pengguna, saluran mesej, migrasi data dan automasi khusus perlu dinilai berasingan.',
    intentTitle: 'Soalan sebelum mendapatkan bantuan pemasangan',
    intent: ['Apakah keperluan sistem OpenClaw?','Bolehkah Gateway kekal setempat pada komputer saya?','Siapa mengawal akaun model dan API key?','Apakah yang termasuk dalam harga pemasangan teras?'],
    faq: [['Bolehkah saya membuat tempahan sekarang?','Belum. Halaman ini hanya untuk tinjauan minat; bayaran, jadual dan beta berbayar belum diluluskan.'],['Adakah borang menghantar data?','Tiada borang atau analitik pada halaman ini. Pautan luaran tunggal ialah Facebook Page yang telah disahkan.'],['Adakah automasi perniagaan termasuk?','Tidak. Automasi, integrasi dan saluran komunikasi memerlukan skop serta harga berasingan.']]},
  { slug: 'ja', hreflang: 'ja', lang: 'ja', locale: 'ja_JP', market: 'Japan',
    title: 'OpenClaw導入支援 — ローカル運用・明確な範囲・事前確認',
    description: '日本向け関心調査ページ。対象端末1台につき500,000 VNDのOpenClaw基本導入、ローカルGateway、認証情報はお客様が保持します。',
    eyebrow: 'リモート対応可否 · 日本', h1: 'OpenClawを導入し、管理権限はお客様のまま。',
    lead: '対象端末1台、ローカルGateway、お客様所有のモデルアカウント1つ、安全なテスト1件、明確な引き継ぎに限定した基本範囲です。',
    readiness: '現在は関心・事前調査のみ — 支払い・予約確定は行っていません',
    availability: 'リモート対応可否はOS、管理者権限、ネットワーク、時差、事前確認によります。日本法人、事務所、住所、電話窓口、訪問対応の存在を示すものではありません。',
    scopeTitle: '500,000 VNDの基本導入（予定範囲）',
    scope: ['事前確認を通過した端末1台','Gatewayは標準でローカルのみ','お客様が所有するAIモデルアカウント1つ','安全なテストタスク1件と15分の引き継ぎ','パスワード、OTP、APIキー、トークンはお客様自身が入力・保持'],
    exclusions: 'モデル/APIなど第三者サービスの費用は別途お客様負担です。VPS、外部公開、複数ユーザー、チャネル連携、データ移行、個別自動化は別途確認が必要です。',
    intentTitle: '導入前によく確認されること',
    intent: ['OpenClawのインストール要件','自分のPCでローカル運用できるか','APIキーや認証情報を安全に管理する方法','1台向け基本導入に含まれる内容'],
    faq: [['今すぐ予約できますか？','いいえ。現在は関心・適格性の調査のみで、有料ベータ、支払い、予約は未承認です。'],['認証情報を送る必要がありますか？','ありません。パスワード、OTP、APIキー、トークン、リカバリーコードを送らないでください。'],['OpenClaw公式の認定業者ですか？','いいえ。Gấu AI Systemsは独立した事業者であり、OpenClawのスポンサー、認定、推奨を受けていません。']]},
  { slug: 'ko', hreflang: 'ko', lang: 'ko', locale: 'ko_KR', market: 'South Korea',
    title: 'OpenClaw 설치 지원 — 로컬 운영, 명확한 범위, 사전 확인',
    description: '한국 대상 관심 조사 페이지입니다. 적격 PC 1대당 미화 500,000 VND의 OpenClaw 기본 설치, 로컬 Gateway, 고객 보유 비밀정보 원칙을 안내합니다.',
    eyebrow: '원격 지원 적격성 · 대한민국', h1: 'OpenClaw를 설치하고 통제권은 고객이 유지하세요.',
    lead: '적격 컴퓨터 1대, 로컬 Gateway, 고객 소유 모델 계정 1개, 안전한 테스트 작업 1개와 명확한 인수인계로 범위를 제한합니다.',
    readiness: '현재는 관심·사전 조사만 진행 — 결제 또는 일정 확정 없음',
    availability: '원격 지원 가능 여부는 운영체제, 관리자 권한, 네트워크, 시간대 및 사전 확인에 따라 달라집니다. 한국 사무실, 법인, 주소, 전화 지원 또는 현장 서비스를 주장하지 않습니다.',
    scopeTitle: '미화 500,000 VND 기본 설치 예정 범위',
    scope: ['사전 확인을 통과한 컴퓨터 1대','Gateway는 기본적으로 로컬에서만 실행','고객이 소유한 AI 모델 계정 1개','안전한 테스트 작업 1개와 15분 인수인계','비밀번호, OTP, API 키, 토큰은 고객이 직접 입력하고 보관'],
    exclusions: '모델/API 등 제3자 비용은 고객이 별도 부담합니다. VPS, 인터넷 공개, 다중 사용자, 메시지 채널, 데이터 이전 및 맞춤 자동화는 별도 검토가 필요합니다.',
    intentTitle: '설치 지원 전에 확인할 질문',
    intent: ['OpenClaw 설치 요구사항은 무엇인가요?','내 컴퓨터에서 Gateway를 로컬로 운영할 수 있나요?','API 키와 비밀정보를 어떻게 안전하게 관리하나요?','컴퓨터 1대 기본 설치에는 무엇이 포함되나요?'],
    faq: [['지금 예약할 수 있나요?','아니요. 이 페이지는 관심·적격성 조사만을 위한 것이며 결제, 일정 및 유료 베타는 승인되지 않았습니다.'],['API 키를 보내야 하나요?','아니요. 비밀번호, OTP, API 키, 토큰, 복구 코드를 보내지 마세요.'],['OpenClaw 공식 파트너인가요?','아니요. Gấu AI Systems는 독립 사업자이며 OpenClaw의 후원, 인증 또는 보증을 받지 않았습니다.']]},
  { slug: 'zh-hant', hreflang: 'zh-Hant', lang: 'zh-Hant', locale: 'zh_TW', market: 'Taiwan',
    title: 'OpenClaw 安裝協助 — 本機運作、範圍清楚、先行檢查',
    description: '臺灣意向調查頁：每台符合條件的電腦 500,000 VND，OpenClaw 核心安裝、Gateway 本機運作，密碼與 API 金鑰由客戶自行保管。',
    eyebrow: '遠端資格 · 臺灣', h1: '安裝 OpenClaw，控制權仍由您掌握。',
    lead: '範圍限於一台符合條件的電腦、本機 Gateway、一個客戶自有模型帳戶、一項安全測試與清楚交接。',
    readiness: '目前僅接受意向與事前調查 — 不收款、不確認時段',
    availability: '遠端服務資格取決於作業系統、管理員權限、網路、時區與事前檢查。本頁不聲稱在臺灣設有辦公室、法人、地址、電話客服或到府服務。',
    scopeTitle: '500,000 VND核心安裝預定範圍',
    scope: ['一台通過事前檢查的電腦','Gateway 預設僅在本機運作','一個由客戶持有的 AI 模型帳戶','一項安全測試與 15 分鐘交接','密碼、OTP、API 金鑰與 Token 由客戶自行輸入及保管'],
    exclusions: '模型/API 與其他第三方費用由客戶另行支付。VPS、對外開放、多使用者、訊息管道、資料移轉與客製自動化均需另行評估。',
    intentTitle: '安裝協助前常見問題',
    intent: ['OpenClaw 的系統與管理員權限需求','是否能在自己的電腦上本機運作','如何安全保管 API 金鑰與其他秘密','單機核心安裝包含哪些內容'],
    faq: [['現在可以預約嗎？','不可以。本頁僅供意向與資格調查；付款、排程與付費 beta 尚未核准。'],['需要傳送 API 金鑰嗎？','不需要。請勿傳送密碼、OTP、API 金鑰、Token、復原碼或客戶資料。'],['Gấu AI Systems 是 OpenClaw 官方夥伴嗎？','不是。Gấu AI Systems 為獨立服務提供者，未獲 OpenClaw 贊助、認證或背書。']]},
  { slug: 'zh-hans', hreflang: 'zh-Hans', lang: 'zh-Hans', locale: 'zh_CN', market: 'Mainland China',
    title: 'OpenClaw 安装意向页 — 本机运行、范围明确、先行检查',
    description: '中国大陆意向调查页：每台符合条件的电脑 500,000 VND，OpenClaw 核心安装、Gateway 本机运行，密码和 API 密钥由客户保管。',
    eyebrow: '远程资格尚待确认 · 中国大陆', h1: '了解 OpenClaw 核心安装范围。',
    lead: '拟议范围限于一台符合条件的电脑、本机 Gateway、一个客户自有模型账户、一项安全测试和明确交接。',
    readiness: '目前仅为意向与资格调查 — 不收款、不确认时间',
    availability: '中国大陆的公开可用性尚未确认。远程资格取决于操作系统、管理员权限、网络、时区和事前检查；本页不声称在中国大陆设有办公室、法人、地址、电话支持或现场服务，也不声称可在中国大陆访问或被搜索引擎收录，不声称拥有 ICP 备案或许可。',
    scopeTitle: '500,000 VND核心安装拟议范围',
    scope: ['一台通过事前检查的电脑','Gateway 默认仅在本机运行','一个由客户持有的 AI 模型账户','一项安全测试和 15 分钟交接','密码、OTP、API 密钥和 Token 由客户自行输入并保管'],
    exclusions: '模型/API 与其他第三方费用由客户另行支付。VPS、对外开放、多用户、消息渠道、数据迁移和定制自动化均需另行评估。',
    intentTitle: '安装协助前需要确认的问题',
    intent: ['OpenClaw 的系统与管理员权限要求','是否能在自己的电脑上本机运行','如何安全保管 API 密钥和其他秘密','单机核心安装包含哪些内容'],
    faq: [['现在可以预约吗？','不可以。本页仅用于意向和资格调查；付款、排期及付费 beta 尚未批准。'],['需要发送 API 密钥吗？','不需要。请勿发送密码、OTP、API 密钥、Token、恢复码或客户数据。'],['此页面保证在中国大陆可访问或被百度收录吗？','不保证。本页不作访问、抓取、收录、排名或 ICP 状态承诺。']]}
];

const alternates = [
  ['x-default','en'],['en','en'],['en-IN','in'],['en-SG','sg'],['id','id'],['ms','ms'],['ja','ja'],['ko','ko'],['zh-Hant','zh-hant'],['zh-Hans','zh-hans'],['vi','']
];

const labelSets = {
  default: { independent:'Gấu AI Systems is independent and is not endorsed by OpenClaw.', availability:'Availability', noRank:'No ranking promise.', noRankText:'Publication, indexing and search position are never guaranteed.', fee:'eligible machine', feeNote:'Vietnam core reference price · third-party costs separate', bounded:'Bounded offer', included:'Included after eligibility is confirmed', separate:'Separate or excluded', notGo:'This public page does not mean paid beta or technical readiness is GO.', search:'Search intent, answered conservatively', faq:'FAQ', faqHeading:'Check scope before making contact.', privacy:'Privacy and contact boundary', privacyText:'This static page has no form, account, analytics or payment flow. It does not transmit precheck data. If you choose to make contact, use only the verified Facebook Page and never send passwords, OTPs, API keys, tokens, recovery codes, customer records or other sensitive data.', switcher:'Language / market'},
  id: { independent:'Gấu AI Systems adalah penyedia independen dan tidak didukung atau disertifikasi oleh OpenClaw.', availability:'Ketersediaan', noRank:'Tanpa janji peringkat.', noRankText:'Publikasi, pengindeksan, dan posisi pencarian tidak pernah dijamin.', fee:'komputer yang memenuhi syarat', feeNote:'harga acuan inti Vietnam · biaya pihak ketiga terpisah', bounded:'Penawaran dengan batas jelas', included:'Termasuk setelah kelayakan dikonfirmasi', separate:'Terpisah atau tidak termasuk', notGo:'Halaman publik ini bukan berarti beta berbayar atau kesiapan teknis telah disetujui.', search:'Maksud pencarian, dijawab secara hati-hati', faq:'Tanya jawab', faqHeading:'Periksa cakupan sebelum menghubungi.', privacy:'Batas privasi dan kontak', privacyText:'Halaman statis ini tidak memiliki formulir, akun, analitik, atau alur pembayaran dan tidak mengirim data precheck. Jika Anda memilih untuk menghubungi, gunakan hanya Facebook Page terverifikasi dan jangan kirim rahasia atau data sensitif.', switcher:'Bahasa / pasar'},
  ms: { independent:'Gấu AI Systems ialah penyedia bebas dan tidak ditaja atau diperakui oleh OpenClaw.', availability:'Ketersediaan', noRank:'Tiada janji kedudukan.', noRankText:'Penerbitan, pengindeksan dan kedudukan carian tidak pernah dijamin.', fee:'komputer yang layak', feeNote:'harga rujukan teras Vietnam · kos pihak ketiga berasingan', bounded:'Tawaran dengan batas jelas', included:'Termasuk selepas kelayakan disahkan', separate:'Berasingan atau tidak termasuk', notGo:'Halaman awam ini tidak bermakna beta berbayar atau kesiapsiagaan teknikal telah diluluskan.', search:'Niat carian, dijawab secara berhati-hati', faq:'Soalan lazim', faqHeading:'Semak skop sebelum menghubungi.', privacy:'Batas privasi dan hubungan', privacyText:'Halaman statik ini tiada borang, akaun, analitik atau aliran pembayaran dan tidak menghantar data precheck. Jika anda memilih untuk menghubungi, gunakan Facebook Page yang disahkan sahaja dan jangan hantar rahsia atau data sensitif.', switcher:'Bahasa / pasaran'},
  ja: { independent:'Gấu AI Systemsは独立事業者であり、OpenClawの認定・推奨を受けていません。', availability:'対応可否', noRank:'検索順位の保証はありません。', noRankText:'公開、クロール、インデックス登録、検索順位は保証されません。', fee:'対象端末1台', feeNote:'ベトナム向け基本参考価格 · 第三者費用は別途', bounded:'範囲を限定した提供内容', included:'適格性確認後に含まれるもの', separate:'別途対応または対象外', notGo:'この公開ページは、有料ベータや技術的準備が承認済みであることを意味しません。', search:'検索意図に慎重に回答', faq:'よくある質問', faqHeading:'連絡前に範囲をご確認ください。', privacy:'プライバシーと連絡方法', privacyText:'この静的ページにはフォーム、アカウント、解析、決済機能はなく、事前確認データを送信しません。連絡する場合は確認済みFacebook Pageのみを使用し、パスワード、OTP、APIキー、トークン、復旧コード、顧客記録などを送らないでください。', switcher:'言語 / 市場'},
  ko: { independent:'Gấu AI Systems는 독립 사업자이며 OpenClaw의 인증이나 보증을 받지 않았습니다.', availability:'지원 가능 여부', noRank:'검색 순위를 약속하지 않습니다.', noRankText:'게시, 크롤링, 색인 및 검색 순위는 보장되지 않습니다.', fee:'적격 컴퓨터 1대', feeNote:'베트남 기본 참고 가격 · 제3자 비용 별도', bounded:'범위가 제한된 제안', included:'적격성 확인 후 포함', separate:'별도 또는 제외', notGo:'이 공개 페이지는 유료 베타나 기술 준비가 승인되었다는 뜻이 아닙니다.', search:'검색 의도에 보수적으로 답변', faq:'자주 묻는 질문', faqHeading:'연락 전에 범위를 확인하세요.', privacy:'개인정보 및 연락 경계', privacyText:'이 정적 페이지에는 양식, 계정, 분석 또는 결제 기능이 없으며 사전 확인 데이터를 전송하지 않습니다. 연락을 선택한 경우 확인된 Facebook Page만 사용하고 비밀번호, OTP, API 키, 토큰, 복구 코드, 고객 기록 또는 민감한 데이터를 보내지 마세요.', switcher:'언어 / 시장'},
  'zh-hant': { independent:'Gấu AI Systems 為獨立服務提供者，未獲 OpenClaw 認證或背書。', availability:'服務資格', noRank:'不承諾搜尋排名。', noRankText:'發布、檢索、建立索引及搜尋排名均不保證。', fee:'符合條件的電腦', feeNote:'越南核心參考價格 · 第三方費用另計', bounded:'範圍明確的服務', included:'資格確認後包含', separate:'另行處理或不包含', notGo:'網站公開不代表付費 beta 或技術 readiness 已獲准。', search:'以保守方式回應搜尋需求', faq:'常見問題', faqHeading:'聯絡前請先確認範圍。', privacy:'隱私與聯絡界線', privacyText:'此靜態頁面沒有表單、帳戶、分析或付款流程，也不傳送事前檢查資料。若您選擇聯絡，僅使用已驗證的 Facebook Page，且不要傳送密碼、OTP、API 金鑰、Token、復原碼、客戶記錄或其他敏感資料。', switcher:'語言 / 市場'},
  'zh-hans': { independent:'Gấu AI Systems 是独立服务提供者，未获 OpenClaw 认证或背书。', availability:'服务资格', noRank:'不承诺搜索排名。', noRankText:'发布、抓取、建立索引及搜索排名均不保证。', fee:'符合条件的电脑', feeNote:'越南核心参考价格 · 第三方费用另计', bounded:'范围明确的服务', included:'资格确认后包含', separate:'另行处理或不包含', notGo:'网站公开不代表付费 beta 或技术 readiness 已获批准。', search:'以保守方式回应搜索需求', faq:'常见问题', faqHeading:'联系前请先确认范围。', privacy:'隐私与联系界线', privacyText:'此静态页面没有表单、账户、分析或付款流程，也不传送事前检查数据。若您选择联系，仅使用已验证的 Facebook Page，且不要发送密码、OTP、API 密钥、Token、恢复码、客户记录或其他敏感数据。', switcher:'语言 / 市场'}
};

function esc(value) { return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;'); }
function urlFor(slug) { return slug ? `${base}/${slug}/` : `${base}/`; }
function page(r) {
  const l = labelSets[r.slug] || labelSets.default;
  const canonical = urlFor(r.slug);
  const hreflang = alternates.map(([lang,slug]) => `  <link rel="alternate" hreflang="${lang}" href="${urlFor(slug)}">`).join('\n');
  const jsonld = JSON.stringify({'@context':'https://schema.org','@graph':[
    {'@type':'Organization','@id':`${base}/#organization`,name:'Gấu AI Systems',url:`${base}/`,description:'Independent OpenClaw setup service interest page.',sameAs:[facebook]},
    {'@type':'Service','@id':`${canonical}#service`,name:r.title,description:r.description,provider:{'@id':`${base}/#organization`},areaServed:r.market,offers:{'@type':'Offer',price:'500000',priceCurrency:'VND',description:'Interest and eligibility survey only; no payment or confirmed scheduling.'}},
    {'@type':'FAQPage','@id':`${canonical}#faq`,mainEntity:r.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}
  ]});
  const nav = routes.map(x => `<a href="${urlFor(x.slug)}" lang="${x.lang}"${x.slug===r.slug?' aria-current="page"':''}>${esc(x.market)}</a>`).join('');
  return `<!doctype html>
<html lang="${r.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(r.title)} | Gấu AI Systems</title>
  <meta name="description" content="${esc(r.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
${hreflang}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Gấu AI Systems">
  <meta property="og:locale" content="${r.locale}">
  <meta property="og:title" content="${esc(r.title)}">
  <meta property="og:description" content="${esc(r.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${base}/assets/og-cover.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(r.title)}">
  <meta name="twitter:description" content="${esc(r.description)}">
  <meta name="twitter:image" content="${base}/assets/og-cover.png">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../styles.css">
  <script type="application/ld+json">${jsonld}</script>
</head>
<body class="locale-page">
<a class="skip-link" href="#main">Skip to content</a>
<div class="announcement"><strong>${esc(r.readiness)}</strong> · ${esc(l.independent)}</div>
<header class="site-header"><div class="container nav-wrap"><a class="logo" href="${base}/"><img class="logo-image" src="../assets/favicon.svg" width="38" height="38" alt=""><span>Gấu AI Systems</span></a><a class="btn btn-primary header-cta" href="${facebook}" target="_blank" rel="noopener noreferrer">Verified Facebook ↗</a></div></header>
<main id="main">
<section class="locale-hero"><div class="container locale-hero-grid"><div><span class="eyebrow">${esc(r.eyebrow)}</span><h1>${esc(r.h1)}</h1><p class="lead">${esc(r.lead)}</p><div class="readiness-pill" role="status"><span></span>${esc(r.readiness)}</div><div class="price-lockup"><strong>500.000 VND</strong><span>/ ${esc(l.fee)}<br><small>${esc(l.feeNote)}</small></span></div></div><aside class="locale-card"><h2>${esc(l.availability)}</h2><p>${esc(r.availability)}</p><p><strong>${esc(l.noRank)}</strong> ${esc(l.noRankText)}</p></aside></div></section>
<section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">${esc(l.bounded)}</span><h2>${esc(r.scopeTitle)}</h2></div></div><div class="locale-columns"><article class="scope-card"><h3>${esc(l.included)}</h3><ul class="check-list">${r.scope.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article class="scope-card warning-card"><h3>${esc(l.separate)}</h3><p>${esc(r.exclusions)}</p><p>${esc(l.notGo)}</p></article></div></div></section>
<section class="section compact"><div class="container"><span class="eyebrow">${esc(l.search)}</span><h2>${esc(r.intentTitle)}</h2><ul class="intent-list">${r.intent.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></section>
<section class="section faq-section"><div class="container"><span class="eyebrow">${esc(l.faq)}</span><h2>${esc(l.faqHeading)}</h2><div class="faq-list">${r.faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div></section>
<section class="section compact"><div class="container"><div class="privacy-note"><h2>${esc(l.privacy)}</h2><p>${esc(l.privacyText)}</p></div><div class="locale-switcher" aria-label="Language and market switcher"><strong>${esc(l.switcher)}</strong>${nav}<a href="${base}/" lang="vi">Việt Nam · Tiếng Việt</a></div></div></section>
</main>
<footer class="site-footer"><div class="container"><div class="legal"><span>© 2026 Gấu AI Systems.</span><span>Independent service provider. Content is informational and does not replace legal, security, tax or compliance advice.</span><span>Checked ${checked}.</span></div></div></footer>
<script src="../app.js" defer></script>
</body>
</html>`;
}

for (const route of routes) {
  const dir = resolve(root, route.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, 'index.html'), page(route), 'utf8');
}

const sitemapEntries = [
  {path:'',lastmod:checked},
  {path:'gioi-thieu/',lastmod:checked},
  {path:'lien-he-kiem-tra-dieu-kien/',lastmod:checked},
  {path:'cai-openclaw/',lastmod:checked},
  {path:'openclaw-windows-vps/',lastmod:checked},
  {path:'cau-hinh-bao-mat-openclaw/',lastmod:checked},
  {path:'khac-phuc-loi-openclaw/',lastmod:checked},
  ...routes.map(r=>({path:`${r.slug}/`,lastmod:checked})),
  {path:'research.html',lastmod:checked}
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.map(entry=>`  <url><loc>${base}/${entry.path}</loc><lastmod>${entry.lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(root, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Built ${routes.length} locale routes and sitemap.xml.`);
