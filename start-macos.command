#!/bin/bash
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo 'Vui lòng cài Node.js 24 LTS, rồi mở lại tệp này.'
  read -r -p 'Nhấn Enter để đóng.'
  exit 1
fi
if [ ! -d node_modules ]; then
  npm ci || exit 1
fi
npm run dev
