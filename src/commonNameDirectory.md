---
title: 'Common Names A-Z'
type: 'genus'
layout: 'layouts/letter-directory.html'
pagination:
  data: plants_common_name_letters
  size: 1
  alias: letter
  serverless: eleventy.serverless.path.common_name_letter_slug
permalink: '/common-names-directory/:common_name_letter_slug/'
---
eleventyComputed:
  common_name_letter_slug: "{{ eleventy.serverless.path.common_name_letter_slug }}"
