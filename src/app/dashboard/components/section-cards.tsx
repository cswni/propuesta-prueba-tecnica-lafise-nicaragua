import { useSelector } from 'react-redux';

import LogoLafise from '@/assets/images/logo-lafise-blanco.svg';
import LafiseLogoShield from '@/assets/images/logo-lafise-shield.svg';
import type { RootState } from '@/store';
import type { CardProps } from '@/types/cards';

function CreditDebitCard(props: CardProps) {
  const { number, holder, expiry, color } = props;
  return (
    <div
      className={`relative rounded-xl shadow-md p-6 text-white flex flex-col justify-between min-h-[208px] sm:max-w-[353px] overflow-hidden ${color}`}
      data-slot="card"
    >
      {/* Escudo de fondo*/}
      <div
        className="absolute inset-y-0 right-0 flex items-center pointer-events-none"
        style={{
          width: '80%',
          justifyContent: 'flex-end',
          zIndex: 0,
        }}
      >
        <img src={LafiseLogoShield} alt="Escudo de Lafise" className="h-full w-auto" />
      </div>
      {/* Card content */}
      <div className="relative z-10 flex flex-col justify-between h-full gap-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">
            <img src={LogoLafise} alt="Lafise Bank" className="w-24 mr-2 inline-block" />
          </span>
        </div>
        <div className="cardNumber">{number}</div>
        <div className="flex justify-start items-end gap-4">
          <div>
            <div className="font-light">{holder}</div>
          </div>
          <div className="text-right">
            <div className="text-xs">Expira</div>
            <div className="font-light">{expiry}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SectionCards() {
  const user = useSelector((state: RootState) => state.user.data);
  let userName = 'Usuario';
  const userNameParts = user?.full_name.split(' ') || [];

  if (userNameParts.length > 1) {
    userNameParts.pop();
    userName = userNameParts.join(' ');
  }

  const cards = [
    {
      number: '1234 **** **** 1234',
      holder: userName,
      expiry: '12/26',
      color: 'bg-gradient-to-r from-[#00593B] to-[#096C4B]',
    },
    {
      number: '1234 **** **** 5678',
      holder: userName,
      expiry: '08/25',
      brand: 'Mastercard',
      color: 'bg-gradient-to-r from-[#0B102E] to-[#121741]',
    },
    {
      number: '1234 **** **** 5678',
      holder: userName,
      expiry: '08/25',
      brand: 'Mastercard',
      color: 'bg-gradient-to-r from-[#1F1F1F] to-[#272727]',
    },
  ];

  return (
    <div className="grid select-none grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {cards.map((card, idx) => (
        <CreditDebitCard key={idx} {...card} />
      ))}
    </div>
  );
}
