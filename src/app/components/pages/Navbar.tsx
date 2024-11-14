'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  name: string,
  path: string,
  active?: boolean,
  ready?: boolean,
}

const menuItems: MenuItem[] = [
  { name: 'CIDR', path: '/cidr/'},
  { name: 'UUID v1', path: '/ids/uuidv1/'},
  { name: 'UUID v3', path: '/ids/uuidv3/'},
  { name: 'UUID v4', path: '/ids/uuidv4/'},
  { name: 'UUID v5', path: '/ids/uuidv5/'},
  { name: 'LID', path: '/ids/lid/'},
  { name: 'ULID', path: '/ids/ulid/'},
  { name: 'ShortID', path: '/ids/shortid/'},
  { name: 'CUID', path: '/ids/cuid/'},
  { name: 'Timestamp', path: '/timestamp/', ready: true},
];

export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="nav">
      <ul>
        {menuItems?.map(menu => {
            const linkPath = menu.ready ? '/coming-soon' : menu.path;
            return (
              <li key={menu.name}>
                <Link href={linkPath}>
                  <span className={`nav__name ${menu.path === pathName || menu.active ? 'active' : ''}`}> {menu.name} </span>
                </Link>
              </li>
            )
        })}
      </ul>
    </nav>
  )
}