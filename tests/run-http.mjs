import {spawn} from 'node:child_process';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
const temp=mkdtempSync(path.join(tmpdir(),'dalifa-http-'));
const base='http://127.0.0.1:3011';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3011'],{env:{...process.env,DATA_DIR:temp},stdio:'pipe'});
let output='';server.stdout.on('data',d=>output+=d);server.stderr.on('data',d=>output+=d);
try {let ready=false;for(let i=0;i<100;i++){try{const r=await fetch(base);if(r.ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,100));}if(!ready)throw Error(output);const tests=spawn(process.execPath,['--test','tests/http.test.mjs'],{env:{...process.env,TEST_URL:base},stdio:'inherit'});const code=await new Promise(r=>tests.on('exit',r));process.exitCode=Number(code);}finally{server.kill();await new Promise(r=>server.on('exit',r));rmSync(temp,{recursive:true,force:true});}
