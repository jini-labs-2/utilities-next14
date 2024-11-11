import Link from "next/link";

interface MenuItem {
  name: string,
  path: string,
  ready?: boolean,
}

const menuItems: MenuItem[] = [
  { name: 'Home', path: '/'},
  { name: 'CIDR', path: '/cidr'},
  { name: 'UUID v1', path: '/ids/uuidv1'},
  { name: 'UUID v3', path: '/ids/uuidv3'},
  { name: 'UUID v4', path: '/ids/uuidv4'},
  { name: 'UUID v5', path: '/ids/uuidv5'},
  { name: 'LID', path: '/ids/lid', ready: true},
  { name: 'ULID', path: '/ids/ulid', ready: true},
  { name: 'ShortID', path: '/ids/shortid', ready: true},
  { name: 'CUID', path: '/ids/cuid', ready: true},
];

export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        {menuItems?.map(menu => {
            const linkPath = menu.ready ? '/coming-soon' : menu.path;
            return (
              <li key={menu.name}>
                <Link href={linkPath}>
                  <span className="nav__name"> {menu.name} </span>
                </Link>
              </li>
            )
        })}
      </ul>
    </nav>
  )
}