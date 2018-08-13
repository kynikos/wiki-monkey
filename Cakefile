path = require('path')
fs = require('fs')
{spawnSync} = require('child_process')
{jspack} = require('@kynikos/browserify-helpers')

SRCDIR = "./src/"
DISTDIR = './dist/'
AUXDIR = './auxiliary/'
# TODO: ./VERSION isn't used anymore, remove in a future version
VERSIONFILE = './VERSION'

option('-v', '--version [STRING]', "assign a version string to the build;
                                    if not given, only the testing script
                                    is recompiled")


run = (command, args..., options) ->
    return spawnSync(command, args, {
        stdio: [process.stdin, process.stdout, process.stderr]
        options...
    })


task('build', "recompile all user scripts", ({version}) ->
    if version
        spawnSync('npm', ['--allow-same-version'
                          '--no-git-tag-version'
                          'version', version])

        # TODO: ./VERSION isn't used anymore, remove in a future version
        fs.writeFileSync(VERSIONFILE, version)

    for fname in fs.readdirSync(SRCDIR)
        srcfile = path.join(SRCDIR, fname)

        if fs.statSync(srcfile).isFile()
            {name, ext} = path.parse(fname)

            if name.startsWith('_')
                await buildScript({
                    srcfile
                    wikiname: name[1..]
                    distdir: AUXDIR
                    minified: false
                    production: false
                })

            else if version
                await buildScript({
                    srcfile
                    wikiname: name
                    distdir: DISTDIR
                    legacy: true
                })
)


buildScript = ({
    srcfile
    wikiname
    distdir
    minified = true
    # TODO: Deprecate legacy versions in a future version
    legacy = false
    production = true
}) ->
    distfile = path.join(distdir, "WikiMonkey-#{wikiname}.js")

    envify = if production then {NODE_ENV: 'production'} else false

    console.log("Compiling #{distfile} ...")
    await jspack(srcfile, distfile, {
        coffeeify: true
        envify
        debug: true
        licensify: true
    })

    if minified
        distfile_min = path.join(distdir, "WikiMonkey-#{wikiname}.min.js")
        console.log("Compiling #{distfile_min} ...")
        await jspack(srcfile, distfile_min, {
            coffeeify: true
            envify
            licensify: true
            # This application relies on the plugin constructor names, so use
            # UglifyJS' keep_fnames option (a bug from not using this option
            # would be that the default plugin in the bot's select widget is
            # not correctly selected because its name isn't recognized in the
            # minified version)
            uglify: {keep_fnames: true}
        })

    if legacy
        # Previous versions were using this file name
        # TODO: Deprecate in a future version
        distfile_bwcompat =
            path.join(distdir, "WikiMonkey-#{wikiname}-mw.user.js")
        console.log("Creating #{distfile_bwcompat} ...")
        fs.copyFileSync(distfile, distfile_bwcompat)


task('serve-gencert', "generate the certificate to serve the scripts on
     localhost", (options) ->
    run('openssl', 'genrsa', '-out', 'dev-key.pem', '2048', {cwd: AUXDIR})
    run('openssl', 'req', '-new', '-key', 'dev-key.pem', '-out', 'dev.csr',
        {cwd: AUXDIR})
    run('openssl', 'x509', '-req', '-in', 'dev.csr', '-signkey', 'dev-key.pem',
        '-out', 'dev-cert.pem', {cwd: AUXDIR})
    fs.unlinkSync(path.join(AUXDIR, 'dev.csr'))
)


task('serve', "serve the user scripts on localhost", (options) ->
    run('./node_modules/.bin/http-server', '--cors', '--ssl',
        '--cert', path.join(AUXDIR, 'dev-cert.pem'),
        '--key', path.join(AUXDIR, 'dev-key.pem'), {})
)
