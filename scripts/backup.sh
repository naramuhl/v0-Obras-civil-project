#!/bin/bash

# Script para realizar backup manual do Sistema de Gestão para Construtor Civil

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

# Criar diretório de backup se não existir
mkdir -p backups

# Definir nome do arquivo de backup com data e hora
BACKUP_FILE="backups/backup_$(date +%Y%m%d_%H%M%S).sql"

# Realizar backup do banco de dados
print_message "Realizando backup do banco de dados..."
if docker-compose exec -T db mysqldump -u root -ppassword construcao_civil > "$BACKUP_FILE"; then
  print_message "Backup realizado com sucesso: $BACKUP_FILE"
  
  # Compactar o arquivo de backup
  print_message "Compactando arquivo de backup..."
  gzip "$BACKUP_FILE"
  print_message "Backup compactado: $BACKUP_FILE.gz"
  
  # Exibir tamanho do arquivo
  BACKUP_SIZE=$(du -h "$BACKUP_FILE.gz" | cut -f1)
  print_message "Tamanho do arquivo de backup: $BACKUP_SIZE"
  
  # Listar backups existentes
  print_message "Backups disponíveis:"
  ls -lh backups/ | grep .sql.gz
else
  print_error "Falha ao realizar backup do banco de dados."
  exit 1
fi

print_message "Backup concluído com sucesso."
