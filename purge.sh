#!/bin/sh

# purge jsdevlivr cache for assets modified between current and previous tags
JSD_URL="https://purge.jsdelivr.net/npm/@xiee/utils"

for i in $(git diff --name-only $PREVIOUS_COMMIT $CURRENT_COMMIT | grep -E "[.](css|js)$"); do
  curl "${JSD_URL}/${i}"
  curl "${JSD_URL}/${i%.*}.min.${i##.}"
done
