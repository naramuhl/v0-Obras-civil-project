# Documentação do Sistema de Gestão para Construtor Civil

## Índice
1. [Visão Geral](#visão-geral)
2. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
3. [Sistema de Autenticação](#sistema-de-autenticação)
4. [Configuração Docker](#configuração-docker)
5. [Instalação e Execução](#instalação-e-execução)
6. [Guia de Uso](#guia-de-uso)
7. [API e Endpoints](#api-e-endpoints)
8. [Solução de Problemas](#solução-de-problemas)

## Visão Geral

O Sistema de Gestão para Construtor Civil é uma aplicação web completa para gerenciar projetos de construção civil de pequeno porte. O sistema permite o controle de obras, orçamentos, pagamentos, gastos e ferramentas, oferecendo uma interface intuitiva e responsiva.

### Principais Funcionalidades

- **Dashboard**: Visão geral das obras, gastos, pagamentos e ferramentas
- **Gestão de Obras**: Cadastro e acompanhamento de projetos
- **Orçamentos**: Cálculo automático baseado em valor por m²
- **Pagamentos**: Registro de pagamentos a funcionários e emissão de recibos
- **Gastos**: Controle de gastos com materiais e transporte
- **Ferramentas**: Inventário e alocação de ferramentas por obra
- **Usuários**: Gerenciamento de usuários e permissões

### Tecnologias Utilizadas

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Banco de Dados**: MySQL
- **Autenticação**: NextAuth.js
- **Containerização**: Docker e Docker Compose

## Estrutura do Banco de Dados

O banco de dados MySQL contém as seguintes tabelas:

- **employees**: Funcionários
- **projects**: Obras/Projetos
- **payments**: Pagamentos
- **expenses**: Gastos
- **tools**: Ferramentas
- **budgets**: Orçamentos
- **users**: Usuários do sistema

## Sistema de Autenticação

O sistema utiliza NextAuth.js para autenticação de usuários, oferecendo:

### Níveis de Acesso

O sistema possui três níveis de acesso:

1. **Administrador (admin)**
   - Acesso completo a todas as funcionalidades
   - Gerenciamento de usuários
   - Configurações do sistema

2. **Gerente (manager)**
   - Acesso a todas as funcionalidades operacionais
   - Sem acesso ao gerenciamento de usuários
   - Sem acesso às configurações avançadas

3. **Usuário (user)**
   - Acesso limitado às funcionalidades básicas
   - Visualização de dados
   - Operações básicas de cadastro

### Credenciais de Acesso

O sistema vem com três usuários pré-configurados:

1. **Administrador**
   - Email: admin@construcao.com
   - Senha: admin123
   - Nível: Administrador

2. **Gerente**
   - Email: gerente@construcao.com
   - Senha: admin123
   - Nível: Gerente

3. **Usuário**
   - Email: usuario@construcao.com
   - Senha: admin123
   - Nível: Usuário

**IMPORTANTE**: Por segurança, recomenda-se alterar essas senhas após o primeiro acesso ao sistema.

### Processo de Login

1. O usuário acessa a página de login (`/login`)
2. Insere email e senha
3. O sistema valida as credenciais contra o banco de dados
4. Se válidas, cria uma sessão e redireciona para o dashboard
5. Se inválidas, exibe mensagem de erro

### Proteção de Rotas

Todas as rotas do sistema são protegidas por um middleware que verifica se o usuário está autenticado. Caso não esteja, é redirecionado para a página de login.

### Gerenciamento de Usuários

Administradores podem:
- Criar novos usuários
- Editar usuários existentes
- Alterar níveis de acesso
- Desativar usuários

## Configuração Docker

O sistema utiliza Docker e Docker Compose para facilitar a implantação e garantir a consistência do ambiente. A configuração inclui:

1. **Serviço da Aplicação (app)**: Container com a aplicação Next.js
2. **Serviço de Banco de Dados (db)**: Container MySQL 8.0
3. **Serviço de Backup (backup)**: Container para realizar backups automáticos do banco de dados

### Arquivos de Configuração

- **docker-compose.yml**: Define os serviços, redes e volumes
- **Dockerfile**: Instruções para construir a imagem da aplicação
- **scripts/backup.sh**: Script para realizar backups automáticos

## Instalação e Execução

### Pré-requisitos

- Docker e Docker Compose instalados
- Git (opcional, para clonar o repositório)

### Passos para Instalação

1. Clone o repositório ou baixe os arquivos do projeto:
   \`\`\`bash
   git clone https://github.com/seu-usuario/construcao-civil.git
   cd construcao-civil
   \`\`\`

2. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
     \`\`\`
     DB_HOST=db
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=password
     DB_NAME=construcao_civil
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=sua_chave_secreta_aqui
     \`\`\`

3. Inicie os containers com Docker Compose:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

4. Acesse a aplicação:
   - Abra o navegador e acesse `http://localhost:3000`
   - Faça login com as credenciais padrão:
     - Email: admin@construcao.com
     - Senha: admin123

### Backup do Banco de Dados

O sistema realiza backups automáticos diariamente e mantém os arquivos dos últimos 7 dias. Os backups são armazenados no diretório `./backups` e são compactados em formato `.gz`.

Para restaurar um backup:

\`\`\`bash
# Descompacte o arquivo de backup
gunzip backup_YYYYMMDD_HHMMSS.sql.gz

# Restaure o banco de dados
docker exec -i construcao-civil_db_1 mysql -uroot -ppassword construcao_civil < backup_YYYYMMDD_HHMMSS.sql
\`\`\`

## Guia de Uso

### Login e Autenticação

Para acessar o sistema:
1. Acesse a página de login (`/login`)
2. Insira seu email e senha
3. Clique no botão "Entrar"

Para sair do sistema:
1. Clique no botão "Sair" no canto inferior da barra lateral

### Dashboard

O dashboard apresenta uma visão geral do sistema, incluindo:
- Número de obras em andamento
- Gastos do mês
- Pagamentos pendentes
- Ferramentas ativas
- Gráficos de gastos e receitas
- Listas de pagamentos e gastos recentes

### Gestão de Obras

Para cadastrar uma nova obra:
1. Acesse o menu "Obras"
2. Clique no botão "Nova Obra"
3. Preencha os dados solicitados:
   - Nome da obra
   - Cliente
   - Tamanho em m²
   - Status
   - Valor por m²
   - Datas de início e término previsto
4. Clique em "Salvar"

### Orçamentos

Para criar um novo orçamento:
1. Acesse o menu "Orçamentos"
2. Clique no botão "Novo Orçamento"
3. Selecione a obra
4. Defina o valor por m²
5. Adicione custos extras
6. O sistema calculará automaticamente o orçamento total
7. Clique em "Salvar"

### Pagamentos

Para registrar um novo pagamento:
1. Acesse o menu "Pagamentos"
2. Clique no botão "Novo Pagamento"
3. Selecione o funcionário
4. Selecione a obra
5. Informe o valor e a data
6. Adicione uma descrição
7. Clique em "Salvar"

Para emitir um recibo:
1. Na lista de pagamentos, clique no menu de ações do pagamento desejado
2. Selecione "Ver Recibo" ou "Imprimir Recibo"

### Gastos

Para registrar um novo gasto:
1. Acesse o menu "Gastos"
2. Clique no botão "Novo Gasto"
3. Selecione a categoria
4. Selecione a obra
5. Informe o valor e a data
6. Adicione uma descrição
7. Clique em "Salvar"

### Ferramentas

Para cadastrar uma nova ferramenta:
1. Acesse o menu "Ferramentas"
2. Clique no botão "Nova Ferramenta"
3. Informe o nome, quantidade e estado
4. Selecione a obra onde a ferramenta será alocada
5. Informe a data de aquisição
6. Clique em "Salvar"

Para transferir uma ferramenta:
1. Na lista de ferramentas, clique no menu de ações da ferramenta desejada
2. Selecione "Transferir"
3. Selecione a nova obra de destino
4. Clique em "Transferir"

### Gerenciamento de Usuários

Para acessar o gerenciamento de usuários (apenas administradores):
1. Acesse o menu "Usuários"
2. Visualize a lista de usuários cadastrados

Para cadastrar um novo usuário:
1. Clique no botão "Novo Usuário"
2. Preencha os dados solicitados:
   - Nome
   - Email
   - Senha
   - Nível de acesso (Administrador, Gerente ou Usuário)
3. Clique em "Salvar"

Para editar um usuário:
1. Na lista de usuários, clique no menu de ações do usuário desejado
2. Selecione "Editar"
3. Altere os dados necessários
4. Clique em "Salvar"

## API e Endpoints

O sistema possui uma API REST para comunicação entre o frontend e o backend. Os principais endpoints são:

### Autenticação
- `POST /api/auth/signin`: Autenticação de usuários
- `GET /api/auth/session`: Obtém informações da sessão atual
- `POST /api/auth/signout`: Encerra a sessão do usuário

### Usuários
- `GET /api/users`: Lista todos os usuários (requer permissão de administrador)
- `POST /api/users`: Cria um novo usuário (requer permissão de administrador)
- `GET /api/users/:id`: Obtém detalhes de um usuário específico
- `PUT /api/users/:id`: Atualiza um usuário existente
- `DELETE /api/users/:id`: Remove um usuário

### Projetos
- `GET /api/projects`: Lista todos os projetos
- `POST /api/projects`: Cria um novo projeto
- `GET /api/projects/:id`: Obtém detalhes de um projeto específico
- `PUT /api  Cria um novo projeto
- `GET /api/projects/:id`: Obtém detalhes de um projeto específico
- `PUT /api/projects/:id`: Atualiza um projeto existente
- `DELETE /api/projects/:id`: Remove um projeto

### Pagamentos
- `GET /api/payments`: Lista todos os pagamentos
- `POST /api/payments`: Cria um novo pagamento
- `GET /api/payments/:id`: Obtém detalhes de um pagamento específico
- `PUT /api/payments/:id`: Atualiza um pagamento existente
- `DELETE /api/payments/:id`: Remove um pagamento

### Gastos
- `GET /api/expenses`: Lista todos os gastos
- `POST /api/expenses`: Cria um novo gasto
- `GET /api/expenses/:id`: Obtém detalhes de um gasto específico
- `PUT /api/expenses/:id`: Atualiza um gasto existente
- `DELETE /api/expenses/:id`: Remove um gasto

### Ferramentas
- `GET /api/tools`: Lista todas as ferramentas
- `POST /api/tools`: Cadastra uma nova ferramenta
- `GET /api/tools/:id`: Obtém detalhes de uma ferramenta específica
- `PUT /api/tools/:id`: Atualiza uma ferramenta existente
- `DELETE /api/tools/:id`: Remove uma ferramenta
- `POST /api/tools/:id/transfer`: Transfere uma ferramenta para outra obra

### Orçamentos
- `GET /api/budgets`: Lista todos os orçamentos
- `POST /api/budgets`: Cria um novo orçamento
- `GET /api/budgets/:id`: Obtém detalhes de um orçamento específico
- `PUT /api/budgets/:id`: Atualiza um orçamento existente
- `DELETE /api/budgets/:id`: Remove um orçamento

## Solução de Problemas

### Problemas de Login

Se você estiver enfrentando problemas para fazer login no sistema, verifique:

1. **Credenciais corretas**: Confirme se está usando o email e senha corretos
2. **Banco de dados**: Verifique se o banco de dados está em execução e acessível
3. **Logs de erro**: Consulte os logs do servidor para identificar possíveis erros
4. **Conexão com o banco**: Teste a conexão com o banco de dados usando o endpoint `/api/test-auth`

Para redefinir as senhas dos usuários padrão:

\`\`\`bash
# Acesse o container do banco de dados
docker exec -it construcao-civil_db_1 bash

# Conecte-se ao MySQL
mysql -u root -p

# Digite a senha do banco de dados (padrão: password)

# Selecione o banco de dados
USE construcao_civil;

# Atualize a senha (exemplo para o usuário admin)
UPDATE users SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' WHERE email = 'admin@construcao.com';
\`\`\`

### Problemas de Conexão com o Banco de Dados

Se o sistema não conseguir se conectar ao banco de dados:

1. Verifique se o container do banco de dados está em execução:
   \`\`\`bash
   docker ps | grep db
   \`\`\`

2. Verifique os logs do container do banco de dados:
   \`\`\`bash
   docker logs construcao-civil_db_1
   \`\`\`

3. Confirme se as variáveis de ambiente estão configuradas corretamente no arquivo `.env`

4. Tente reiniciar o container do banco de dados:
   \`\`\`bash
   docker-compose restart db
   \`\`\`

### Problemas de Desempenho

Se o sistema estiver lento:

1. Verifique a utilização de recursos dos containers:
   \`\`\`bash
   docker stats
   \`\`\`

2. Otimize as consultas SQL adicionando índices apropriados
3. Considere aumentar os recursos alocados para os containers
4. Implemente cache para consultas frequentes

## Conclusão

O Sistema de Gestão para Construtor Civil oferece uma solução completa para o gerenciamento de projetos de construção civil de pequeno porte. Com uma interface intuitiva e funcionalidades abrangentes, o sistema permite controlar todos os aspectos do negócio, desde orçamentos até o controle de ferramentas.

A arquitetura baseada em Docker garante fácil implantação e manutenção, enquanto o banco de dados MySQL oferece estabilidade e confiabilidade para o armazenamento dos dados.

O sistema de autenticação baseado em NextAuth.js proporciona segurança e controle de acesso granular, permitindo que diferentes usuários tenham acesso apenas às funcionalidades relevantes para suas funções.
