#! /usr/bin/env bash

# Script usado pelo container de testes para rodar os testes.

# Forward para acessar API de dentro do container de testes.
echo "localhost:8000 stream tcp nowait root /bin/nc nc api 8000" > /etc/inetd.conf
inetd

# Alterna entre testes com ou sem GUI.
if [ $GUI = true ]; then $(npm bin)/cypress open; else unset DISPLAY; $(npm bin)/cypress run; fi
