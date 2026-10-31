import { click, find, settled, visit } from "@ember/test-helpers";
import { test } from "qunit";
import { NotificationLevels } from "discourse/lib/notification-levels";
import { setDefaultHomepage } from "discourse/lib/utilities";
import Session from "discourse/models/session";
import Topic from "discourse/models/topic";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";
import { i18n } from "discourse-i18n";

acceptance("SanForum homepage", function (needs) {
  let combinedRequests;
  let topicRequests;
  let requestedThemeId;
  let themeMeta;
  let originalThemeId;

  needs.mobileView();
  needs.settings({
    enable_welcome_banner: false,
    site_mobile_logo_url: "/images/d-logo-sketch.png?sanforum-mobile",
  });
  needs.site({ categories: [] });

  needs.hooks.beforeEach(function () {
    combinedRequests = 0;
    topicRequests = 0;
    requestedThemeId = undefined;
    themeMeta = document.querySelector('meta[name="discourse_theme_id"]');
    originalThemeId = themeMeta?.content;
    if (!themeMeta) {
      themeMeta = document.createElement("meta");
      themeMeta.name = "discourse_theme_id";
      document.head.appendChild(themeMeta);
    }
  });

  needs.hooks.afterEach(function () {
    if (originalThemeId === undefined) {
      themeMeta.remove();
    } else {
      themeMeta.content = originalThemeId;
    }
  });

  needs.pretender((server, helper) => {
    server.get("/categories_and_latest", (request) => {
      combinedRequests++;
      requestedThemeId = request.queryParams.preview_theme_id;
      return helper.response({
        users: [
          {
            id: 8100,
            username: "theme_fixture",
            avatar_template:
              "/letter_avatar_proxy/v4/letter/t/3877e5/{size}.png",
          },
        ],
        category_list: {
          can_create_category: false,
          can_create_topic: false,
          categories: [
            {
              id: 8100,
              name: "Fixture category",
              slug: "fixture-category",
              color: "3877e5",
              text_color: "ffffff",
              topic_count: 1,
              topics_all_time: 1,
              subcategory_ids: [],
              notification_level: 1,
            },
            {
              id: 8101,
              name: "Muted fixture category",
              slug: "muted-fixture-category",
              color: "3877e5",
              text_color: "ffffff",
              topic_count: 1,
              topics_all_time: 1,
              subcategory_ids: [],
              notification_level: NotificationLevels.MUTED,
            },
          ],
        },
        topic_list: {
          topics: [
            {
              id: 8200,
              title: "Fixture topic",
              fancy_title: "Fixture topic",
              slug: "fixture-topic",
              category_id: 8100,
              excerpt: "Synthetic topic excerpt.",
              created_at: "2026-01-01T12:00:00.000Z",
              bumped_at: "2026-01-01T12:00:00.000Z",
              last_posted_at: "2026-01-01T12:00:00.000Z",
              posts_count: 2,
              reply_count: 1,
              highest_post_number: 2,
              archetype: "regular",
              last_poster_username: "theme_fixture",
              posters: [{ user_id: 8100, extras: "latest" }],
            },
          ],
        },
      });
    });

    server.get("/t/*path", () => {
      topicRequests++;
      return helper.response(404, {});
    });
  });

  test("renders both native lists and excerpts without fetching full topics", async function (assert) {
    themeMeta.content = "8102";
    setDefaultHomepage("custom");
    await visit("/");

    assert.dom('.sanforum-home-nav a[href="#sanforum-categories"]').exists();
    assert.dom('.sanforum-home-nav a[href="#sanforum-discussions"]').exists();
    assert
      .dom("#topic-list-heading")
      .hasText(i18n("discovery.headings.categories"));
    assert
      .dom("#site-logo")
      .hasClass("logo-mobile")
      .hasAttribute("src", this.siteSettings.site_mobile_logo_url);
    assert
      .dom('.sanforum-categories a[href="/c/fixture-category/8100"]')
      .exists();
    assert
      .dom('.sanforum-discussions .top-row a[href="/t/fixture-topic/8200"]')
      .exists();
    assert
      .dom(".sanforum-discussions .topic-excerpt")
      .hasAttribute("href", "/t/fixture-topic/8200")
      .hasText("Synthetic topic excerpt.");
    assert
      .dom('.sanforum-discussions .topic-poster a[href="/u/theme_fixture"]')
      .hasAttribute("data-user-card", "theme_fixture")
      .hasText("theme_fixture");
    const excerpt = find(".sanforum-discussions .topic-excerpt");
    const categoryLink = find(
      '.sanforum-discussions .bottom-row a[href="/c/fixture-category/8100"]'
    );
    assert.strictEqual(
      excerpt.compareDocumentPosition(categoryLink),
      Node.DOCUMENT_POSITION_FOLLOWING,
      "the excerpt precedes the native category metadata"
    );
    assert.dom("#create-topic").doesNotExist("anonymous users cannot post");
    assert.dom('.sanforum-categories a[href="/categories"]').exists();
    assert.dom('.sanforum-discussions a[href="/latest"]').exists();
    assert
      .dom('.sanforum-categories [data-category-id="8101"]')
      .isNotVisible("muted categories stay collapsed");

    await click(".sanforum-categories .muted-categories-link");

    assert
      .dom('.sanforum-categories [data-category-id="8101"]')
      .isVisible("the native muted-category toggle remains usable");
    assert.strictEqual(combinedRequests, 1, "loads the shared overview once");
    assert.strictEqual(
      requestedThemeId,
      "8102",
      "requests excerpts with the currently rendered theme's modifiers"
    );
    assert.strictEqual(topicRequests, 0, "uses supplied excerpts only");
  });
});

acceptance("SanForum configured logos", function (needs) {
  needs.settings({
    enable_welcome_banner: false,
    site_logo_url: "/images/d-logo-sketch.png?sanforum-desktop",
    site_logo_dark_url: "/images/d-logo-sketch.png?sanforum-desktop-dark",
    site_logo_small_url: "/images/d-logo-sketch-small.png?sanforum-small",
    site_logo_small_dark_url:
      "/images/d-logo-sketch-small.png?sanforum-small-dark",
  });

  needs.hooks.beforeEach(function () {
    const session = Session.current();
    this.originalLogoSession = {
      darkModeAvailable: session.darkModeAvailable,
      defaultColorSchemeIsDark: session.defaultColorSchemeIsDark,
    };
    session.setProperties({
      darkModeAvailable: true,
      defaultColorSchemeIsDark: false,
    });
  });

  needs.hooks.afterEach(function () {
    Session.current().setProperties(this.originalLogoSession);
  });

  test("preserves configured desktop, small, and dark logo variants", async function (assert) {
    await visit("/latest");

    assert
      .dom("#site-logo")
      .hasClass("logo-big")
      .hasAttribute("src", this.siteSettings.site_logo_url);
    assert
      .dom(".d-header .title picture source")
      .hasAttribute("srcset", this.siteSettings.site_logo_dark_url);

    this.owner
      .lookup("service:header")
      .enterTopic(
        Topic.create({ id: 8200, title: "Logo fixture topic" }),
        false
      );
    await settled();

    assert
      .dom("#site-logo")
      .hasClass("logo-small")
      .hasAttribute("src", this.siteSettings.site_logo_small_url);
    assert
      .dom(".d-header .title picture source")
      .hasAttribute("srcset", this.siteSettings.site_logo_small_dark_url);
  });
});
