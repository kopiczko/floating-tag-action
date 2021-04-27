# floating-tag-action

This action ensures that all tags in the repository in the current path have
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

This action doesn't have any inputs.

## Outputs

This action doesn't have any outputs.

## Example usage

Downloading a Giant Swarm binary with optional inputs left with default values:

```yaml
steps:
- name: Checkout the code
  uses: actions/checkout@v2
- name: Ensure major version tags
  uses: giantswarm/floating-tag-action@v1
```
