from invoke import task

from auxiliary import build as build_


@task
def build(ctx):
    """
    Recompile all scripts for development/debugging.
    """
    build_.compile(ctx.run, False)


@task
def release(ctx, version):
    """
    Recompile all scripts (needs a version number).
    """
    build_.compile(ctx.run, version)
