// Node module Imports
import { createContext, useContext, useState, useCallback } from "react";

import Message, { MessageMini } from "@/components/atoms/Message";

const MessageContext_internal = createContext(() => {});
const MessageMiniContext_internal = createContext(() => {});

// PRIMARY NOTIFICATIONS
function MessageProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState({});
  const [options, setOptions] = useState({});

  const { type = null, message: message_ = null } = message;
  const { duration = null, position = null } = options;

  const showMessage = useCallback(
    (type, message, duration = null, position = null) => {
      setMessage({ type, message });
      setOptions({ duration, position });
      setVisible(true);
    },
    [],
  );

  const onExit = () => {
    setVisible(false);

    // to prevent transition loss onExit (less than MessageTEffect timeout)
    setTimeout(() => {
      setMessage({});
      setOptions({});
    }, 200);
  };

  return (
    <MessageContext_internal.Provider value={showMessage}>
      <Message
        type={type}
        options={{ duration, position }}
        onExit={onExit}
        visible={visible}
      >
        {message_}
      </Message>

      {children}
    </MessageContext_internal.Provider>
  );
}

// SECONDARY NOTIFICATIONS
function MessageMiniProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState({});
  const [options, setOptions] = useState({});

  const { type = null, message: message_ = null } = message;
  const { duration = null, position = null } = options;

  const showMessage = useCallback(
    (type, message, duration = null, position = null) => {
      setMessage({ type, message });
      setOptions({ duration, position });
      setVisible(true);
    },
    [],
  );

  const onExit = () => {
    setVisible(false);

    // to prevent transition loss onExit (less than MessageTEffect timeout)
    setTimeout(() => {
      setMessage({});
      setOptions({});
    }, 200);
  };

  return (
    <MessageMiniContext_internal.Provider value={showMessage}>
      <MessageMini
        type={type}
        options={{ duration, position }}
        onExit={onExit}
        visible={visible}
      >
        {message_}
      </MessageMini>

      {children}
    </MessageMiniContext_internal.Provider>
  );
}

const useMessage = () => useContext(MessageContext_internal);
const useMessageMini = () => useContext(MessageMiniContext_internal);

export default { MessageProvider, MessageMiniProvider };
export { useMessage, useMessageMini };
