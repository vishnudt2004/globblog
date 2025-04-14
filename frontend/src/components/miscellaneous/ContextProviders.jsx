import MessageProvider from "@/contexts/MessageContext";
import PreLoaderProvider from "@/contexts/PreLoaderContext";
import ThemeProvider from "@/contexts/ThemeContext";

function ContextProviders({ children }) {
  return (
    <ThemeProvider>
      <PreLoaderProvider>
        <MessageProvider.MessageProvider>
          <MessageProvider.MessageMiniProvider>
            {children}
          </MessageProvider.MessageMiniProvider>
        </MessageProvider.MessageProvider>
      </PreLoaderProvider>
    </ThemeProvider>
  );
}

export default ContextProviders;
