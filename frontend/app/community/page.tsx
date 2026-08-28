"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/community/PostCard";
import { PostModal } from "@/components/community/PostModal";
import { COMMUNITY_POSTS, COMMUNITY_TAGS } from "@/lib/data";
import type { CommunityPost } from "@/lib/types";

export default function CommunityPage() {
  const [activeTag, setActiveTag] = useState<string>("all");
  const [openPost, setOpenPost] = useState<CommunityPost | null>(null);

  const filtered = useMemo(
    () => COMMUNITY_POSTS.filter((p) => activeTag === "all" || p.tags.includes(activeTag)),
    [activeTag]
  );

  return (
    <div>
      <span className="mb-3.5 inline-flex rounded-full bg-orange-100 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wide text-orange-600">
        Community
      </span>
      <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-[32px]">Сообщество</h1>
      <p className="mb-6 max-w-2xl text-[13px] leading-relaxed text-ink-soft sm:text-[14.5px]">
        Владельцы обсуждают породы, здоровье, дрессировку и делятся опытом — третий контур экосистемы, который
        повышает удержание пользователей.
      </p>

      <div className="mb-7 flex flex-wrap gap-2">
        <TagChip active={activeTag === "all"} label="Все темы" onClick={() => setActiveTag("all")} />
        {COMMUNITY_TAGS.map((t) => (
          <TagChip key={t} active={activeTag === t} label={t} onClick={() => setActiveTag(t)} />
        ))}
      </div>

      <div className="flex flex-col gap-3.5">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} onOpen={() => setOpenPost(post)} />
        ))}
      </div>

      <PostModal post={openPost} onClose={() => setOpenPost(null)} />
    </div>
  );
}

function TagChip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-[1.5px] px-4 py-2 text-[12.5px] font-semibold transition-all ${
        active ? "border-ink bg-ink text-white" : "border-line-strong bg-white text-ink-soft hover:border-orange-400"
      }`}
    >
      {label}
    </button>
  );
}
