import { Card, CardHeader, CardBody } from '@nextui-org/react';
import React, { ReactNode } from 'react';

interface Props {
  title: string;
  status?: {
    value: string | ReactNode;
    unit?: string;
  };
  bodyContent?: ReactNode | undefined;
}

const MODULE_CardUI = ({ title, status, bodyContent }: Props) => {
  return (
    <Card className="col-span-4 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <h4>{title}</h4>
        <p className="ml-2">
          {status?.value} {status?.unit ?? ''}
        </p>
      </CardHeader>
      <CardBody>{bodyContent}</CardBody>
    </Card>
  );
};

export default MODULE_CardUI;