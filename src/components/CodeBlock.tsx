import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  title?: string;
}

const CodeBlock = ({ code, title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden my-4">
      <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">{title || 'C++'}</span>
        <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
          {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="bg-code p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground leading-relaxed whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
