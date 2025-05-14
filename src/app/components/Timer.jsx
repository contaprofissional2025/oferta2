import React, { useState, useEffect } from 'react';

const Timer = () => {
  // Defina o tempo inicial para o temporizador (exemplo: 1 hora em segundos)
  const [timeLeft, setTimeLeft] = useState(480); // 3600 segundos = 1 hora

  useEffect(() => {
    // Se o tempo chegar a zero, pare o temporizador
    if (timeLeft <= 0) return;

    // Atualiza o temporizador a cada segundo
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Limpeza do intervalo quando o componente é desmontado ou quando o tempo chega a zero
    return () => clearInterval(intervalId);
  }, [timeLeft]); // Dependência de timeLeft

  // Função para formatar o tempo (horas, minutos, segundos)
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <div className="m-auto flex w-full max-w-3xl items-center justify-center gap-5 px-2 py-4">
      <p className="w-auto max-w-[280px] text-base font-bold"></p>
      <p class="w-auto max-w-[280px] text-base font-bold  ">Direito de receber expira em:</p>
      <svg
      
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        className="h-10 w-10 flex-shrink-0"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m20.145 8.27 1.563-1.563-1.414-1.414L18.586 7c-1.05-.63-2.274-1-3.586-1-3.859 0-7 3.14-7 7s3.141 7 7 7 7-3.14 7-7a6.966 6.966 0 0 0-1.855-4.73zM15 18c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
        <path d="M14 10h2v4h-2zm-1-7h4v2h-4zM3 8h4v2H3zm0 8h4v2H3zm-1-4h3.99v2H2z"></path>
      </svg>
      
      <h1 className="text-2xl font-bold uppercase text-red-700  md:text-3xl">
        {formatTime(timeLeft)}
      </h1>
    </div>
  );
};

export default Timer;
