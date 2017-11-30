from invoke import task

from auxiliary import userscripts


@task
def build(ctx):
    """
    Recompile all scripts for development/debugging.
    """
    userscripts.compile(ctx.run, False)


@task
def release(ctx, version):
    """
    Recompile all scripts (needs a version number).
    """
    userscripts.compile(ctx.run, version)
