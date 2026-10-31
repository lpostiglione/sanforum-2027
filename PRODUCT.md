# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

SanForum serves Austria’s German-speaking rescue-service community, including
professionals, volunteers, and trainees. Members use it to find information,
exchange experience, ask questions, and participate in discussions.

## Product Purpose

Create a new Discourse theme for [SanForum.at](https://sanforum.at/), building on
this repository’s Canvas Theme Template. Improve how easily people find, read,
and participate in discussions while retaining familiar Discourse workflows.

## Operating Context

SanForum presents itself as “Das Rettungsdienstportal.” Its existing subject
areas include rescue services and patient transport, training, equipment and
vehicles, specialist rescue units, and community discussion.

Core workflows include browsing categories and topic lists, searching, reading
threads, catching up on new or unread activity, and creating or replying to
topics. The theme must work within Discourse’s desktop and mobile interfaces.

## Capabilities and Constraints

- Build on the existing Discourse theme and its Canvas extension points. This
  repository is a theme package, not a standalone frontend application.
- Preserve Discourse’s content, navigation, account permissions, and core
  interactions as the presentation changes.
- Cover the complete theme: overview, topic lists and reading, search, composer,
  profiles, account surfaces, and shared navigation and controls.
- Design mobile first with a fully considered desktop layout. Give category
  browsing and recent discussions equal prominence.
- Keep the existing theme repository structure and use supported Discourse
  extension points. The upstream Canvas/banner components are optional; avoid
  inheriting their hidden controls or changing shared live component settings.
- Preserve the upstream MIT license and attribution in `LICENSE`.
- Validate future UI changes in a running Discourse instance. This repository
  does not provide a standalone application preview.

## Brand Commitments

- Keep the SanForum.at name and use branding managed through
  [Discourse's logo settings](https://sanforum.at/admin/config/logo). Let native
  Discourse provide the configured primary, mobile, small and dark logos, plus
  favicon and app-icon assets. The navy header prefers each configured dark logo,
  with native selection as fallback when unset. Preserve each selected asset's
  intrinsic aspect ratio; never hard-code an asset URL in the theme.
- The user's 2026-10-31 instruction supersedes the original fixed-PNG requirement.
  `assets/plates/logo.png` and its provenance are historical design references
  only, never runtime branding sources.
- Keep the current blue accents. On 2026-10-28, the live site’s `--tertiary`
  color was `#3877E5` in its Air Light scheme and `#1F7BC1` in Royal Dark.
  These live values are the brand reference; Canvas’s bundled defaults are not.

## Evidence on Hand

- [SanForum.at](https://sanforum.at/): existing product language, categories,
  navigation, and rendered identity inspected on 2026-10-28.
- The originally supplied logo was verified in the live header on 2026-10-28;
  this historical observation does not override the admin-managed branding.
- Blue accents were verified from the live site’s linked color-definition
  stylesheets; the dark value was also checked in the rendered page.
- `README.md` describes the Canvas template’s existing customization points.
  `assets/Cover.png` illustrates the upstream template, not SanForum’s identity.

## Product Principles

1. Make discussions easy to find, read, and join.
2. Keep established Discourse interactions familiar to returning members.
3. Preserve SanForum’s recognizable name, logo, and blue accents.

## Delivery

The user approved implementation of the full theme and a separate preview theme
on sanforum.at. The initial development preview was non-default and not
user-selectable. As checked on 2026-10-31, the Git-installed theme 19 follows
GitHub `main`, is user-selectable and remains non-default. A site-wide default
rollout is a separate decision.
