#!/bin/bash

# Script para restaurar backup do Sistema de Gestão para Construtor Civil

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

# Verificar se o diretório de backups existe
if [ ! -d "backups" ]; then
  print_error "Diretório de backups não encontrado."
  exit 1
fi

# Listar backups disponíveis
print_message "Backups disponíveis:"
ls -lh backups/ | grep .sql.gz

# Solicitar o arquivo de backup a ser restaurado
read -p "Digite o nome do arquivo de backup a ser restaurado (ex: backup_20230101_120000.sql.gz): " BACKUP_FILE

# Verificar se o arquivo existe
if [ ! -f "backups/$BACKUP_FILE" ]; then
  print_error "Arquivo de backup não encontrado: backups/$BACKUP_FILE"
  exit 1
fi

# Confirmar restauração
print_warning "ATENÇÃO: A restauração irá substituir todos os dados atuais do banco de dados."
read -p "Tem certeza que deseja continuar? (s/n): " CONFIRM

if [[ ! "$CONFIRM" =~ ^[Ss]$ ]]; then
  print_message "Operação cancelada pelo usuário."
  exit 0
fi

# Realizar backup do estado atual antes da restauração
print_message "Realizando backup do estado atual antes da restauração..."
CURRENT_BACKUP="backups/pre_restore_$(date +%Y%m%d_%H%M%S).sql"
if docker-compose exec -T db mysqldump -u root -ppassword construcao_civil > "$CURRENT_BACKUP"; then
  print_message "Backup do estado atual realizado: $CURRENT_BACKUP"
  gzip "$CURRENT_BACKUP"
  print_message "Backup compactado: $CURRENT_BACKUP.gz"
else
  print_error "Falha ao realizar backup do estado atual."
  print_warning "Continuando com a restauração mesmo sem backup do estado atual."
fi

# Descompactar o arquivo de backup se estiver compactado
if [[ "$BACKUP_FILE" == *.gz ]]; then
  print_message "Descompactando arquivo de backup..."
  gunzip -c "backups/$BACKUP_FILE" > "backups/temp_restore.sql"
  RESTORE_FILE="backups/temp_restore.sql"
else
  RESTORE_FILE="backups/$BACKUP_FILE"
fi

# Restaurar o backup
print_message "Restaurando backup..."
if cat "$RESTORE_FILE" | docker-compose exec -T db mysql -u root -ppassword construcao_civil; then
  print_message "Backup restaurado com sucesso."
else
  print_error "Falha ao restaurar backup."
  exit 1
fi

# Limpar arquivos temporários
if [[ "$BACKUP_FILE" == *.gz ]]; then
  rm -f "backups/temp_restore.sql"
fi

print_message "Restauração concluída com sucesso."
print_message "Reiniciando a aplicação para aplicar as mudanças..."
docker-compose restart app
print_message "Aplicação reiniciada."

exit 0
