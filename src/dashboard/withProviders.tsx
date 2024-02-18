//imports 
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WixDesignSystemProvider } from '@wix/design-system';
import { withDashboard } from '@wix/dashboard-react';


//withProviders function
//It's a higher-order function that takes a React component "Component" as an argument.
//returns a new function that renders the provided "Component" within various providers.
//This provides common functionality to multiple components without having to repeat the provider
//setup in each component.
export function withProviders(Component: React.ComponentType) {
  return withDashboard(function () {
    return (
      <WixDesignSystemProvider>
        <QueryClientProvider client={new QueryClient()}>
          <Component />
        </QueryClientProvider>
      </WixDesignSystemProvider>
    );
  });
}