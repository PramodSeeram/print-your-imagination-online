
import * as React from "react";

export function useMobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return { isMenuOpen, toggleMenu, closeMenu };
}
