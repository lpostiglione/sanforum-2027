# SanForum Fachjournal

A Discourse theme for sanforum.at, based on the approved balanced
Fachjournal composition. It uses SanForum's admin-managed branding and existing blue
accents, with a category directory and recent discussions on the same homepage.

## Preview

- [Open the preview](https://sanforum.at/?preview_theme_id=19)
- [Theme administration](https://sanforum.at/admin/customize/themes/19)
- Light palette: SanForum Fachjournal Light (45).
- Dark palette: SanForum Fachjournal Dark (46).

As checked on 2026-10-31, theme 19 is installed from
[GitHub `main`](https://github.com/lpostiglione/sanforum-2027/tree/main),
user-selectable and non-default. It is not the live default theme. The theme 18
checks below are historical and do not verify the current branding fix.

## Implementation

- `common/common.scss` loads the core container/viewport libraries and imports
  the three stylesheet layers through their `_index.scss` files.
- `stylesheets/brand/` contains the palette tokens and self-hosted Source Sans 3.
  Font licenses and origins are in `assets/fonts/`.
- `stylesheets/app/` contains native variable overrides, shared chrome,
  categories, topic rows/reading, and search/composer/profile surfaces.
- `stylesheets/layouts/homepage.scss` owns the overview composition, named
  container query and mobile layout adjustments.
- `javascripts/discourse/api-initializers/theme-initializer.gjs` combines native
  discovery components, loads permission-filtered data from
  `/categories_and_latest`, appends native excerpts, renders the actual last
  poster through native user-link/avatar/flair components. The navy header uses
  configured dark logos, falling back to native Discourse logo selection.
- `locales/de.yml` and `locales/en.yml` contain the theme's labels.
- `about.json` declares light/dark palettes and theme-specific settings. It
  disables the welcome banner and keeps the native search icon.

The native category hierarchy, muted-category handling, topic statuses,
create/reply permissions, drafts and account workflows remain in Discourse.
An explicit member homepage preference may take precedence over the theme's
custom homepage. During an actual preview, the combined request carries the
preview theme ID so its excerpt settings apply. Normal visits use Discourse's
saved theme selection without adding a preview parameter.

When the named homepage container has less than `md` (48rem) of available width,
jump links labelled “Kategorien” and the native latest label (“Aktuell” in German)
provide access to both sections. At `container.from(md, sanforum-home)`, the
sections sit side by side and the jump links are hidden. Opening the sidebar can
therefore change the layout without changing the viewport. Native discovery
navigation remains available. Below viewport `md`, every permitted parent category in the
homepage's main list becomes a compact, wrapping title link with a 3rem minimum
height. Descriptions, subcategory trees and counts are hidden only in that
direct-child list. The full `/categories` directory and the separately expanded
muted group retain their content. Tighter homepage navigation margins and section
spacing bring recent discussions closer. The native sidebar supplies its own
inner separator; the theme adds no outer wrapper border.

Category titles and subcategories now wrap at every width within category lists.
Titles use an 18px step (17px on the compact mobile homepage); 15px subcategory
links form an auto-fit grid. The clipped native table header remains in table
layout to preserve column widths and accessible labels. Overview discussion rows
lead with a 19px title, excerpt and category, followed by the actual last poster's
28px avatar and username. Counts and dates occupy a separate narrow column.
These pixel equivalents assume a 16px root size; the source uses rem units.

The revised dark palette uses brighter text, a deeper reading surface and a
distinct blue sidebar. The original brand blues and light palette are unchanged.
Scheme-aware link, action, muted-text and rule tokens provide the contrast and
separation; `DESIGN.md` records their current values. Homepage heading margins
and online-status spacing are compact. Historical refinement checks are recorded
below. Theme-owned CSS properties use the
`--t-SanForum2027FachjournalPreview-` prefix; the source uses Discourse's container
and viewport mixins rather than raw queries. No optional motion is added.

Branding is managed in [Discourse's logo settings](https://sanforum.at/admin/config/logo).
The header stays navy in both color schemes, so it prefers each configured dark
logo (primary, mobile and small), with native selection as the fallback when a
dark variant is unset. Favicon and app icons remain native. The theme must not
hard-code a logo URL.
`assets/plates/logo.png` and its origin metadata are historical design references
only, never runtime branding sources.
The optional upstream Canvas/banner components are not installed: their shared
settings hide controls and would affect unrelated themes.

### Historical theme 18 refinement validation

The refinement was checked at 390px in light and dark mode, 820px tablet width,
and 1206px desktop width in dark mode. Search returned 50 results without
overflow; an empty composer opened and closed without posting; a native user
card opened; all 35 category names in the full directory remained unclipped.

The final modular stylesheet was expanded, saved and compiled in preview theme
18; its Common CSS readback exactly matched the expanded stylesheet. Final
390px light and 1206px dark checks found no clipped names or horizontal overflow.
At a 1000px viewport, opening the sidebar left a 722.56px homepage container
with one column and visible jump links; closing it yielded 970.08px, two columns
and hidden jump links. The collapsed sidebar had no border, and neither state
showed overflow or clipped category names. These are runtime checks, not a full
pixel-match claim. The QUnit theme harness was not run. Theme 18 was the
non-default preview used for this validation.

### Earlier theme 18 localized homepage validation

Before the later palette, typography and discussion-row revision on 2026-10-28,
theme 18's installed CSS and JS matched the repository at that point. At
390 × 844 in dark mode, the six parent rows measured 50px each including rules;
the category section measured 335px, down from 1121px. The discussion heading
started at 698px, including the preview notice. Both jump links scrolled and
moved focus correctly; `/categories` retained all six subcategory trees.

At 1177px wide, both columns appeared and custom jump links were hidden. The
expanded sidebar retained its native 1px separator; the collapsed wrapper had
zero width and no border. The independent `mobile_comp_review` passed this
localized scope. This was not a full-composition review, and the light palette
was not rerun in that pass. These measurements and the review verdict apply to
the earlier compact-homepage revision, not the current source.

## Development and installation

This repository is a theme package; it has no standalone application server.
It targets Discourse `2026.9.0-latest` and was integrated against commit
`b1016b1bfb353b271ccc88b3d413ec51a81452fd`.

Repository-local `discourse-theme-authoring` and `discourse-block-authoring`
skills come from [discourse/discourse-theme-skills](https://github.com/discourse/discourse-theme-skills)
at commit `45508d28431748d464871a83e3e6026af03992e2`. Their unmodified upstream
files and MIT license are retained under `.agents/skills/`; see
[the provenance record](.agents/skills/README.md). They are development guidance,
not theme assets, and were not installed globally.

Install lint dependencies using the existing lockfile:

```sh
pnpm install --frozen-lockfile --config.auto-install-peers=false --config.exclude-links-from-lockfile=false
node_modules/.bin/eslint javascripts test
node_modules/.bin/ember-template-lint javascripts
node_modules/.bin/prettier --check about.json common stylesheets javascripts locales test
```

Use direct binaries: newer pnpm exec versions can rewrite this template's older
lockfile. `test/acceptance/homepage-test.js` runs in Discourse's theme test harness;
these lint commands do not execute it.

Build an import archive from the repository root:

```sh
COPYFILE_DISABLE=1 tar --exclude='.DS_Store' --exclude='._*' --exclude='.gitkeep' \
  -czf /tmp/sanforum-2027-preview.tar.gz \
  about.json settings.yml .discourse-compatibility common desktop mobile stylesheets \
  javascripts locales assets/fonts assets/plates LICENSE
```

Import through **Administration → Themes → Install → From your device**. An
archive import creates a new theme; it does not update one with the same name.
Keep the new theme non-default and not user-selectable, then explicitly assign
its matching dark palette. Existing theme-specific settings survive imports.
Theme 19 receives the modular source tree from its GitHub `main` installation.
The authenticated Discourse theme development tool or an archive import can also
deliver that tree. The historical theme 18 preview used an equivalent expanded
stylesheet in its Common CSS editor: module imports were resolved before
pasting, while Discourse compiled the result. Pasting the short
`common/common.scss` entrypoint alone cannot install its module files. Common JS
comes from the theme initializer. Font or metadata changes require an archive
import or the authenticated development tool.

Browser screenshots under `.impeccable/review/` are local-only because they can
contain signed-in forum content. Never include them in theme archives.

## Credits

Based on Manuel Kostka's [Canvas Theme Template](https://meta.discourse.org/t/352730).
The original MIT license and attribution remain in `LICENSE`. Source Sans 3 is
licensed under the SIL Open Font License; see `assets/fonts/OFL.txt`.
