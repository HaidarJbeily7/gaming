"use client";

import Link from "next/link";

export default function Navbar(props) {
  return (
    <div className="w-full bg-primary-color min-h-[10vh] flex flex-row-reverse">
      <div className="h-full text-white text-3xl text-center py-6 pr-4">الشعار</div>
      <nav className="pt-10 w-full px-7">
        <ul className="text-white flex flex-row-reverse justify-around border-t-[1px] p-2">
          <li>
            <Link href="/">الرئيسية</Link>
          </li>
          <li>
            <Link href="/">كل الألعاب</Link>
          </li>
          <li>
            <Link href="/">منهجيتنا</Link>
          </li>
          <li>
            <Link href="/">قيم اللعبة</Link>
          </li>
          <li>
            <Link href="/">عن الموقع</Link>
          </li>
          <li>
            <Link href="/">الأسئلة الشائعة</Link>
          </li>
          <li>
            <Link href="/">المساعدة</Link>
          </li>
        </ul>
      </nav>
      <div className="p-3">
        <select value="ar" className="text-white bg-primary-color" >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
      </div>
    </div>
  );
}
