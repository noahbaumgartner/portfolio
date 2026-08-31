---
year: 2026
month: 5
title: 'Bildbeschreibung'
description: 'Übungsprojekt zu automatisch generierten Bildbeschreibungen mit CNN-LSTM- und Attention-Architekturen.'
gif: '/images/posts/image-captioning/attention-hero.jpg'
colors: '#ecdfc9,#e8834a,#1f2a44'
icon: image
sources:
    - title: 'He et al. – Deep Residual Learning for Image Recognition (ResNet)'
      url: 'https://arxiv.org/abs/1512.03385'
    - title: 'Vinyals et al. – Show and Tell: A Neural Image Caption Generator'
      url: 'https://arxiv.org/abs/1411.4555'
    - title: 'Xu et al. – Show, Attend and Tell: Neural Image Caption Generation with Visual Attention'
      url: 'https://arxiv.org/abs/1502.03044'
    - title: 'Papineni et al. – BLEU: a Method for Automatic Evaluation of Machine Translation'
      url: 'https://aclanthology.org/P02-1040/'
---

<script>
    import Link from '$lib/components/ui/link/Link.svelte'
</script>

Für ein Modul zu Deep Learning an der ZHAW habe ich mich als Übungsaufgabe mit automatisch generierten Bildbeschreibungen befasst: Ein Modell soll zu einem Foto einen passenden, in natürlicher Sprache formulierten Satz generieren. Verlangt war die Implementierung und der Vergleich von zwei unterschiedlichen Architekturen unter identischen Bedingungen, ergänzt um eigene Erweiterungen.

<h1>Zwei Architekturen im Vergleich</h1>

Beide Modelle folgen dem Encoder-Decoder-Prinzip und verwenden denselben eingefrorenen, auf ImageNet vortrainierten <Link href="https://pytorch.org/vision/stable/models.html">ResNet18</Link> als Bild-Encoder<sup><a href="#quelle-1">1</a></sup>. Statt des üblichen Klassifikationskopfs wird nur die letzte Feature-Map von 512 Kanälen bei 7×7 Positionen verwendet. Das Einfrieren des Encoders hält die Anzahl trainierbarer Parameter klein und beugt Overfitting auf dem vergleichsweise kleinen Datensatz vor.

<h2>Show and Tell</h2>

Das einfachere Modell mittelt die 49 räumlichen Positionen zu einem einzelnen 512-dimensionalen Vektor, projiziert diesen auf 256 Dimensionen und übergibt ihn als erstes Eingabe-Token an ein LSTM<sup><a href="#quelle-2">2</a></sup>. Von dort an generiert das LSTM die Bildbeschreibung Wort für Wort.

<h2>Show, Attend and Tell</h2>

Das zweite Modell behält die volle 7×7-Feature-Map und ergänzt einen additiven Attention-Mechanismus<sup><a href="#quelle-3">3</a></sup>: Bei jedem Dekodierschritt $t$ berechnet dieser aus dem aktuellen LSTM-Zustand ein Gewicht $\alpha_{t,i}$ für jede der $49$ Bildregionen $\mathbf{a}_i$ und bildet daraus einen gewichteten Kontextvektor $\mathbf{z}_t$:

$$
\alpha_{t,i} = \frac{\exp(e_{t,i})}{\sum_{k=1}^{49} \exp(e_{t,k})}, \qquad \mathbf{z}_t = \sum_{i=1}^{49} \alpha_{t,i}\, \mathbf{a}_i
$$

Die Rohwerte $e_{t,i}$ stammen dabei aus einem kleinen neuronalen Netz, das den aktuellen Zustand mit jeder Bildregion vergleicht. Die Softmax-Normalisierung sorgt dafür, dass sich die Gewichte zu $1$ aufsummieren, ähnlich einer Verteilung der Aufmerksamkeit über das Bild. So kann sich das Modell bei jedem Wort erneut auf die dafür relevanten Bildbereiche konzentrieren, statt sich auf einen einzigen, bereits gemittelten Vektor zu verlassen.

<h1>Daten und Training</h1>

Als Datengrundlage diente der <Link href="https://www.kaggle.com/datasets/adityajn105/flickr8k">Flickr8k-Datensatz</Link> mit rund 6'500 Trainingsbildern und je fünf menschlichen Referenzbeschreibungen pro Bild, was nach der Vorverarbeitung 32'365 Bild-Text-Paare ergibt. Der Wortschatz wurde ausschliesslich aus den Trainingsdaten aufgebaut, um jegliches Data Leakage zu vermeiden, und umfasst 2'649 Tokens. Trainiert wurde mit Adam, einer Lernrate von 4e-4, Batch-Grösse 64 und bis zu 8 Epochen, abgesichert durch Dropout, Gradient Clipping und Early Stopping auf Basis von BLEU-4 mit einer Geduld von drei Epochen.

<figure>
<img src="/images/posts/image-captioning/training-curves.png" alt="Trainingskurven beider Modelle: Trainingsverlust, Validierungs-Perplexität und BLEU-4 über die Epochen, jeweils für Show and Tell und Show, Attend and Tell." />
<figcaption>Trainingsverlust, Perplexität und BLEU-4 über die Epochen für beide Architekturen.</figcaption>
</figure>

<h1>Ergebnisse</h1>

Zur Bewertung dient neben BLEU auch die Perplexität, welche misst, wie überrascht das Modell im Schnitt von den tatsächlichen Referenzwörtern $w_1, \dots, w_N$ ist:

$$
\text{PPL} = \exp\left(-\frac{1}{N}\sum_{i=1}^{N} \log p(w_i \mid w_{<i})\right)
$$

Eine tiefere Perplexität bedeutet, dass das Modell den nächsten Wörtern im Schnitt eine höhere Wahrscheinlichkeit zuweist. Auf dem Testset erreicht das Attention-Modell mit einer Perplexität von 17.04 und einem BLEU-4-Wert von 0.180 bessere BLEU-Werte als das einfachere Show-and-Tell-Modell mit 16.57 Perplexität und 0.152 BLEU-4<sup><a href="#quelle-4">4</a></sup>. Der Vorsprung fällt besonders bei den höhergradigen BLEU-Metriken ins Gewicht, welche zusammenhängende Wortfolgen statt einzelner Wörter bewerten, was zur Erwartung passt, dass gezielte Aufmerksamkeit auf einzelne Bildregionen zu kohärenteren Formulierungen führt.

<figure>
<img src="/images/posts/image-captioning/caption-comparison.jpg" alt="Fünf Testbilder mit den generierten Bildbeschreibungen beider Modelle sowie der menschlichen Referenzbeschreibung im Vergleich." />
<figcaption>Dieselben Testbilder, einmal mit den Beschreibungen des einfachen Modells und einmal mit jenen des Attention-Modells. Bei den beiden Hunden erkennt nur das Attention-Modell, dass es sich um zwei Tiere handelt.</figcaption>
</figure>

<h2>Attention-Visualisierung</h2>

Um den Attention-Mechanismus sichtbar zu machen, habe ich die 7×7-Gewichtungskarte für jedes generierte Wort auf die ursprüngliche Bildgrösse hochskaliert und über das Bild gelegt. Bei konkreten Substantiven konzentriert sich die Aufmerksamkeit meist klar auf die passende Bildregion, bei Füllwörtern wie "in" oder "the" verteilt sie sich dagegen deutlich diffuser über das Bild.

<figure>
<img src="/images/posts/image-captioning/attention-detail.jpg" alt="Zwölf Ausschnitte desselben Bilds mit je einer Attention-Heatmap, eine pro generiertem Wort der Bildbeschreibung 'a man in a red jacket is jumping in the snow'." />
<figcaption>Attention-Heatmap pro generiertem Wort: Bei "man" und "jacket" liegt der Fokus klar auf der Person am Eis.</figcaption>
</figure>

<h2>Beam Search</h2>

Als Erweiterung habe ich beim Attention-Modell die greedy Dekodierung mit Beam Search (Beam-Grösse 3, längennormalisiert) verglichen. Beam Search verbessert die höhergradigen BLEU-Werte leicht und konsistent (BLEU-4 von 0.180 auf 0.192) und liefert bei manchen Bildern etwas detailliertere Beschreibungen, allerdings auf Kosten einer spürbar langsameren Inferenz.

<h1>Grenzen und Ausblick</h1>

Flickr8k ist ein kleiner Datensatz, weshalb die absoluten Werte bescheiden ausfallen und die Modelle bei ungewöhnlichen Szenen zu generischen oder gelegentlich halluzinierten Beschreibungen neigen. Der eingefrorene Encoder limitiert zudem, wie gut sich die visuellen Merkmale an die eigentliche Aufgabe anpassen können, und BLEU misst nur Wortüberlappung mit den Referenzen, was mit menschlicher Qualitätswahrnehmung nur schwach korreliert. Für eine Weiterentwicklung würden sich das Feintunen der oberen Encoder-Schichten, vortrainierte Wort-Embeddings, ein Transformer-Decoder oder zusätzliche Metriken wie CIDEr oder METEOR anbieten. Für eine Übungsarbeit zeigen die Resultate aber bereits deutlich, dass räumliche Aufmerksamkeit die Qualität generierter Bildbeschreibungen gegenüber dem einfacheren CNN-LSTM-Ansatz spürbar verbessert.
