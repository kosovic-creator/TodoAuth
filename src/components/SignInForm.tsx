"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // bitno!
    });

    setLoading(false);

    if (res?.ok) {
      router.refresh(); // osveži sesiju na stranici
      router.push("/todo"); // ili gde želiš
    } else if (res?.error) {
      setError("Pogrešan email ili lozinka.");
    } else {
      setError("Nešto nije u redu. Pokušajte ponovo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        autoComplete="email"
        className="w-full border rounded px-3 py-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Lozinka"
        required
        autoComplete="current-password"
        className="w-full border rounded px-3 py-2"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded py-2"
        disabled={loading}
      >
        {loading ? "Prijavljivanje..." : "Prijavi se"}
      </button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}
