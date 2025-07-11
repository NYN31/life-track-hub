export const resetDraftBlogStorage = () => {
  const draftBlog = {
    title: '',
    status: '',
    tags: [],
    content: '',
    coverImagePath: '',
  };
  localStorage.setItem('draftBlog', JSON.stringify(draftBlog));
};
