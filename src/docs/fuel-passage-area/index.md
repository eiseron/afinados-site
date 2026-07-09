---
title: Área de passagem de combustível
description: O que a ferramenta de área de passagem faz, os conceitos principais e como usá-la.
---

# Área de passagem de combustível

> [Abrir a ferramenta ↗](https://app.afinados.io/carburetion/setups)

Esta ferramenta estima a **área de passagem de combustível** de um carburador, a seção disponível para o combustível passar, ao longo da posição do acelerador. Mais área significa que mais combustível pode passar; comparar acertos mostra como uma mudança (agulha, clip, gicles, venturi) remodela a curva.

Veja [Usando a interface](interface.md) para um tour completo dos controles, e [O modelo](model.md) para o que é calculado e as aproximações conhecidas.

## Como funciona a passagem de combustível

O carburador puxa combustível porque a admissão cria vácuo no venturi (veja [Dimensionamento de admissão](../intake-sizing/index.md)). Esse vácuo empurra o combustível por caminhos estreitos, e o quanto passa depende do tamanho desses caminhos: passagem maior deixa passar mais combustível pro mesmo vácuo, deixando a mistura mais rica; passagem menor deixa a mistura mais pobre.

Dois caminhos trabalham juntos. Em marcha lenta, quem manda é o **gicle de baixa**, um furo fixo sempre aberto. Conforme o acelerador abre, a **agulha** sobe e se afasta do **difusor**, alargando um vão anular entre os dois; esse vão está em série com o **gicle de alta**, então o gargalo mais estreito da fila é quem manda em cada instante. É por isso que a curva do gráfico começa baixa, na contribuição do gicle de baixa, e sobe suavemente conforme a agulha abre espaço, sem nunca ultrapassar o que o gicle de alta permite.

## Conceitos principais

### Acerto

Um acerto é a combinação de peças do catálogo e numerações de gicle para um carburador: agulha, posição do clip, calço, difusor, gicle de alta, gicle de baixa e venturi.

### A curva

A ferramenta plota a área livre de passagem de combustível (mm²) contra um eixo X que você pode alternar:

- **Acelerador (%):** abertura do pistonete, 0 a 100% (o input do piloto).
- **Curso da agulha (mm):** deslocamento da agulha desde a marcha lenta. Todos os acertos começam alinhados em 0, então só o venturi define a largura.

Cada eixo mostra sua unidade na ponta, e as linhas de grade dão a escala em mm².

### Comparar acertos

Salve acertos e sobreponha para comparar. Com dois acertos, a diferença entre as curvas é destacada com sinal: verde onde o acerto atual tem mais área, vermelho onde tem menos.

## Como usar

1. Escolha uma agulha e um difusor do catálogo.
2. Defina os gicles de alta e baixa, o clip, o calço e o venturi.
3. Leia a curva, alternando o eixo X entre acelerador e curso da agulha conforme precisar.
4. **Salve** o acerto para guardá-lo. Cada acerto salvo ganha uma URL própria (`/carburetion/setups/:id`), dá pra favoritar.
5. Marque acertos para **comparar** e sobrepor as curvas.
