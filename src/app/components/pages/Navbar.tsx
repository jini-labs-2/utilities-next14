import Link from "next/link";

interface MenuItem {
  name: string,
  path: string,
}

const menuItems: MenuItem[] = [
  { name: 'Home', path: '/'},
  { name: 'CIDR', path: '/cidr'},
  { name: 'UUID v1', path: '/ids/uuidv1'},
  { name: 'UUID v3', path: '/ids/uuidv3'},
  { name: 'UUID v4', path: '/ids/uuidv4'},
];

export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        {menuItems?.map(menu => {
            return (
              <li key={menu.name}>
                <Link href={menu.path}>
                  <span className="nav__name"> {menu.name} </span>
                </Link>
              </li>
            )
        })}
      </ul>
    </nav>
  )
}