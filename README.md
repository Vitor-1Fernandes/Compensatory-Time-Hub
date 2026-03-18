# 🕒 Banco de Horas Hub

Aplicação **Full Stack** de autogestão de jornada de trabalho, desenvolvida para facilitar o acompanhamento de saldos de banco de horas e horas extras de forma automatizada e segura.

---

## 🎯 Visão do Produto
Este projeto foi concebido para resolver a dificuldade de acompanhamento manual de saldos de horas. O sistema centraliza o histórico de atividades e automatiza a lógica de compensação de forma intuitiva.

---

## 🛠️ Stack Técnica
* **Frontend:** React.js + Tailwind CSS (Deploy: **Vercel**)
* **Backend:** Node.js + Express (Deploy: **Render**)
* **Banco de Dados:** MongoDB Atlas
* **Comunicação:** Axios para consumo de API REST
* **Autenticação:** JSON Web Token (JWT)

---

## 🚀 Funcionalidades Detalhadas

### 🔐 Gestão de Acesso e Segurança (RF01, RF02)
* **Validação em Tempo Real:** O hook `useEffect` monitora a integridade da sessão a cada navegação, consultando o endpoint `/api/validacao` para garantir que o token não expirou.
* **Redirecionamento Automático:** Caso a sessão seja inválida (HTTP 403), o usuário é desconectado, protegendo os dados sensíveis.

### 📝 Registro de Expediente Inteligente (RF03)
* **Atalhos de Lógica:** Ao selecionar "Folga - Descontar do Banco", o sistema preenche automaticamente a jornada padrão (08:00 às 17:00).
* **Trava de Consistência:** Bloqueio de lançamentos onde o horário de entrada é superior ao de saída, evitando erros de cálculo no banco.
* **Validação de Inputs:** Verificação de campos vazios antes do envio para garantir a integridade do banco de dados.

### 📊 Visualização e Histórico Dinâmico (RF05)
* **Sincronização Instantânea:** Dados buscados na API e refletidos em tempo real no componente `<DailyCard />`.
* **Persistência Híbrida:** Uso de `localStorage` para manter o cache do histórico (`workDaysList`)

### 🛠️ Manutenção e Ajuste de Saldo (RF04, RF06, RF07)
* **CRUD Completo:** Edição via modal que carrega os dados prévios e exclusão com atualização otimizada da interface.
* **Ajuste Legado:** Funcionalidade para inserção de saldo inicial, facilitando a migração de controles antigos para o Hub.

### 📅 Fechamento de Folha e Ciclo Contábil (RN02)

O sistema automatiza o fechamento mensal seguindo a regra de negócio específica da organização, garantindo que o saldo exibido no **CardTime** seja fidedigno ao período contábil real:

* **Recorte Temporal (Corte):** O fechamento não segue o mês civil (01 a 31), mas sim o intervalo dinâmico entre o **dia 14 de um mês** e o **dia 13 do próximo mê**.
* **Consolidação de Período:** O motor de cálculo filtra automaticamente os registros dentro desse range, separando o que pertence à folha atual do que será contabilizado apenas no próximo ciclo.
* **Precisão de Saldo:** Essa lógica impede que horas trabalhadas após o dia 13 "mascarem" o saldo que deve ser enviado para o fechamento da folha de pagamento, proporcionando uma visão real de banco de horas/extras acumuladas.

---
