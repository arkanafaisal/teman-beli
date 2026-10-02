import { useState } from "react";
import { detailData } from "../../data/detail";

export default function DetailReplies({ replies, isLoggedIn, onAddReply }) {
  const [replyText, setReplyText] = useState("");

  const handleAdd = () => {
    if (!replyText.trim()) return;
    onAddReply(replyText);
    setReplyText("");
  };

  return (
    <div className="space-y-4 pt-6 border-t border-border-base">
      <h3 className="font-bold text-base flex items-center gap-2">
        <span>{detailData.replies.title}</span>
      </h3>

      <div className="space-y-3">
        {replies && replies.length > 0 ? (
          replies.map((r, idx) => (
            <div key={idx} className="p-3 bg-bg-subtle rounded-xl text-xs space-y-1">
              <span className="text-text-muted font-medium">{r.date}</span>
              <p className="text-text-base">{r.text}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-text-muted italic">{detailData.replies.emptyReplies}</p>
        )}
      </div>

      {isLoggedIn && (
        <div className="pt-3 border-t border-border-subtle flex gap-2">
          <input 
            type="text" 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={detailData.replies.inputPlaceholder} 
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-border-base dark:bg-bg-subtle focus:outline-none"
          />
          <button onClick={handleAdd} className="bg-primary-base text-text-inverted text-xs px-4 py-2 rounded-lg font-medium">{detailData.replies.sendButton}</button>
        </div>
      )}
    </div>
  );
}
