#!/bin/bash
export QUARTO_VERSION=1.6.40
wget -O /tmp/quarto.tgz https://github.com/quarto-dev/quarto-cli/releases/download/v$QUARTO_VERSION/quarto-$QUARTO_VERSION-linux-amd64.tar.gz
tar -xzf /tmp/quarto.tgz -C /tmp
/tmp/quarto-$QUARTO_VERSION/bin/quarto render
