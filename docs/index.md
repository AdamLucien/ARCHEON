---
title: ARCHEON
description: "Satellite publication stream for the ARCHEON causal systems framework."
lang: en
---

ARCHEON (ΛRCHΞON) is Adam Karl Lucien’s interdisciplinary causal systems framework.  
The canonical habitat is **https://archeon.lucien.technology**; this GitHub Pages site serves as a deterministic, index-friendly publication stream for governance, infrastructure, and NOXIS-aware system analysis.

---

## Latest entries

{% for post in site.posts limit:10 %}
### <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
<small>{{ post.date | date: "%Y-%m-%d" }}</small>

{{ post.excerpt }}

{% endfor %}

---

[Manifest]({{ "/manifest/" | relative_url }}) ·
[Reference]({{ "/reference/" | relative_url }})

{% include archeon_signature.html %}