#!/bin/bash
die () {
    echo >&2 "$@"
    exit 1
}

[ "$#" -eq 1 ] || die "./get-json.sh production-slug"

scp handwire@autotune-resque1.voxops.net:/home/autotune/shared/working/projects/$1/data/autotune.json data/autotune.json
