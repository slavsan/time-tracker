import * as React from 'react';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode
};

class Pages extends React.Component<{}, {}> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {children} = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default Pages;
