import { User } from "@/types/user"

export function createUserMarker(user: User, onClick: () => void) {
  const el = document.createElement('div');
  el.className = 'group relative';
  el.style.width = '28px';
  el.style.height = '28px';
  el.style.cursor = 'pointer';

  const avatar = document.createElement('div');
  avatar.className = 'w-full h-full rounded-full border border-[#3d3d3d] overflow-hidden transition-transform duration-200 group-hover:scale-110';

  if (user.avatar) {
    const img = document.createElement('img');
    img.src = user.avatar;
    img.alt = user.name;
    img.className = 'w-full h-full object-cover';
    avatar.appendChild(img);
  } else {
    avatar.className += ' bg-[#2a2a2a] flex items-center justify-center';
    const initials = document.createElement('span');
    initials.innerText = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    initials.className = 'text-white text-[10px] font-bold';
    avatar.appendChild(initials);
  }

  // Tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white text-[#1a1a1a] border border-[#e8e8e6] rounded-full text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-sm';
  tooltip.innerText = user.name;
  el.appendChild(tooltip);

  el.appendChild(avatar);
  el.onclick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return el;
}
