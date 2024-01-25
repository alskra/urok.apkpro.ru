export default (Alpine) => {
  Alpine.magic('index', (el) => Array.from(el.parentElement.children).indexOf(el));
};
