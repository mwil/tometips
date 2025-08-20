#!/bin/bash
# Prepares web site images by copying and resizing from the Git repo.

set -e

cd $(dirname $0)/..

mkdir -p html/img/talents/{96,64,48,32}

for gfx in t-engine4/game/modules/tome/data/gfx dlc/*/overload/data/gfx; do
    for img in $gfx/talents/*.png; do
        newimg=html/img/talents/64/${img##*/}
        if [ $img -nt $newimg ]; then
            echo Converting $newimg...
            pngcrush -q -rem allb -reduce $img $newimg
        fi
    done
done

tmpimg=tmp.png
trap "rm -f $tmpimg" EXIT

for size in 32 48 96; do
    for img in html/img/talents/64/*.png; do
        newimg=${img/64/$size}
        if [ $img -nt $newimg ]; then
            echo Converting $newimg...
            convert -resize ${size}x${size} $img $tmpimg
            pngcrush -q -rem allb -reduce $tmpimg $newimg
        fi
    done
done

