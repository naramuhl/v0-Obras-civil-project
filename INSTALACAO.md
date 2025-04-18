# Guia de Instalação - Sistema de Gestão para Construtor Civil

Este documento contém instruções detalhadas para instalar e configurar o Sistema de Gestão para Construtor Civil em um servidor Linux Debian/Ubuntu.

## Índice

1. [Requisitos do Sistema](#requisitos-do-sistema)
2. [Instalação Automatizada](#instalação-automatizada)
3. [Instalação Manual](#instalação-manual)
4. [Configuração Pós-Instalação](#configuração-pós-instalação)
5. [Backup e Restauração](#backup-e-restauração)
6. [Atualização do Sistema](#atualização-do-sistema)
7. [Solução de Problemas](#solução-de-problemas)

## Requisitos do Sistema

### Hardware Recomendado
- CPU: 2 cores ou mais
- RAM: 4GB ou mais
- Armazenamento: 20GB de espaço livre
- Conexão de rede estável

### Software Necessário
- Sistema Operacional: Debian 10+ ou Ubuntu 20.04+
- Docker Engine 20.10+
- Docker Compose 2.0+
- Git (opcional, para clonar o repositório)

## Instalação Automatizada

Para facilitar a instalação, disponibilizamos um script que automatiza todo o processo em sistemas Debian/Ubuntu.

### Passo 1: Baixar o Script de Instalação

\`\`\`bash
wget https://raw.githubusercontent.com/seu-usuario/construcao-civil/main/install.sh
\`\`\`

### Passo 2: Tornar o Script Executável

\`\`\`bash
chmod +x install.sh
\`\`\`

### Passo 3: Executar o Script como Root

\`\`\`bash
sudo ./install.sh
\`\`\`

O script irá:
- Instalar todas as dependências necessárias (Docker, Docker Compose)
- Configurar o ambiente
- Criar as variáveis de ambiente
- Iniciar os containers
- Configurar o serviço para inicialização automática

Após a conclusão, o sistema estará disponível em `http://seu-ip-servidor:3000`.

## Instalação Manual

Se preferir realizar a instalação manualmente, siga os passos abaixo:

### Passo 1: Atualizar o Sistema

\`\`\`bash
sudo apt update
sudo apt upgrade -y
\`\`\`

### Passo 2: Instalar Dependências

\`\`\`bash
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release git
\`\`\`

### Passo 3: Instalar Docker

\`\`\`bash
# Adicionar chave GPG do Docker
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar repositório do Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizar lista de pacotes
sudo apt update

# Instalar Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Iniciar e habilitar serviço do Docker
sudo systemctl start docker
sudo systemctl enable docker
\`\`\`

### Passo 4: Instalar Docker Compose

\`\`\`bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
\`\`\`

### Passo 5: Clonar o Repositório

\`\`\`bash
sudo mkdir -p /opt/construcao-civil
sudo git clone https://github.com/seu-usuario/construcao-civil.git /opt/construcao-civil
\`\`\`

Ou, se você já possui os arquivos:

\`\`\`bash
sudo mkdir -p /opt/construcao-civil
sudo cp -r /caminho/para/arquivos/* /opt/construcao-civil/
\`\`\`

### Passo 6: Configurar Variáveis de Ambiente

\`\`\`bash
cd /opt/construcao-civil
sudo bash -c 'cat > .env << EOF
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=construcao_civil
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)
EOF'
\`\`\`

### Passo 7: Configurar Permissões

\`\`\`bash
sudo chmod +x /opt/construcao-civil/scripts/*.sh
\`\`\`

### Passo 8: Iniciar os Containers

\`\`\`bash
cd /opt/construcao-civil
sudo docker-compose up -d
\`\`\`

### Passo 9: Configurar Serviço Systemd

\`\`\`bash
sudo bash -c 'cat > /etc/systemd/system/construcao-civil.service << EOF
[Unit]
Description=Sistema de Gestão para Construtor Civil
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/construcao-civil
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF'

sudo systemctl daemon-reload
sudo systemctl enable construcao-civil.service
\`\`\`

## Configuração Pós-Instalação

### Acessando o Sistema

Após a instalação, o sistema estará disponível em:

\`\`\`
http://seu-ip-servidor:3000
\`\`\`

Use as seguintes credenciais para o primeiro acesso:

- **Email**: admin@construcao.com
- **Senha**: admin123

### Alterando a Senha Padrão

Por segurança, é altamente recomendável alterar a senha padrão após o primeiro acesso:

1. Faça login como administrador
2. Acesse o menu "Usuários"
3. Clique no usuário "Administrador"
4. Selecione "Editar"
5. Defina uma nova senha segura
6. Clique em "Salvar"

### Configurando o Acesso Externo

Para acessar o sistema de fora da rede local, você precisará:

1. Configurar o firewall para permitir acesso à porta 3000:

\`\`\`bash
sudo ufw allow 3000/tcp
\`\`\`

2. Atualizar a variável `NEXTAUTH_URL` no arquivo `.env` para o endereço externo:

\`\`\`bash
sudo sed -i 's|NEXTAUTH_URL=http://localhost:3000|NEXTAUTH_URL=http://seu-dominio-ou-ip:3000|g' /opt/construcao-civil/.env
\`\`\`

3. Reiniciar os containers:

\`\`\`bash
cd /opt/construcao-civil
sudo docker-compose down
sudo docker-compose up -d
\`\`\`

### Configurando HTTPS (Recomendado)

Para produção, é altamente recomendável configurar HTTPS. Uma opção é usar o Nginx como proxy reverso com Let's Encrypt:

1. Instalar Nginx e Certbot:

\`\`\`bash
sudo apt install -y nginx certbot python3-certbot-nginx
\`\`\`

2. Configurar o Nginx:

\`\`\`bash
sudo bash -c 'cat > /etc/nginx/sites-available/construcao-civil << EOF
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF'

sudo ln -s /etc/nginx/sites-available/construcao-civil /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
\`\`\`

3. Obter certificado SSL:

\`\`\`bash
sudo certbot --nginx -d seu-dominio.com
\`\`\`

4. Atualizar a variável `NEXTAUTH_URL` no arquivo `.env`:

\`\`\`bash
sudo sed -i 's|NEXTAUTH_URL=http://localhost:3000|NEXTAUTH_URL=https://seu-dominio.com|g' /opt/construcao-civil/.env
\`\`\`

5. Reiniciar os containers:

\`\`\`bash
cd /opt/construcao-civil
sudo docker-compose down
sudo docker-compose up -d
\`\`\`

## Backup e Restauração

### Backup Manual

Para realizar um backup manual do banco de dados:

\`\`\`bash
cd /opt/construcao-civil
sudo docker-compose exec db mysqldump -u root -ppassword construcao_civil > backup_$(date +%Y%m%d_%H%M%S).sql
\`\`\`

### Backup Automático

O sistema já está configurado para realizar backups automáticos diariamente. Os arquivos de backup são armazenados no diretório `/opt/construcao-civil/backups`.

Para verificar os backups existentes:

\`\`\`bash
ls -la /opt/construcao-civil/backups
\`\`\`

### Restauração de Backup

Para restaurar um backup:

\`\`\`bash
cd /opt/construcao-civil
# Se o backup estiver compactado
gunzip backup_YYYYMMDD_HHMMSS.sql.gz
# Restaurar o banco de dados
cat backup_YYYYMMDD_HHMMSS.sql | sudo docker-compose exec -T db mysql -u root -ppassword construcao_civil
\`\`\`

## Atualização do Sistema

Para atualizar o sistema para uma nova versão:

1. Fazer backup do banco de dados:

\`\`\`bash
cd /opt/construcao-civil
sudo docker-compose exec db mysqldump -u root -ppassword construcao_civil > backup_antes_atualizacao.sql
\`\`\`

2. Parar os containers:

\`\`\`bash
sudo docker-compose down
\`\`\`

3. Atualizar os arquivos do sistema:

Se você clonou do Git:

\`\`\`bash
sudo git pull
\`\`\`

Se você copiou os arquivos manualmente, substitua-os pelos novos.

4. Iniciar os containers novamente:

\`\`\`bash
sudo docker-compose up -d
\`\`\`

## Solução de Problemas

### Verificando Logs

Para verificar os logs do sistema:

\`\`\`bash
cd /opt/construcao-civil
sudo docker-compose logs -f app
\`\`\`

Para verificar os logs do banco de dados:

\`\`\`bash
sudo docker-compose logs -f db
\`\`\`

### Problemas de Conexão com o Banco de Dados

Se o sistema não conseguir se conectar ao banco de dados:

1. Verificar se o container do banco de dados está em execução:

\`\`\`bash
sudo docker-compose ps
\`\`\`

2. Verificar os logs do banco de dados:

\`\`\`bash
sudo docker-compose logs db
\`\`\`

3. Verificar as variáveis de ambiente:

\`\`\`bash
cat .env
\`\`\`

4. Tentar reiniciar o container do banco de dados:

\`\`\`bash
sudo docker-compose restart db
\`\`\`

### Problemas de Login

Se você estiver enfrentando problemas para fazer login:

1. Verificar os logs da aplicação:

\`\`\`bash
sudo docker-compose logs app
\`\`\`

2. Verificar se o banco de dados contém os usuários corretos:

\`\`\`bash
sudo docker-compose exec db mysql -u root -ppassword -e "SELECT email, role FROM construcao_civil.users;"
\`\`\`

3. Redefinir a senha do administrador:

\`\`\`bash
sudo docker-compose exec db mysql -u root -ppassword -e "UPDATE construcao_civil.users SET password = '\$2a\$10\$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' WHERE email = 'admin@construcao.com';"
\`\`\`

Isso redefinirá a senha para "admin123".

### Reiniciando Todo o Sistema

Se você precisar reiniciar todo o sistema:

\`\`\`bash
cd /opt/construcao-civil
sudo docker-compose down
sudo docker-compose up -d
\`\`\`

### Verificando o Status do Serviço

Para verificar o status do serviço systemd:

\`\`\`bash
sudo systemctl status construcao-civil
\`\`\`

Para iniciar o serviço:

\`\`\`bash
sudo systemctl start construcao-civil
\`\`\`

Para parar o serviço:

\`\`\`bash
sudo systemctl stop construcao-civil
\`\`\`

## Suporte Adicional

Se você encontrar problemas que não estão cobertos neste guia, entre em contato com o suporte técnico:

- Email: suporte@construcao-civil.com
- Telefone: (XX) XXXX-XXXX
- Horário de atendimento: Segunda a Sexta, das 8h às 18h
\`\`\`

Vamos criar também um script para verificar o status do sistema:
