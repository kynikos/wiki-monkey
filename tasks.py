from invoke import task

from auxiliary import userscripts


@task
def deps(ctx):
    """
    Install/update dependencies.
    """
    # TODO: Create a task to update the dependencies

    # Python/pip
    # run('pip install invoke')

    # Node.js/npm
    ctx.run('npm install jquery')
    ctx.run('npm install coffee-script')
    ctx.run('npm install browserify')
    # ctx.run('npm install coffeeify')

    # Ruby/gem
    # run('gem install sass')


@task
def build(ctx):
    """
    Recompile development scripts.
    """
    userscripts.compile(ctx.run, False)


@task
def release(ctx, version):
    """
    Recompile all scripts (needs a version number).
    """
    userscripts.compile(ctx.run, version)

    # TODO: The following recompiles only the scripts inside /dist, i.e. those
    #       inside /build are not recompiled (requires coffeeify). For this
    #       reason it doesn't support all the various subversions
    # userscripts.compile(run, "--transform coffeeify "
    #                     "--extension='.coffee'", "./src/", version)

    # TODO: The following command wouldn't require coffeeify, but:
    #       * it doesn't work if some required files are already JS files
    #         (for example the lib.js.generic scripts)
    #       * it adds a redundant function wrap to required scripts
    #       * it's much slower
    # userscripts.compile(run, "--command 'coffee --stdio --compile' "
    #                     "--extension='.coffee'", "./src/", version)
