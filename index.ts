import * as exec from '@actions/exec';
import * as semver from 'semver'

async function bash(command: string, options?: exec.ExecOptions) {
  return await exec.exec('bash', ['-c', command], options)
}

async function main(): Promise<void> {
  const versionTags = await getVersionTags();
  const latestForMajor = getLatestForMajor(versionTags);

  const tagsToPush = new Array<string>();
  for (const [major, versionTag] of latestForMajor) {
    // It could be done as `git tag --force` oneliner but it feels safer to do
    // it that way.  Especially that the output of `git tag --delete` prints the
    // ref of the deleted tag.
    await bash(`git tag --delete v${major}`);
    await bash(`git tag v${major} ${versionTag}`);
    tagsToPush.push(`v${major}`);
  }
  await bash(`git push --force --tags origin ${tagsToPush.join(" ")}`)
}

/** @returs an array of tuples of a major number of the version and its latest corresponding version tag. */
function getLatestForMajor(versionTags: string[]): [number, string][] {
  const latestForMajor = new Map<number, string>();

  versionTags.forEach((tag) => {
    if (semver.valid(tag) == null) {
      return;
    }

    const version = new semver.SemVer(tag);
    if (!latestForMajor.has(version.major)) {
      latestForMajor.set(version.major, tag);
      return;
    }

    if (version.compare(latestForMajor.get(version.major) as string) > 0) {
      latestForMajor.set(version.major, tag);
      return;
    }
  });

  const ret = new Array<[number, string]>();
  latestForMajor.forEach((tag, major) => ret.push([major, tag]));
  return ret;
}

/** @returns tags from the current git repository matching v*.*.* glob. */
async function getVersionTags(): Promise<string[]> {
  const tags = new Array<string>();
  
  const opts: exec.ExecOptions = {
    listeners: {
      stdline: (data) => tags.push(data),
    },
  };

  await bash("git tag -l 'v*.*.*'", opts);

  return tags;
}

main();
