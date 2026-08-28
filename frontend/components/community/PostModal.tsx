"use client";

import { Modal } from "@/components/ui/Modal";
import type { CommunityPost } from "@/lib/types";

export function PostModal({ post, onClose }: { post: CommunityPost | null; onClose: () => void }) {
  return (
    <Modal open={!!post} onClose={onClose} maxWidthClass="max-w-[560px]">
      {post && (
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-serif text-[13px] font-extrabold text-orange-700">
              {post.initials}
            </div>
            <div>
              <div className="text-[12.5px] font-bold">{post.author}</div>
              <div className="text-[11px] text-ink-faint">{post.time}</div>
            </div>
          </div>
          <h2 className="mt-4 text-xl font-bold">{post.title}</h2>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-orange-50 px-2.5 py-1 text-[10.5px] font-bold text-orange-700">
                {t}
              </span>
            ))}
          </div>
          <div className="my-5 text-[13.5px] leading-relaxed text-ink-soft">
            {post.excerpt} Подробностями делятся другие владельцы в комментариях ниже — это демо-версия ленты
            сообщества, полноценные посты и переписка появятся на следующем этапе разработки.
          </div>
          <div className="flex flex-col gap-3.5 border-t border-line pt-4">
            {post.comments.length === 0 ? (
              <p className="text-[13px] text-ink-faint">Пока нет комментариев.</p>
            ) : (
              post.comments.map((c, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-[11px] font-extrabold text-orange-700">
                    {c.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{c.author}</div>
                    <div className="text-xs leading-relaxed text-ink-soft">{c.text}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
