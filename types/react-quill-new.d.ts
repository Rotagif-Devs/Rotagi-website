import { Component } from 'react';

declare module 'react-quill-new' {
  export interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    readOnly?: boolean;
    placeholder?: string;
    modules?: any;
    formats?: string[];
    theme?: string;
    onChange?: (content: string, delta: any, source: any, editor: any) => void;
    onChangeSelection?: (selection: any, source: any, editor: any) => void;
    onFocus?: (selection: any, source: any, editor: any) => void;
    onBlur?: (previousSelection: any, source: any, editor: any) => void;
    onKeyPress?: (event: any) => void;
    onKeyDown?: (event: any) => void;
    onKeyUp?: (event: any) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export default class ReactQuill extends Component<ReactQuillProps> {}
}
