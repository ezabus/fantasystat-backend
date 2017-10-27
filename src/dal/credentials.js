const prompt = require('prompt');

prompt.start();
const schema = {
    properties: {
        user: {
            required: true,
            hidden: false
        },
        password: {
            hidden: true
        }
    }
};

function run() {
    return new Promise((resolve, reject) => {
    prompt.get(schema, function (err, result) {
        if(err)
            reject(err);
        resolve({
            user: result.user,
            password: result.password
        });
    });
});
}

module.exports = run;
