import { HeaderClient } from './HeaderClient';
import { Logo } from './Logo';
import { Nav } from './nav/Nav';

export function Header({ channel }: { channel: string }) {
  return (
    <HeaderClient>
      <Logo />
      <Nav channel={channel} />
    </HeaderClient>
  );
}
