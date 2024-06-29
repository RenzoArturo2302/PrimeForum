// Las listas de los elementos

const noAuth = [
  { id: 1, iconName: "home-outline", menuElementName: "Inicio", link: "/" },

  {
    id: 3,
    iconName: "search-outline",
    menuElementName: "Buscar",
    link: "/search",
  },
  {
    id: 4,
    iconName: "list-outline",
    menuElementName: "Categorías",
    link: "/categories",
  },
  {
    id: 5,
    iconName: "people-outline",
    menuElementName: "Sobre Nosotros",
    link: "/about-us",
  },
  {
    id: 6,
    iconName: "information-outline",
    menuElementName: "Ayuda",
    link: "/help",
  },
];

const yesAuth = [
  { id: 1, iconName: "home-outline", menuElementName: "Inicio", link: "/" },
  {
    id: 2,
    iconName: "library-outline",
    menuElementName: "Mis publicaciones",
    link: "/myPosts",
  },
  {
    id: 3,
    iconName: "search-outline",
    menuElementName: "Buscar",
    link: "/search",
  },
  {
    id: 4,
    iconName: "list-outline",
    menuElementName: "Categorías",
    link: "/categories",
  },
  {
    id: 5,
    iconName: "people-outline",
    menuElementName: "Sobre Nosotros",
    link: "/about-us",
  },
  {
    id: 6,
    iconName: "information-outline",
    menuElementName: "Ayuda",
    link: "/help",
  },
];

const menuList = (isAuth) => {
  if (isAuth) {
    return yesAuth;
  } else {
    return noAuth;
  }
};

const menuCond = (sidebarState, miniSidebarState) => {
  if (!sidebarState && !miniSidebarState) {
    return "sidebar";
  } else if (sidebarState && miniSidebarState) {
    return "sidebar mini-sidebar max-barra-lateral";
  } else if (sidebarState && !miniSidebarState) {
    return "sidebar mini-sidebar";
  } else {
    return "sidebar max-barra-lateral";
  }
};

export { menuList, menuCond };
