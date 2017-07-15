import * as React from 'react';

interface MyEventTarget extends EventTarget {
  value: string;
}

interface MyFormEvent<T> extends React.FormEvent<T> {
  target: MyEventTarget;
}

export default MyFormEvent;
