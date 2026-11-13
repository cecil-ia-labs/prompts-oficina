import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=path=>readFileSync(new URL(path,import.meta.url),'utf8');
const html=read('../index.html'),js=read('../studio.mjs'),css=read('../studio.css');
const manifest=read('../manifest.mjs');
const workflow=read('../../.github/workflows/publish-showcase.yml');

test('all catalogue interface controls exist',()=>{
 const ids=new Set([...js.matchAll(/\$\('([^']+)'\)/g)].map(x=>x[1]));
 for(const id of ids)assert.ok(html.includes('id="'+id+'"'),'Missing '+id);
});
test('all ten original markdown files are present for staging',()=>{
 for(let i=1;i<=10;i++){
  const id=String(i).padStart(2,'0');
  assert.ok(existsSync(new URL('../../prompts/'+
    read('../manifest.mjs').match(new RegExp('id:"'+id+'",file:"([^"]+)"'))?.[1],import.meta.url)),id);
 }
});
test('static site reads original assets from the same origin',()=>{
 assert.match(js,/fetch\(new URL\(basename\(prompt\),import\.meta\.url\)\)/);
 assert.match(js,/extractPrompt\(markdown\)/);
 assert.match(js,/originalPrompt\.set\(prompt\.id/);
 assert.doesNotMatch(js,/api\.openai\.com|OPENAI_API_KEY|sendBeacon\s*\(/);
});
test('copy preserves original prompt and separate optional context',()=>{
 assert.match(js,/composeForCopy\(text,context\(\)\)/);
 assert.match(html,/PROMPT PARA COPIAR/);
 assert.match(html,/O texto original permanece inalterado/);
});
test('site has mobile layout and accessible feedback',()=>{
 assert.match(css,/@media\(max-width:480px\)/);
 assert.match(css,/:focus-visible/);
 assert.match(html,/aria-live="polite"/);
});
test('manual workflow pins all actions and includes unchanged prompt sources',()=>{
 assert.match(workflow,/workflow_dispatch:/);
 assert.doesNotMatch(workflow,/^\s*(push|pull_request):/m);
 assert.match(workflow,/cp prompts\/\[0-9\]\[0-9\]-\*\.md _site\/prompts\//);
 const refs=[...workflow.matchAll(/uses:\s*([^\s]+)@([^\s]+)/g)];
 assert.ok(refs.length>=4);
 for(const [,name,sha] of refs){assert.match(name,/^actions\//);assert.match(sha,/^[a-f0-9]{40}$/);}
});
