const fs = require('fs');
const os = require('os');
const exec = require('child_process').exec 
//This is a way for breaking out of this Node process and running
// or executing a different command in the host operating system

let timer;

function checkGitStatus(dirName)
{
    exec('git status', {
        cwd: dirName
    }, (err, stdout, stderr) => {
        console.log('err', err);
        console.log('stdout', stdout);
        console.log('stderr', stderr);

        getStatus(err, stdout, stderr);
    });
}

function getStatus(err, stdout, stderr)
{
    if(err) return setStatus('unknown');
    if(/nothing to commit/.test(stdout)) return setStatus('clean');
    return setStatus('dirty');
}

function isDir(dirName)
{
    try{
        return fs.lstatSync(dirName).isDirectory();
    } catch(e){
        return false;
    }
}

function formatDir(dirName)
{
    let isInputATil = /^~/.test(dirName);
    return (isInputATil)
        ? os.homedir() + dirName.substr(1).trim()
        :  dirName.trim();
}

function removeStatus()
{
    const statusElement = document.getElementById('status');
    statusElement.classList.remove('unknown', 'clean', 'dirty');
    return statusElement;
}

function setStatus(status)
{
    const statusElement = removeStatus();
    statusElement.classList.add(status);
}

document.getElementById('input').addEventListener('keyup', event =>{
    clearTimeout(timer);

    timer = setTimeout(() => {
        const dirName = formatDir(event.target.value);

        if(isDir(dirName))
        {
            checkGitStatus(dirName);
        }
    }, 500);
});