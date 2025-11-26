"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

const MONTHS = [
  { value: "Jan", label: "Jan" },
  { value: "Fev", label: "Fev" },
  { value: "Mar", label: "Mar" },
  { value: "Abr", label: "Abr" },
  { value: "Mai", label: "Mai" },
  { value: "Jun", label: "Jun" },
  { value: "Jul", label: "Jul" },
  { value: "Ago", label: "Ago" },
  { value: "Set", label: "Set" },
  { value: "Out", label: "Out" },
  { value: "Nov", label: "Nov" },
  { value: "Dez", label: "Dez" },
];

function monthStringToIndex(m: string): number {
  return MONTHS.findIndex((item) => item.value === m) || 0;
}

function calculateAgeFromDate(date: Date): number {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
  return age;
}

function applyPhoneMask(value: string): string {
  let v = value.replace(/\D/g, "");
  if (v.length <= 10) {
    v = v.replace(/^(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    v = v.replace(/^(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
  }
  return v;
}

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: any) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const onlyLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    if (!onlyLetters.test(firstName)) {
      setError("O nome deve conter apenas letras.");
      setLoading(false);
      return;
    }

    if (!onlyLetters.test(lastName)) {
      setError("O sobrenome deve conter apenas letras.");
      setLoading(false);
      return;
    }

    if (email !== confirmEmail) {
      setError("Os emails não coincidem.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (!birthDay || !birthMonth || !birthYear) {
      setError("Informe sua data de nascimento completa.");
      setLoading(false);
      return;
    }

    const dayNum = Number(birthDay);
    const yearNum = Number(birthYear);
    const monthIndex = monthStringToIndex(birthMonth);
    const birthDate = new Date(yearNum, monthIndex, dayNum);

    if (
      birthDate.getDate() !== dayNum ||
      birthDate.getMonth() !== monthIndex ||
      birthDate.getFullYear() !== yearNum
    ) {
      setError("Data de nascimento inválida.");
      setLoading(false);
      return;
    }

    const ageCalc = calculateAgeFromDate(birthDate);
    if (ageCalc < 16 || ageCalc > 120) {
      setError("A idade deve estar entre 16 e 120 anos.");
      setLoading(false);
      return;
    }

    if (!gender) {
      setError("Selecione um gênero.");
      setLoading(false);
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      setError("Telefone inválido.");
      setLoading(false);
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      if (authError.message.includes("already registered")) {
        setError("Este email já está cadastrado.");
      } else {
        setError(authError.message);
      }
      setLoading(false);
      return;
    }

    const userId = authData.user?.id;
    const birthIso = birthDate.toISOString().slice(0, 10);

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      first_name: firstName,
      last_name: lastName,
      gender,
      birth_date: birthIso,
      age: ageCalc,
      phone: phoneDigits,
      email_confirmed: true,
      role: "user",
    });

    if (profileError) {
      setError("Erro ao salvar dados do perfil.");
      setLoading(false);
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F7F7F7] px-4">
      <form
        onSubmit={handleRegister}
        className="
          bg-white border border-[#E5E5E5]
          p-8 rounded-2xl shadow-sm
          w-full max-w-lg
          text-black
        "
      >
        <h1 className="text-2xl font-bold mb-6 text-center tracking-tight">
          Criar Conta
        </h1>

        {/* Nome + Sobrenome */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              required
              className="w-full border border-[#D9D9D9] px-3 py-2 rounded-lg mb-4 bg-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Sobrenome</label>
            <input
              type="text"
              required
              className="w-full border border-[#D9D9D9] px-3 py-2 rounded-lg mb-4 bg-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Data de nascimento */}
        <label className="block text-sm font-medium mb-1">
          Data de nascimento
        </label>
        <div className="flex gap-3 mb-4">
          <input
            type="number"
            min={1}
            max={31}
            placeholder="Dia"
            required
            className="w-1/3 border border-[#D9D9D9] px-3 py-2 rounded-lg bg-white"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />

          <select
            required
            className="w-1/3 border border-[#D9D9D9] px-3 py-2 rounded-lg bg-white"
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
          >
            <option value="">Mês</option>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Ano"
            required
            className="w-1/3 border border-[#D9D9D9] px-3 py-2 rounded-lg bg-white"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>

        {/* Gênero */}
        <label className="block text-sm font-medium mb-1">Gênero</label>
        <select
          required
          className="w-full border border-[#D9D9D9] px-3 py-2 rounded-lg mb-4 bg-white"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
          <option value="outro">Outro</option>
        </select>

        {/* Telefone */}
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <input
          type="text"
          required
          className="w-full border border-[#D9D9D9] px-3 py-2 rounded-lg mb-4 bg-white"
          value={phone}
          onChange={(e) => setPhone(applyPhoneMask(e.target.value))}
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full border border-[#D9D9D9] px-3 py-2 rounded-lg mb-4 bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Confirmar Email */}
        <label className="block text-sm font-medium mb-1">
          Confirmar Email
        </label>
        <input
          type="email"
          required
          className="w-full border border-[#D9D9D9] px-3 py-2 rounded-lg mb-4 bg-white"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />

        {/* Senha */}
        <label className="block text-sm font-medium mb-1">Senha</label>
        <input
          type="password"
          required
          className="w-full border border-[#D9D9D9] px-3 py-2 rounded-lg mb-4 bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirmar Senha */}
        <label className="block text-sm font-medium mb-1">
          Confirmar Senha
        </label>
        <input
          type="password"
          required
          className="w-full border border-[#D9D9D9] px-3 py-2 rounded-lg mb-4 bg-white"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* ERRO */}
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-300 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* BOTÃO */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-lg font-semibold transition
            bg-[#406945] text-white hover:bg-[#355536]
          "
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Registrar"}
        </button>

        <p className="text-center text-sm mt-4">
          Já tem conta?{" "}
          <a href="/login" className="text-[#406945] font-medium hover:underline">
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
