/* Carry de idioma cross-site (schematize .net). Lê ?lang=<código> na chegada,
 * memoriza e redireciona para a rota localizada deste site. Sem dependências. */
(function () {
  // Código normalizado -> segmento de rota deste site (idiomas ausentes caem no en).
  var PATHS = ["en", "pt", "es", "de", "fr", "it", "zh", "hi", "ar", "ru", "ja", "ko", "tr", "vi", "id", "pl", "nl", "th", "fa", "bn"];
  var MAP = {};
  for (var i = 0; i < PATHS.length; i++) MAP[PATHS[i]] = PATHS[i];
  try {
    var url = new URL(window.location.href);
    var q = url.searchParams.get("lang");
    if (!q) return;
    var code = q.toLowerCase().split("-")[0];
    var path = MAP[code];
    url.searchParams.delete("lang");
    if (!path) { window.history.replaceState({}, "", url.toString()); return; }
    try { localStorage.setItem("sz_lang", code); } catch (e) {}
    var seg = window.location.pathname.split("/").filter(Boolean);
    if (seg[0] === path) { window.history.replaceState({}, "", url.toString()); return; }
    if (PATHS.indexOf(seg[0]) >= 0) seg[0] = path; else seg.unshift(path);
    url.pathname = "/" + seg.join("/");
    window.location.replace(url.toString());
  } catch (e) {}
})();
