// eslint-disable-next-line import/prefer-default-export
export function testPseudoClass(pseudoClass) {
  try {
    document.documentElement.matches(pseudoClass);

    return true;
  } catch {
    return false;
  }
}
