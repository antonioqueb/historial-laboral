import React from 'react';

export function HeaderCompanyProfile() {
  return (
    <div className="w-full">
      <div>
        <div className="relative h-[90px]  lg:h-[390px] overflow-hidden ">
          <img
            src="/placeholder.svg"
            alt="Cover image"
            width={1920}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative -mt-[10px] sm:-mt-[17px] md:-mt-[19px] lg:-mt-[90px] px-4 flex items-center justify-between flex-wrap">
          <div className="flex items-end gap-4">
            <div className="relative h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px] lg:h-[160px] lg:w-[160px] rounded-full border-4 border-background">
              <img
                src="/placeholder.svg"
                alt="Profile picture"
                width={190}
                height={190}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Corporación Energética Integral S.A. de C.V.</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Av. Reforma 123, Centro, Cuauhtémoc, Ciudad de México</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
