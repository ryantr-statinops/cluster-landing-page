'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormState = 'idle' | 'loading' | 'success' | 'error';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate(): boolean {
    const newErrors: Partial<FormData> = {};

    if (!form.name.trim())
      newErrors.name = 'Vui lòng nhập họ tên';

    if (!form.email.trim())
      newErrors.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Email không hợp lệ';

    if (form.phone && !/^[0-9+\-\s()]{8,15}$/.test(form.phone))
      newErrors.phone = 'Số điện thoại không hợp lệ';

    if (!form.subject.trim())
      newErrors.subject = 'Vui lòng nhập tiêu đề';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── Handlers ────────────────────────────────────────────────────────────────
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Xoá lỗi khi người dùng bắt đầu nhập
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!validate()) return;

  setState('loading');

  try {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby7kZE3_7f5Sxa8JaOKWkcKgRA2c2E9XFTLuj8GnoaWw6cjgOMlrS2mjsM-OVDP8M4-/exec';

    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      mode: 'no-cors', // Apps Script yêu cầu no-cors
    });

    // no-cors không trả response body được, nhưng nếu không throw thì coi như thành công
    setState('success');
    setForm(initialForm);

  } catch {
    setState('error');
  }
}

  // ── Success state ────────────────────────────────────────────────────────────
  if (state === 'success') {
    return (
      <div className="grad-border rounded p-10 text-center">
        <div
          className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)' }}
        >
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3
          className="text-white text-xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Đã nhận thông tin!
        </h3>
        <p className="text-subtle text-sm mb-6 leading-relaxed">
          Cảm ơn bạn đã đăng ký. Chúng tôi sẽ thông báo ngay khi Cluster ra mắt MVP.
        </p>
        <button
          onClick={() => setState('idle')}
          className="btn-ghost text-xs"
        >
          Đăng ký thêm
        </button>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grad-border rounded p-8">

        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="label">Early Access — Waitlist</span>
          </div>
          <p className="text-subtle text-xs leading-relaxed">
            Đăng ký để nhận thông báo sớm nhất khi Cluster ra mắt MVP.
          </p>
        </div>

        {/* Fields grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">

          {/* Họ tên */}
          <Field
            label="Họ & tên"
            required
            error={errors.name}
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              className={inputClass(!!errors.name)}
            />
          </Field>

          {/* Email */}
          <Field
            label="Email"
            required
            error={errors.email}
          >
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className={inputClass(!!errors.email)}
            />
          </Field>

          {/* Phone */}
          <Field
            label="Số điện thoại"
            hint="Không bắt buộc"
            error={errors.phone}
          >
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="0912 345 678"
              className={inputClass(!!errors.phone)}
            />
          </Field>

          {/* Subject */}
          <Field
            label="Tiêu đề / Vai trò"
            required
            error={errors.subject}
          >
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className={inputClass(!!errors.subject)}
              style={{ 
                appearance: 'none',
                backgroundColor: '#0f0f0f',
                colorScheme: 'dark', 
              }}
            >
              <option value="">Chọn vai trò của bạn...</option>
              <option value="[Founder] Đăng ký Early Access">Founder / Co-founder</option>
              <option value="[Manager] Đăng ký Early Access">Manager / Director</option>
              <option value="[Developer] Đăng ký Early Access">Developer / Engineer</option>
              <option value="[Investor] Quan tâm đầu tư">Investor</option>
              <option value="[Partner] Hợp tác">Đối tác / Partner</option>
              <option value="[Other] Đăng ký Early Access">Khác</option>
            </select>
          </Field>

        </div>

        {/* Message */}
        <Field
            label={
                <span className="text-left">
                Bạn muốn Cluster giải quyết những bài toán gì?
                <br />
                <span className="text-dim font-mono" style={{ fontSize: '0.6rem' }}>
                Hãy góp ý cho chúng tôi tại đây
                </span>
                </span>
            }
            >
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Mô tả ngắn về doanh nghiệp / vấn đề bạn đang gặp phải..."
            rows={3}
            className={inputClass(!!errors.message) + ' resize-none'}
          />
        </Field>

        {/* Submit */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start">
          <button
            type="submit"
            disabled={state === 'loading'}
            className="btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state === 'loading' ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Đang gửi...
              </>
            ) : (
              <>Đăng ký nhận thông báo →</>
            )}
          </button>

          {state === 'error' && (
            <p className="text-red-400 text-xs font-mono self-center">
              Có lỗi xảy ra. Vui lòng thử lại.
            </p>
          )}
        </div>

        {/* Privacy note */}
        <p className="mt-4 text-dim text-xs font-mono">
          Thông tin của bạn được bảo mật hoàn toàn. Không spam.
        </p>

      </div>
    </form>
  );
}

// ─── Field wrapper component ──────────────────────────────────────────────────
function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: React.ReactNode;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="label text-subtle block w-full text-left">
          {label}
          {required && <span className="text-cyan-500 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-dim text-[10px] font-mono whitespace-nowrap">{hint}</span>}
      </div>
      {children}
      {error && (
        <span className="text-red-400 text-xs font-mono">{error}</span>
      )}
    </div>
  );
}

// ─── Input class helper ───────────────────────────────────────────────────────
function inputClass(hasError: boolean): string {
  return [
    'w-full px-4 py-3 rounded text-sm text-white font-mono',
    'bg-transparent outline-none transition-all duration-200',
    'placeholder:text-dim',
    hasError
      ? 'border border-red-500/60 focus:border-red-400'
      : 'border border-border focus:border-cyan-500/60',
  ].join(' ');
}