// Extract the exact original ```text` prompt block. Never rewrite its instructions silently.
export function extractPrompt(markdown) {
  if(typeof markdown!=='string')throw new TypeError('Expected Markdown text');
  const match=markdown.match(/(?:^|\n)```text[ \t]*\r?\n([\s\S]*?)\r?\n```(?:\r?\n|$)/);
  if(!match||!match[1].trim())throw new Error('Original prompt block not found');
  return match[1];
}
export function normalizeForSearch(text) {
  return String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}
export function searchCatalogue(prompts,bodyMap,search,category='Todos',audience='Todos') {
  const words=normalizeForSearch(search).trim().split(/\s+/).filter(Boolean);
  return prompts.filter(prompt=>{
    if(category!=='Todos'&&prompt.category!==category)return false;
    if(audience!=='Todos'&&prompt.audience!=='Ambos'&&prompt.audience!==audience)return false;
    const body=bodyMap.get(prompt.id)??'';
    const haystack=normalizeForSearch([prompt.id,prompt.title,prompt.description,prompt.needs,prompt.delivers,...prompt.tags,body].join(' '));
    return words.every(word=>haystack.includes(word));
  });
}
export function composeForCopy(original,context) {
  if(typeof original!=='string'||!original.trim())throw new Error('Choose a loaded original prompt');
  const rows=[
    ['Disciplina / tema',context.theme],
    ['Público / turma',context.audience],
    ['Objetivo',context.goal],
    ['Restrições ou preferências',context.constraints],
  ].map(([label,value])=>[label,String(value??'').trim()]).filter(([,value])=>value);
  if(!rows.length)return original;
  const header=['CONTEXTO ADICIONAL INFORMADO PELO USUÁRIO','(Complementa, sem substituir nem alterar, as instruções do prompt original.)',...rows.map(([label,value])=>'- '+label+': '+value),'','--- PROMPT ORIGINAL (INALTERADO) ---',''].join('\n');
  return header+original;
}
