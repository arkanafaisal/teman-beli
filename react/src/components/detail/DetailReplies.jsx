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
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
      <h3 className="font-bold text-base flex items-center gap-2">
        <span>{detailData.replies.title}</span>
        <span className="text-xs font-normal text-slate-400">{detailData.replies.subtitle}</span>
      </h3>

      <div className="space-y-3">
        {replies && replies.length > 0 ? (
          replies.map((r, idx) => (
            <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl text-xs space-y-1">
              <span className="text-slate-400 font-medium">{r.date}</span>
              <p className="text-slate-700 dark:text-slate-200">{r.text}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 italic">{detailData.replies.emptyReplies}</p>
        )}
      </div>

      {isLoggedIn && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
          <input 
            type="text" 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={detailData.replies.inputPlaceholder} 
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:outline-none"
          />
          <button onClick={handleAdd} className="bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-medium">{detailData.replies.sendButton}</button>
        </div>
      )}
    </div>
  );
}
