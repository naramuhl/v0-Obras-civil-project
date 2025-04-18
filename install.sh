#!/bin/bash

# Script de instalação do Sistema de Gestão para Construtor Civil
# Para uso em sistemas Debian/Ubuntu

# Cores para melhorar a legibilidade
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para exibir mensagens de progresso
print_message() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

# Função para exibir avisos
print_warning() {
  echo -e "${YELLOW}[AVISO]${NC} $1"
}

# Função para exibir erros
print_error() {
  echo -e "${RED}[ERRO]${NC} $1"
}

# Função para verificar se o comando foi executado com sucesso
check_success() {
  if [ $? -eq 0 ]; then
    print_message "$1"
  else
    print_error "$2"
    exit 1
  fi
}

# Verificar se está sendo executado como root
if [ "$EUID" -ne 0 ]; then
  print_error "Este script precisa ser executado como root (sudo)."
  exit 1
fi

# Verificar se o sistema é Debian/Ubuntu
if [ ! -f /etc/debian_version ]; then
  print_error "Este script foi projetado para sistemas Debian/Ubuntu."
  exit 1
fi

print_message "Iniciando instalação do Sistema de Gestão para Construtor Civil..."
print_message "Atualizando lista de pacotes..."

# Atualizar lista de pacotes
apt-get update
check_success "Lista de pacotes atualizada com sucesso." "Falha ao atualizar lista de pacotes."

# Instalar pacotes necessários
print_message "Instalando pacotes necessários..."
apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release git
check_success "Pacotes básicos instalados com sucesso." "Falha ao instalar pacotes básicos."

# Verificar se o Docker já está instalado
if command -v docker &> /dev/null; then
  print_warning "Docker já está instalado. Pulando instalação."
else
  # Adicionar chave GPG oficial do Docker
  print_message "Adicionando repositório do Docker..."
  curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  
  # Adicionar repositório do Docker
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  
  # Atualizar lista de pacotes novamente
  apt-get update
  
  # Instalar Docker
  print_message "Instalando Docker..."
  apt-get install -y docker-ce docker-ce-cli containerd.io
  check_success "Docker instalado com sucesso." "Falha ao instalar Docker."
  
  # Iniciar e habilitar serviço do Docker
  systemctl start docker
  systemctl enable docker
  check_success "Serviço Docker iniciado e habilitado." "Falha ao iniciar serviço Docker."
fi

# Verificar se o Docker Compose já está instalado
if command -v docker-compose &> /dev/null; then
  print_warning "Docker Compose já está instalado. Pulando instalação."
else
  # Instalar Docker Compose
  print_message "Instalando Docker Compose..."
  curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  check_success "Docker Compose instalado com sucesso." "Falha ao instalar Docker Compose."
fi

# Criar diretório para o projeto
print_message "Criando diretório para o projeto..."
mkdir -p /opt/construcao-civil
check_success "Diretório criado com sucesso." "Falha ao criar diretório."

# Perguntar se deseja clonar do Git ou usar arquivos locais
read -p "Deseja clonar o repositório do Git? (s/n): " clone_git

if [[ "$clone_git" =~ ^[Ss]$ ]]; then
  # Solicitar URL do repositório
  read -p "Digite a URL do repositório Git: " git_url
  
  # Clonar repositório
  print_message "Clonando repositório..."
  git clone "$git_url" /opt/construcao-civil
  check_success "Repositório clonado com sucesso." "Falha ao clonar repositório."
else
  print_message "Copiando arquivos para o diretório do projeto..."
  # Aqui você pode adicionar lógica para copiar arquivos locais
  # Por exemplo, se os arquivos estiverem em um diretório específico
  
  # Verificar se o diretório atual contém os arquivos necessários
  if [ -f "docker-compose.yml" ] && [ -f "Dockerfile" ]; then
    cp -r ./* /opt/construcao-civil/
    check_success "Arquivos copiados com sucesso." "Falha ao copiar arquivos."
  else
    print_error "Arquivos necessários não encontrados no diretório atual."
    print_message "Por favor, execute este script no diretório que contém os arquivos do projeto."
    exit 1
  fi
fi

# Entrar no diretório do projeto
cd /opt/construcao-civil

# Criar arquivo .env
print_message "Configurando variáveis de ambiente..."
cat > .env << EOF
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=construcao_civil
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)
EOF
check_success "Variáveis de ambiente configuradas com sucesso." "Falha ao configurar variáveis de ambiente."

# Verificar se os scripts têm permissão de execução
print_message "Configurando permissões..."
if [ -d "scripts" ]; then
  chmod +x scripts/*.sh
  check_success "Permissões configuradas com sucesso." "Falha ao configurar permissões."
fi

# Iniciar containers
print_message "Iniciando containers Docker..."
docker-compose up -d
check_success "Containers iniciados com sucesso." "Falha ao iniciar containers."

# Verificar se os containers estão rodando
print_message "Verificando status dos containers..."
sleep 10
if docker-compose ps | grep -q "Up"; then
  print_message "Containers estão rodando corretamente."
else
  print_warning "Alguns containers podem não estar rodando corretamente. Verifique com 'docker-compose ps'."
fi

# Exibir informações finais
IP_ADDRESS=$(hostname -I | awk '{print $1}')
print_message "Instalação concluída com sucesso!"
print_message "Você pode acessar o sistema em: http://$IP_ADDRESS:3000"
print_message "Credenciais de acesso:"
print_message "  Email: admin@construcao.com"
print_message "  Senha: admin123"
print_warning "Por segurança, altere a senha padrão após o primeiro acesso."
print_message "Para mais informações, consulte a documentação em INSTALACAO.md"

# Criar um serviço systemd para iniciar automaticamente
print_message "Criando serviço systemd para inicialização automática..."
cat > /etc/systemd/system/construcao-civil.service << EOF
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
EOF

# Recarregar systemd e habilitar o serviço
systemctl daemon-reload
systemctl enable construcao-civil.service
check_success "Serviço systemd criado e habilitado com sucesso." "Falha ao criar serviço systemd."

print_message "O sistema será iniciado automaticamente na próxima reinicialização."
print_message "Para iniciar/parar manualmente, use: systemctl start/stop construcao-civil"

exit 0
