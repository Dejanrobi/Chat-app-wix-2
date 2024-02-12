import {
  Button,
  EmptyState,
  Image,
  Page,
  TextButton,
  WixDesignSystemProvider,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import * as Icons from "@wix/wix-ui-icons-common";
import React from "react";
import wixLogo from "./wix_logo.svg";
import { withDashboard, useDashboard } from "@wix/dashboard-react";

function Index() {
  const { showToast } = useDashboard();

  return (
    <WixDesignSystemProvider>
      <Page>
        <Page.Header
          title="Dashboard Page"
          subtitle="Add management capabilities to your app."
          actionsBar={
            <Button
              onClick={() => {
                showToast({
                  message: "Your first toast message!",
                });
              }}
              prefixIcon={<Icons.GetStarted />}
            >
              Show a toast
            </Button>
          }
        />
        <Page.Content>
          <EmptyState
            image={
              <Image fit="contain" height="100px" src={wixLogo} transparent />
            }
            title="Start editing this dashboard page"
            subtitle="Learn how to work with dashboard pages and how to add functionality to them using Wix APIs."
            theme="page"
          >
            <a
              href="https://dev.wix.com/api/cli/app-framework/dashboard-pages"
              target="_blank"
            >
              <TextButton prefixIcon={<Icons.ExternalLink />}>
                Dashboard pages documentation
              </TextButton>
            </a>
          </EmptyState>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
}

export default withDashboard(Index);
