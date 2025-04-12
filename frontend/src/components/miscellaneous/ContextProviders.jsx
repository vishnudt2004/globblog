import {
  // Contexts
  ThemeProvider,
  MessageProvider,
  PreLoaderProvider,
} from "../../config/exports";

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
