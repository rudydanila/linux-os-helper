import React, { useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function LabRedirect({ file }) {
  const pdfUrl = useBaseUrl(`/pdf/${file}`);

  useEffect(() => {
    window.location.href = pdfUrl;
  }, [pdfUrl]);

  return null;
}
