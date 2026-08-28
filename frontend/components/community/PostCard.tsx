"use client";

import { Heart, MessageCircle } from "lucide-react";
import type { CommunityPost } from "@/lib/types";

export function PostCard({ post, onOpen }: { post: CommunityPost; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="cursor-pointer rounded-2xl border border-line bg-panel p-5 shadow-sm2 transition-all hover:-translate-y-0.5 hover:shadow-md2 sm:p-6"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 font-serif text-[13px] font-extrabold text-orange-700">
          {post.initials}
        </div>
        <div>
          <div className="text-[12.5px] font-bold">{post.author}</div>
          <div className="text-[11px] text-ink-faint">{post.time}</div>
        </div>
      </div>
      <h4 className="mb-1.5 text-[16px] font-bold">{post.title}</h4>
      <p className="mb-3.5 text-[12.5px] leading-relaxed text-ink-soft">{post.excerpt}</p>
      <div className="flex items-center gap-4">
        <div className="flex flex-1 flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-orange-50 px-2.5 py-1 text-[10.5px] font-bold text-orange-700">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-faint">
          <Heart size={14} /> {post.likes}
        </div>
        <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-faint">
          <MessageCircle size={14} /> {post.comments.length}
        </div>
      </div>
    </div>
  );
}
