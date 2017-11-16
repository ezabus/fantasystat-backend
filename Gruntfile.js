module.exports = function (grunt) {
    grunt.initConfig({
        exec: {
            cmd: 'bash ./resources/bash/deploy.sh'
            // zip: {
            //     cmd: 'jar -cMf build/backend.zip package.json src resources'
            // },
            // upload: {
            //     cmd: 'scp build/backend.zip ezabus@fantasystat.ru:/home/ezabus/backend/backend.zip',
            // },
            // unzip: {
            //     cmd: 'ssh ezabus@fantasystat.ru unzip -o backend/backend.zip -d backend/'
            // },
            // update: {
            //     cmd: 'ssh ezabus@fantasystat.ru npm update --prefix /home/ezabus/backend'
            // },
            // start: {
            //     cmd: 'ssh ezabus@fantasystat.ru "bash -i -c \'sudo npm run serve --prefix /home/ezabus/backend\'"'
            // }
        }

    });

    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('deploy', ['exec']);

};
