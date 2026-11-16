---
year: 2026
month: 7
title: 'Weighing the Universe'
description: 'Vergleich von Kolmogorov-Arnold Networks zur Bestimmung kosmologischer Parameter aus Weak-Lensing-Karten.'
colors: '#f4e1dd,#e3a99d,#3a2230'
gif: '/images/posts/weighing-the-universe/hero.webp'
github: 'https://github.com/noahbaumgartner/kan-lab'
icon: orbit
category: study
sources:
  - title: 'Liu et al.: KAN: Kolmogorov-Arnold Networks'
    url: 'https://arxiv.org/abs/2404.19756'
  - title: 'De Salis et al.: Exploring the Early Universe with Deep Learning'
    url: 'https://arxiv.org/abs/2509.22018'
  - title: 'Bartelmann & Schneider: Weak Gravitational Lensing'
    url: 'https://arxiv.org/abs/astro-ph/9912508'
  - title: 'FAIR Universe: Weak Lensing ML Uncertainty Challenge'
    url: 'https://fair-universe.lbl.gov/'
  - title: 'Cao: efficient-kan (EfficientKAN)'
    url: 'https://github.com/Blealtan/efficient-kan'
  - title: 'Li: Kolmogorov-Arnold Networks are Radial Basis Function Networks (FastKAN)'
    url: 'https://arxiv.org/abs/2405.06721'
  - title: 'Delis: faster-kan (FasterKAN)'
    url: 'https://github.com/AthanasiosDelis/faster-kan'
  - title: 'Bozorgasl & Chen: Wav-KAN: Wavelet Kolmogorov-Arnold Networks'
    url: 'https://arxiv.org/abs/2405.12832'
  - title: 'Bodner et al.: Convolutional Kolmogorov-Arnold Networks (KKAN)'
    url: 'https://arxiv.org/abs/2406.13155'
  - title: 'Yang & Wang: Kolmogorov-Arnold Transformer (KAT)'
    url: 'https://arxiv.org/abs/2409.10594'
  - title: 'Lakshminarayanan et al.: Simple and Scalable Predictive Uncertainty Estimation using Deep Ensembles'
    url: 'https://arxiv.org/abs/1612.01474'
---

<script>
    import { Link } from '@noahbaumgartner/svelte-ui';
</script>

In meiner Vertiefungsarbeit am Centre for Artificial Intelligence der ZHAW habe ich untersucht, ob sich Kolmogorov-Arnold Networks (KANs) dazu eignen, die Parameter unseres Universums aus astronomischen Daten abzuleiten. Ausgangspunkt war eine Studie, die mit Deep Learning die Geschichte der kosmischen Reionisierung aus simulierten 21-cm-Signalen rekonstruiert<sup><a href="#source-2">2</a></sup>. Ich habe das Problem auf Weak Lensing übertragen und dabei statt einer etablierten Architektur die noch weitgehend ungetestete KAN-Architektur verwendet.

<h1>Hintergrund</h1>

<h2>Kolmogorov-Arnold Networks</h2>

Ein klassisches neuronales Netz (MLP) legt feste Aktivierungsfunktionen auf die Knoten und lernt nur die Gewichte dazwischen. Ein KAN dreht dieses Prinzip um: Auf jeder Kante sitzt eine lernbare Funktion, die Knoten summieren lediglich auf<sup><a href="#source-1">1</a></sup>. Der Wert des Knotens $j$ in Schicht $l+1$ ist damit

$$
x_{l+1,j} = \sum_{i} \phi_{l,j,i}(x_{l,i})
$$

wobei jedes $\phi_{l,j,i}$ ein Spline mit trainierbaren Koeffizienten ist. Trainiert wird trotzdem ganz normal per Backpropagation. Der Vorteil liegt darin, dass sich ein trainiertes Netz direkt ablesen lässt, weil jede Kante eine einzelne, plotbare Kurve ist. Zudem lässt sich das Gitter der Splines nachträglich verfeinern, ohne das bereits Gelernte zu verwerfen.

<h2>Weak Gravitational Lensing</h2>

Licht ferner Galaxien wird auf dem Weg zu uns von Materie leicht abgelenkt, wodurch ihre Formen minimal verzerrt erscheinen<sup><a href="#source-3">3</a></sup>. Über viele Galaxien gemittelt ergibt das sogenannte Konvergenzkarten, zweidimensionale Bilder der projizierten Materiedichte. Aus ihnen sollen zwei kosmologische Parameter bestimmt werden: der Materiedichteparameter $\Omega_\mathrm{m}$ und die «Klumpigkeit» $S_8 = \sigma_8\sqrt{\Omega_\mathrm{m}/0.3}$. Als Datengrundlage diente die Challenge von FAIR Universe<sup><a href="#source-4">4</a></sup>. Zusätzlich muss das Modell für jeden Parameter ein 68-Prozent-Konfidenzintervall angeben, denn ein Schätzwert ohne Unsicherheit ist in der Kosmologie wenig wert.

<figure>
<img src="/images/posts/weighing-the-universe/convergence.png" width="1200" height="426" alt="Simulierte Konvergenzkarte ohne Rauschen (oben) und mit Shape Noise (unten)." />
<figcaption>Dieselbe Konvergenzkarte ohne (oben) und mit simuliertem Shape Noise (unten). Auf Pixelebene ist das Rauschen so stark wie das Signal.</figcaption>
</figure>

<h1>Vergleich der KAN-Varianten</h1>

Seit dem ursprünglichen Paper sind zahlreiche KAN-Varianten entstanden. Da deren Genauigkeits- und Geschwindigkeitsversprechen meist auf eigenen Benchmarks beruhen, bestand der Kern der Arbeit darin, sie unter gleichen Bedingungen zu vergleichen. Dazu habe ich ein reproduzierbares Experimentier-Framework mit PyTorch, Hydra, Optuna und MLflow aufgebaut, in dem jede Architektur mit eigener Hyperparameter-Suche abgestimmt wird. Der Code liegt in den Repositories <Link href="https://github.com/noahbaumgartner/kan-lab">kan-lab</Link> und <Link href="https://github.com/noahbaumgartner/kan-weak-lensing">kan-weak-lensing</Link>.

Verglichen wurden das Original PyKAN, EfficientKAN<sup><a href="#source-5">5</a></sup>, FastKAN<sup><a href="#source-6">6</a></sup>, FasterKAN<sup><a href="#source-7">7</a></sup> und Wav-KAN<sup><a href="#source-8">8</a></sup>, die die Rechenweise oder die Basisfunktionen der Splines austauschen, sowie die strukturell anderen KKAN<sup><a href="#source-9">9</a></sup> (konvolutional) und KAT<sup><a href="#source-10">10</a></sup> (Transformer). Die Benchmarks wurden in drei Phasen mit steigender Komplexität durchgeführt: zuerst zehn analytische Funktionen, dann Bilddatensätze wie MNIST und schliesslich die Weak-Lensing-Karten.

<h1>Resultate</h1>

Über alle drei Phasen hinweg war EfficientKAN die einzige Variante, die stets an oder nahe der Spitze lag. Die als schneller beworbenen Varianten liefen zwar tatsächlich schneller, allerdings nur etwa doppelt so schnell statt der versprochenen drei- bis fünffachen Geschwindigkeit, und sie bezahlten dafür auf den analytischen Funktionen mit deutlich schlechterer Genauigkeit. KKAN und KAT kosteten fünf bis dreissig Mal mehr Trainingszeit, ohne dass sich ihr struktureller Vorteil in besserer Genauigkeit zeigte.

Auf den Weak-Lensing-Karten erreichten die vollständig verbundenen Varianten ein $R^2$ von 0.84 bis 0.86. Die beste Konfiguration, EfficientKAN mit direkt auf den Score trainierter Unsicherheit, erzielte einen Challenge-Score von 10.61. Das entspricht geschätzt Rang 27 von 63 der öffentlichen Bestenliste, also solidem Mittelfeld. Da die Test-Labels der Challenge nicht öffentlich sind, wurde auf einem internen Validierungs-Split gemessen, die Platzierung ist somit eine Schätzung und keine eingereichte Wertung.

<figure>
<img src="/images/posts/weighing-the-universe/scatter.png" width="1100" height="500" alt="Streudiagramme der vorhergesagten gegen die tatsächlichen Werte von Omega_m und S8." />
<figcaption>Vorhergesagte gegen tatsächliche Werte für Ω<sub>m</sub> (links) und S<sub>8</sub> (rechts). Die Punkte folgen der Diagonalen, an den Rändern wird jedoch unterschätzt.</figcaption>
</figure>

Interessant war die Kalibrierung der Unsicherheiten. Beim Training auf den mittleren quadratischen Fehler schätzen die Modelle ihre Unsicherheit über die Streuung eines Ensembles<sup><a href="#source-11">11</a></sup>. Drei Architekturen brachen dabei im Score stark ein. Vermutlich waren ihre Ensemble-Mitglieder zu ähnlich, wodurch die Unsicherheit zu klein ausfiel. Lernt das Modell die Unsicherheit stattdessen direkt über den Score, verschwindet dieses Problem.

<h1>Erweiterung von EfficientKAN</h1>

EfficientKAN ist schnell, weil es auf zwei Fähigkeiten des Originals verzichtet: die nachträgliche Gitterverfeinerung und die Vereinfachungs-Pipeline. Beide habe ich im Repository <Link href="https://github.com/noahbaumgartner/efficient-kan-plus">efficient-kan-plus</Link> wiederhergestellt, ohne den schnellen Standard-Forward-Pass zu verlangsamen.

<h2>Gitter-Erweiterung</h2>

Beim Verfeinern wird das Spline-Gitter jeder Kante per Least Squares auf ein feineres Gitter übertragen, sodass die gelernte Funktion exakt erhalten bleibt. Der Fehler fällt danach nicht mehr von vorn, sondern stufenweise weiter ab: Bei einem kleinen Netz sank der Test-MSE beim Verfeinern von Gitter 3 auf 20 von $2.2 \times 10^{-4}$ auf $4.3 \times 10^{-8}$.

<figure>
<img src="/images/posts/weighing-the-universe/grid-extension.png" width="790" height="440" alt="Train- und Test-MSE über LBFGS-Schritte mit stufenweisem Abfall bei jeder Gitterverfeinerung." />
<figcaption>Train- und Test-MSE beim schrittweisen Verfeinern des Gitters. Die gestrichelten Linien markieren die einzelnen Erweiterungen.</figcaption>
</figure>

<h2>Vereinfachung zur Formel</h2>

Die Pipeline reduziert ein trainiertes KAN in vier Schritten auf einen lesbaren Ausdruck: Sparsifizierung, Pruning, das Ersetzen der Kantenfunktionen durch bekannte Funktionen und das Extrahieren der Formel. Am Beispiel $f(x, y) = \exp(\sin(\pi x) + y^2)$ schrumpft das Netz von fünf auf einen einzigen versteckten Knoten, und die rekonstruierte Formel stimmt (mit zusammengefassten Konstanten) bis auf kleine Abweichungen mit der Vorgabe überein:

$$
\hat{f}(x, y) \approx 0.982 \exp\left(1.015 \sin(3.141\,x) + 1.002\,y^2\right) + 0.018
$$

<figure>
<img src="/images/posts/weighing-the-universe/simplification.png" width="2000" height="409" alt="Vier Stadien eines KAN: untrainiert, nach Sparsifizierung, nach Pruning und nach der symbolischen Anpassung." />
<figcaption>Die Vereinfachungs-Pipeline am Beispiel: (a) untrainiertes Netz, (b) nach Sparsifizierung, (c) nach Pruning und (d) nach dem Ersetzen der Kanten durch Funktionen.</figcaption>
</figure>

<h1>Fazit</h1>

KANs sind auf dem Weak-Lensing-Problem konkurrenzfähig, aber noch nicht klar überlegen: Mit einem Score im Mittelfeld liegen sie hinter den Gewinnern der Challenge. Ihre Stärke liegt in der transparenteren Struktur, auch wenn die Formel-Extraktion bisher nur an einem einfachen Beispiel gezeigt wurde und nicht an den eigentlichen Modellen. Das wäre der nächste Schritt, zusammen mit einem Ersatz der Ensembles durch simulationsbasierte Inferenz.
