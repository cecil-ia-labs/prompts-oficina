import test from 'node:test';
import assert from 'node:assert/strict';
import {prompts} from '../manifest.mjs';
import {extractPrompt,searchCatalogue,composeForCopy} from '../prompt-utils.mjs';
test('catalogue covers ten uniquely mapped original Markdown sources',()=>{
 assert.equal(prompts.length,10);
 assert.equal(new Set(prompts.map(x=>x.id)).size,10);
 assert.equal(new Set(prompts.map(x=>x.file)).size,10);
 for(const x of prompts)assert.match(x.file,/^\d\d-[a-z0-9-]+\.md$/);
});
test('extracts only the fenced original prompt, without explanatory page text',()=>{
 const markdown='# Guide\n\nText outside.\n\n```text\nKeep these exact instructions.\n\n- Topic: [preencher]\n```\n\nMore explanation.';
 assert.equal(extractPrompt(markdown),'Keep these exact instructions.\n\n- Topic: [preencher]');
 assert.throws(()=>extractPrompt('# No fenced block'),/not found/);
});
test('search is accent-insensitive across metadata and original text',()=>{
 const body=new Map([['05','O tutor faz perguntas']]);
 assert.ok(searchCatalogue(prompts,body,'socratico').some(x=>x.id==='05'));
 assert.ok(searchCatalogue(prompts,body,'perguntas').some(x=>x.id==='05'));
 assert.ok(searchCatalogue(prompts,body,'zzzzzz').length===0);
});
test('filters by category and audience without excluding shared prompts',()=>{
 const result=searchCatalogue(prompts,new Map(),'','Aprendizagem','Estudantes');
 assert.deepEqual(result.map(x=>x.id),['05','07']);
});
test('preserves original exactly when personalization is empty',()=>{
 const original='Important: preserve this text, [preencher].';
 assert.equal(composeForCopy(original,{theme:'',audience:'',goal:'',constraints:''}),original);
});
test('optional context is separate and cannot rewrite original instructions',()=>{
 const original='Use the supplied source.\n- Year: [DD/MM/AAAA]';
 const text=composeForCopy(original,{theme:'Biologia',audience:'',goal:'Aprender',constraints:''});
 assert.ok(text.endsWith(original));
 assert.match(text,/Disciplina \/ tema: Biologia/);
 assert.match(text,/PROMPT ORIGINAL \(INALTERADO\)/);
});

test('preserves exact whitespace inside the original fenced block',()=>{
 const md='## Prompt para copiar\n\n```text\n  Keep leading and trailing spaces.  \n```';
 assert.equal(extractPrompt(md),'  Keep leading and trailing spaces.  ');
});
