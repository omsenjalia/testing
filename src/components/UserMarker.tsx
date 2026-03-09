import { User } from "@/types/user"

export function createUserMarker(user: User) {
  const el = document.createElement('div');
  el.className = 'group relative';
  el.style.width = '28px';
  el.style.height = '28px';
  el.style.cursor = 'pointer';
  el.style.pointerEvents = 'auto';
  el.setAttribute('data-user-id', user.id);

  const avatar = document.createElement('div');
  avatar.className = 'w-full h-full rounded-full border border-[#1a1a1a] overflow-hidden transition-transform duration-200 group-hover:scale-110 bg-[#d4cfc6] flex items-center justify-center';

  const initialsStr = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (user.avatar) {
    const img = document.createElement('img');
    img.src = user.avatar;
    img.alt = user.name;
    img.className = 'w-full h-full object-cover';
    img.onerror = () => {
      img.style.display = 'none';
      const initials = document.createElement('span');
      initials.innerText = initialsStr;
      initials.className = 'text-[var(--text-primary)] text-[11px] font-mono font-medium';
      avatar.appendChild(initials);
    };
    avatar.appendChild(img);
  } else {
    const initials = document.createElement('span');
    initials.innerText = initialsStr;
    initials.className = 'text-[var(--text-primary)] text-[11px] font-mono font-medium';
    avatar.appendChild(initials);
  }

  // Tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-[4px] text-[12px] font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50';
  tooltip.innerText = user.name;
  el.appendChild(tooltip);

  el.appendChild(avatar);

  return el;
}
