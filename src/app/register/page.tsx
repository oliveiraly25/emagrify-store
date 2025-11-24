"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

const MONTHS = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Fev" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Abr" },
  { value: "05", label: "Mai" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Ago" },
  { value: "09", label: "Set" },
  { value: "10", label: "Out" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dez" },
];

function calculateAge(year: number, month: number, day: number) {
  const today = new Date();
  const birth = new Date(year, month - 1, day);

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function onlyLetters(value: string) {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value.trim());
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatPhone(value: string) {
  const digits = onlyDigits(value);

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 14);
  }

  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateForm() {
    // Nome / sobrenome
    if (!onlyLetters(firstName) || !onlyLetters(lastName)) {
      setError("Nome e sobrenome devem conter apenas letras.");
      return false;
    }

    // Emails
    if (email !== confirmEmail) {
      setError("Os emails não coincidem.");
      return false;
    }

    // Senha
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return false;
    }

    // Data de nascimento
    const day = Number(birthDay);
    const month = Number(birthMonth);
    const year = Number(birthYear);

    if (!day || !month || !year) {
      setError("Informe sua data de nascimento completa.");
      return false;
    }

    const birth = new Date(year, month - 1, day);
    if (
      birth.getFullYear() !== year ||
      birth.getMonth() !== month - 1 ||
      birth.getDate() !== day
    ) {
      setError("Data de nascimento inválida.");
      return false;
    }

    const age = calculateAge(year, month, day);
    if (age < 16 || age > 120) {
      setError("A idade deve estar entre 16 e 120 anos.");
      return false;
    }

    // Gênero
    if (!gender) {
      setError("Selecione um gênero.");
      return false;
    }

    // Telefone
    const digits = onlyDigits(phone);
    if (digits.length < 10 || digits.length > 11) {
      setError("Informe um telefone válido com DDD.");
      return false;
    }

    return true;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const day = Number(birthDay);
    const month = Number(birthMonth);
    const year = Number(birthYear);
    const age = calculateAge(year, month, day);
    const birthDate = `${year}-${birthMonth}-${birthDay.padStart(2, "0")}`;

    // CREA USER NO SUPABASE
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const userId = authData.user?.id;

    // SALVA DADOS EXTRAS NA TABELA PROFILES
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      gender,
      birth_date: birthDate, // coluna DATE no Supabase
      age,
      phone: onlyDigits(phone),
      email_confirmed: true, // emails coincidem
      role: "user",
    });

    if (profileError) {
      console.error(profileError);
      setError("Erro ao salvar dados do perfil.");
      setLoading(false);
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-[#111] px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-[#1a1a1a] p-8 rounded-xl shadow-md w-full max-w-lg text-black dark:text-white"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

        {/* Nome + Sobrenome */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              required
              className="w-full border px-3 py-2 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Sobrenome</label>
            <input
              type="text"
              required
              className="w-full border px-3 py-2 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white"
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
          {/* Dia */}
          <input
            type="number"
            placeholder="Dia"
            min={1}
            max={31}
            required
            className="w-1/3 border px-3 py-2 rounded-lg bg-white dark:bg-[#222] text-black dark:text-white"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />

          {/* Mês */}
          <select
            required
            className="w-1/3 border px-3 py-2 rounded-lg bg-white text-black dark:bg-[#222] dark:text-white dark:[color-scheme:dark]"
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

          {/* Ano */}
          <input
            type="number"
            placeholder="Ano"
            required
            className="w-1/3 border px-3 py-2 rounded-lg bg-white dark:bg-[#222] text-black dark:text-white"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>

        {/* Gênero */}
        <label className="block text-sm font-medium mb-1">Gênero</label>
        <select
          required
          className="w-full border px-3 py-2 rounded-lg mb-4 bg-white text-black dark:bg-[#222] dark:text-white dark:[color-scheme:dark]"
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
          className="w-full border px-3 py-2 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white"
          value={formatPhone(phone)}
          onChange={(e) => setPhone(onlyDigits(e.target.value))}
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white"
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
          className="w-full border px-3 py-2 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />

        {/* Senha */}
        <label className="block text-sm font-medium mb-1">Senha</label>
        <input
          type="password"
          required
          className="w-full border px-3 py-2 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white"
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
          className="w-full border px-3 py-2 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* BOTÃO REGISTRAR */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-lg font-semibold transition
            bg-[#0d2417] text-white
            dark:bg-[#CFE0BC] dark:text-black
          "
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Registrar"}
        </button>

        <p className="text-center text-sm mt-4 text-black dark:text-white">
          Já tem conta?{" "}
          <a
            href="/login"
            className="text-green-700 dark:text-green-400 hover:underline"
          >
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
