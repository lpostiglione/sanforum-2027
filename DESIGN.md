---
name: SanForum Fachjournal
description: A restrained reading and discussion system for SanForum's native Discourse interface.
colors:
  ink-light: "#172B43"
  paper-light: "#FFFFFF"
  brand-blue-light: "#3877E5"
  brand-blue-dark: "#1F7BC1"
  header-light: "#103858"
  header-dark: "#103858"
  ink-dark: "#EDF3FA"
  paper-dark: "#111A24"
  sidebar-dark: "#142638"
  selected-light: "#E8F0FD"
  selected-dark: "#173E67"
  hover-light: "#F3F7FC"
  hover-dark: "#1A2C40"
  highlight-light: "#FFF2C2"
  highlight-dark: "#4A4030"
  rule: "color-mix(in srgb, var(--primary) 15%, var(--secondary))"
  muted: "color-mix(in srgb, var(--primary) 72%, var(--secondary))"
  link: "light-dark(color-mix(in srgb, var(--tertiary) 82%, var(--primary)), color-mix(in srgb, var(--tertiary) 55%, var(--primary)))"
  action-accent: "light-dark(var(--tertiary), var(--quaternary))"
  action: "color-mix(in srgb, var(--t-SanForum2027FachjournalPreview-button-color-background-accent) 90%, #000)"
  action-hover: "color-mix(in srgb, var(--t-SanForum2027FachjournalPreview-button-color-background-accent) 80%, #000)"
typography:
  headline:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "clamp(1.55rem, 2.5vw, 2.15rem)"
    lineHeight: 1.2
  section:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.4
  category-title:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "1.125rem"
    fontWeight: 650
    lineHeight: 1.35
  category-link:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "1.0625rem"
    fontWeight: 650
    lineHeight: 1.35
  subcategory:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "0.9375rem"
    lineHeight: 1.4
  metadata:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "0.875rem"
  count:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "1.125rem"
    fontWeight: 600
  reading:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "1.0625rem"
    lineHeight: 1.65
  body:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "1rem"
    lineHeight: 1.5
  label:
    fontFamily: '"Source Sans 3", sans-serif'
    fontSize: "0.9rem"
    fontWeight: 600
rounded:
  navigation: "4px"
  control: "6px"
  large: "10px"
spacing:
  compact: "0.5rem"
  inline: "0.6rem"
  navigation: "0.75rem"
  standard: "1rem"
  row: "1.15rem"
  section: "1.5rem"
  columns: "2rem"
  stacked: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.paper-light}"
    rounded: "{rounded.control}"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.paper-light}"
  input:
    rounded: "{rounded.control}"
  navigation-link:
    textColor: "{colors.link}"
    padding: "0.55em 0.85em"
    rounded: "{rounded.navigation}"
  overview-destination:
    textColor: "{colors.link}"
    padding: "0.6em"
  overview-category:
    typography: "{typography.category-link}"
    padding: "0.35rem 0"
  category-title:
    typography: "{typography.category-title}"
  subcategory-link:
    textColor: "{colors.muted}"
    typography: "{typography.subcategory}"
  poster-identity:
    textColor: "{colors.muted}"
    typography: "{typography.metadata}"
  discussion-title:
    typography: "{typography.title}"
  section-title:
    typography: "{typography.section}"
  reading-body:
    typography: "{typography.reading}"
---

# Design System: SanForum Fachjournal

## Overview

**Creative North Star: "Das Fachjournal"**

SanForum combines the clarity of a specialist journal with the familiar behavior
of a discussion forum. A deep navy identity bar holds the unchanged SanForum
logo. Blue provides navigation and action emphasis; neutral surfaces, continuous
rows and quiet dividers give real discussions room to lead.

The system serves reading and participation. It adapts the approved Fachjournal
direction to native Discourse components, preserving their content, hierarchy,
permissions and interaction states. The original logo and existing blue accents
are binding identity assets; the generated comp is a composition reference.

**Key Characteristics:**

- One humanist sans for navigation, discussion titles and reading.
- Continuous content rows separated by quiet rules.
- The same visual hierarchy in light and dark palettes.
- Mobile-first composition with native Discourse behavior.

This document records the implemented source in `stylesheets/brand/`,
`stylesheets/app/`, `stylesheets/layouts/homepage.scss`, `about.json` and the
theme initializer. `common/common.scss` loads the core query libraries and these
modules. Theme-owned properties use the `--t-SanForum2027FachjournalPreview-`
prefix; native Discourse properties keep their native names. It is not a test report
or a final-review verdict. Preview installation status belongs in `README.md`.

## Colors

The palette pairs a deep blue identity bar with calm reading surfaces and the
existing SanForum blues. The frontmatter contains the normative palette values.
The sidecar's synthesized tonal ramps are panel previews, not additional theme
tokens. Its component specimens show theme-owned styling with light-scheme
fallbacks; native Discourse remains the authority for complete controls and states.

### Primary

- **SanForum Blue, light and dark:** `brand-blue-light` and `brand-blue-dark`
  become Discourse's `--tertiary` in their respective schemes. The other blue
  becomes `--quaternary`; neither brand value is replaced for contrast tuning.
- **Reading Link:** `link` maps to `--t-SanForum2027FachjournalPreview-color-text-accent`, mixing the active blue toward
  the active text color for small links and navigation labels. Its light/dark
  branches retain 82% and 55% blue respectively, making dark links brighter.
- **Action Blue:** `action` and `action-hover` map to `--t-SanForum2027FachjournalPreview-button-color-background` and
  `--t-SanForum2027FachjournalPreview-button-color-background-hover`. The shared `action-accent` selects the light scheme's
  tertiary or the dark scheme's quaternary blue; both actions retain white text.
- **Identity Navy:** `header-light` and `header-dark` become
  `--header_background`; header text and icons use white.

### Neutral

- **Ink and Paper:** `ink-light`/`paper-light` and `ink-dark`/`paper-dark`
  become Discourse's `--primary`/`--secondary`. In Discourse, “primary” means
  foreground text; it does not mean the brand accent.
- **Dark Sidebar:** `sidebar-dark` lifts navigation onto a blue surface above
  the dark reading paper. In light mode the sidebar uses the active paper.
- **Selection and Hover:** the scheme-specific `selected` and `hover` values
  remain native palette inputs. Sidebar states use `--d-selected` and
  `--d-hover`. Discovery pills and overview jump links use Discourse's generated
  `--tertiary-very-low` for active or hover emphasis.
- **Highlight:** the light and dark `highlight` values provide the native
  warm emphasis color without adding a competing brand accent.
- **Rules and supporting text:** `rule` and `muted` map to `--t-SanForum2027FachjournalPreview-color-border` and
  `--t-SanForum2027FachjournalPreview-color-text-muted`, blending 15% and 72% of the active foreground into the active
  paper. Both follow the native scheme without a hard-coded neutral ramp.

**The Identity Rule.** Keep the supplied logo and both brand blues unchanged;
derive functional contrast colors without editing those identity assets.

## Typography

**Display and Body Font:** Source Sans 3, with the generic sans-serif fallback.
There is no separate display or label face. Self-hosted variable WOFF2 files
cover normal and italic styles, weights 200–900, Latin and Latin Extended;
`font-display: swap` keeps text available during loading.

The humanist letterforms support dense German navigation and sustained reading.
Hierarchy comes from weight, line height and spacing rather than decorative
letter spacing or uppercase headings.

### Hierarchy

- **Headline:** the fluid `headline` role serves topic titles, limited to
  38 characters of measure and balanced where the browser supports it.
- **Section:** the `section` role identifies overview sections. On narrow
  screens its size becomes 1.35rem; its wider size is 24px at a 16px root.
- **Title:** the `title` role gives overview discussion titles a 19px step at
  a 16px root. Visited titles retain their color and use weight 600 instead of 700. Ordinary topic lists retain native sizing with weight 600 and a 1.4 line
  height.
- **Category Title:** the `category-title` role is 18px at a 16px root,
  with weight 650 and wrapping at every width.
- **Category Link:** the `category-link` role gives compact mobile homepage
  category rows a 17px title at a 16px root in the active foreground color.
- **Subcategory:** the `subcategory` role is 15px at a 16px root, providing
  an orderly secondary level without truncating names.
- **Metadata and Count:** the `metadata` role is 14px at a 16px root for
  last-poster identity, dates and online status. The `count` role gives overview
  post totals an 18px step in the active foreground. Category notification
  badges use 0.8125rem with a 1.3 line height.
- **Reading:** the `reading` role limits post content to 72ch. On narrow
  screens its size becomes 1rem while the generous line height remains.
- **Body:** descriptions and excerpts use the `body` role. Composer input and
  preview use 1rem with a 1.6 line height; search blurbs use a 1.55 line height.
- **Label:** the `label` role serves overview section links. Counts and dates
  use tabular numerals; they remain legible supporting text.

**The Readability Rule.** Visited discussion titles retain the active foreground
color. Dates and secondary labels use the supporting-text token; overview post
counts use the active foreground. Reading history must not make a title difficult
to read.

## Layout

The native Discourse shell owns routing, discovery navigation, sidebar behavior
and responsive application structure. The theme sets a maximum content width
of 1440px, a sidebar width of 15rem and sidebar row height of 2.5em.

The overview is a named inline-size container, `sanforum-home`, and starts as one
content column. Below the container library's `md` boundary (48rem of available
width), two equal-width jump links reach categories and recent discussion.
At that boundary and above, `container.from(md, sanforum-home)` places the
directory and discussions in adjacent columns with a 0.9:1.1 ratio and 2rem gap,
and hides those custom jump links. The space left after the sidebar determines
this layout; viewport width alone does not. Native
discovery navigation remains present at every width. The homepage gives it a
0.5rem bottom margin above the mobile breakpoint; compact online status uses a
1rem bottom margin and no additional padding.

Category names, subcategory names and their badges wrap at every width within
the category list. Subcategories form an auto-fit grid with columns no narrower
than the lesser of the available width and 14rem, separated by 0.45rem vertically
and 1rem horizontally. Homepage category tables reserve 4.5rem for the count
column; their visually clipped header stays in table layout so the category
column keeps its width and its labels remain in the markup.

Overview discussion rows put the title, excerpt and category first. A flexible
content column sits beside a 3.5rem statistics column, with 0.6rem vertical and
0.75rem horizontal gaps. Last-poster identity follows the content in the left
column; the right column spans both rows. This hierarchy does not depend on a
large avatar taking space before the title.

Below viewport `md` (48rem), the homepage's main category list presents every permitted
parent category as a compact title link with a 3rem minimum height (48px at a
16px root size). Descriptions, subcategory trees and counts are hidden only in
that direct-child list. The full `/categories` directory and the separately
expanded muted-category group retain their content. Titles may wrap and grow;
there is no fixed-height crop or category-count limit.

The mobile overview uses a 1.25rem section gap and 0.75rem bottom margins for
both the jump links and native discovery controls, bringing discussions closer
to the directory. Above that viewport boundary, a single-column homepage retains
the 2.5rem gap until its container can support two columns.
Ordinary mobile category rows and discussion rows keep 1rem vertical padding.

The mobile logo is capped at `min(46vw, 210px)` wide and 34px high. At viewport
`md` and above it is capped at 40px high. Preserve its intrinsic 593:120 aspect ratio. The small
native logo variant has a 32px height.

Headings and rows use the frontmatter spacing rhythm. Wider overview rows use
the `row` spacing; ordinary topic-list cells use `standard` vertical padding.
Content columns have a zero minimum width and long category/discussion names
wrap anywhere. Overview excerpts occupy at most two lines; full posts remain
complete. Anchor targets reserve 6rem above their content for the header.
Responsive source uses Discourse's `lib/container` and `lib/viewport` mixins;
`viewport.until(md)` owns mobile control and typography adjustments. The
sidecar's standalone specimens expand these mixins into plain CSS equivalents.

## Elevation & Depth

Reading surfaces are flat. One-pixel rules distinguish rows, post boundaries,
the composer and profile header. The native sidebar supplies its own inner
separator; do not add an outer wrapper border that remains when collapsed.
Quotes use the native low-contrast foreground tone as a background and a thin
leading rule. The identity header
has the theme's only explicit shadow (`0 2px 7px rgb(0 0 0 / 12%)`). Native
menus and dialogs retain their Discourse geometry and elevation.

**The Continuous Reading Rule.** Keep category and discussion rows on their
shared surface; do not turn each item into an elevated card.

## Shapes

Controls use the `control` radius, larger native surfaces use `large`, and
navigation uses `navigation`. Mobile category rows deliberately have square
corners and a bottom divider. The logo is contained, never stretched or cropped.
Native avatars, badges and category markers keep their own semantic shapes.

## Components

### Buttons

Confident, compact actions retain native labels, icons and enabled states.
All buttons have a minimum height of 2.5rem and weight 600; composer utility
buttons use a 2.25rem minimum. Primary actions use Action Blue with white text
and icons. Hover and keyboard focus use the darker action color. Discourse
continues to own button padding, disabled behavior and contextual variants.

### Inputs / Fields

Native text, search, email and password fields, textareas and single-select
headers use the control radius. Placeholder text uses the supporting-text
token at full opacity; carets use the active brand blue. The composer retains
its native editor, preview, toolbar, validation and draft behavior, with a
`--primary-low-mid` editor boundary. Error, disabled and validation states remain
native rather than receiving invented theme-specific colors.

### Navigation

The identity bar uses white icons and a translucent white hover/focus surface.
Native discovery links use weight 600, the navigation radius and the frontmatter
padding. Active links combine a native blue-tinted surface with Reading Link.
Sidebar links keep native expand/collapse behavior, the selected/hover palette
states, and the distinct dark-sidebar surface.

Below the two-column desktop boundary, the overview destinations use weight 650
and a 3rem minimum height. They are real fragment links within a labelled
navigation landmark: “Kategorien” and the native latest-filter label (“Aktuell”
in German). Each destination section has a matching heading and a focusable
anchor target. New labels are localized in German and English; existing labels
remain Discourse-owned.

### Category and Discussion Rows

The directory uses native category components, including category colors and
muted-category behavior. On the mobile homepage, only the main list's immediate
category rows use the compact title treatment described in Layout. The
full category directory and separately expanded muted group retain descriptions,
subcategories and counts. The homepage's duplicate visual table heading is
clipped without removing it from table layout, preserving column widths and
native labels for assistive technology. Category titles and subcategories wrap
within their own list; these rules do not flatten unrelated badges or selectors.

Discussion rows use native titles, category badges, counts, dates and excerpts.
The last-poster identity appears below the excerpt/category content with a
28px avatar and the actual native username. It comes from `lastPosterUser`,
rendered through Discourse's `DUserLink`, avatar helper and avatar-flair component
in the native poster outlet. It is not the topic creator unless that person also
posted last. Native links and user-card behavior remain responsible for the
interaction. Native avatar flair stays attached to the compact avatar, inset
14px from the poster's block start and inline start. Both empty and populated states continue to follow the native
components and permission-filtered data.

### Search, Reading and Profiles

Quick search and full search keep the native query, result, empty and loading
flows. Search result titles use weight 650; results gain 1rem vertical spacing.
Topic content keeps native links, mentions, attachments and oneboxes. Profile
usernames use 1.6rem with a 1.2 line height; biographies share the reading measure
and use a 1.6 line height. Account panels, notifications, menus and dialogs use
the active paper/ink pair while retaining native controls.

### Focus and Motion

Keyboard focus has a 2px active-blue outline with a 3px offset. Preserve native
accessible names, heading/table semantics and permission-dependent actions.
The theme adds no animation or transition. Motion and reduced-motion behavior
continue to be managed by Discourse.

## Do's and Don'ts

### Do:

- **Do** preserve the original SanForum logo, its aspect ratio and both brand blues.
- **Do** use the active Discourse palette and the theme's derived link/action tokens.
- **Do** retain native navigation, permissions, drafts, status badges and account behavior.
- **Do** allow long German titles and real category hierarchies to determine row height.
- **Do** keep keyboard focus visible and preserve native labels and semantics.
- **Do** check future changes in a real Discourse instance in both color schemes and responsive layouts.

### Don't:

- **Don't** copy illustrative comp content into the forum or use it as production data.
- **Don't** stretch, recolor or crop the supplied logo.
- **Don't** replace continuous reading rows with individually elevated cards.
- **Don't** reduce visited titles or supporting counts to faint decorative text.
- **Don't** truncate category or subcategory names with ellipses at any width.
- **Don't** hide native controls or alter shared component settings to imitate the comp.
- **Don't** treat this design-system record as proof of runtime coverage or final approval.
