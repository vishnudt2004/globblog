function VisibilityControl({ visible, children, element, fallback = null }) {
  return <>{visible ? children || element : fallback}</>;
}

export default VisibilityControl;
