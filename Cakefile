path = require('path')
fs = require('fs')
{spawnSync} = require('child_process')
{jspack} = require('@kynikos/browserify-helpers')

SRCDIR = "./src/"
DISTDIR = './dist/'
AUXDIR = './auxiliary/'
VERSIONFILE = './VERSION'
INITFILE = path.join(SRCDIR, 'modules/_Init.coffee')

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

        initfile = fs.readFileSync(INITFILE, {encoding: 'utf8'})
        initfile = initfile.replace(/VERSION *: *[\'"][0-9.]+[\'"]/,
                                    "VERSION: '#{version}'")

        fs.writeFileSync(INITFILE, initfile)
        fs.writeFileSync(VERSIONFILE, version)

    for fname in fs.readdirSync(SRCDIR)
        srcfile = path.join(SRCDIR, fname)

        if fs.statSync(srcfile).isFile()
            {name, ext} = path.parse(fname)

            if name.startsWith('_')
                await buildScript(srcfile, name[1..], AUXDIR)

            else if version
                distfile = await buildScript(srcfile, name, DISTDIR)

                # Previous versions were using this file name
                # TODO: Deprecate in a future version
                distfile_bwcompat = path.join(DISTDIR,
                                              "WikiMonkey-#{name}-mw.user.js")
                fs.copyFileSync(distfile, distfile_bwcompat)
)


buildScript = (srcfile, wikiname, distdir) ->
    distfile = path.join(distdir, "WikiMonkey-#{wikiname}.js")
    console.log("Compiling #{distfile} ...")
    dest = fs.createWriteStream(distfile)
    await jspack(srcfile, distfile, {debug: true})
    return distfile


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
