'use client';

import { useEffect, useState } from 'react';
export default function FacebookInitiateCheckout() {
  const [hasTracked, setHasTracked] = useState(false); // Estado para controlar o rastreamento

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq && !hasTracked) {
      // Disparar o evento de InitiateCheckout
      window.fbq('track', 'InitiateCheckout', {
        value: 49.90,
        currency: 'BRL',
      });
      setHasTracked(true); // Marca o evento como já disparado
    }
  }, [hasTracked]); // O efeito é executado apenas uma vez, se o evento não foi disparado

  return null;
}
