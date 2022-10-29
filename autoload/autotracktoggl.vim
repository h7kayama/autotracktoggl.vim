function! autotracktoggl#start()
  let confirm = input("Start tracking? (Y/n): ")

  if confirm == 'y' || confirm == ''
    call denops#notify("autotracktoggl", "startTracking", [])
  endif
endfunction
