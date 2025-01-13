"use client";

import { CSSProperties, FC, useEffect, useRef } from "react";
import { AvatarCreatorEvent } from "../events";
import { useAvatarCreatorUrl } from "../hooks/use-avatar-creator-url";
import { AvatarCreatorConfig } from "../types";

const MESSAGE_EVENT = "message";
const RPM_TARGET = "readyplayerme";
const IFRAME_READY_EVENT = "v1.frame.ready";

export type AvatarCreatorRawProps = {
  subdomain: string;
  className?: string;
  style?: CSSProperties;
  config?: AvatarCreatorConfig;
  onEventReceived?: (event: AvatarCreatorEvent) => void;
  iframeUrl?: string; // Add this line
};

export const AvatarCreatorRaw: FC<AvatarCreatorRawProps> = ({
  subdomain,
  className,
  style,
  config,
  onEventReceived,
  iframeUrl, // Add this line
}) => {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const defaultUrl = useAvatarCreatorUrl(subdomain, config);
  const url = iframeUrl || defaultUrl; // Use iframeUrl if provided, otherwise use the default

  const subscribeToAvatarCreatorEvents = () => {
    if (!frameRef.current?.contentWindow) return;

    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        target: RPM_TARGET,
        type: "subscribe",
        eventName: "v1.**",
      }),
      "*"
    );
  };

  const subscribe = (event: MessageEvent) => {
    const avatarCreatorEvent = JSONTryParse<AvatarCreatorEvent>(event.data);

    if (avatarCreatorEvent?.source !== RPM_TARGET) return;

    if (avatarCreatorEvent?.eventName === IFRAME_READY_EVENT) {
      subscribeToAvatarCreatorEvents();
      return;
    }

    onEventReceived?.(avatarCreatorEvent);
  };

  useEffect(() => {
    window.addEventListener(MESSAGE_EVENT, subscribe);

    return () => {
      window.removeEventListener(MESSAGE_EVENT, subscribe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <iframe
      title="Ready Player Me"
      ref={frameRef}
      src={url}
      style={{
        ...style,
        border: "none",
        width: "100%",
        height: "100%",
      }}
      className={className}
      allow="camera *; microphone *; clipboard-write"
    />
  );
};

function JSONTryParse<T>(jsonString: any): T | undefined {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return undefined;
  }
}
