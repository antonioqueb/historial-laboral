import React, { FC } from 'react';
import { HeaderCompanyProfile } from '@/components/component/header-company-profile';
import Header from '@/components/Header';
import { AboutMeCompanyProfile } from '@/components/component/about-me-company-profile';
import { ExternalFooter } from '@/components/component/external-footer';



// Componente principal de la página
const Perfil: FC = () => {
  return (
    <>
    <Header />
    <HeaderCompanyProfile />
    <AboutMeCompanyProfile />
    <ExternalFooter />
    </>
  );
}

// Exportación por defecto del componente principal de la página
export default Perfil;
