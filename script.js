// "git add . && git commit -m "
const {execSync} = require('child_process')
let args = process.argv
args.splice(0, 2)
gitCommitMessage = args.join(" ")

execSync(`git add . && git commit -m "${gitCommitMessage}"`, (err, stdout, stderr) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(stdout)
})