import { Pump } from 'basehub/react-pump';
import { NavbarLink, NavbarLinkBackground } from './link';

export const Header = () => {
  return (
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
          <div className="flex flex-col items-center justify-center gap-12">
            <nav className="flex justify-center items-center bg-slate-1">
              <div className="bg-slate-1 rounded-full p-1 flex relative">
                {/* Animated background */}
                <NavbarLinkBackground links={navbar.items.map((item) => item.href!)} />

                {/* Navigation items */}
                <NavbarLink href={'/'}>Waitlist</NavbarLink>
                <NavbarLink href={'/manifesto'}>Manifesto</NavbarLink>
              </div>
            </nav>
          </div>
        );
      }}
    </Pump>
  );
};
