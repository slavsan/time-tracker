import * as React from 'react';

type Props = {};

class SettingsPage extends React.Component<{}, {}> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        Settings page here..
      </div>
    );
  }
}

export default SettingsPage;
