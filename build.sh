#!/bin/sh

npm install clean-css-cli terser -g

cd js
for i in *.js; do
  terser $i --compress --mangle --output ${i%.*}.min.js
done

cd ../css
for i in *.css; do
  cleancss -o ${i%.*}.min.css $i
done

cd ..
