---
year: 2026
month: 7
title: 'Weighing the Universe'
description: 'Interpretierbares maschinelles Lernen mit Kolmogorov-Arnold-Netzwerken'
colors: '#1e3a8a,#7c3aed,#db2777,#0f172a'
icon: scale
---

Im Rahmen meiner ersten Vertiefungsarbeit (VT1) im MSc Computer Science an der ZHAW School of Engineering, am Centre for Artificial Intelligence und unter der Betreuung von Philipp Denzel, habe ich Kolmogorov-Arnold Networks (KANs) als interpretierbare Alternative zu klassischen Multilayer Perceptrons (MLPs) untersucht. Anstatt fixer Aktivierungsfunktionen platzieren KANs lernbare Funktionen direkt auf den Kanten des Netzwerks, was sie kompakter und transparenter machen soll. Als Testfall diente eine reale astrophysikalische Regressionsaufgabe: die Ableitung der kosmologischen Parameter Ωm und S8 samt kalibrierter Unsicherheiten aus simulierten Konvergenzkarten des schwachen Gravitationslinseneffekts.

# asdfasdf

## asdfasdf

Die Arbeit basiert auf Python und PyTorch und nutzt Hydra, Optuna und MLflow für ein reproduzierbares Experimentierframework. Verglichen wurden sieben KAN-Varianten: die vollverbundenen Modelle PyKAN, EfficientKAN, FastKAN, FasterKAN und WavKAN sowie die strukturell abweichenden KKAN (convolutional) und KAT (transformer-basiert).

# asdfasdf

Das entwickelte Benchmarking-Framework vergleicht die Architekturen in drei Phasen zunehmender Komplexität: analytische Funktionen, Bildaufgaben und schliesslich die kosmologische Regression mittels Weak Lensing. Das durchgehend stärkste Modell, EfficientKAN, wurde anschliessend um eine Grid-Extension-Routine sowie eine symbolische Interpretierbarkeits-Pipeline erweitert, welche aus einem trainierten Netzwerk geschlossene, menschenlesbare Formeln extrahiert.
