# Nexus Finance - Dashboard de Criptomoedas

Este é um mini painel (dashboard) para uma plataforma financeira focada em criptomoedas, construído como teste prático para o Grupo Nexus. O objetivo do projeto é demonstrar organização, UI consistente e responsividade em uma aplicação web moderna.

## 🛠️ Stack Tecnológica

O projeto foi desenvolvido utilizando as ferramentas exigidas:
* [cite_start]**React + Vite**[cite: 13]: Escolhidos pela velocidade de compilação e excelente experiência de desenvolvimento.
* [cite_start]**TypeScript**[cite: 14]: Utilizado para garantir a tipagem estática e maior segurança no código, prevenindo erros em tempo de execução.
* [cite_start]**TailwindCSS**[cite: 15]: Adotado para a estilização rápida e responsiva, mantendo um design system consistente sem a necessidade de arquivos CSS externos.

**Bibliotecas auxiliares:**
* `react-router-dom`: Para o roteamento e navegação no lado do cliente (SPA).
* `lucide-react`: Para ícones vetoriais leves e padronizados.

## 🏗️ Estrutura do Projeto

A arquitetura de pastas foi pensada para ser escalável e de fácil manutenção:

* `/src/components`: Guarda componentes reutilizáveis, como o `Layout` principal (Sidebar/Bottom Navigation).
* `/src/mocks`: Contém a base de dados em memória (`data.ts`) com os usuários e transações iniciais, isolando a lógica de dados falsos do restante da aplicação.
* `/src/pages`: Armazena as telas principais da aplicação (Login, Home, Usuários, Depósito, Saque e Conversão).
* `/src/App.tsx`: Gerencia as rotas da aplicação.

*Nota sobre a API*: Conforme as regras do desafio, todas as telas utilizam dados mockados, com exceção da tela de **Conversão**, que faz consultas reais em tempo de execução à API pública da CoinGecko.

## 🚀 Como executar o projeto localmente

Siga os passos abaixo para rodar a aplicação na sua máquina:

1. **Clone o repositório**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd nexus-dashboard