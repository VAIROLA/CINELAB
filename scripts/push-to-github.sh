#!/bin/bash
set -e

if [ -z "$1" ] && [ -z "$GITHUB_TOKEN" ]; then
  echo "Uso: ./scripts/push-to-github.sh <SEU_GITHUB_PERSONAL_ACCESS_TOKEN>"
  echo "Ou defina a variável GITHUB_TOKEN"
  exit 1
fi

TOKEN="${1:-$GITHUB_TOKEN}"
git push "https://${TOKEN}@github.com/VAIROLA/CINELAB.git" main
echo "✅ Código e vídeo de boas-vindas enviados com sucesso para o GitHub e Vercel!"
