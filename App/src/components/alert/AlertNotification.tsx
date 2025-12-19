import React, { useEffect, useRef, useCallback, memo } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import animation from "@/src/utils/animation";

type AlertStatus = "success" | "error" | "loading" | "alert";

interface AlertNotificationProps {
  visible: boolean;
  status: AlertStatus;
  messagem?: string;
  title?: string;
  topOffset?: number;
  onDismiss?: () => void;
}

interface StatusConfig {
  style: ViewStyle;
  icon: string | null;
  defaultTitle: string;
}

const STATUS_CONFIG: Record<AlertStatus, StatusConfig> = {
  success: {
    style: { backgroundColor: "#22c55e" },
    icon: "checkmark-circle-outline",
    defaultTitle: "Tudo certo!",
  },
  error: {
    style: { backgroundColor: "#ef4444" },
    icon: "close-circle-outline",
    defaultTitle: "Algo deu errado!",
  },
  loading: {
    style: { backgroundColor: "#334155" },
    icon: 'spinner',
    defaultTitle: "Carregando...",
  },
  alert: {
    style: { backgroundColor: "#eab308" },
    icon: "alert-circle-outline",
    defaultTitle: "Notificação",
  },
};

const DISMISS_DELAY = 1200;

const AlertNotification: React.FC<AlertNotificationProps> = memo(({ visible, messagem, status, topOffset = 30, title, onDismiss }) => {

  const insets = useSafeAreaInsets();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleDismiss = useCallback(() => {
    clearTimer();
    if (status !== "loading") {
      timerRef.current = setTimeout(() => {
        onDismiss?.();
      }, DISMISS_DELAY);
    }
  }, [clearTimer, onDismiss, status]);

  useEffect(() => {
    if (visible) scheduleDismiss();
    return clearTimer;
  }, [visible, scheduleDismiss, clearTimer]);

  if (!visible) return null;

  const { style, icon, defaultTitle } = STATUS_CONFIG[status];
  const displayTitle = title || defaultTitle;

  return (
    <animation.iPhoneBounceDown style={[styles.container, style, { top: insets.top + topOffset, left: 10, right: 10 },]}
      accessibilityRole="alert"
      accessibilityLabel={displayTitle}
    >
      {status === "loading" ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        icon && <Ionicons name={icon as any} size={36} color="#fff" />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{displayTitle}</Text>
        {!!messagem && <Text style={styles.message}>{messagem}</Text>}
      </View>
    </animation.iPhoneBounceDown>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    zIndex: 9999,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
  },
});

export default AlertNotification;