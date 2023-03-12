import { FactoryProvider, Provider } from '@nestjs/common';
import { UseCase } from './types/use-case.type';

export const createUseCasesProvider = (
  provide: string,
  useCases: Array<Provider<UseCase>>,
): Array<Provider> => [
  ...useCases,
  {
    provide,
    useFactory: function (...useCasesInjected: Array<UseCase>) {
      const useCasesMap: Record<string, UseCase> = {};

      for (const item of useCasesInjected) {
        useCasesMap[item.usecase] = item;
      }

      return useCasesMap;
    },
    inject: useCases,
  } as FactoryProvider,
];
