"use client";

import { useEffect, useMemo, useState } from "react";
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
    // (xx) xxxx-xxxx
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 14);
  }

  // (xx) xxxxx-xxxx
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

export default function DadosPessoaisPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);

  // CAMPOS
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // idade calculada só para exibição
  const computedAge = useMemo(() => {
    if (!birthDay || !birthMonth || !birthYear) return null;
    const day = Number(birthDay);
    const month = Number(birthMonth);
    const year = Number(birthYear);
    if (!day || !month || !year) return null;
    try {
      return calculateAge(year, month, day);
    } catch {
      return null;
    }
  }, [birthDay, birthMonth, birthYear]);

  // =============================
  //   CARREGAR DADOS
  // =============================
  useEffect(() => {
    async function loadProfile() {
      const { data: auth } = await supabase.auth.getUser();

      if (!auth?.user) {
        router.push("/login");
        return;
      }

      setUserId(auth.user.id);
      setEmail(auth.user.email ?? "");

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", auth.user.id)
        .maybeSingle();

      if (profileData) {
        setFirstName(profileData.first_name || "");
        setLastName(profileData.last_name || "");
        setGender(profileData.gender || "");

        // tenta ler data de nascimento (birth_date)
        if (profileData.birth_date) {
          const [year, month, day] = profileData.birth_date.split("-");
          setBirthDay(day || "");
          setBirthMonth(month || "");
          setBirthYear(year || "");
        } else if (profileData.age) {
          // fallback: se só existir age, deixa campos vazios mas não quebra
          setBirthDay("");
          setBirthMonth("");
          setBirthYear("");
        }

        setPhone(profileData.phone || "");
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  // =============================
  //   VALIDAÇÃO
  // =============================
  function validateForm() {
    // Nome / sobrenome
    if (!onlyLetters(firstName) || !onlyLetters(lastName)) {
      setError("Nome e sobrenome devem conter apenas letras.");
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

  // =============================
  //   SALVAR ALTERAÇÕES
  // =============================
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    if (!userId) {
      setError("Usuário não encontrado.");
      setSaving(false);
      return;
    }

    if (!validateForm()) {
      setSaving(false);
      return;
    }

    const day = Number(birthDay);
    const month = Number(birthMonth);
    const year = Number(birthYear);
    const age = calculateAge(year, month, day);
    const birthDate = `${year}-${birthMonth}-${birthDay.padStart(2, "0")}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        gender,
        birth_date: birthDate, // coluna DATE no Supabase
        age,
        phone: onlyDigits(phone),
      })
      .eq("id", userId);

    if (updateError) {
      console.error(updateError);
      setError("Erro ao salvar alterações. Tente novamente.");
      setSaving(false);
      return;
    }

    setSuccess("Dados salvos com sucesso!");
    setSaving(false);
  }

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  const birthDateDisplay =
    birthDay && birthMonth && birthYear
      ? `${birthDay.padStart(2, "0")}/${birthMonth}/${birthYear}`
      : null;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-6 bg-white dark:bg-[#0f0f0f] rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
        Dados Pessoais
      </h1>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        {/* Nome */}
        <div>
          <label className="font-semibold text-black dark:text-white">
            Nome
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg bg-white dark:bg-[#1a1a1a] text-black dark:text-white"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        {/* Sobrenome */}
        <div>
          <label className="font-semibold text-black dark:text-white">
            Sobrenome
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg bg-white dark:bg-[#1a1a1a] text-black dark:text-white"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        {/* Data de nascimento */}
        <div>
          <label className="font-semibold text-black dark:text-white mb-1 block">
            Data de nascimento
          </label>
          <div className="flex gap-3">
            {/* Dia */}
            <input
              type="number"
              placeholder="Dia"
              min={1}
              max={31}
              className="w-1/3 p-3 border rounded-lg bg-white dark:bg-[#1a1a1a] text-black dark:text-white"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              required
            />

            {/* Mês */}
            <select
              className="w-1/3 p-3 border rounded-lg bg-white dark:bg-[#1a1a1a] text-black dark:text-white dark:[color-scheme:dark]"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              required
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
              className="w-1/3 p-3 border rounded-lg bg-white dark:bg-[#1a1a1a] text-black dark:text-white"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              required
            />
          </div>

          {birthDateDisplay && computedAge !== null && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {birthDateDisplay} ({computedAge} anos)
            </p>
          )}
        </div>

        {/* Gênero */}
        <div>
          <label className="font-semibold text-black dark:text-white">
            Gênero
          </label>
          <select
            className="w-full p-3 border rounded-lg bg-white dark:bg-[#1a1a1a] text-black dark:text-white dark:[color-scheme:dark]"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        {/* Telefone */}
        <div>
          <label className="font-semibold text-black dark:text-white">
            Telefone
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg bg-white dark:bg-[#1a1a1a] text-black dark:text-white"
            value={formatPhone(phone)}
            onChange={(e) => setPhone(onlyDigits(e.target.value))}
            required
          />
        </div>

        {/* Email — não editável */}
        <div>
          <label className="font-semibold text-black dark:text-white">
            Email
          </label>
          <input
            type="email"
            disabled
            className="w-full p-3 border rounded-lg bg-gray-200 dark:bg-[#333] text-black dark:text-white cursor-not-allowed"
            value={email}
          />
        </div>

        {/* Mensagens */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        {/* Botão */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-bold bg-black text-white dark:bg-[#CFE0BC] dark:text-black"
        >
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </div>
  );
}
