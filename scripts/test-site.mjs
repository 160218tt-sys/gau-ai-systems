import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const ORIGIN = 'https://160218tt-sys.github.io/gau-ai-systems';
const routes = [
  {path:'index.html',url:`${ORIGIN}/`,lang:'vi'},
  {path:'gioi-thieu/index.html',url:`${ORIGIN}/gioi-thieu/`,lang:'vi',brandPage:true},
  {path:'lien-he-kiem-tra-dieu-kien/index.html',url:`${ORIGIN}/lien-he-kiem-tra-dieu-kien/`,lang:'vi',brandPage:true},
  {path:'cai-openclaw/index.html',url:`${ORIGIN}/cai-openclaw/`,lang:'vi',buyerTask:true},
  {path:'openclaw-windows-vps/index.html',url:`${ORIGIN}/openclaw-windows-vps/`,lang:'vi',buyerTask:true},
  {path:'cau-hinh-bao-mat-openclaw/index.html',url:`${ORIGIN}/cau-hinh-bao-mat-openclaw/`,lang:'vi',buyerTask:true},
  {path:'khac-phuc-loi-openclaw/index.html',url:`${ORIGIN}/khac-phuc-loi-openclaw/`,lang:'vi',buyerTask:true},
  {path:'en/index.html',url:`${ORIGIN}/en/`,lang:'en'},
  {path:'in/index.html',url:`${ORIGIN}/in/`,lang:'en-IN'},
  {path:'sg/index.html',url:`${ORIGIN}/sg/`,lang:'en-SG'},
  {path:'id/index.html',url:`${ORIGIN}/id/`,lang:'id'},
  {path:'ms/index.html',url:`${ORIGIN}/ms/`,lang:'ms'},
  {path:'ja/index.html',url:`${ORIGIN}/ja/`,lang:'ja'},
  {path:'ko/index.html',url:`${ORIGIN}/ko/`,lang:'ko'},
  {path:'zh-hant/index.html',url:`${ORIGIN}/zh-hant/`,lang:'zh-Hant'},
  {path:'zh-hans/index.html',url:`${ORIGIN}/zh-hans/`,lang:'zh-Hans'}
];
const alternates = new Map([
  ['x-default',`${ORIGIN}/en/`],['en',`${ORIGIN}/en/`],['en-IN',`${ORIGIN}/in/`],['en-SG',`${ORIGIN}/sg/`],['id',`${ORIGIN}/id/`],['ms',`${ORIGIN}/ms/`],['ja',`${ORIGIN}/ja/`],['ko',`${ORIGIN}/ko/`],['zh-Hant',`${ORIGIN}/zh-hant/`],['zh-Hans',`${ORIGIN}/zh-hans/`],['vi',`${ORIGIN}/`]
]);
let passed = 0;
const ok = (condition, message) => { if (!condition) throw new Error(message); passed++; };
const attr = (html, tag, name) => new RegExp(`<${tag}\\b[^>]*\\b${name}=["']([^"']+)["'][^>]*>`, 'i').exec(html)?.[1];
const metas = (html, key, value) => {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find(t => new RegExp(`\\b${key}=["']${value}["']`, 'i').test(t));
  return tag && /\bcontent=["']([^"']+)["']/i.exec(tag)?.[1];
};
const links = html => [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]);

for (const route of routes) {
  const file = resolve(root, route.path);
  const html = await readFile(file, 'utf8');
  ok(html.startsWith('<!doctype html>'), `${route.path}: HTML exists/doctype (local static 200 equivalent)`);
  ok(attr(html,'html','lang') === route.lang, `${route.path}: lang`);
  const title = /<title>([^<]+)<\/title>/i.exec(html)?.[1]?.trim();
  ok(title?.length >= 25, `${route.path}: localized title`);
  ok((metas(html,'name','description') || '').length >= 45, `${route.path}: localized description`);
  const canonical = links(html).find(t => /\brel=["']canonical["']/i.test(t));
  ok(canonical && /\bhref=["']([^"']+)["']/i.exec(canonical)?.[1] === route.url, `${route.path}: self canonical`);
  const found = new Map(links(html).filter(t => /\brel=["']alternate["']/i.test(t)).map(t => [/\bhreflang=["']([^"']+)["']/i.exec(t)?.[1], /\bhref=["']([^"']+)["']/i.exec(t)?.[1]]));
  if (route.buyerTask || route.brandPage) ok(found.get('vi') === route.url && found.get('x-default') === `${ORIGIN}/en/`, `${route.path}: scoped vi/x-default hreflang`);
  else ok(found.size === alternates.size && [...alternates].every(([k,v]) => found.get(k) === v), `${route.path}: reciprocal hreflang and x-default`);
  ok(metas(html,'property','og:title') && metas(html,'property','og:description') && metas(html,'property','og:url') === route.url, `${route.path}: localized Open Graph`);
  const jsonBlocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  ok(jsonBlocks.length > 0, `${route.path}: JSON-LD present`);
  const jsonDocs = jsonBlocks.map(block => JSON.parse(block[1]));
  ok(true, `${route.path}: JSON-LD parses`);
  ok((html.match(/<h1\b/gi) || []).length === 1, `${route.path}: single h1`);
  for (const image of html.match(/<img\b[^>]*>/gi) || []) ok(/\balt=["'][^"']*["']/i.test(image), `${route.path}: image alt`);
  ok(/class=["'][^"']*announcement/.test(html) && /(survey|survei|tinjauan|khảo sát|意向|関心|관심)/i.test(html), `${route.path}: readiness banner`);
  if (route.buyerTask || route.brandPage) {
    const schemaTypes = jsonDocs.flatMap(doc => (doc['@graph'] || [doc]).map(item => item['@type']));
    for (const type of ['Organization','Service','BreadcrumbList','FAQPage']) ok(schemaTypes.includes(type), `${route.path}: ${type} schema`);
    ok(/chưa nhận tiền|chưa có payment|chưa nhận thanh toán/i.test(html) && /chưa xác nhận lịch|chưa nhận tiền hoặc xác nhận lịch|scheduling/i.test(html), `${route.path}: payment and scheduling ceiling`);
    ok(/#precheck|ghi nhận quan tâm|kiểm tra điều kiện/i.test(html), `${route.path}: precheck/interest-only CTA`);
    if (route.buyerTask) {
      ok(/mã nguồn mở/i.test(html), `${route.path}: open-source disclosure`);
      ok(/không bảo đảm|không cam kết/i.test(html), `${route.path}: no-guarantee disclosure`);
    } else {
      ok(/Gấu AI Systems/i.test(html), `${route.path}: canonical brand name`);
      ok(!/<form\b/i.test(html), `${route.path}: no form`);
    }
  } else {
    ok(/(?:500\.000|500,000)\s*VND/i.test(html), `${route.path}: active Vietnam offer`);
  }
  if (route.path !== 'index.html' && !route.buyerTask && !route.brandPage) {
    ok(!/<form\b/i.test(html), `${route.path}: no form`);
    ok(/no form|formulir|borang|フォーム|양식|表單|表单/i.test(html), `${route.path}: explicitly static/no backend`);
  } else if (route.path === 'index.html') {
    ok(/id="precheck-form"[^>]*novalidate/i.test(html) && /không gửi hoặc lưu dữ liệu/i.test(html), 'index.html: existing precheck is explicitly client-side/nontransmitting');
  }
  ok(!/(google-analytics|googletagmanager|gtag\s*\(|facebook\.net\/.*pixel|segment\.com|mixpanel|hotjar)/i.test(html), `${route.path}: no analytics`);
  ok(/independent|độc lập|independen|bebas|独立|독립/i.test(html), `${route.path}: independent disclaimer`);
  if (!route.brandPage) {
    ok(/secret|API key|APIキー|API 密钥|API 金鑰|API 키/i.test(html), `${route.path}: customer secret boundary`);
    ok(/third-party|bên thứ ba|pihak ketiga|第三者|제3자|第三方/i.test(html), `${route.path}: third-party cost boundary`);
    if (!route.buyerTask) ok(/local-only|lokal|setempat|ローカル|로컬|本機|本机/i.test(html), `${route.path}: local-only Gateway`);
  }
}

const zh = await readFile(resolve(root,'zh-hans/index.html'),'utf8');
ok(/中国大陆的公开可用性尚未确认/.test(zh) && /不声称.*ICP/.test(zh) && /不声称可在中国大陆访问或被搜索引擎收录/.test(zh), 'zh-hans: conservative Mainland China availability, indexing and ICP wording');

const sitemap = await readFile(resolve(root,'sitemap.xml'),'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const expectedSitemap = [...routes.map(r=>r.url),`${ORIGIN}/research.html`].sort();
ok(JSON.stringify(sitemapUrls.sort()) === JSON.stringify(expectedSitemap), 'sitemap: exact expected entries');

async function walk(dir) { const out=[]; for (const e of await readdir(dir,{withFileTypes:true})) { if (e.name === '.git' || e.name === 'node_modules') continue; const p=resolve(dir,e.name); e.isDirectory()?out.push(...await walk(p)):out.push(p); } return out; }
const files = await walk(root);
const publicFiles = files.filter(f => /\.(?:html|css|js|mjs|xml|json|svg|txt)$/i.test(f));
for (const file of publicFiles) {
  if (relative(root,file).split(sep).join('/') === 'scripts/test-site.mjs') continue;
  const text = await readFile(file,'utf8');
  const rel = relative(root,file).split(sep).join('/');
  ok(!/(AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/.test(text), `${rel}: no secret pattern`);
  ok(!/(C:\\Users\\|\/Users\/|\.openclaw(?:[\\/]|$)|openclaw-sme-studio)/i.test(text), `${rel}: no internal path`);
  ok(!/(TODO|TBD|FIXME|YOUR_DOMAIN|example\.com|localhost:\d+)/i.test(text), `${rel}: no placeholder/internal URL`);
  ok(!/https?:\/\/https?:\/\//i.test(text), `${rel}: no doubled or obviously malformed URL`);
}

for (const htmlFile of files.filter(f => f.endsWith('.html'))) {
  const html = await readFile(htmlFile,'utf8');
  const rel = relative(root,htmlFile).split(sep).join('/');
  for (const m of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const target=m[1];
    if (/^https?:/i.test(target)) {
      const external = new URL(target);
      ok(Boolean(external.hostname) && !external.username && !external.password, `${rel}: valid credential-free external URL: ${target}`);
      continue;
    }
    if (/^(?:mailto:|tel:|#|data:)/i.test(target)) continue;
    const clean=target.split(/[?#]/)[0]; if (!clean) continue;
    let local=resolve(dirname(htmlFile),clean);
    if (clean.endsWith('/')) local=resolve(local,'index.html');
    ok((await stat(local).catch(()=>null))?.isFile(), `${rel}: internal link/asset exists: ${target}`);
  }
  for (const label of html.matchAll(/<label\b([^>]*)>([\s\S]*?)<\/label>/gi)) {
    ok(/\bfor=["'][^"']+["']/i.test(label[1]) || /<(?:input|select|textarea)\b/i.test(label[2]), `${rel}: form label is associated`);
  }
}

const allText = (await Promise.all(files.filter(f=>/\.(?:html|js|css)$/i.test(f)).map(f=>readFile(f,'utf8')))).join('\n');
ok(!/(?:20 USD|USD 20|20 美元|20\s*달러|20米ドル)/i.test(allText), 'site: no historical USD 20 in public-facing files');
ok(!/(our customers include|trusted by \d+|certified partner|official OpenClaw partner|guaranteed ROI|local office at)/i.test(allText), 'site: no fake customer, testimonial, certification, office or ROI claims');
ok(!/(fetch\s*\(|XMLHttpRequest|WebSocket\s*\(|<form[^>]+action=)/i.test(allText), 'site: no backend submission code');
console.log(`PASS ${passed} checks across ${routes.length} locale routes and ${files.length} repository files.`);
