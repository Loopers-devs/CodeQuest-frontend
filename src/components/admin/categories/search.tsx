"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoriesSearch() {
	const router = useRouter();
	const [q, setQ] = useState("");

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Construir nueva URL manteniendo pathname actual
		const pathname = window.location.pathname;
		const searchParams = new URLSearchParams(window.location.search);
		if (q) searchParams.set("search", q);
		else searchParams.delete("search");
		// opcional: resetear página al buscar
		searchParams.delete("page");
		router.push(`${pathname}?${searchParams.toString()}`);
	};

	return (
		<form onSubmit={onSubmit} className="mb-4 flex gap-2">
			<input
				type="search"
				placeholder="Buscar categorías..."
				value={q}
				onChange={(e) => setQ(e.target.value)}
				className="border px-2 py-1 rounded flex-1"
			/>
			<button type="submit" className="px-3 py-1 bg-slate-700 text-white rounded">
				Buscar
			</button>
		</form>
	);
}
