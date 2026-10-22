"use client";

import Image from "next/image";
import { useState } from "react";
import { fill, localeMeta, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/vi";

type Labels = Dictionary["admin"]["categories"];
type Names = Record<Locale, string>;
export type AdminCategory = { id: string; names: Names; posts: number };
type Message = { tone: "ok" | "error"; text: string };

const field =
  "w-full rounded-xl bg-white px-3.5 py-2 text-[15px] text-ink outline-none ring-1 ring-line placeholder:text-muted focus:ring-2 focus:ring-brand-500";

const emptyNames = () => Object.fromEntries(locales.map((l) => [l, ""])) as Names;
const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** 4 ô nhập tên chuyên mục, mỗi ô một ngôn ngữ (kèm cờ) */
function NameFields({ names, onChange }: { names: Names; onChange: (names: Names) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {locales.map((l) => (
        <label key={l} lang={localeMeta[l].htmlLang} className="flex items-center gap-2">
          <Image src={`/flags/${localeMeta[l].flag}.svg`} alt="" width={20} height={20} className="size-5 shrink-0 rounded-full" />
          <span className="sr-only">{localeMeta[l].label}</span>
          <input value={names[l]} placeholder={localeMeta[l].label} onChange={(e) => onChange({ ...names, [l]: e.target.value })} className={field} />
        </label>
      ))}
    </div>
  );
}

/**
 * Quản lý chuyên mục tin tức (bản demo, chỉ đổi trên trình duyệt): thêm (mã + tên 4 ngôn ngữ), sửa tên, xoá.
 * Không cho xoá chuyên mục còn bài viết.
 */
export default function CategoryManager({ initial, uiLocale, labels }: { initial: AdminCategory[]; uiLocale: Locale; labels: Labels }) {
  const [items, setItems] = useState(initial);
  const [adding, setAdding] = useState(false);
  const [newId, setNewId] = useState("");
  const [newNames, setNewNames] = useState(emptyNames);
  const [editing, setEditing] = useState<{ id: string; names: Names } | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  const complete = (names: Names) => locales.every((l) => names[l].trim() !== "");
  const nameOf = (c: AdminCategory) => c.names[uiLocale] || c.id;

  const add = () => {
    const id = newId.trim();
    if (!ID_PATTERN.test(id) || items.some((c) => c.id === id)) return setMessage({ tone: "error", text: labels.invalidId });
    if (!complete(newNames)) return setMessage({ tone: "error", text: labels.missingNames });
    setItems([...items, { id, names: newNames, posts: 0 }]);
    setAdding(false);
    setNewId("");
    setNewNames(emptyNames());
    setMessage({ tone: "ok", text: labels.added });
  };

  const save = () => {
    if (!editing) return;
    if (!complete(editing.names)) return setMessage({ tone: "error", text: labels.missingNames });
    setItems(items.map((c) => (c.id === editing.id ? { ...c, names: editing.names } : c)));
    setEditing(null);
    setMessage({ tone: "ok", text: labels.updated });
  };

  const askDelete = (c: AdminCategory) => {
    if (c.posts > 0) return setMessage({ tone: "error", text: fill(labels.inUse, { name: nameOf(c), n: c.posts }) });
    setConfirming(c.id);
    setMessage(null);
  };

  const remove = (id: string) => {
    setItems(items.filter((c) => c.id !== id));
    setConfirming(null);
    setMessage({ tone: "ok", text: labels.deleted });
  };

  const btn = "h-9 rounded-full px-4 text-sm font-medium";

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-[-0.01em] text-ink">{labels.title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            {fill(labels.count, { n: items.length })} · {labels.description}
          </p>
        </div>
        {!adding && (
          <button type="button" onClick={() => setAdding(true)} className="h-10 rounded-full bg-brand-600 px-5 text-sm font-medium text-white hover:bg-brand-700">
            + {labels.add}
          </button>
        )}
      </div>

      <div role="status" aria-live="polite">
        {message && (
          <p
            className={`mt-5 rounded-xl px-4 py-3 text-sm ${
              message.tone === "ok" ? "bg-brand-50 text-brand-700 ring-1 ring-brand-100" : "bg-red-50 text-red-700 ring-1 ring-red-100"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>

      {adding && (
        <section className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-line md:p-6">
          <p className="font-semibold text-ink">{labels.add}</p>
          <label className="mt-4 block max-w-sm">
            <span className="text-sm text-ink-soft">{labels.id}</span>
            <input value={newId} onChange={(e) => setNewId(e.target.value.toLowerCase())} placeholder="spa-wellness" className={`${field} mt-1.5 font-mono text-sm`} />
          </label>
          <p className="mt-1.5 text-xs text-muted">{labels.idHint}</p>
          <p className="mt-5 text-sm text-ink-soft">{labels.name}</p>
          <div className="mt-1.5">
            <NameFields names={newNames} onChange={setNewNames} />
          </div>
          <div className="mt-5 flex gap-2">
            <button type="button" onClick={add} className={`${btn} bg-brand-600 text-white hover:bg-brand-700`}>
              {labels.save}
            </button>
            <button type="button" onClick={() => setAdding(false)} className={`${btn} text-ink ring-1 ring-line hover:bg-surface`}>
              {labels.cancel}
            </button>
          </div>
        </section>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-xs text-muted uppercase">
            <tr>
              <th className="px-5 py-3 font-medium">{labels.name}</th>
              <th className="px-5 py-3 font-medium">{labels.id}</th>
              <th className="px-5 py-3 font-medium">{labels.posts}</th>
              <th className="px-5 py-3 text-right font-medium">{labels.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.map((c) =>
              editing?.id === c.id ? (
                <tr key={c.id} className="bg-surface/60">
                  <td colSpan={4} className="px-5 py-4">
                    <p className="mb-3 font-mono text-xs text-muted">{c.id}</p>
                    <NameFields names={editing.names} onChange={(names) => setEditing({ id: c.id, names })} />
                    <div className="mt-4 flex gap-2">
                      <button type="button" onClick={save} className={`${btn} bg-brand-600 text-white hover:bg-brand-700`}>
                        {labels.save}
                      </button>
                      <button type="button" onClick={() => setEditing(null)} className={`${btn} text-ink ring-1 ring-line hover:bg-white`}>
                        {labels.cancel}
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={c.id}>
                  <td className="px-5 py-3">
                    <p className="font-medium text-ink">{nameOf(c)}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {locales
                        .filter((l) => l !== uiLocale)
                        .map((l) => c.names[l])
                        .join(" · ")}
                    </p>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-ink-soft">{c.id}</td>
                  <td className="px-5 py-3 text-ink-soft tabular-nums">{fill(labels.postsCount, { n: c.posts })}</td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    {confirming === c.id ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="text-ink">{fill(labels.confirmDelete, { name: nameOf(c) })}</span>
                        <button type="button" onClick={() => remove(c.id)} className={`${btn} bg-red-600 text-white hover:bg-red-700`}>
                          {labels.confirm}
                        </button>
                        <button type="button" onClick={() => setConfirming(null)} className={`${btn} text-ink ring-1 ring-line hover:bg-surface`}>
                          {labels.cancel}
                        </button>
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setEditing({ id: c.id, names: c.names });
                            setMessage(null);
                          }}
                          className="font-medium text-brand-600 hover:text-brand-700"
                        >
                          {labels.edit}
                        </button>
                        <span className="mx-2 text-line" aria-hidden>
                          |
                        </span>
                        <button type="button" onClick={() => askDelete(c)} className="font-medium text-red-600 hover:text-red-700">
                          {labels.delete}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
