// lib/registry.tsx
'use client';

import { useEffect, useState } from 'react';
import { ServerStyleSheet } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sheet] = useState(() => new ServerStyleSheet());
  const [styleTag, setStyleTag] = useState<string | null>(null);

  useEffect(() => {
    const styleTags = sheet.getStyleTags();
    setStyleTag(styleTags);
  }, [sheet]);

  return (
    <>
      {children}
      {styleTag && <>{styleTag}</>}
    </>
  );
}
