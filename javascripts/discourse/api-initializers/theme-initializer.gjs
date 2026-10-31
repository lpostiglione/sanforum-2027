import Component from "@glimmer/component";
import { service } from "@ember/service";
import CategoriesOnly from "discourse/components/categories-only";
import CategoriesTopicList from "discourse/components/categories-topic-list";
import Layout from "discourse/components/discovery/layout";
import Navigation from "discourse/components/discovery/navigation";
import TopicExcerpt from "discourse/components/topic-list/topic-excerpt";
import { ajax } from "discourse/lib/ajax";
import { apiInitializer } from "discourse/lib/api";
import getURL from "discourse/lib/get-url";
import { currentThemeId } from "discourse/lib/theme-selector";
import CategoryList from "discourse/models/category-list";
import TopicList from "discourse/models/topic-list";
import DUserAvatarFlair from "discourse/ui-kit/d-user-avatar-flair";
import DUserLink from "discourse/ui-kit/d-user-link";
import dAvatar from "discourse/ui-kit/helpers/d-avatar";
import { i18n } from "discourse-i18n";

const labels = {
  navigation: themePrefix("home.navigation"),
  categories: themePrefix("home.categories"),
  discussions: themePrefix("home.discussions"),
  allCategories: themePrefix("home.all_categories"),
  allDiscussions: themePrefix("home.all_discussions"),
};

class SanforumHome extends Component {
  @service composer;

  <template>
    <div class="sanforum-home">
      <Layout @model={{@outletArgs.model}}>
        <:aboveNavigation>
          <nav class="sanforum-home-nav" aria-label={{i18n labels.navigation}}>
            <a href="#sanforum-categories">{{i18n labels.categories}}</a>
            <a href="#sanforum-discussions">{{i18n "filters.latest.title"}}</a>
          </nav>
        </:aboveNavigation>

        <:navigation>
          <Navigation
            @filterType="categories"
            @createTopic={{this.composer.openNewTopic}}
            @model={{@outletArgs.model}}
          />
        </:navigation>

        <:list>
          <div class="sanforum-home-grid">
            <section
              class="sanforum-categories"
              id="sanforum-categories"
              aria-labelledby="sanforum-categories-heading"
              tabindex="-1"
            >
              <header class="sanforum-section-heading">
                <h2 id="sanforum-categories-heading">{{i18n
                    labels.categories
                  }}</h2>
                <a href={{getURL "/categories"}}>{{i18n
                    labels.allCategories
                  }}</a>
              </header>
              <CategoriesOnly @categories={{@outletArgs.model.categories}} />
            </section>

            <section
              class="sanforum-discussions"
              id="sanforum-discussions"
              aria-labelledby="sanforum-discussions-heading"
              tabindex="-1"
            >
              <header class="sanforum-section-heading">
                <h2 id="sanforum-discussions-heading">{{i18n
                    labels.discussions
                  }}</h2>
                <a href={{getURL "/latest"}}>{{i18n labels.allDiscussions}}</a>
              </header>
              <CategoriesTopicList
                class="latest-topic-list"
                @filter="latest"
                @topics={{@outletArgs.model.topics}}
              />
            </section>
          </div>
        </:list>
      </Layout>
    </div>
  </template>
}

export default apiInitializer((api) => {
  const store = api.container.lookup("service:store");

  api.registerBehaviorTransformer("custom-homepage-model", async () => {
    const result = await ajax("/categories_and_latest", {
      data: { preview_theme_id: currentThemeId() },
    });

    return {
      categories: CategoryList.categoriesFrom(store, result).content,
      topics: TopicList.topicsFrom(store, result),
    };
  });

  api.renderInOutlet("custom-homepage", SanforumHome);
  api.renderInOutlet(
    "latest-topic-list-item-topic-poster",
    <template>
      <div class="topic-poster">
        <DUserLink @user={{@outletArgs.topic.lastPosterUser}}>
          {{dAvatar @outletArgs.topic.lastPosterUser imageSize="small"}}
          <span>{{@outletArgs.topic.lastPosterUser.username}}</span>
        </DUserLink>
        <DUserAvatarFlair @user={{@outletArgs.topic.lastPosterUser}} />
      </div>
    </template>
  );
  api.renderBeforeWrapperOutlet(
    "latest-topic-list-item-main-link-bottom-row",
    <template><TopicExcerpt @topic={{@outletArgs.topic}} /></template>
  );
});
