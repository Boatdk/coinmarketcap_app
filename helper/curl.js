const curl = (command) => {
    return new Promise((resolve, reject) => {
        require('child_process').exec(command, async (error, stdout, stderr) => {
            resolve(stdout);
        })
    });
};

module.exports = {
    curl
}