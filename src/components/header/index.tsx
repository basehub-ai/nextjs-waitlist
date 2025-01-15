import { Pump } from 'basehub/react-pump';
import { NavbarLink, NavbarLinkBackground } from './link';

export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Pump
        queries={[
          {
            header: {
              navbar: {
                items: {
                  href: true,
                  _title: true,
                },
              },
            },
          },
        ]}
      >
        {async ([
          {
            header: { navbar },
          },
        ]) => {
          'use server';
          return (
            <nav className="bg-slate-1">
              <div className="bg-slate-1 rounded-full p-1 flex relative items-center">
                {/* Animated background */}
                <NavbarLinkBackground links={navbar.items.map((item) => item.href!)} />

                {/* Navigation items */}
                {navbar.items.map(({ href, _title }) => (
                  <NavbarLink key={href} href={href ?? '/'}>
                    {_title}
                  </NavbarLink>
                ))}
              </div>
            </nav>
          );
        }}
      </Pump>
    </div>
  );
};
