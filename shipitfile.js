module.exports = function (shipit) {

    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/home/ezabus/backend',
            deployTo: '/home/ezabus/backend',
            repositoryUrl: 'https://github.com/ezabus/fantasystat-backend.git',
            ignores: ['.git', 'node_modules'],
            rsync: ['--del'],
            keepReleases: 2,
            shallowClone: true
        },
        staging: {
            servers: 'ezabus@fantasystat.ru'
        }
    });

    shipit.task('pwd', function () {
        return shipit.remote('pwd');
    });
};