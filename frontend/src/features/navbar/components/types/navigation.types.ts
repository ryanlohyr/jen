type IconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export interface ChildNavigationItem {
  name: string;
  href: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: IconType;
  childNav: ChildNavigationItem[] | null;
}
