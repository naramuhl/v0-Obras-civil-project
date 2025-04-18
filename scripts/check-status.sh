#!/bin/bash

# Script para verificar o status do Sistema de Gestão para Construtor Civil

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

# Verificar se está sendo executado como root
if [ "$EUID" -ne 0 ]; then
  print_error "Este script precisa ser executado como root (sudo)."
  exit 1
fi

# Verificar se o diretório do projeto existe
if [ ! -d "/opt/construcao-civil" ]; then
  print_error "Diretório do projeto não encontrado. O sistema está instalado?"
  exit 1
fi

# Entrar no diretório do projeto
cd /opt/construcao-civil

# Verificar status dos containers
print_message "Verificando status dos containers Docker..."
docker-compose ps

# Verificar uso de recursos
print_message "\nVerificando uso de recursos dos containers..."
docker stats --no-stream

# Verificar espaço em disco
print_message "\nVerificando espaço em disco..."
df -h /opt/construcao-civil

# Verificar status do serviço systemd
print_message "\nVerificando status do serviço systemd..."
systemctl status construcao-civil

# Verificar conexão com o banco de dados
print_message "\nVerificando conexão com o banco de dados..."
if docker-compose exec -T db mysql -u root -ppassword -e "SELECT 'Conexão com o banco de dados OK' AS Status;" 2>/dev/null; then
  print_message "Conexão com o banco de dados OK."
else
  print_error "Falha na conexão com o banco de dados."
fi

# Verificar se a aplicação está respondendo
print_message "\nVerificando se a aplicação está respondendo..."
if curl -s http://localhost:3000 > /dev/null; then
  print_message "Aplicação está respondendo na porta 3000."
else
  print_error "Aplicação não está respondendo na porta 3000."
fi

# Verificar logs recentes
print_message "\nÚltimas 10 linhas de log da aplicação:"
docker-compose logs --tail=10 app

print_message "\nÚltimas 10 linhas de log do banco de dados:"
docker-compose logs --tail=10 db

print_message "\nVerificação de status concluída."
