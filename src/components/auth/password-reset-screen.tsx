"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function PasswordResetScreen() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-white p-3 sm:p-6">
      <section className="relative mx-auto grid min-h-[calc(100vh-1.5rem)] w-full max-w-7xl grid-cols-1 overflow-hidden rounded-2xl lg:min-h-[calc(100vh-3rem)] lg:grid-cols-2">
        <div className="absolute left-4 top-4 z-20 flex items-center gap-2 sm:left-6">
          <Image src="/logo.svg" alt="Obliq logo" width={40} height={40} priority />
          <Image src="/Vector.svg" alt="Obliq" width={54} height={20} priority />
        </div>

        <div className="flex items-center justify-center px-1 pt-14 pb-2 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">
          <div className="w-full max-w-md">
            <article className="w-full rounded-2xl border-8 border-[#00000005] bg-white p-5 shadow-[0_10px_35px_rgba(22,24,35,0.08)] backdrop-blur-[1px] sm:p-8 md:p-10">
              <h1 className="text-center text-[24px] font-semibold text-[#1f232a]">
                Forgot password
              </h1>
              <p className="mt-1 text-center text-[15px] text-[#9ba0ab]">
                Enter your email to reset your password
              </p>

              <form className="mt-8 space-y-2.5 sm:mt-10" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="text-[15px] font-medium text-[#404857]">Email</span>
                  <input
                    className="mt-1.5 h-10 w-full rounded-xl border border-[#0000001a] px-4 text-[16px] text-[#374056] placeholder:text-[#8c93a3] placeholder:opacity-100 outline-none transition hover:border-[#0000001a] hover:bg-[#0000000a] focus:border-[#0000001a] focus:shadow-[0_0_0_1px] focus:placeholder:opacity-0"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>

                <p
                  className={`h-5 text-[13px] leading-5 ${
                    submitted ? "visible text-[#2f7f5f]" : "invisible"
                  }`}
                  aria-live="polite"
                >
                  If the email exists, a reset link has been sent.
                </p>

                <button
                  className="group h-10 w-full rounded-xl border border-[#FD5E2B] bg-[#FD6D3F] text-[14px] font-medium text-white shadow-[0_9px_22px_rgba(228,101,58,0.32)] transition hover:bg-white hover:text-[#FD6D3F] hover:shadow-[0_11px_26px_rgba(228,101,58,0.35)]"
                  type="submit"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    Send reset link
                    <span className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                      →
                    </span>
                  </span>
                </button>

                <div className="pt-2 text-center text-[14px] text-[#666C79]">
                  <span>Remembered your password? </span>
                  <Link
                    href="/"
                    className="rounded-md px-2 py-1 text-[14px] font-medium text-[#1F232A] transition hover:bg-[#0000000a]"
                  >
                    Log in
                  </Link>
                </div>
              </form>
            </article>
          </div>
        </div>

        <aside className="relative hidden overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(20,24,31,0.22)] lg:block">
          <div className="absolute inset-0">
            <Image
              src="/bgcolor.png"
              alt="Background artwork"
              fill
              className="object-cover object-right"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#2b160f]/8" />

          <div className="relative flex h-full min-h-155 items-start justify-end py-14">
            <div className="relative h-130 w-130.25 overflow-hidden rounded-l-xl backdrop-blur-[1.5px]">
              <Image
                src="/bb8ccac3da7e3f055e96428b842e4bbd25052f57.png"
                alt="Workspace preview"
                fill
                className="object-cover object-left"
              />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
