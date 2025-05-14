const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
// Exemplo para Express.js
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // ou 'http://localhost:3000' para restringir
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/create-transaction', async (req, res) => {
  try {
    // Validação dos campos obrigatórios
    if (!req.body.amount) {
      return res.status(400).json({ error: 'O campo "amount" é obrigatório' });
    }

    // Construção do payload conforme documentação
    const payload = {
      name: req.body.name || 'Cliente Não Informado',
      email: req.body.email || 'no-reply@example.com',
      cpf: req.body.cpf || '03762677042',
      phone: req.body.phone || '00000000000',
      paymentMethod: req.body.paymentMethod || 'PIX',
      amount: req.body.amount,
      traceable: req.body.traceable !== undefined ? req.body.traceable : true,
      items: req.body.items || [{
        unitPrice: req.body.amount,
        title: 'Produto/Serviço',
        quantity: 1,
        tangible: false
      }],
      // Campos opcionais
      ...(req.body.creditCard && { creditCard: req.body.creditCard }),
      ...(req.body.cep && { cep: req.body.cep }),
      ...(req.body.complement && { complement: req.body.complement }),
      ...(req.body.street && { street: req.body.street }),
      ...(req.body.district && { district: req.body.district }),
      ...(req.body.city && { city: req.body.city }),
      ...(req.body.state && { state: req.body.state }),
      ...(req.body.utmQuery && { utmQuery: req.body.utmQuery }),
      ...(req.body.checkoutUrl && { checkoutUrl: req.body.checkoutUrl }),
      ...(req.body.referrerUrl && { referrerUrl: req.body.referrerUrl }),
      ...(req.body.externalId && { externalId: req.body.externalId }),
      ...(req.body.postbackUrl && { postbackUrl: req.body.postbackUrl }),
      ...(req.body.fingerPrints && { fingerPrints: req.body.fingerPrints })
    };

    // Requisição para a API Ghostspays
    const response = await axios.post(
      'https://app.ghostspaysv1.com/api/v1/transaction.purchase',
      payload,
      {
        headers: {
          'Authorization': process.env.SECRET_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    res.json(response.data);
    console.log(response.data)
  } catch (error) {
    console.error('Erro na transação:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    
    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      error: 'Erro ao criar transação',
      details: error.response?.data || error.message
    });
  }
});
app.get('/check-status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const response = await axios.get(
      `https://app.ghostspaysv1.com/api/v1/transaction.getPayment?id=${id}`,
      {
        headers: {
          'Authorization': process.env.SECRET_KEY
        }
      }
    );

    res.json(response.data);
    console.log(response.data)
  } catch (error) {
    console.error('Erro ao checar status:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Erro ao checar status',
      details: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});