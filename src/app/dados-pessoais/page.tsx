"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

type ProfileRow = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  age: number | null;
  phone: string | null;
  birth_date: string | null; // coluna DATE no Supabase (opcional)
};

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
  const idx = MONTHS.findIndex((item) => item.value === m);
  return idx >= 0 ? idx : 0;
}

function calculateAgeFromDate(date: Date): number {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  return age;
}

function applyPhoneMask(value: string): string {
  let v = value.replace(/\D/g, "");

  if (v.length <= 10) {
    // fixo
    v = v.replace(/^(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    // celular
    v = v.replace(/^(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
  }

  return v;
}

export default function DadosPessoaisPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);

  // CAMPOS
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState("");   // "11"
  const [birthMonth, setBirthMonth] = useState(""); // "Jun"
  const [birthYear, setBirthYear] = useState(""); // "2003"
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");         // com máscara
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        .maybeSingle<ProfileRow>();

      if (profileData) {
        setFirstName(profileData.first_name || "");
        setLastName(profileData.last_name || "");
        setGender(profileData.gender || "");

        // Telefone vem salvo só com números → aplicar máscara
        if (profileData.phone) {
          setPhone(applyPhoneMask(profileData.phone));
        }

        // Data de nascimento
        if (profileData.birth_date) {
          const d = new Date(profileData.birth_date);
          setBirthDay(String(d.getDate()).padStart(2, "0"));
          setBirthMonth(MONTHS[d.getMonth()].value);
          setBirthYear(String(d.getFullYear()));
        } else if (profileData.age) {
          // fallback se só existir age (raro)
          setBirthYear("");
        }
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  // =============================
  //   SALVAR ALTERAÇÕES
  // =============================
  async function handleSave(e: any) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    // ===== VALIDACOES BÁSICAS =====
    const onlyLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    if (!onlyLetters.test(firstName)) {
      setError("O nome deve conter apenas letras.");
      setSaving(false);
      return;
    }
    if (!onlyLetters.test(lastName)) {
      setError("O sobrenome deve conter apenas letras.");
      setSaving(false);
      return;
    }

    if (!birthDay || !birthMonth || !birthYear) {
      setError("Informe sua data de nascimento completa.");
      setSaving(false);
      return;
    }

    const dayNum = Number(birthDay);
    const yearNum = Number(birthYear);
    const monthIndex = monthStringToIndex(birthMonth);

    const birthDate = new Date(yearNum, monthIndex, dayNum);

    // validar data real
    if (
      birthDate.getDate() !== dayNum ||
      birthDate.getMonth() !== monthIndex ||
      birthDate.getFullYear() !== yearNum
    ) {
      setError("Data de nascimento inválida.");
      setSaving(false);
      return;
    }

    const ageCalc = calculateAgeFromDate(birthDate);
    if (ageCalc < 16 || ageCalc > 120) {
      setError("A idade deve estar entre 16 e 120 anos.");
      setSaving(false);
      return;
    }

    if (!gender) {
      setError("Selecione um gênero.");
      setSaving(false);
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      setError("Telefone inválido. Verifique o número digitado.");
      setSaving(false);
      return;
    }

    const birthIso = birthDate.toISOString().slice(0, 10); // YYYY-MM-DD

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        gender,
        phone: phoneDigits,
        birth_date: birthIso,
        age: ageCalc,
      })
      .eq("id", userId);

    if (updateError) {
      setError("Erro ao salvar alterações.");
      setSaving(false);
      return;
    }

    setSuccess("Dados salvos com sucesso!");
    setSaving(false);
  }

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  // Texto "11/06/2003 (22 anos)"
  let resumoNascimento = "";
  if (birthDay && birthMonth && birthYear) {
    const dayNum = Number(birthDay);
    const yearNum = Number(birthYear);
    const monthIndex = monthStringToIndex(birthMonth);
    const birthDate = new Date(yearNum, monthIndex, dayNum);
    const age = calculateAgeFromDate(birthDate);

    const dd = String(dayNum).padStart(2, "0");
    const mm = String(monthIndex + 1).padStart(2, "0");
    resumoNascimento = `${dd}/${mm}/${yearNum} (${age} anos)`;
  }

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
          <label className="font-semibold text-black dark:text-white">
            Data de nascimento
          </label>
          <div className="flex gap-3 mt-1">
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

            <select
              className="w-1/3 p-3 border rounded-lg bg-white dark:bg-[#1a1a1a] text-black dark:text-white"
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

            <input
              type="number"
              placeholder="Ano"
              className="w-1/3 p-3 border rounded-lg bg-white dark:bg-[#1a1a1a] text-black dark:text-white"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              required
            />
          </div>

          {resumoNascimento && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {resumoNascimento}
            </p>
          )}
        </div>

        {/* Gênero */}
        <div>
          <label className="font-semibold text-black dark:text-white">
            Gênero
          </label>
          <select
            className="w-full p-3 border rounded-lg bg-white dark:bg-[#1a1a1a] text-black dark:text-white"
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
            value={phone}
            onChange={(e) => setPhone(applyPhoneMask(e.target.value))}
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
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative dark:bg-green-900 dark:text-green-200">
            {success}
          </div>
        )}

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
