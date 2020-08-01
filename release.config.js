module.exports = {
    branch: 'master',
    tagFormat: '${version}',
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/npm',
            {
                npmPublish: false,
            },
        ],
        '@semantic-release/changelog',
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md', 'package.json'],
                message: 'RELEASE: ${nextRelease.version} \n\n${nextRelease.notes}', // eslint-disable-line no-template-curly-in-string
            },
        ],
        [
            'semantic-release-slack-bot',
            {
                notifyOnSuccess: true,
                notifyOnFail: false,
                markdownReleaseNotes: true,
                slackWebhook:
                    'https://hooks.slack.com/services/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',
            },
        ],
    ],
    debug: true,
    dryRun: false,
    ci: true
};
