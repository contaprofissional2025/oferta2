import React from 'react';

const Reclame = () => {
  return (
    <div className="mt-4 flex w-full flex-col gap-2">
      <div className="grid w-full grid-cols-1 gap-4">
        <div className="h-max w-full rounded border border-gray-200 bg-white p-3">
          <div className="flex w-full items-center gap-3">
            <div
              className="relative flex items-center justify-center overflow-hidden object-contain"
              style={{ width: '60px', height: '60px' }}
            >
              <img
                alt="RECLAME AQUI"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className=""
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  left: '0',
                  top: '0',
                  right: '0',
                  bottom: '0',
                  objectFit: 'cover',
                  color: 'transparent',
                }}
                sizes="100vw"
                src='pagamento/ra.webp'
              />
            </div>
            <div className="relative w-full">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    color="#FFD200"
                    style={{ color: '#FFD200' }}
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z" />
                  </svg>
                ))}
              </div>
              <p className=" text-black font-bold">RECLAME AQUI</p>
              <p className="text-sm">
                Apresenta um excelente histórico de atendimento em nossa
                plataforma. Com alto índice de resolução de problemas, respostas
                rápidas e satisfação do consumidor acima da média, a empresa
                demonstra compromisso com a experiência do cliente. Pode confiar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reclame;
