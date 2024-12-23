'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  name: string,
  path: string,
}

const menuItems: MenuItem[] = [
  { name: 'CIDR', path: '/cidr/'},
  { name: 'UUIDv1', path: '/ids/uuidv1/'},
  { name: 'UUIDv3', path: '/ids/uuidv3/'},
  { name: 'UUIDv4', path: '/ids/uuidv4/'},
  { name: 'UUIDv5', path: '/ids/uuidv5/'},
  { name: 'LID', path: '/ids/lid/'},
  { name: 'ULID', path: '/ids/ulid/'},
  { name: 'ShortID', path: '/ids/shortid/'},
  { name: 'CUID', path: '/ids/cuid/'},
  { name: 'Calendar', path: '/iframes/calendar/'},
  { name: 'Timestamp', path: '/times/'},
];

export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="nav">
      <ul>
        {menuItems?.map(menu => {
            return (
              <li key={menu.name}>
                <Link href={menu.path}>
                  <span className={`nav__name ${menu.path === pathName ? 'active' : ''}`}> {menu.name} </span>
                          </Link>
                        </li>
            )
        })}
      </ul>
    </nav>
  )
}