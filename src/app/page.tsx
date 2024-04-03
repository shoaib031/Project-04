import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-slate-500 w-[100%]">
      <h1>Navigation Items</h1>
      <nav>
        <ul>
          <li>
            <Link href="/item1">
              Item 1
            </Link>
          </li>
          <li>
            <Link href="/item2">
              Item 2
            </Link>
          </li>

          <li>
            <Link href="/item3">
              Item 3
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
