#!/bin/sh

# purge jsdevlivr cache for assets modified between current and previous tags
JSD_URL="https://purge.jsdelivr.net/npm/@xiee/utils"

tag2=$(git describe --tags --abbrev=0)
tag1=$(git describe --tags --abbrev=0 "$tag2^")
for i in $(git diff --name-only $tag1 $tag2 | grep -E "[.](css|js)$"); do
  curl "${JSD_URL}/${i}"
  curl "${JSD_URL}/${i%.*}.min.${i##.}"
done
