---
year: 2025
month: 6
title: 'Semantische Suche'
description: 'Konzeption und prototypische Entwicklung einer semantischen Suche im Rahmen meiner Bachelorarbeit.'
colors: '#d7e0f8,#b9c8f2,#26305c'
icon: search
sources:
    - title: 'IBM – What is Vector Embedding?'
      url: 'https://www.ibm.com/think/topics/vector-embedding'
    - title: 'IBM – What Is A Vector Database?'
      url: 'https://www.ibm.com/think/topics/vector-database'
    - title: 'Pinecone – Chunking Strategies for LLM Applications'
      url: 'https://www.pinecone.io/learn/chunking-strategies/'
    - title: 'Chroma Research – Evaluating Chunking Strategies for Retrieval'
      url: 'https://research.trychroma.com/evaluating-chunking'
    - title: 'Muennighoff et al. – MTEB: Massive Text Embedding Benchmark'
      url: 'https://arxiv.org/abs/2210.07316'
    - title: 'Jagerman et al. – Query Expansion by Prompting Large Language Models'
      url: 'https://arxiv.org/abs/2305.03653'
    - title: 'Cormack, Clarke & Buettcher – Reciprocal Rank Fusion Outperforms Condorcet and Individual Rank Learning Methods'
      url: 'https://dl.acm.org/doi/10.1145/1571941.1572114'
    - title: 'Zhang et al. – mGTE: Generalized Long-Context Text Representation and Reranking Models for Multilingual Text Retrieval'
      url: 'https://arxiv.org/abs/2407.19669'
    - title: 'Thakur et al. – BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models'
      url: 'https://openreview.net/forum?id=wCu6T5xFjeJ'
    - title: 'Kamalloo et al. – Resources for Brewing BEIR: Reproducible Reference Models and an Official Leaderboard'
      url: 'https://arxiv.org/abs/2306.07471'
    - title: 'Lewis et al. – Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks'
      url: 'https://arxiv.org/abs/2005.11401'
---

<script>
    import Link from '$lib/components/ui/link/Link.svelte'
</script>

Für meine Bachelorarbeit an der ZHAW habe ich mich zusammen mit einem Studienkollegen mit der Frage beschäftigt, wie sich eine klassische Stichwortsuche durch eine semantische Suche ablösen lässt, die Inhalte nicht nach exakten Begriffstreffern, sondern nach ihrer inhaltlichen Bedeutung findet. Im Zentrum stand dabei die Konzeption und die prototypische Umsetzung eines entsprechenden Suchsystems, das wir anschliessend sowohl technisch als auch mit echten Nutzenden evaluiert haben.

<h1>Wie funktioniert eine semantische Suche</h1>

Eine klassische Stichwortsuche vergleicht nur Zeichenketten und scheitert deshalb oft an Schreibfehlern, Synonymen oder unterschiedlicher Terminologie. Eine semantische Suche löst dieses Problem, indem sie nicht mehr nach exakten Begriffen, sondern nach der Bedeutung eines Textes sucht.

<h2>Von Text zu Vektor</h2>

Möglich wird das durch Text-Embeddings: Ein Embedding-Modell wandelt einen Text in einen Vektor um, also eine Liste von einigen hundert bis mehreren tausend Zahlen, welche die Bedeutung des Textes im sogenannten Vektorraum kodieren<sup><a href="#quelle-1">1</a></sup>. Inhaltlich ähnliche Texte landen dabei nahe beieinander, unabhängig davon, mit welchen Wörtern sie formuliert sind. Wie nahe zwei Vektoren beieinanderliegen, lässt sich über Distanzfunktionen wie die Kosinus-Distanz oder das Skalarprodukt berechnen. Am gebräuchlichsten ist die Kosinus-Ähnlichkeit, welche den Winkel zwischen zwei Vektoren $\mathbf{a}$ und $\mathbf{b}$ bewertet, unabhängig von deren Länge:

$$
\cos(\mathbf{a}, \mathbf{b}) = \frac{\mathbf{a} \cdot \mathbf{b}}{\lVert \mathbf{a} \rVert \, \lVert \mathbf{b} \rVert}
$$

Der Wert liegt zwischen $-1$ und $1$, wobei $1$ bedeutet, dass beide Vektoren exakt in dieselbe Richtung zeigen und damit inhaltlich am ähnlichsten sind.

<figure>
<img src="/images/posts/semantische-suche/vektorraum.svg" alt="Ein Dokument wird in Chunks aufgeteilt, über ein Embedding-Modell in Vektoren umgewandelt und im Vektorraum abgelegt, wo ähnliche Bedeutungen nahe beieinanderliegen." />
<figcaption>Text wird über ein Embedding-Modell in Vektoren umgewandelt, die im Vektorraum nach Bedeutung gruppiert sind.</figcaption>
</figure>

<h2>Chunking</h2>

Damit auch lange Dokumente sinnvoll durchsucht werden können, werden sie vor dem Einbetten in kleinere Abschnitte aufgeteilt, sogenannte Chunks<sup><a href="#quelle-3">3</a></sup>. Ein Embedding pro ganzem Dokument würde dessen Bedeutung zu stark verwässern, ein Embedding pro Chunk bleibt dagegen präzise genug, um gezielt auf den relevanten Abschnitt zu verweisen. Wie ein Text am besten aufgeteilt wird, unterscheidet sich je nach Strategie: von fixer Grösse über rekursives Chunking bis hin zu satz- oder LLM-basierten Ansätzen. Anhand einer vergleichenden Auswertung verschiedener Chunking-Strategien<sup><a href="#quelle-4">4</a></sup> haben wir uns für rekursives Chunking mit einer Grösse von 400 Tokens ohne Überlappung entschieden, da dieser Ansatz einen guten Kompromiss zwischen Trefferqualität und Rechenaufwand bietet.

<h2>Ähnlichkeitssuche in der Vektordatenbank</h2>

Die entstehenden Vektoren landen zusammen mit Metadaten in einer Vektordatenbank<sup><a href="#quelle-2">2</a></sup>. Sucht eine Person, wird die Anfrage nach demselben Prinzip in einen Vektor überführt. Statt diesen mit jedem gespeicherten Vektor einzeln zu vergleichen, was bei grossen Datenmengen zu langsam wäre, nutzt die Datenbank sogenannte Approximate-Nearest-Neighbour-Algorithmen, um effizient die ähnlichsten Vektoren zu finden. Zusätzlich lassen sich Metadaten wie Zugriffsrechte oder Änderungsdatum direkt in die Anfrage einbinden, wodurch sich die Suche gezielt filtern lässt.

<h1>Architektur</h1>

Konzeptionell haben wir zwischen einer Indexierungs- und einer Such-Pipeline unterschieden. Diese Trennung war zentral, da beide Prozesse unterschiedliche Anforderungen haben: Die Indexierung soll asynchron im Hintergrund laufen und beliebig skalieren können, während die Suche auf möglichst tiefe Latenz ausgelegt sein muss.

<figure>
<img src="/images/posts/semantische-suche/architektur.svg" alt="Architekturdiagramm mit Indexierungs-Pipeline (Inhalt geändert, Text extrahieren, Chunking, Embedding, Vektordatenbank) und Such-Pipeline (Suchanfrage, Abfrage-Erweiterung, Embedding, Vektorsuche mit Filter, Resultate)." />
<figcaption>Indexierungs- und Such-Pipeline laufen getrennt, teilen sich aber dieselbe Vektordatenbank.</figcaption>
</figure>

<h2>Indexierungs-Pipeline</h2>

Sobald sich ein Inhalt ändert, wird der relevante Text extrahiert, in Chunks aufgeteilt und über das Embedding-Modell in Vektoren umgewandelt. Diese werden anschliessend zusammen mit Metadaten wie Projekt-ID oder Zugriffsrechten indexiert, bestehende Chunks zum selben Objekt werden dabei gelöscht, um den Index aktuell zu halten. Um auch grössere Mengen an Änderungen gleichzeitig verarbeiten zu können, läuft die Indexierung auf mehrere Arbeitsprozesse verteilt.

<h2>Such-Pipeline</h2>

Bei einer Suchanfrage läuft ein ähnlicher, aber synchroner Prozess ab. Zuerst wird der Benutzerkontext ermittelt, also die Projekte und Berechtigungen der suchenden Person, damit ausschliesslich zugängliche Inhalte gefunden werden. Die Anfrage selbst wird zusätzlich über eine Abfrage-Erweiterung angereichert, bevor sie eingebettet und mit den Filter-Optionen zusammen an die Vektordatenbank gestellt wird. Das Resultat ist eine nach semantischer Relevanz sortierte Liste an Treffern.

<h1>Technische Umsetzung</h1>

<h2>Technologie-Stack</h2>

Für den Prototyp haben wir ein eigenständiges Backend mit <Link href="https://fastapi.tiangolo.com/">FastAPI</Link> gebaut, das sich als eigener Microservice betreiben lässt. Für die typischen Bausteine semantischer Suchsysteme wie Chunking, Text-Embeddings und Datenextraktion kommt <Link href="https://www.langchain.com/">LangChain</Link> zum Einsatz, gespeichert werden die Vektoren in Azure Cosmos DB NoSQL, welche Dokumenten- und Vektordatenbank in einem vereint und sich nahtlos in eine bestehende Azure-Infrastruktur integrieren lässt.

<h2>Auswahl der Komponenten</h2>

Für die einzelnen Komponenten haben wir jeweils mehrere Optionen verglichen. Beim Embedding-Modell fiel die Wahl anhand des Massive Text Embedding Benchmark<sup><a href="#quelle-5">5</a></sup> auf text-embedding-3-large von OpenAI, welches unter den evaluierten mehrsprachigen Modellen die beste Retrieval-Performance erzielte. Für die Abfrage-Erweiterung haben wir uns für einen Zero-Shot-Query2Expansion-Ansatz entschieden, bei dem ein Sprachmodell die Suchanfrage vorgängig um passende Stichworte anreichert<sup><a href="#quelle-6">6</a></sup>. Als Modell dafür kommt Ministral 3B zum Einsatz, das im Vergleich zu den Alternativen den besten Kompromiss aus Kosten und Antwortgeschwindigkeit bot.

<h2>Verworfene Erweiterungen</h2>

Nicht jede Erweiterung, die wir prototypisch umgesetzt haben, hat es in die finale Architektur geschafft. Eine hybride Suche, welche Vektor- und Volltextsuche über Reciprocal Rank Fusion kombiniert<sup><a href="#quelle-7">7</a></sup>, lieferte zwar leicht bessere Resultate, benötigte aber teilweise mehrere Sekunden pro Anfrage. Auch ein nachgelagertes Re-Ranking der Resultate mit einem Cross-Encoder-Modell<sup><a href="#quelle-8">8</a></sup> konnte die Ergebnisqualität nicht spürbar genug verbessern, um die zusätzliche Latenz zu rechtfertigen. Da eine Suche mit Antwortzeiten von unter einer Sekunde als hartes Ziel definiert war, haben wir uns am Ende für die reine Vektorsuche mit Abfrage-Erweiterung entschieden.

<h1>Evaluation</h1>

<h2>Technische Evaluation mit BEIR</h2>

Um die verschiedenen Kombinationen aus Chunking, Embedding-Modell und Erweiterungen objektiv zu vergleichen, haben wir den BEIR-Benchmark verwendet, eine Sammlung von Datensätzen für unterschiedliche Information-Retrieval-Aufgaben<sup><a href="#quelle-9">9</a></sup>. Bewertet wurde jeweils mit der NDCG@10-Metrik, welche berücksichtigt, wie gut ein System relevante Dokumente ermittelt und wie weit oben es sie einordnet. Als Referenz diente uns die öffentliche BEIR-Bestenliste<sup><a href="#quelle-10">10</a></sup>. Die finale Kombination aus Vektorsuche, text-embedding-3-large und Abfrage-Erweiterung erzielte über die drei getesteten Datensätze hinweg die besten Werte innerhalb unserer Evaluation und lag damit deutlich näher an den publizierten Bestwerten als die einfache Vektorsuche ohne Erweiterungen.

<h2>Evaluation durch Nutzerfeedback</h2>

Zusätzlich zur technischen Auswertung haben zehn Testpersonen den Prototyp anhand konkreter Aufgabenstellungen ausprobiert und im Anschluss ein strukturiertes Feedbackformular ausgefüllt. Über alle Testfälle hinweg lag die Korrektheit der Lösungen bei über 93 Prozent. Die Antwortzeiten wurden mehrheitlich mit den höchsten Werten bewertet, ebenso die Relevanz der Suchergebnisse. Im direkten Vergleich zur bisherigen Suche fiel das Urteil damit deutlich zugunsten der semantischen Suche aus, auch wenn einige Testpersonen zunächst etwas Zeit brauchten, um sich von der gewohnten Stichwortsuche auf die neue, kontextbewusste Suche umzustellen.

<h1>Fazit und Ausblick</h1>

Die Arbeit zeigt, dass sich eine performante und kontextbewusste semantische Suche mit vertretbarem Aufwand realisieren lässt, die einer klassischen Stichwortsuche in Trefferqualität und Nutzererlebnis deutlich überlegen ist. Ein spannender nächster Schritt wäre die Kombination mit Retrieval-Augmented Generation, bei der ein Sprachmodell basierend auf den gefundenen Resultaten direkt Antworten oder Zusammenfassungen generiert, statt nur eine Trefferliste zurückzugeben<sup><a href="#quelle-11">11</a></sup>.
