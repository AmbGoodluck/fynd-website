"use client";

import { useState } from "react";
import { ArrowRight, LocateFixed, Search } from "lucide-react";

interface DiscoverySearchProps {
  onSearchCity: (city: string) => void;
  onUseLocation: () => void;
  loading: boolean;
}

export const DiscoverySearch = ({ onSearchCity, onUseLocation, loading }: DiscoverySearchProps) => {
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearchCity(trimmed);
  };

  return (
    <div className="max-w-xl mx-auto mb-4">
      <form onSubmit={submit} className="glass rounded-full pl-6 pr-2 py-2 flex items-center gap-2 shadow-sm">
        <Search className="w-4 h-4 text-ink-muted flex-shrink-0" aria-hidden="true" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Try New York, London, Tokyo, Freetown…"
          aria-label="Search a city"
          disabled={loading}
          className="flex-1 bg-transparent text-ink text-base placeholder:text-ink-muted/70 outline-none min-w-0 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || !value.trim()}
          aria-label="Search"
          className="flex-shrink-0 w-11 h-11 rounded-full bg-fynd text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="flex flex-col items-center gap-1.5 mt-4">
        <button
          type="button"
          onClick={onUseLocation}
          disabled={loading}
          className="inline-flex items-center gap-2 text-sm font-semibold text-fynd hover:text-fynd-dark transition-colors disabled:opacity-50"
        >
          <LocateFixed className="w-4 h-4" />
          Use my location instead
        </button>
        <p className="text-xs text-ink-muted/70">Your exact location is never stored.</p>
      </div>
    </div>
  );
};
