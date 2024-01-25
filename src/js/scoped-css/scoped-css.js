/*
 * import 'scoped-css/css';
 * import scopedCss from 'scoped-css';
 * scopedCss(undefined, { debug: true });
 */

const SCOPE_EL_CLASSNAME_REGEXP = /^([a-z\d]+(?:-[a-z\d]+)*)(?:\s|$)/i;
const INIT_ATTR = 'data-scoped-css-init';
const ENABLE_ATTR = 'data-scoped-css';
const SCOPE_ATTR_PREFIX = 'data-s';
const SCOPE_ATTR_PREFIX_REGEXP = new RegExp(`^${SCOPE_ATTR_PREFIX}-`);
const EVENT_INIT = 'scoped-css-init';

function isScopeEl(el) {
  return SCOPE_EL_CLASSNAME_REGEXP.test(el.className);
}

function isScopeAttr(attrName) {
  return SCOPE_ATTR_PREFIX_REGEXP.test(attrName);
}

function getScopeEl(el) {
  let scopeEl = el;

  while (!isScopeEl(scopeEl) && scopeEl.parentElement) {
    scopeEl = scopeEl.parentElement;
  }

  return scopeEl;
}

function getScopeName(el) {
  const name = el.getAttribute(ENABLE_ATTR) || (el.className.match(SCOPE_EL_CLASSNAME_REGEXP) || '');

  return (Array.isArray(name) ? name[1] : name).toLowerCase();
}

function getScope(el) {
  const scopeEl = getScopeEl(el);
  const scopeName = getScopeName(scopeEl);

  return {
    el: scopeEl,
    name: scopeName,
  };
}

function getScopeNamesFromAttrs(el) {
  const scopeNames = [];

  el.getAttributeNames().forEach((attrName) => {
    if (isScopeAttr(attrName)) {
      scopeNames.push(attrName.replace(SCOPE_ATTR_PREFIX_REGEXP, ''));
    }
  });

  return scopeNames;
}

function setData(el, scope) {
  const oldScopeNames = getScopeNamesFromAttrs(el);
  const parentScope = el.parentElement && el.parentElement.cssScopes && el.parentElement.cssScopes.at(-1);

  // eslint-disable-next-line no-param-reassign
  el.cssScopes = [];

  if (parentScope && parentScope.el !== scope.el) {
    el.cssScopes.push(parentScope);
  }

  el.cssScopes.push(scope);

  oldScopeNames.forEach((oldScopeName) => {
    if (!el.cssScopes.find(({ name: scopeName }) => oldScopeName === scopeName)) {
      el.removeAttribute(`${SCOPE_ATTR_PREFIX}-${oldScopeName}`);
    }
  });

  el.cssScopes.forEach(({ el: scopeEl, name: scopeName }) => {
    if (scopeName) {
      if (scopeEl.hasAttribute(ENABLE_ATTR)) {
        if (!oldScopeNames.includes(scopeName)) {
          el.setAttribute(`${SCOPE_ATTR_PREFIX}-${scopeName}`, '');
        }
      } else {
        el.removeAttribute(`${SCOPE_ATTR_PREFIX}-${scopeName}`);
      }
    }
  });
}

function setScope(el, scope = getScope(el)) {
  setData(el, scope);

  Array.from(el.children).forEach((childEl) => {
    if (isScopeEl(childEl)) {
      setScope(childEl);
    } else {
      setScope(childEl, scope);
    }
  });
}

export default function scopedCss(el = document.body, { debug = false } = {}) {
  const startTimeStamp = performance.now();

  setScope(el);

  if (debug) {
    // eslint-disable-next-line no-console
    console.log(`\`scoped-css\` initialized in ${Math.round(performance.now() - startTimeStamp)} ms`);
  }

  requestAnimationFrame(() => {
    el.setAttribute(INIT_ATTR, '');
    el.dispatchEvent(new CustomEvent(EVENT_INIT, { bubbles: true, detail: { el } }));
  });

  const observer = new MutationObserver((records) => {
    records.forEach(({
      type,
      target,
      addedNodes,
      attributeName,
      oldValue,
    }) => {
      if (addedNodes.length) {
        addedNodes.forEach((node) => {
          if (node instanceof Element) {
            setScope(target);
          }
        });
      }

      if (type === 'attributes' && target.getAttribute(attributeName) !== oldValue) {
        setScope(target);
      }
    });
  });

  observer.observe(el, {
    subtree: true,
    childList: true,
    attributeFilter: ['class', ENABLE_ATTR],
  });

  return el;
}
