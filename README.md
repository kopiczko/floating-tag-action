# floating-tag-action

This actions ensures that all tags in the repository in the current path have
corresponding major version tags.

Version tags are tags matching pattern: `v*.*.*`. Tags starting with `v0.*` are
not considered.

Example:

For a repository with following tags: `v0.1.0`, `v1.0.0`, `v1.1.0`, `v1.1.2`,
`v2.0.0`, `v2.0.1`, `v2.0.2`, following tags are ensured:

- `v1` -> `v1.1.2`
- `v2` -> `v2.0.2`

Note that if `v1` and `v2` tags already exist they will be overwritten and
force-pushed.

## Inputs

To check all the inputs and their defaults see [action.yml](action.yml) file.

### `dry_run`

**Optional.** Defaults to false. If set to true the newly created tags won't be
pushed.

## Outputs

This action doesn't have any outputs.

## Example usage

Downloading a Giant Swarm binary with optional inputs left with default values:

```yaml
- uses: actions/checkout@v2
- uses: giantswarm/floating-tag-action@VERSION
  with:
    binary: "devctl"
    version: "2.0.0"
```
