if exists('g:loaded_autotracktoggl')
  finish
endif
let g:loaded_autotracktoggl = 1

command! AutoTrackTogglStart call denops#notify("autotracktoggl", "startTracking", [])
