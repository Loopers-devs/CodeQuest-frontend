"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bold, Italic, List, Link, Code, Eye, Edit } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { useTranslations } from "next-intl";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  className = ""
}: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false);
  const t = useTranslations("createPost");

  const insertText = (before: string, after: string = "") => {
    const textarea = document.getElementById("markdown-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    // Restaurar la selección
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const toolbarButtons = [
    {
      icon: Bold,
      action: () => insertText("**", "**"),
      label: t("markdown.bold")
    },
    {
      icon: Italic,
      action: () => insertText("*", "*"),
      label: t("markdown.italic")
    },
    {
      icon: Code,
      action: () => insertText("`", "`"),
      label: t("markdown.code")
    },
    {
      icon: Link,
      action: () => insertText("[", "](url)"),
      label: t("markdown.link")
    },
    {
      icon: List,
      action: () => insertText("- ", ""),
      label: t("markdown.list")
    }
  ];

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t("content")}</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPreview(!preview)}
            className="gap-2"
          >
            {preview ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {preview ? t("markdown.edit") : t("markdown.preview")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!preview ? (
          <>
            {/* Toolbar */}
            <div className="flex gap-1 p-2 border rounded-md bg-muted/50">
              {toolbarButtons.map((button, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={button.action}
                  title={button.label}
                  className="h-8 w-8 p-0"
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* Editor */}
            <Textarea
              id="markdown-editor"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={t("markdown.placeholder")}
              className="min-h-[400px] font-mono text-sm resize-none"
            />
          </>
        ) : (
          /* Preview */
          <div className="min-h-[400px] p-4 border rounded-md bg-muted/20">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {value || t("defaultContent")}
              </ReactMarkdown>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {t("markdown.help")}
        </p>
      </CardContent>
    </Card>
  );
}