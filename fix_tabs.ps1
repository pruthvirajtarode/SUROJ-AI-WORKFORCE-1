$newToggle = "function toggle(el){ var p=el.parentElement; var o=p.classList.toggle('open'); if(o){setTimeout(function(){p.scrollIntoView({behavior:'smooth',block:'start'})},100);} }
function toggleCS(el){if(el.classList.contains('case-study')){var o=el.classList.toggle('cs-open');if(o){setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'})},100);}}}"

Get-ChildItem public\*.html | ForEach-Object {
  $content = Get-Content $_.FullName -Raw
  $content = $content -replace "function toggle\(el\)\{el\.parentElement\.classList\.toggle\('open'\)\}(?:\r?\n)function toggleCS\(el\)\{if\(el\.classList\.contains\('case-study'\)\)el\.classList\.toggle\('cs-open'\)\}", $newToggle
  Set-Content $_.FullName -Value $content
}
