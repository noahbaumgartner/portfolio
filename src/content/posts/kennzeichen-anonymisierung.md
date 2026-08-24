---
year: 2026
month: 1
title: 'Kennzeichen-Anonymisierung'
description: 'Übungsprojekt zur automatischen Erkennung und Anonymisierung von Kontrollschildern.'
gif: '/images/posts/license-plate-anonymization/detection.jpg'
colors: '#ebe0c9,#d8b869,#26221b'
icon: car
sources:
    - title: 'Goodfellow et al. – Generative Adversarial Networks'
      url: 'https://arxiv.org/abs/1406.2661'
    - title: 'Radford, Metz & Chintala – Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks (DCGAN)'
      url: 'https://arxiv.org/abs/1511.06434'
    - title: 'Canny – A Computational Approach to Edge Detection'
      url: 'https://doi.org/10.1109/TPAMI.1986.4767851'
    - title: 'Duda & Hart – Use of the Hough Transformation to Detect Lines and Curves in Pictures'
      url: 'https://dl.acm.org/doi/10.1145/361237.361242'
    - title: 'Johnson, Alahi & Fei-Fei – Perceptual Losses for Real-Time Style Transfer and Super-Resolution'
      url: 'https://arxiv.org/abs/1603.08155'
---

<script>
    import Link from '$lib/components/ui/Link.svelte'
</script>

Für ein Modul zu Computer Vision habe ich als Übungsaufgabe eine kleine Pipeline gebaut, die Kontrollschilder in Bildern automatisch erkennt und durch künstlich generierte Kennzeichen ersetzt. Die Aufgabe war in fünf Teilschritte gegliedert, von der reinen Erkennung bis zum realistischen Ersetzen der Kennzeichen. Es handelt sich dabei ausdrücklich um eine Übungsarbeit und keinen fertigen Produktionscode, trotzdem funktioniert die Grundidee bereits erstaunlich gut.

<h1>Kennzeichen erkennen</h1>

Als Grundlage für die Erkennung habe ich kein eigenes Modell trainiert, sondern ein bereits feingetuntes <Link href="https://huggingface.co/morsetechlab/yolov11-license-plate-detection">YOLOv11-Modell von Hugging Face</Link> verwendet, das gezielt auf die Erkennung von Kennzeichen spezialisiert ist, wie im Bild oben zu sehen. Objekterkennungsmodelle wie <Link href="https://www.ultralytics.com/">YOLO</Link> sagen für ein Bild sowohl die Position als auch die Klasse von Objekten voraus, in diesem Fall also achsenparallele Bounding Boxes rund um jedes gefundene Kennzeichen. Als Datengrundlage diente ein <Link href="https://www.kaggle.com/datasets/fareselmenshawii/large-license-plate-dataset">Kaggle-Datensatz</Link> mit mehreren tausend Fahrzeugbildern.

<h1>Orientierung bestimmen und zuschneiden</h1>

Die Bounding Box aus dem ersten Schritt ist achsenparallel und schliesst bei schräg fotografierten Kennzeichen oft unnötig viel Hintergrund mit ein. Um die exakte Ausrichtung zu bestimmen, habe ich bewusst auf klassische Bildverarbeitung statt auf ein weiteres Deep-Learning-Modell gesetzt: Im Ausschnitt der Bounding Box wird zuerst mit dem Canny-Algorithmus die Kantenkarte berechnet<sup><a href="#quelle-3">3</a></sup>, anschliessend werden über die Hough-Transformation die vier dominantesten Geraden gefunden, welche die Ränder des Kennzeichens bilden<sup><a href="#quelle-4">4</a></sup>. Jede Gerade wird dabei nicht mit Steigung und Achsenabschnitt beschrieben, sondern über ihren Normalenabstand $\rho$ zum Ursprung und den Winkel $\theta$ dieser Normalen:

$$
\rho = x \cos\theta + y \sin\theta
$$

Diese Parametrisierung erlaubt es auch, senkrechte Kanten ohne Sonderfall zu erfassen. Aus den Schnittpunkten der vier gefundenen Geraden ergeben sich die vier Eckpunkte des Kennzeichens, mit denen sich über eine perspektivische Transformation ein sauber ausgerichteter, entzerrter Ausschnitt erzeugen lässt.

<figure>
<img src="/images/posts/license-plate-anonymization/crops.png" alt="Sechs freigestellte und perspektivisch entzerrte Kennzeichen-Ausschnitte in unterschiedlichen Farben und Formaten." />
<figcaption>Über Canny-Kantenerkennung und Hough-Transformation entzerrte Kennzeichen-Ausschnitte, unabhängig von Land oder Farbgebung.</figcaption>
</figure>

<h1>Neue Kennzeichen generieren</h1>

Für den nächsten Schritt sollten neue, künstliche Kennzeichen generiert werden, welche später die echten ersetzen. Dazu habe ich ein eigenes Generative Adversarial Network trainiert<sup><a href="#quelle-1">1</a></sup>: Ein Generator $G$ versucht aus zufälligem Rauschen $z$ plausible Kennzeichen-Bilder zu erzeugen, während ein Diskriminator $D$ gleichzeitig lernt, diese von echten, zuvor zugeschnittenen Kennzeichen $x$ zu unterscheiden. Beide Netzwerke werden dabei über dasselbe gegensätzliche Ziel trainiert:

$$
\min_G \max_D \; \mathbb{E}_{x}[\log D(x)] + \mathbb{E}_{z}[\log(1 - D(G(z)))]
$$

Der Diskriminator versucht diesen Ausdruck zu maximieren, indem er echte Bilder als echt und generierte als gefälscht erkennt, während der Generator ihn zu minimieren versucht, indem er den Diskriminator möglichst gut täuscht. Architektonisch orientiert sich mein Generator und Diskriminator an einem DCGAN mit transponierten beziehungsweise gewöhnlichen Convolutions, Batch-Normalization und einem 64-dimensionalen latenten Vektor als Eingabe<sup><a href="#quelle-2">2</a></sup>. Trainiert wurde das Netz für 150 Epochen auf den zuvor zugeschnittenen Kennzeichen.

<figure>
<img src="/images/posts/license-plate-anonymization/gan-samples.png" alt="Vier vom GAN generierte, kennzeichenähnliche Bilder mit verwaschenen, aber plausibel wirkenden Zeichenfolgen." />
<figcaption>Vier vom trainierten GAN generierte Kennzeichen nach 150 Trainings-Epochen. Die Struktur passt, einzelne Zeichen bleiben unscharf.</figcaption>
</figure>

<h1>Kennzeichen ersetzen</h1>

Im letzten Schritt werden Erkennung, Zuschnitt und Generierung zusammengeführt: Für jedes erkannte Kennzeichen generiert das GAN eine neue Bildprobe, die anschliessend perspektivisch auf die exakte Form und Grösse des Original-Kennzeichens verzerrt und über eine Maske ins Ursprungsbild eingesetzt wird. So bleibt die Position im Bild erhalten, nur der Inhalt des Kennzeichens ändert sich.

<figure>
<img src="/images/posts/license-plate-anonymization/before-after.jpg" alt="Vergleich desselben Fotos vor und nach der Anonymisierung. Links ist das echte Kennzeichen lesbar, rechts wurde es durch ein generiertes, unleserliches Kennzeichen ersetzt." />
<figcaption>Das echte Kennzeichen wurde durch eine generierte, nicht mehr identifizierbare Variante ersetzt, Position und Perspektive bleiben erhalten.</figcaption>
</figure>

<h1>Grenzen und Ausblick</h1>

Als Übungsaufgabe hatte diese Pipeline nie den Anspruch, produktionsreif zu sein: Das GAN erzeugt keine scharfen, individuellen Zeichen, sondern eher plausibel wirkende Muster, und auch die Einpassung ist rein geometrisch, ohne Beleuchtung, Schatten oder Bildrauschen des Originals zu berücksichtigen. Um die generierten Kennzeichen wirklich an die Aufnahmebedingungen anzupassen, würde sich ein Style-Transfer-Ansatz anbieten, der Farbgebung und Textur des Zielbilds auf das generierte Kennzeichen überträgt<sup><a href="#quelle-5">5</a></sup>. Für eine Übungsaufgabe zeigt das Ergebnis aber bereits deutlich, dass sich die Grundidee, Kennzeichen automatisiert zu erkennen und realistisch zu anonymisieren, mit vertretbarem Aufwand umsetzen lässt.
