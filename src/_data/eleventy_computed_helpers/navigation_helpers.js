const navigation = require("../navigation.json");

const {
  objectHasOwnProperties,
  isArrayWithItems,
  isNotEmpty,
  getLinkIsCurrentPage,
  getLinkStateIsActive
} = require("../helpers.js");
module.exports = {

  getEleventyPageUrl(data, page_url) {
    if (
      objectHasOwnProperties(data, ['page']) &&
      objectHasOwnProperties(data['page'], ['url'])
    ) {
      page_url = data['page']['url'];
    }

    return page_url;
  },

  updateNavigationItem(navigationItem, page_url) {
    let navItem = {
      url: '',
      text: '',
      link_is_current_page: false,
      link_state_is_active: false
    }

    if (
      objectHasOwnProperties(navigationItem, ['url']) &&
      objectHasOwnProperties(navigationItem, ['text']) &&
      isNotEmpty(navigationItem['url']) &&
      isNotEmpty(navigationItem['text']) &&
      isNotEmpty(page_url)
    ) {
      const item_url = navigationItem['url'];
      navItem['url'] = item_url;
      navItem['link_is_current_page'] = getLinkIsCurrentPage(item_url, page_url);
      navItem['link_state_is_active'] = getLinkStateIsActive(item_url, page_url);
      navItem['text'] = navigationItem['text'];
    }

    return navItem;
  },

  getEleventyHeaderNavigation(navigation, headerNavigation, page_url) {
    if (
      objectHasOwnProperties(navigation, ['header']) &&
      objectHasOwnProperties(navigation['header'], ['items']) &&
      objectHasOwnProperties(headerNavigation, ['items']) &&
      isArrayWithItems(navigation['header']['items']) &&
      isNotEmpty(page_url)
    ) {
      for (let navigationItem in navigation['header']['items']) {
        let navItem = module.exports.updateNavigationItem(navigationItem, page_url)
        headerNavigation['items'].push(navItem);
      }
    }

    return headerNavigation;
  },

  getEleventyFooterNavigation(navigation, footerNavigation, page_url) {
    if (
      objectHasOwnProperties(navigation, ['footer']) &&
      objectHasOwnProperties(navigation['footer'], ['items']) &&
      objectHasOwnProperties(footerNavigation, ['items']) &&
      isArrayWithItems(navigation['footer']['items']) &&
      isNotEmpty(page_url)
    ) {
      for (let navigationItem in navigation['footer']['items']) {
        let navItem = module.exports.updateNavigationItem(navigationItem, page_url)
        footerNavigation['items'].push(navItem);
      }
    }

    return footerNavigation;
  },

  getEleventyNavigationDataset(data) {
    let eleventyNavigationDataset =
      {
        navigation: {
          header: {
            items: []
          },
          footer: {
            items: []
          }
        },
        page_url: ''
      };

    eleventyNavigationDataset['page_url'] = module.exports.getEleventyPageUrl(
      data,
      eleventyNavigationDataset['page_url']
    );

    eleventyNavigationDataset['navigation'] = module.exports.getEleventyHeaderNavigation(
      navigation,
      eleventyNavigationDataset['navigation']['header'],
      eleventyNavigationDataset['page_url']
    );

    eleventyNavigationDataset['navigation'] = module.exports.getEleventyFooterNavigation(
      navigation,
      eleventyNavigationDataset['navigation']['footer'],
      eleventyNavigationDataset['page_url']
    );

    console.log(navigation);

    return eleventyNavigationDataset;
  }
}
