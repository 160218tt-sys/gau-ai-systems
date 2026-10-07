(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const themeButton = $('#theme-toggle');
  const preferredDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const setTheme = theme => {
    document.documentElement.dataset.theme = theme;
    if (!themeButton) return;
    themeButton.textContent = theme === 'dark' ? '☀' : '☾';
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  };
  setTheme(localStorage.getItem('gas-theme') || (preferredDark ? 'dark' : 'light'));
  themeButton?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('gas-theme', next);
    setTheme(next);
  });

  const menuButton = $('#menu-toggle');
  const menu = $('#nav-links');
  menuButton?.addEventListener('click', () => {
    const open = menu?.classList.toggle('open') || false;
    menuButton.setAttribute('aria-expanded', String(open));
  });
  $$('#nav-links a').forEach(link => link.addEventListener('click', () => {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    $$('.reveal').forEach(element => observer.observe(element));
  } else {
    $$('.reveal').forEach(element => element.classList.add('visible'));
  }

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  const precheckForm = $('#precheck-form');
  const precheckOutput = $('#precheck-output');
  const precheckStatus = $('#precheck-status');
  const copyPrecheck = $('#copy-precheck');
  const needLabels = {
    core: 'Cài lõi local-only, một người dùng',
    custom: 'VPS / truy cập mạng / nhiều người / kênh chat',
    sensitive: 'Dữ liệu nhạy cảm hoặc yêu cầu tuân thủ',
    unsure: 'Chưa rõ'
  };

  precheckForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!precheckForm.checkValidity()) {
      precheckForm.reportValidity();
      if (precheckStatus) precheckStatus.textContent = 'Vui lòng hoàn thành bốn trường bắt buộc.';
      return;
    }

    const os = $('#pc-os')?.value || '';
    const admin = $('#pc-admin')?.value || '';
    const model = $('#pc-model')?.value || '';
    const need = $('#pc-need')?.value || '';
    const note = ($('#pc-note')?.value || '').trim();
    const needsSeparateReview = admin !== 'yes' || model !== 'yes' || need !== 'core';
    const outcome = needsSeparateReview
      ? 'Cần khảo sát thêm; chưa thể xem là phù hợp gói lõi 500.000 VND.'
      : 'Có dấu hiệu phù hợp bước sàng lọc ban đầu; vẫn cần đội ngũ xác minh readiness trước khi nhận đơn.';
    const lines = [
      'YÊU CẦU KHẢO SÁT OPENCLAW — KHÔNG CHỨA SECRET',
      `Hệ điều hành: ${os}`,
      `Quyền admin: ${admin === 'yes' ? 'Có' : 'Không / chưa chắc'}`,
      `Tài khoản model AI: ${model === 'yes' ? 'Đã có và tự thanh toán' : 'Chưa có / cần tư vấn'}`,
      `Nhu cầu: ${needLabels[need] || need}`,
      `Mô tả: ${note || 'Chưa cung cấp'}`,
      `Kết quả tự sàng lọc: ${outcome}`,
      'Tôi hiểu website chưa nhận thanh toán hoặc xác nhận lịch và tôi sẽ không gửi mật khẩu, OTP, API key, token hay dữ liệu khách hàng.'
    ];
    if (precheckOutput) precheckOutput.value = lines.join('\n');
    if (copyPrecheck) copyPrecheck.disabled = false;
    const title = $('#precheck-result-title');
    if (title) title.textContent = needsSeparateReview ? 'Cần khảo sát thêm' : 'Có thể gửi yêu cầu khảo sát';
    if (precheckStatus) precheckStatus.textContent = 'Đã tạo bản tóm tắt cục bộ. Không có dữ liệu nào được gửi đi.';
  });

  precheckForm?.addEventListener('reset', () => {
    setTimeout(() => {
      if (precheckOutput) precheckOutput.value = '';
      if (copyPrecheck) copyPrecheck.disabled = true;
      const title = $('#precheck-result-title');
      if (title) title.textContent = 'Bản tóm tắt chưa được tạo';
      if (precheckStatus) precheckStatus.textContent = 'Đã xóa dữ liệu precheck khỏi biểu mẫu.';
    }, 0);
  });

  copyPrecheck?.addEventListener('click', async () => {
    if (!precheckOutput?.value) return;
    try {
      await navigator.clipboard.writeText(precheckOutput.value);
      if (precheckStatus) precheckStatus.textContent = 'Đã sao chép. Bạn quyết định có gửi nội dung hay không.';
    } catch {
      precheckOutput.focus();
      precheckOutput.select();
      if (precheckStatus) precheckStatus.textContent = 'Trình duyệt chặn clipboard; nội dung đã được chọn để bạn sao chép thủ công.';
    }
  });
})();
