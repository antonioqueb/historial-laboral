// components/component/EmployeeCard.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Employee } from '@/interfaces/types';

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => {
  const profileImageSrc = employee.profileImageUrl ? employee.profileImageUrl : "/placeholder.svg";

  return (
    <Card className="w-full max-w-md cursor-pointer" onClick={onClick}>
      <div className="relative w-full h-48">
        <Image
          src={profileImageSrc}
          alt={`${employee.name} Profile`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          unoptimized
        />
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">{employee.name}</h3>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">NSS: {employee.socialSecurityNumber}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Correo Electrónico:</p>
          <p>{employee.email}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Teléfono:</p>
          <p>{employee.phoneNumber}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default EmployeeCard;
