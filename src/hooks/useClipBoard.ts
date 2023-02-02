import copy from "copy-to-clipboard";
import { useCallback, useEffect, useState } from "react";

function useClipboard(text: string, timeout: number = 2500) {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = useCallback(() => {
    const didCopy = copy(text);
    setHasCopied(didCopy);
  }, [text]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (hasCopied) {
      timeoutId = setTimeout(() => {
        setHasCopied(false);
      }, timeout);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeout, hasCopied]);

  return { value: text, hasCopied, onCopy };
}

export default useClipboard;
