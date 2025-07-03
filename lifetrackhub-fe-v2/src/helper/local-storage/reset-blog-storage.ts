export const resetDraftBlogStorage = () => {
  const draftBlog = {
    title: '',
    visibility: '',
    tags: [],
    content: '',
  };
  localStorage.setItem('draftBlog', JSON.stringify(draftBlog));
};
