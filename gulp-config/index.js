var pkg = require('../package.json');
var config = {
    clean: [ '.sonar', 'coverage', 'log/**/*' ],
    mocha: [ 'test/*.js'],
    src: ['common-filters/**/*.js'],
    sonar: {
        host: { url: 'http://localhost:9000/sonar' },
        jdbc: {
            url: 'jdbc:mysql://localhost:3306/sonar?useUnicode=true&amp;characterEncoding=utf8',
            username: 'sonar'
        },
        projectKey: 'sonar:' + pkg.name,
        projectName: pkg.name,
        projectVersion: pkg.version,
        sources: 'common-filters',     // comma-delimited string of source directories
        language: 'js',
        sourceEncoding: 'UTF-8',
        javascript: {
            lcov: {
                reportPath: 'coverage/lcov.info'
            }
        }
    }
};

config.eslint = config.src;

module.exports = config;
