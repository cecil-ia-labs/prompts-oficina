import {prompts,categories} from './manifest.mjs';
import {extractPrompt,searchCatalogue,composeForCopy} from './prompt-utils.mjs';

const $=id=>document.getElementById(id);
const originalMarkdown=new Map();
const originalPrompt=new Map();
const state={selected:'01',search:'',category:'Todos',audience:'Todos',fullDocument:false};
let toastTimer;
const basename=prompt=>'./prompts/'+prompt.file;
const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=String(text);return el};
function message(text){
 const t=$('toast');clearTimeout(toastTimer);t.textContent=text;t.hidden=false;toastTimer=setTimeout(()=>t.hidden=true,4000);
}
async function loadOriginals(){
 const tasks=prompts.map(async prompt=>{
  try{
   // Same-origin static assets packaged from the original repository files.
   const response=await fetch(new URL(basename(prompt),import.meta.url));
   if(!response.ok)throw new Error('HTTP '+response.status);
   const markdown=await response.text();
   originalMarkdown.set(prompt.id,markdown);
   originalPrompt.set(prompt.id,extractPrompt(markdown));
  }catch(error){
   console.warn('Could not load original educational file: '+prompt.file,error);
  }
 });
 await Promise.all(tasks);
 render();
 if(originalPrompt.size<prompts.length)message('Alguns arquivos originais não puderam ser carregados. Use um servidor local ou consulte o GitHub.');
}
function current(){return prompts.find(p=>p.id===state.selected)??prompts[0];}
function context(){
 return {theme:$('context-theme').value,audience:$('context-audience').value,goal:$('context-goal').value,constraints:$('context-constraints').value};
}
function copyText(){
 const text=originalPrompt.get(state.selected);
 return text?composeForCopy(text,context()):'';
}
function renderList(){
 const list=$('prompt-list');list.replaceChildren();
 const matching=searchCatalogue(prompts,originalMarkdown,state.search,state.category,state.audience);
 $('result-count').textContent=String(matching.length);
 if(!matching.length){
  list.append(node('p','prompt-list-empty','Nenhum prompt corresponde aos filtros. Experimente outra palavra ou limpe os filtros.'));
  return;
 }
 for(const prompt of matching){
  const button=node('button','prompt-card');button.type='button';
  button.setAttribute('aria-pressed',String(prompt.id===state.selected));
  const body=node('span','prompt-card-content');
  body.append(node('strong','',prompt.title),node('small','',prompt.description),node('span','prompt-tag',prompt.category.toUpperCase()));
  button.append(node('span','prompt-number',prompt.id),body);
  button.addEventListener('click',()=>choose(prompt.id));
  list.append(button);
 }
}
function renderDetail(){
 const selected=current();
 $('detail-empty').hidden=true;$('detail-content').hidden=false;
 $('detail-category').textContent=selected.category.toUpperCase()+' · '+selected.id;
 $('detail-number').textContent=selected.id+'/10';
 $('detail-title').textContent=selected.title;
 $('detail-description').textContent=selected.description;
 $('detail-audience').textContent=selected.audience;
 $('detail-needs').textContent=selected.needs;
 $('detail-delivers').textContent=selected.delivers;
 const md=originalMarkdown.get(selected.id),prompt=originalPrompt.get(selected.id);
 $('prompt-code').textContent=state.fullDocument?(md??'Carregando documento original…'):(prompt??'Carregando prompt original…');
 $('show-original').setAttribute('aria-pressed',String(state.fullDocument));
 $('show-original').textContent=state.fullDocument?'Ver apenas o prompt':'Ver documento completo';
 $('original-link').href='https://github.com/cecil-ia-labs/prompts-oficina/blob/main/prompts/'+encodeURIComponent(selected.file);
 $('copy-prompt').disabled=!prompt;$('download-prompt').disabled=!prompt;$('download-markdown').disabled=!md;
}
function render(){renderList();renderDetail();}
function choose(id){
 if(!prompts.some(p=>p.id===id))return;
 state.selected=id;state.fullDocument=false;
 for(const el of document.querySelectorAll('.custom-fields input'))el.value='';
 const url=new URL(location.href);url.searchParams.set('prompt',id);
 history.replaceState(null,'',url.pathname+url.search+url.hash);
 render();
}
function download(name,text,type='text/plain'){
 const blob=new Blob([text],{type:type+';charset=utf-8'});
 const url=URL.createObjectURL(blob);
 const anchor=node('a');anchor.href=url;anchor.download=name;
 document.body.append(anchor);anchor.click();anchor.remove();
 setTimeout(()=>URL.revokeObjectURL(url),2000);
}
$('catalog-search').addEventListener('input',event=>{state.search=event.target.value;renderList();});
for(const category of categories.filter(c=>c!=='Todos')){
 const option=node('option','',category);option.value=category;$('category-select').append(option);
}
$('category-select').addEventListener('change',event=>{state.category=event.target.value;renderList();});
$('audience-select').addEventListener('change',event=>{state.audience=event.target.value;renderList();});
$('clear-filters').addEventListener('click',()=>{
 state.search='';state.category='Todos';state.audience='Todos';
 $('catalog-search').value='';$('category-select').value='Todos';$('audience-select').value='Todos';
 renderList();
});
$('show-original').addEventListener('click',()=>{state.fullDocument=!state.fullDocument;renderDetail();});
$('copy-prompt').addEventListener('click',async()=>{
 const text=copyText();if(!text)return;
 try{await navigator.clipboard.writeText(text);message('Prompt copiado. Revise os campos entre colchetes e anexe seus materiais no chat.');}
 catch{message('Cópia bloqueada pelo navegador. Selecione o texto da prévia e copie manualmente.');}
});
$('download-prompt').addEventListener('click',()=>{
 const text=copyText();if(!text)return;
 download('prompt-'+state.selected+'.txt',text+'\n');
 message('Arquivo de texto preparado para download.');
});
$('download-markdown').addEventListener('click',()=>{
 const content=originalMarkdown.get(state.selected);if(!content)return;
 download(current().file,content,'text/markdown');
 message('Documento Markdown original preparado para download.');
});
document.addEventListener('keydown',event=>{
 if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!event.altKey
   &&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){
  event.preventDefault();$('catalog-search').focus();
 }
});
const requested=new URL(location.href).searchParams.get('prompt');
if(requested&&prompts.some(p=>p.id===requested))state.selected=requested;
render();
void loadOriginals();
