---
version: 1
slug: "common-common-scss"
primary_target: "common/common.scss"
related_targets:
  [
    "stylesheets/layouts/homepage.scss",
    "stylesheets/app/categories.scss",
    "stylesheets/app/topics.scss",
    "javascripts/discourse/api-initializers/theme-initializer.gjs",
  ]
---

# SanForum Fachjournal theme

Approved comp: `.impeccable/mocks/decision/fachjournal.png`. The user selected Balanced overview during direction selection; it supersedes the earlier activity chooser event.

## Direction contract

**THESIS:** Make specialist discussion readable and reachable through a balanced category directory followed by recent conversation.

**OWN-WORLD:** A deep navy identity bar, the original white-and-blue SanForum logo, current blue accents, neutral reading surfaces, one humanist UI sans, continuous rows and quiet dividers. Light and dark palettes retain the same hierarchy.

**STORY:** Members orient by category, catch up through meaningful titles and short excerpts, then read, search or participate with familiar Discourse controls.

**FIRST VIEWPORT:** Header utilities above equally prominent category/recent destinations. A compact directory leads into recent discussion; its heading shares a row with the create-topic action where space allows. Desktop puts directory and activity alongside each other with persistent native navigation.

**FORM:** Fachjournal, candidate 1, selected by the user. Seed reference `seed:ad7380826298064b`. Restrained neutral reading surfaces with blue navigation and emphasis.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Translation constraints

The original logo and existing blue accents override generated approximations. Comp topic names, authors, initials, counts, category examples and explanatory labels are illustrative and never seeded into production. Preserve actual permissions, hierarchy, mute states, links, excerpts, composer drafts and core navigation. Long German content wraps. The native directory can be taller with real categories; the paired top destinations keep recent discussion equally reachable.

## Scope

Overview, lists, topic reading, quick/full search, composer, profiles, account, notifications, menus, forms, dialogs, light/dark, mobile and desktop. Preview-only installation, non-default and not user-selectable.

## Approved native adaptation

On 2026-10-28 the user answered “yes” to adapting the approved composition to native Discourse and validating the real preview. The original logo, blue accents, balanced category/recent access and reading hierarchy stay authoritative. Real content, core controls, responsive behavior and native integration determine exact pixels. Standalone screenshot gates are replaced by real-runtime checks and an independent finish review; no approval receipts are fabricated.

## Current responsive translation

The approved balanced direction above remains the history and intent. The
implemented homepage now expresses it with “Kategorien” and the native latest
label (“Aktuell” in German) as jump links while the named `sanforum-home`
container is narrower than `md` (48rem). At `container.from(md, sanforum-home)`,
categories and discussions sit side by side and the custom jump links are hidden.
Native discovery navigation remains available at every width.

Below viewport `md` (48rem), the homepage's main direct-child category list shows every
permitted parent category as a strong, wrapping title link with a 3rem minimum
height (about 48px). Only this list hides descriptions, subcategory trees and
counts. The full `/categories` directory and the separately expanded muted group
retain their content. The compact list has no category-count limit and no
fixed-height text crop.

Mobile homepage navigation margins are 0.75rem and the section gap is 1.25rem,
so recent discussions follow sooner. These statements record the source change;
runtime verification and the finish verdict are separate.

## Current readability revision

Following feedback about comp fidelity, a dull dark palette and truncated desktop
categories, the source now wraps category and subcategory names at every width,
scoped to category lists. Category titles use 1.125rem (18px at a 16px root),
compact mobile titles use 1.0625rem (17px), and subcategories use 0.9375rem (15px)
in an auto-fit grid with a 14rem column minimum that can shrink to available
width. The clipped native category header stays in table layout to preserve
column widths and screen-reader labels.

Overview discussion rows lead with a 1.1875rem (19px) title, excerpt and category.
A 3.5rem column holds statistics; beneath the content, a 28px avatar and the
actual `lastPosterUser.username` preserve native user-link, card and flair
behavior. Section headings use 1.5rem (24px) above the mobile breakpoint. Native
heading margins and online-status spacing are tightened.

The dark palette has brighter foreground text, a deeper reading surface and a
distinct blue sidebar. Scheme-aware functional tokens strengthen links, actions
and supporting text while preserving both original brand blues and the light
palette. Current values live in `DESIGN.md` and `about.json`.

This is a source record of the native adaptation, not a full pixel-match claim.
The earlier compact-homepage measurements and localized review apply only to
their revision. Current refinement and final container checks are recorded in
`README.md`; the QUnit theme harness was not run.

## Modular source

`common/common.scss` now imports `stylesheets/brand/`, `stylesheets/app/` and
`stylesheets/layouts/` through their indexes after loading the native container
and viewport libraries. Theme properties use the
`--t-SanForum2027FachjournalPreview-` owner prefix. Optional transitions were
removed; native motion remains unchanged. Native avatar flair is inset 14px from
the compact poster's block start and inline start. The preview's Common CSS uses
an expanded equivalent of these source modules, not the entrypoint alone.
