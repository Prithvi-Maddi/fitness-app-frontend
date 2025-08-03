"use client";

import {useState, FormEvent } from "react";
export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const API = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API}/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, password}),
            });

            if (!res.ok) {
                const body = await res.json();
                throw new Error(body.detail || `Error ${res.status}`);
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
            {success ? (
            <p className="text-green-600 text-center">
                Registration successful! You can now log in.
            </p>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                <div className="text-red-600 text-sm">{error}</div>
                )}

                <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                </div>

                <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                </div>

                <div>
                <label className="block mb-1 font-semibold">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                {loading ? "Registering…" : "Register"}
                </button>
            </form>
            )}
            </div>
    )
}