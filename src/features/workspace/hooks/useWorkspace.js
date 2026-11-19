import { useState } from "react";
import { initialWorkspace } from "../constants/demoData";
import { isWorkspace } from "../utils/workspace";

const key = "dobis-workspace-v1";
function readWorkspace() {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return { data: initialWorkspace, warning: "" };
    const parsed = JSON.parse(stored);
    if (isWorkspace(parsed)) return { data: parsed, warning: "" };
    return {
      data: initialWorkspace,
      warning:
        "Saved demo data was incompatible. A fresh sample has been loaded.",
    };
  } catch {
    return {
      data: initialWorkspace,
      warning:
        "Browser storage is unavailable or unreadable. You can still explore this session.",
    };
  }
}
export default function useWorkspace() {
  const [state, setState] = useState(readWorkspace);
  const update = (transform) => {
    const data = transform(state.data);
    let warning = "";
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      warning =
        "Changes work in this session, but your browser could not save them.";
    }
    setState({ data, warning });
  };
  return { ...state, update };
}
