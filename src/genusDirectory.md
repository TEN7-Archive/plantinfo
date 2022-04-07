---
title: 'Plant Genus Categories'
type: 'genus'
layout: 'layouts/letter-directory.html'
pagination:
  data: plants_genus_letters
  size: 1
  alias: letter
  serverless: eleventy.serverless.path.genus_letter_slug
permalink: '/genus-directory/{{ letter.data.genus_letter_slug }}/'
---
eleventyComputed:
  genus_letter_slug: "{{ eleventy.serverless.path.genus_letter_slug }}"
