interface Node {
  id: string;
  type: 'root' | 'image' | 'radio' | 'checkbox' | 'text';
  label?: string;
  value?: string | string[];
  options?: string[];
  children: { [key: string]: Node[] };
  url?: string;
  shapes?: string[];
}

interface FormMakerProps {
  json: string;
  mode: 'edit' | 'view';
  uploadProps: {
    handleUploadChange: Function;
  };
}
