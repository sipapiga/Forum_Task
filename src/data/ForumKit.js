import AuthKit from './AuthKit';

const authKit = new AuthKit();
const ROOT_URL = 'https://lab.willandskill.eu';
const GET_POSTS_URL = `${ROOT_URL}/api/v1/forum/posts/`;
const GET_POSTS_BY_CATEGORY_URL = `${ROOT_URL}/api/v1/forum/categories/`;

// eslint-disable-next-line import/no-anonymous-default-export
export default class {
  getPosts() {
    return fetch(GET_POSTS_URL, {
      headers: authKit.getPrivateHeaders(),
    });
  }
  getCategoryText(categoryId) {
    // eslint-disable-next-line default-case
    switch (categoryId) {
      case 1:
        return 'Category 1';
      case 2:
        return 'Category 2';
      case 3:
        return 'Category 3';
      default:
        return null;
    }
  }
  getPostListByCategory(id) {
    return fetch(GET_POSTS_BY_CATEGORY_URL + id, {
      headers: authKit.getPrivateHeaders(),
    });
  }
  getCategories() {
    return fetch(GET_POSTS_BY_CATEGORY_URL, {
      headers: authKit.getPrivateHeaders(),
    });
  }
  createPost(payload) {
    return fetch(GET_POSTS_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: authKit.getPrivateHeaders(),
    });
  }
}
